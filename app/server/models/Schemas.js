import mongoose from "mongoose";

// 1. users
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    enrolmentNo: { type: String, default: "2400170900" },
    exam_target: { type: String, default: "Target Exam" },
    exam_date: { type: String, default: "2026-12-31" },
    daily_goal_hours: { type: Number, default: 4 },
    studyCenter: { type: String, default: "07162P, M.E.R.I.T" },
    settings: {
      emailDeadlines: { type: Boolean, default: true },
      aiDailyTips: { type: Boolean, default: true },
      sprintModeAlerts: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

// 2. tasks
const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    subject: { type: String, default: "General" },
    priority: { type: String, enum: ["high", "med", "low"], default: "med" },
    deadline: { type: String, required: true },
    status: { type: String, enum: ["pending", "done"], default: "pending" },
    type: {
      type: String,
      enum: ["study", "homework", "assignment"],
      default: "study",
    },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// 3. resources (Courses, Topic PDF Notes, Google Books)
const resourceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    file_url: { type: String, default: "" },
    file_type: { type: String, default: "Course" },
    subject: { type: String, default: "General" },
    author: { type: String, default: "Sync AI" },
    pages: { type: Number, default: 16 },
    size: { type: String, default: "1.8 MB" },
    tags: { type: [String], default: [] },
    exam_year: { type: Number, default: 2026 },
    deadline: { type: String, default: null },
    timeBoundLabel: { type: String, default: "" },
    completedModules: { type: [Number], default: [] },
    courseData: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);

// 4. saved_tests (Reusable Practice Tests that shuffle on every attempt)
const savedTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    topic: { type: String, required: true },
    questions: [
      {
        id: Number,
        q: String,
        options: [String],
        correct: String,
        topic: String,
        explanation: String,
      },
    ],
  },
  { timestamps: true },
);

// 5. test_attempts
const testAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attempt_id: { type: String, required: true },
    test_id: { type: String, required: true },
    title: { type: String, default: "Practice Test" },
    score: Number,
    total_marks: Number,
    percentage: Number,
    time_taken: Number,
    answers_json: { type: mongoose.Schema.Types.Mixed, default: {} },
    weak_topics: [String],
    attempted_at: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true },
);

// 6. assignments
const assignmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    due_date: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "submitted", "graded", "overdue"],
      default: "pending",
    },
    grade: { type: String, default: null },
    feedback: { type: String, default: null },
    file_url: { type: String, default: null },
    submitted_at: { type: Date, default: null },
  },
  { timestamps: true },
);

// 7. ai_suggestions
const aiSuggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: { type: String, required: true },
    priority_score: { type: Number, default: 8 },
    is_accepted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// 8. notifications
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["deadline", "ai_tip", "graded", "reminder"],
      default: "ai_tip",
    },
    is_read: { type: Boolean, default: false },
    action_link: { type: String, default: "/app" },
  },
  { timestamps: true },
);

// 9. study_plans
const plannerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    days: { type: mongoose.Schema.Types.Mixed, default: [] },
    total_hours: { type: Number, default: 15 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
export const Task = mongoose.model("Task", taskSchema);
export const Resource = mongoose.model("Resource", resourceSchema);
export const SavedTest = mongoose.model("SavedTest", savedTestSchema);
export const TestAttempt = mongoose.model("TestAttempt", testAttemptSchema);
export const Assignment = mongoose.model("Assignment", assignmentSchema);
export const AISuggestion = mongoose.model("AISuggestion", aiSuggestionSchema);
export const Notification = mongoose.model("Notification", notificationSchema);
export const Planner = mongoose.model("Planner", plannerSchema);
