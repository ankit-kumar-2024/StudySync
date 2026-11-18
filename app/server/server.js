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
  AISuggestion,
  Notification,
  Planner,
} from "./models/Schemas.js";
import { protect } from "./middleware/auth.js";

dotenv.config();
const app = express();

// Security Middleware (Synopsis Section 10)
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: "Too many attempts. Please try again in 15 minutes." },
});

// Ensure uploads directory exists for Multer
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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per Synopsis Section 10d
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-4-hydrogen";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("StudySync MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

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

// Automated hourly deadline reminder check (Synopsis Section 5.3)
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
    // Silent background check
  }
});

async function searchTopYouTubeVideo(query) {
  if (!process.env.YOUTUBE_API_KEY) {
    return {
      id: "Oe421EPjeBE",
      youtubeId: "Oe421EPjeBE",
      title: `${query} — Complete Topic Lecture`,
      channelTitle: "Sync AI Curated",
      instructor: "Sync AI Curated",
      duration: "42:15",
      views: "1.1M views",
      thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg",
      description: `Detailed video lecture covering ${query}.`,
    };
  }
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    `${query} full lecture tutorial`,
  )}&type=video&videoEmbeddable=true&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const item = data.items?.[0];
  if (!item) return null;

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
}

function parseDeadlineFromText(input) {
  const clean = String(input || "")
    .trim()
    .toLowerCase();
  const now = Date.now();
  const numMatch = clean.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[1], 10) : 7;

  if (clean.includes("week"))
    return new Date(now + num * 7 * 86400000).toISOString();
  if (clean.includes("month"))
    return new Date(now + num * 30 * 86400000).toISOString();
  const parsedDate = Date.parse(input);
  if (!Number.isNaN(parsedDate) && parsedDate > now)
    return new Date(parsedDate).toISOString();
  return new Date(now + num * 86400000).toISOString();
}

// 1. AUTHENTICATION (Register, Login, Reset Password, Profile)
app.post("/api/auth/register", authLimiter, async (req, res) => {
  try {
    const { name, email, password, examTarget, dailyGoalHours } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      exam_target: examTarget || "JEE Advanced",
      daily_goal_hours: Number(dailyGoalHours) || 5,
    });

    await Assignment.insertMany([
      {
        userId: user._id,
        title: "Wave Optics Lab Experiment Writeup",
        subject: "Physics",
        due_date: "Tomorrow, 11:59 PM",
        status: "pending",
      },
      {
        userId: user._id,
        title: "Periodic Table & Coordination Reactions",
        subject: "Chemistry",
        due_date: "3 Days ago",
        status: "graded",
        grade: "A- (92%)",
        feedback: "Strong grasp on ligand field stability.",
        file_url: "https://example.com/chem_coord.pdf",
      },
    ]);

    await Notification.create({
      userId: user._id,
      title: "Welcome to StudySync",
      message:
        "Open Sync AI Builder to generate your first course, PDF book & 50-Q test!",
      type: "ai_tip",
      action_link: "/app/chat",
    });

    res
      .status(201)
      .json({ token: signToken(user._id), user: formatUser(user) });
  } catch {
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
  } catch {
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

// 2. WORKSPACE HYDRATION & JSON EXPORT
app.get("/api/workspace", protect, async (req, res) => {
  try {
    const [tasks, assignments, history, resources, planner, notifications] =
      await Promise.all([
        Task.find({ userId: req.userId }).sort({ createdAt: -1 }),
        Assignment.find({ userId: req.userId }).sort({ createdAt: -1 }),
        TestAttempt.find({ userId: req.userId }).sort({ createdAt: -1 }),
        Resource.find({ userId: req.userId }).sort({ createdAt: -1 }),
        Planner.findOne({ userId: req.userId }),
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
      days: planner?.days || null,
      notifications: notifications.map((n) => ({
        ...n.toObject(),
        id: n._id.toString(),
      })),
    });
  } catch {
    res.status(500).json({ error: "Failed to load workspace" });
  }
});

// 3. SYNC AI 5-STEP COMPLETE COURSE GENERATOR
app.post("/api/ai/build-course", protect, async (req, res) => {
  try {
    const {
      courseTitle,
      topicsList,
      includeBooksPdf = true,
      includeVideos = true,
      includeTests = true,
      timeBoundation = "7 days",
    } = req.body;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `Build a structured course titled "${courseTitle}" covering these exact topics: ${topicsList.join(
        ", ",
      )}. For EACH topic, write a comprehensive explanation, detailed textbook study notes, a practical worked example/code snippet, and a YouTube search query.`,
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
    const deadlineIso = parseDeadlineFromText(timeBoundation);

    for (let i = 0; i < structuredCourse.modules.length; i++) {
      const mod = structuredCourse.modules[i];
      mod.video = includeVideos
        ? await searchTopYouTubeVideo(mod.videoQuery || mod.moduleTitle)
        : null;
      mod.testQuestionCount = includeTests ? 50 : 0;
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
      timeBoundLabel: timeBoundation,
      completedModules: [],
      courseData: structuredCourse,
    });

    const createdTopicPdfs = [];
    if (includeBooksPdf) {
      for (let i = 0; i < structuredCourse.modules.length; i++) {
        const mod = structuredCourse.modules[i];
        const pdfDoc = await Resource.create({
          userId: req.userId,
          title: `${mod.moduleTitle} — Complete Topic Book.pdf`,
          file_type: "PDF",
          subject: structuredCourse.courseTitle,
          author: "Sync AI Publisher",
          pages: 16,
          size: "1.6 MB",
          courseData: {
            courseTitle: mod.moduleTitle,
            overview: `Course: ${structuredCourse.courseTitle}`,
            modules: [mod],
          },
        });
        createdTopicPdfs.push({
          ...pdfDoc.toObject(),
          id: pdfDoc._id.toString(),
        });
      }
    }

    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const generatedDays = structuredCourse.modules.map((mod, idx) => ({
      day: daysOfWeek[idx % daysOfWeek.length],
      slots: [
        {
          id: `sync-slot-${Date.now()}-${idx}`,
          time: "06:00 - 08:00 PM",
          subject: structuredCourse.courseTitle,
          topic: `${mod.moduleTitle} (Video + PDF Book + 50-Q Test)`,
          status: "pending",
        },
      ],
    }));

    await Planner.findOneAndUpdate(
      { userId: req.userId },
      { days: generatedDays },
      { upsert: true, new: true },
    );

    await AISuggestion.create({
      userId: req.userId,
      reason: `Complete "${structuredCourse.courseTitle}" within ${timeBoundation}`,
      priority_score: 9,
      is_accepted: true,
    });

    res.status(201).json({
      course: { ...savedCourse.toObject(), id: savedCourse._id.toString() },
      topicPdfs: createdTopicPdfs,
      plannerDays: generatedDays,
    });
  } catch (err) {
    console.error("Build Course Error:", err);
    res.status(500).json({ error: "Failed to build complete course" });
  }
});

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
      pdf.moveDown(0.4);
      pdf
        .fontSize(10)
        .font("Courier")
        .text(`Worked Example / Code:\n${m.example}`);
      pdf.moveDown(1.2);
    });
    pdf.end();
  } catch {
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

app.patch("/api/resources/:id/progress", protect, async (req, res) => {
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
});

// 4. DYNAMIC 50-QUESTION TEST GENERATOR
app.post("/api/tests/generate", protect, async (req, res) => {
  try {
    const { topic, count = 50 } = req.body;
    const requestedCount = Math.min(50, Math.max(5, Number(count)));
    const variationSeed = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `Generate ${requestedCount} completely fresh, unique multiple-choice questions on "${topic}" (Variation Seed: ${variationSeed}). Every option in "options" MUST begin with "A. ", "B. ", "C. ", or "D. ", and "correct" MUST be only the single uppercase letter ("A", "B", "C", or "D").`,
      config: {
        temperature: 0.9,
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

    res.json({
      test_id: `test-${Date.now()}`,
      title: `${topic} — ${requestedCount}-Question Practice Test`,
      questions: JSON.parse(response.text),
    });
  } catch {
    res.status(500).json({ error: "Failed to generate 50-question test" });
  }
});

app.post("/api/tests/attempt", protect, async (req, res) => {
  const attempt = await TestAttempt.create({ userId: req.userId, ...req.body });
  res.status(201).json({ attempt });
});

app.get("/api/tests/history", protect, async (req, res) => {
  const history = await TestAttempt.find({ userId: req.userId }).sort({
    createdAt: -1,
  });
  res.json({ history });
});

// 5. TASKS, MULTER FILE UPLOADS, ASSIGNMENTS & CHAT
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

app.post("/api/ai/chat", protect, async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    const formattedHistory = history.slice(-8).map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: prompt }] },
      ],
      config: {
        systemInstruction:
          "You are Sync AI, the StudySync academic assistant. Answer clearly with examples.",
      },
    });
    res.json({ reply: response.text });
  } catch {
    res.status(500).json({ error: "Sync AI is temporarily unavailable." });
  }
});

app.post("/api/planner/generate", protect, async (req, res) => {
  const { targetExam, dailyGoalHours, weakTopics = [] } = req.body;
  const response = await ai.models.generateContent({
    model: MODEL,
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
});

app.listen(process.env.PORT || 5000, () =>
  console.log(
    `StudySync Server running on http://localhost:${process.env.PORT || 5000}`,
  ),
);
