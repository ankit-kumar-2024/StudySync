import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Check, Clock, FileText, Upload } from "lucide-react";
import { submitAssignment } from "../store/slices/assignmentsSlice";

export default function AssignmentsPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const assignments = useSelector((state) => state.assignments.items);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredAssignments = assignments.filter((item) => {
    if (activeTab === "all") return true;
    return item.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit!");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleConfirmSubmission = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedAssignment) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const uploadData = await uploadRes.json();
      const fileUrl =
        uploadData.file_url || `https://res.cloudinary.com/satms/docs/${selectedFile.name}`;

      await fetch(
        `http://localhost:5000/api/assignments/${selectedAssignment.id}/submit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ file_url: fileUrl }),
        }
      );

      dispatch(submitAssignment({ id: selectedAssignment.id, file_url: fileUrl }));
    } finally {
      setIsSubmitting(false);
      setSelectedAssignment(null);
      setSelectedFile(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Homework & Assignments
          </h1>
          <p className="text-xs text-slate-400">
            Submit coursework, track evaluation statuses, and review instructor feedback.
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-xl bg-[#0F1624] border border-slate-800 text-slate-300 text-xs font-semibold">
          {assignments.filter((a) => a.status === "pending").length} Pending Submissions
        </span>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs">
        {["all", "pending", "submitted", "graded"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl font-bold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-[#0F1624] text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {tab === "all" ? "All Assignments" : tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-[#0F1624] rounded-2xl border border-slate-800 text-xs text-slate-400">
            No assignments found under "{activeTab}".
          </div>
        ) : (
          filteredAssignments.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-[#0F1624] rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="px-2.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300">
                    {item.subject}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full uppercase font-bold text-[10px] border ${
                      item.status === "graded"
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : item.status === "submitted"
                          ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                          : "bg-rose-500/15 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Due: {item.due_date}</span>
                  </p>
                </div>

                {item.status === "graded" && (
                  <div className="p-3 bg-[#070A11] rounded-xl border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-indigo-400">Score:</span>
                      <span className="font-bold text-emerald-400">{item.grade}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pt-1">"{item.feedback}"</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800">
                {item.status === "pending" ? (
                  <button
                    onClick={() => setSelectedAssignment(item)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    + Submit Assignment
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                      <Check className="w-4 h-4" />
                      <span>{item.status === "graded" ? "Graded" : "Submitted"}</span>
                    </span>
                    {item.file_url && (
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline font-bold text-[11px]"
                      >
                        View File
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1624] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-700">
            <div>
              <h3 className="text-sm font-bold text-white">Upload Homework Submission</h3>
              <p className="text-xs text-slate-400 mt-0.5 truncate">{selectedAssignment.title}</p>
            </div>

            <form onSubmit={handleConfirmSubmission} className="space-y-4 text-xs">
              <div className="p-5 border-2 border-dashed border-slate-700 rounded-2xl bg-[#070A11] text-center space-y-2">
                <Upload className="w-8 h-8 text-indigo-400 mx-auto" />
                <div className="text-slate-400">
                  <label className="text-indigo-400 font-bold hover:underline cursor-pointer">
                    Click to select file
                    <input
                      type="file"
                      accept=".pdf,.docx,.png,.jpeg"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>{" "}
                  from device
                </div>
                <p className="text-[10px] text-slate-500">PDF, DOCX, PNG up to 10MB</p>
                {selectedFile && (
                  <p className="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 py-1 px-2 rounded-lg border border-emerald-500/30 truncate">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAssignment(null);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || isSubmitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Uploading..." : "Confirm & Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}