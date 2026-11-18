import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    enrolmentNo: { type: String, default: "2400170900" },
    exam_target: { type: String, default: "JEE Advanced" },
    exam_date: { type: String, default: "2026-05-25" },
    daily_goal_hours: { type: Number, default: 5 },
    studyCenter: { type: String, default: "07162P, M.E.R.I.T" },
  },
  { timestamps: true },
);

const testAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attempt_id: { type: String, required: true },
    test_id: { type: String, required: true },
    title: { type: String, default: "Diagnostic Quiz" },
    score: Number,
    total_marks: Number,
    percentage: Number,
    time_taken: Number,
    weak_topics: [String],
    attempted_at: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true },
);

const resourceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    file_type: { type: String, default: "Course" },
    subject: { type: String, default: "General" },
    size: { type: String, default: "1.4 MB" },
    exam_year: { type: Number, default: 2026 },
    courseData: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
export const TestAttempt = mongoose.model("TestAttempt", testAttemptSchema);
export const Resource = mongoose.model("Resource", resourceSchema);
