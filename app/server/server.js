import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { YoutubeTranscript } from "youtube-transcript";
import { GoogleGenAI, Type } from "@google/genai";
import {
  User,
  Task,
  Assignment,
  TestAttempt,
  Resource,
  SavedTest,
  AISuggestion,
  Notification,
  Planner,
} from "./models/Schemas.js";
import { protect } from "./middleware/auth.js";

dotenv.config();
const app = express();

// 1. Security Middleware with YouTube Embed CSP Allowed
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameSrc: [
          "'self'",
          "https://www.youtube.com",
          "https://www.youtube-nocookie.com",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://i.ytimg.com",
          "https://images.unsplash.com",
        ],
        connectSrc: [
          "'self'",
          "http://localhost:5000",
          "https://www.googleapis.com",
        ],
      },
    },
  }),
);
app.use(cors());
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many attempts. Please try again in 15 minutes." },
});

// 2. Multer File Upload Setup
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use("/uploads", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// 3. Gemini AI Client with Dynamic Model Auto-Discovery
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function generateWithFallback(params) {
  const preferredModels = [
    "gemini-3.8-flash",
    "gemini-4-hydrogen",
    "gemini-3.5-flash",
  ];
  const errors = [];

  // Try current supported models first
  for (const model of preferredModels) {
    try {
      return await ai.models.generateContent({ ...params, model });
    } catch (err) {
      errors.push(`${model}: ${err.message}`);
    }
  }

  // Auto-discover any active generateContent model enabled on your API key
  try {
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
    );
    const listData = await listRes.json();
    const discovered = (listData.models || [])
      .filter((m) =>
        (m.supportedGenerationMethods || []).includes("generateContent"),
      )
      .map((m) => m.name.replace("models/", ""))
      .filter((name) => !preferredModels.includes(name));

    for (const model of discovered.slice(0, 3)) {
      try {
        return await ai.models.generateContent({ ...params, model });
      } catch (err) {
        errors.push(`${model}: ${err.message}`);
      }
    }
  } catch (discoverErr) {
    errors.push(`Model discovery failed: ${discoverErr.message}`);
  }

  throw new Error(errors.join(" | "));
}

// 4. MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("ERROR: MONGO_URI is missing in server/.env");
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("StudySync MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err.message));
}

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "studysync_secret_2026", {
    expiresIn: "7d",
  });

const formatUser = (user) => ({
  user_id: user._id,
  name: user.name,
  email: user.email,
  enrolmentNo: user.enrolmentNo,
  exam_target: user.exam_target,
  exam_date: user.exam_date,
  daily_goal_hours: user.daily_goal_hours,
  studyCenter: user.studyCenter,
  settings: user.settings,
});

// 5. Hourly Deadline Check Cron
cron.schedule("0 * * * *", async () => {
  try {
    const soon = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const dueTasks = await Task.find({
      status: "pending",
      deadline: { $lte: soon },
    });
    for (const t of dueTasks) {
      const exists = await Notification.findOne({
        userId: t.userId,
        title: "Upcoming Deadline",
        message: { $regex: t.title, $options: "i" },
      });
      if (!exists) {
        await Notification.create({
          userId: t.userId,
          title: "Upcoming Deadline",
          message: `"${t.title}" is due within 24 hours.`,
          type: "deadline",
          action_link: "/app/tasks",
        });
      }
    }
  } catch {
    // Ignore background cron errors
  }
});

// Helper: Fetch Embeddable YouTube Video
async function searchTopYouTubeVideo(query) {
  const fallbackVideo = {
    id: "Oe421EPjeBE",
    youtubeId: "Oe421EPjeBE",
    title: `${query} — Complete Topic Lecture`,
    channelTitle: "freeCodeCamp.org",
    instructor: "freeCodeCamp.org",
    duration: "42:15",
    views: "2.7M views",
    thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg",
    description: `Detailed video lecture covering ${query}.`,
  };

  if (!process.env.YOUTUBE_API_KEY) return fallbackVideo;

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      `${query} full lecture tutorial`,
    )}&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=3&key=${
      process.env.YOUTUBE_API_KEY
    }`;
    const res = await fetch(url);
    const data = await res.json();
    const item = (data.items || []).find((i) => i.id?.videoId);
    if (!item) return fallbackVideo;

    return {
      id: item.id.videoId,
      youtubeId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      instructor: item.snippet.channelTitle,
      duration: "34:10",
      views: "520K views",
      thumbnail:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url,
      description: item.snippet.description,
    };
  } catch {
    return fallbackVideo;
  }
}

// Helper: Search Google Books API
async function searchGooglePdfBook(topic) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      topic,
    )}&maxResults=1`;
    const res = await fetch(url);
    const data = await res.json();
    const vol = data.items?.[0]?.volumeInfo;
    if (!vol) return null;
    return {
      bookTitle: vol.title,
      authors: (vol.authors || ["Academic Press"]).join(", "),
      previewLink: vol.previewLink || vol.infoLink,
      thumbnail: vol.imageLinks?.thumbnail || null,
    };
  } catch {
    return null;
  }
}

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================
app.post("/api/auth/register", authLimiter, async (req, res) => {
  try {
    const { name, email, password, examTarget, dailyGoalHours } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      exam_target: examTarget || "Target Exam",
      daily_goal_hours: Number(dailyGoalHours) || 4,
    });
    res
      .status(201)
      .json({ token: signToken(user._id), user: formatUser(user) });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/auth/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ token: signToken(user._id), user: formatUser(user) });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/auth/reset-password", authLimiter, async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ error: "No account found with that email" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated successfully. You can now log in." });
  } catch {
    res.status(500).json({ error: "Password reset failed" });
  }
});

app.put("/api/auth/profile", protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    res.json({ user: formatUser(user) });
  } catch {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ==========================================
// WORKSPACE HYDRATION
// ==========================================
app.get("/api/workspace", protect, async (req, res) => {
  try {
    const [
      tasks,
      assignments,
      history,
      resources,
      planner,
      savedTests,
      notifications,
    ] = await Promise.all([
      Task.find({ userId: req.userId }).sort({ createdAt: -1 }),
      Assignment.find({ userId: req.userId }).sort({ createdAt: -1 }),
      TestAttempt.find({ userId: req.userId }).sort({ createdAt: -1 }),
      Resource.find({ userId: req.userId }).sort({ createdAt: -1 }),
      Planner.findOne({ userId: req.userId }),
      SavedTest.find({ userId: req.userId }).sort({ createdAt: -1 }),
      Notification.find({ userId: req.userId })
        .sort({ createdAt: -1 })
        .limit(15),
    ]);

    res.json({
      tasks: tasks.map((t) => ({ ...t.toObject(), id: t._id.toString() })),
      assignments: assignments.map((a) => ({
        ...a.toObject(),
        id: a._id.toString(),
      })),
      history,
      resources: resources.map((r) => ({
        ...r.toObject(),
        id: r._id.toString(),
      })),
      days: planner?.days || [],
      savedTests: savedTests.map((st) => ({
        ...st.toObject(),
        id: st._id.toString(),
      })),
      notifications: notifications.map((n) => ({
        ...n.toObject(),
        id: n._id.toString(),
      })),
    });
  } catch (err) {
    console.error("Workspace Load Error:", err);
    res.status(500).json({ error: "Failed to load workspace" });
  }
});

// ==========================================
// SYNC AI: FREE CHAT, HOMEWORK & 7-STEP COURSE
// ==========================================
app.post("/api/ai/chat", protect, async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    const formattedHistory = history.slice(-8).map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await generateWithFallback({
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: prompt }] },
      ],
      config: {
        systemInstruction:
          "You are Sync AI, the StudySync academic assistant. Answer doubts clearly with examples.",
      },
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error("Sync AI Chat Error:", err.message);
    res.status(500).json({
      error: `Sync AI Error: ${err.message || "Check GEMINI_API_KEY."}`,
    });
  }
});

app.post("/api/ai/homework", protect, async (req, res) => {
  try {
    const {
      requestText,
      outputFormat = "text",
      uploadedFileName = "",
    } = req.body;

    const response = await generateWithFallback({
      contents: `Student Homework / Assignment Request: "${requestText}" ${
        uploadedFileName ? `(Attached reference file: ${uploadedFileName})` : ""
      }. Requested Output Format: ${outputFormat}. Provide a thorough, clear solution, explanation, or clean code.`,
    });

    const answerText = response.text;
    let createdPdfResource = null;

    if (outputFormat === "pdf") {
      const title = requestText.slice(0, 60);
      const savedPdf = await Resource.create({
        userId: req.userId,
        title: `${title} — Sync AI Solution.pdf`,
        file_type: "PDF",
        subject: "Homework & Assignment",
        author: "Sync AI",
        pages: 8,
        size: "1.2 MB",
        courseData: {
          courseTitle: title,
          overview: "Generated by Sync AI Assignment & Homework Assistant",
          modules: [
            {
              moduleTitle: title,
              explanation: answerText,
              bookNotes: "",
              example: "",
            },
          ],
        },
      });
      createdPdfResource = {
        ...savedPdf.toObject(),
        id: savedPdf._id.toString(),
      };
    }

    const savedAssignment = await Assignment.create({
      userId: req.userId,
      title: requestText.slice(0, 70),
      subject: "Sync AI Assisted",
      due_date: new Date(Date.now() + 3 * 86400000).toLocaleDateString(),
      status: "submitted",
      grade: "AI Solved",
      feedback: answerText.slice(0, 180) + "...",
      file_url: createdPdfResource
        ? `http://localhost:${process.env.PORT || 5000}/api/resources/course/${createdPdfResource.id}/pdf`
        : null,
    });

    res.json({
      reply: answerText,
      pdfResource: createdPdfResource,
      assignment: {
        ...savedAssignment.toObject(),
        id: savedAssignment._id.toString(),
      },
    });
  } catch (err) {
    console.error("Homework AI Error:", err.message);
    res.status(500).json({ error: `Homework AI Error: ${err.message}` });
  }
});

app.post("/api/ai/build-course", protect, async (req, res) => {
  try {
    const {
      courseTitle,
      courseDescription,
      topicsList,
      includePdfNotes = true,
      includeGoogleBooks = true,
      includeVideos = true,
      includeTests = true,
      deadline = "",
    } = req.body;

    const response = await generateWithFallback({
      contents: `Build a complete course titled "${courseTitle}" (${courseDescription}) covering these exact topics: ${topicsList.join(
        ", ",
      )}. For EACH topic, write detailed PDF revision notes, a complete textbook-style explanation, a practical worked example/code snippet, and a YouTube lecture search query.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            courseTitle: { type: Type.STRING },
            overview: { type: Type.STRING },
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  moduleTitle: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  bookNotes: { type: Type.STRING },
                  example: { type: Type.STRING },
                  videoQuery: { type: Type.STRING },
                },
                required: [
                  "moduleTitle",
                  "explanation",
                  "bookNotes",
                  "example",
                  "videoQuery",
                ],
              },
            },
          },
          required: ["courseTitle", "overview", "modules"],
        },
      },
    });

    const structuredCourse = JSON.parse(response.text);
    const deadlineIso = deadline
      ? new Date(deadline).toISOString()
      : new Date(Date.now() + 7 * 86400000).toISOString();

    const createdResources = [];
    const createdTests = [];

    for (let i = 0; i < structuredCourse.modules.length; i++) {
      const mod = structuredCourse.modules[i];

      mod.video = includeVideos
        ? await searchTopYouTubeVideo(mod.videoQuery || mod.moduleTitle)
        : null;

      if (includeGoogleBooks) {
        const gBook = await searchGooglePdfBook(mod.moduleTitle);
        mod.googleBook = gBook;
        if (gBook) {
          const bookRes = await Resource.create({
            userId: req.userId,
            title: `${gBook.bookTitle} (Google Book)`,
            file_type: "Book",
            subject: structuredCourse.courseTitle,
            author: gBook.authors,
            pages: 320,
            size: "Google Books",
            file_url: gBook.previewLink,
          });
          createdResources.push({
            ...bookRes.toObject(),
            id: bookRes._id.toString(),
          });
        }
      }

      if (includePdfNotes) {
        const noteRes = await Resource.create({
          userId: req.userId,
          title: `${mod.moduleTitle} — Topic PDF Notes.pdf`,
          file_type: "PDF",
          subject: structuredCourse.courseTitle,
          author: "Sync AI Notes",
          pages: 12,
          size: "1.4 MB",
          courseData: {
            courseTitle: mod.moduleTitle,
            overview: `Course: ${structuredCourse.courseTitle}`,
            modules: [mod],
          },
        });
        createdResources.push({
          ...noteRes.toObject(),
          id: noteRes._id.toString(),
        });
      }

      if (includeTests) {
        const qRes = await generateWithFallback({
          contents: `Generate 15 multiple-choice questions on "${mod.moduleTitle}". Options must start with "A. ", "B. ", "C. ", "D. ", and "correct" must be "A", "B", "C", or "D".`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  q: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correct: { type: Type.STRING },
                  topic: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: [
                  "id",
                  "q",
                  "options",
                  "correct",
                  "topic",
                  "explanation",
                ],
              },
            },
          },
        });

        const savedTopicTest = await SavedTest.create({
          userId: req.userId,
          title: `${mod.moduleTitle} — Topic Practice Test`,
          topic: mod.moduleTitle,
          questions: JSON.parse(qRes.text),
        });
        createdTests.push({
          ...savedTopicTest.toObject(),
          id: savedTopicTest._id.toString(),
        });
      }
    }

    const savedCourse = await Resource.create({
      userId: req.userId,
      title: structuredCourse.courseTitle,
      file_type: "Course",
      subject: courseTitle,
      author: "Sync AI",
      pages: structuredCourse.modules.length * 14,
      size: `${(structuredCourse.modules.length * 1.5).toFixed(1)} MB`,
      deadline: deadlineIso,
      timeBoundLabel: new Date(deadlineIso).toLocaleDateString(),
      completedModules: [],
      courseData: structuredCourse,
    });
    createdResources.unshift({
      ...savedCourse.toObject(),
      id: savedCourse._id.toString(),
    });

    const totalDays = Math.max(
      1,
      Math.ceil((new Date(deadlineIso).getTime() - Date.now()) / 86400000),
    );
    const dayMap = {};
    structuredCourse.modules.forEach((mod, idx) => {
      const dayOffset = Math.floor(
        (idx * totalDays) / structuredCourse.modules.length,
      );
      const targetDate = new Date(Date.now() + dayOffset * 86400000);
      const dayLabel = targetDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      if (!dayMap[dayLabel]) dayMap[dayLabel] = [];
      dayMap[dayLabel].push({
        id: `slot-${Date.now()}-${idx}`,
        time: "06:00 - 08:00 PM",
        subject: structuredCourse.courseTitle,
        topic: `${mod.moduleTitle} (Video + PDF + Test)`,
        status: "pending",
      });
    });

    const plannerDays = Object.entries(dayMap).map(([day, slots]) => ({
      day,
      slots,
    }));
    await Planner.findOneAndUpdate(
      { userId: req.userId },
      { days: plannerDays },
      { upsert: true, new: true },
    );

    await AISuggestion.create({
      userId: req.userId,
      reason: `Complete "${structuredCourse.courseTitle}" by ${new Date(
        deadlineIso,
      ).toLocaleDateString()}`,
      priority_score: 9,
      is_accepted: true,
    });

    res.status(201).json({
      course: { ...savedCourse.toObject(), id: savedCourse._id.toString() },
      resources: createdResources,
      tests: createdTests,
      plannerDays,
    });
  } catch (err) {
    console.error("7-Step Course Build Error:", err.message);
    res.status(500).json({ error: `Course Build Error: ${err.message}` });
  }
});

// ==========================================
// PDF EXPORT & RESOURCE PROGRESS
// ==========================================
app.get("/api/resources/course/:id/pdf", protect, async (req, res) => {
  try {
    const docRecord = await Resource.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!docRecord || !docRecord.courseData) {
      return res.status(404).json({ error: "PDF not found" });
    }
    const course = docRecord.courseData;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${docRecord.title.replace(/\s+/g, "_")}.pdf"`,
    );

    const pdf = new PDFDocument({ margin: 50 });
    pdf.pipe(res);
    pdf
      .fontSize(20)
      .font("Helvetica-Bold")
      .text(course.courseTitle, { align: "center" });
    pdf.moveDown(0.5);
    pdf.fontSize(11).font("Helvetica").text(course.overview, { lineGap: 4 });
    pdf.moveDown(1.2);

    course.modules.forEach((m, i) => {
      pdf
        .fontSize(15)
        .font("Helvetica-Bold")
        .text(`Topic ${i + 1}: ${m.moduleTitle}`);
      pdf.moveDown(0.4);
      pdf.fontSize(11).font("Helvetica").text(m.explanation, { lineGap: 4 });
      if (m.bookNotes) {
        pdf.moveDown(0.4);
        pdf.fontSize(11).font("Helvetica").text(m.bookNotes, { lineGap: 4 });
      }
      if (m.example) {
        pdf.moveDown(0.4);
        pdf
          .fontSize(10)
          .font("Courier")
          .text(`Worked Example / Code:\n${m.example}`);
      }
      pdf.moveDown(1.2);
    });
    pdf.end();
  } catch {
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

app.patch("/api/resources/:id/progress", protect, async (req, res) => {
  try {
    const updated = await Resource.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true },
    );
    res.json({
      resource: updated
        ? { ...updated.toObject(), id: updated._id.toString() }
        : null,
    });
  } catch {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// ==========================================
// REUSABLE PRACTICE TESTS & ATTEMPT HISTORY
// ==========================================
app.post("/api/tests/create-reusable", protect, async (req, res) => {
  try {
    const { topic, count = 10 } = req.body;
    const requestedCount = Math.min(50, Math.max(1, Number(count)));

    const response = await generateWithFallback({
      contents: `Generate ${requestedCount} high-quality multiple-choice questions on "${topic}". Every option in "options" MUST start with "A. ", "B. ", "C. ", or "D. ", and "correct" MUST be only the single uppercase letter ("A", "B", "C", or "D").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              q: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correct: { type: Type.STRING },
              topic: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["id", "q", "options", "correct", "topic", "explanation"],
          },
        },
      },
    });

    const questions = JSON.parse(response.text);
    const saved = await SavedTest.create({
      userId: req.userId,
      title: `${topic} — ${requestedCount}-Question Practice Test`,
      topic,
      questions,
    });

    res.status(201).json({
      test: { ...saved.toObject(), id: saved._id.toString() },
    });
  } catch (err) {
    console.error("Create Test Error:", err.message);
    res.status(500).json({ error: `Create Test Error: ${err.message}` });
  }
});

app.post("/api/tests/attempt", protect, async (req, res) => {
  try {
    const attempt = await TestAttempt.create({
      userId: req.userId,
      ...req.body,
    });
    res.status(201).json({ attempt });
  } catch {
    res.status(500).json({ error: "Failed to save test attempt" });
  }
});

app.get("/api/tests/history", protect, async (req, res) => {
  try {
    const history = await TestAttempt.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ history });
  } catch {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// ==========================================
// TASKS, UPLOADS, ASSIGNMENTS, VIDEOS & PLANNER
// ==========================================
app.post("/api/tasks", protect, async (req, res) => {
  const task = await Task.create({ userId: req.userId, ...req.body });
  res
    .status(201)
    .json({ task: { ...task.toObject(), id: task._id.toString() } });
});

app.patch("/api/tasks/:id", protect, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true },
  );
  res.json({
    task: task ? { ...task.toObject(), id: task._id.toString() } : null,
  });
});

app.delete("/api/tasks/:id", protect, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ deleted: true });
});

app.post("/api/upload", protect, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({
    file_url: `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`,
  });
});

app.patch("/api/assignments/:id/submit", protect, async (req, res) => {
  const assignment = await Assignment.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    {
      status: "submitted",
      file_url: req.body.file_url,
      grade: "Under Review",
      submitted_at: new Date(),
    },
    { new: true },
  );
  res.json({
    assignment: assignment
      ? { ...assignment.toObject(), id: assignment._id.toString() }
      : null,
  });
});

app.get("/api/videos/:videoId/transcript", protect, async (req, res) => {
  try {
    const raw = await YoutubeTranscript.fetchTranscript(req.params.videoId);
    const segments = raw.map((item) => {
      const totalSec = Math.floor(item.offset / 1000);
      const mins = String(Math.floor(totalSec / 60)).padStart(2, "0");
      const secs = String(totalSec % 60).padStart(2, "0");
      return {
        seconds: totalSec,
        timestamp: `${mins}:${secs}`,
        text: item.text,
      };
    });
    res.json({ segments });
  } catch {
    res.status(404).json({ error: "Transcript unavailable." });
  }
});

app.post("/api/planner/generate", protect, async (req, res) => {
  try {
    const { targetExam, dailyGoalHours, weakTopics = [] } = req.body;
    const response = await generateWithFallback({
      contents: `Create a 3-day study timetable (Monday, Tuesday, Wednesday) for "${targetExam}" (${dailyGoalHours} hrs/day) prioritizing: ${
        weakTopics.join(", ") || "Core Topics"
      }.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.STRING },
              slots: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    time: { type: Type.STRING },
                    subject: { type: Type.STRING },
                    topic: { type: Type.STRING },
                    status: { type: Type.STRING },
                  },
                  required: ["id", "time", "subject", "topic", "status"],
                },
              },
            },
            required: ["day", "slots"],
          },
        },
      },
    });
    const days = JSON.parse(response.text);
    await Planner.findOneAndUpdate(
      { userId: req.userId },
      { days },
      { upsert: true, new: true },
    );
    res.json({ days });
  } catch {
    res.status(500).json({ error: "Failed to generate planner schedule" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`StudySync Server running on http://localhost:${PORT}`),
);