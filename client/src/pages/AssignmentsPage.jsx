import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconChecklist,
  IconCheck,
  IconClock,
  IconFileText,
  IconShield,
} from "../components/common/Icons";
import { submitAssignment } from "../store/slices/assignmentsSlice";

export default function AssignmentsPage() {
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignments.items);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter assignments based on the active tab
  const filteredAssignments = assignments.filter((item) => {
    if (activeTab === "all") return true;
    return item.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit specified in system security!");
        return;
      }
      setSelectedFileName(file.name);
    }
  };

  const handleConfirmSubmission = (e) => {
    e.preventDefault();
    if (!selectedFileName || !selectedAssignment) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Dispatches file URL update and switches status to 'submitted'
      dispatch(
        submitAssignment({
          id: selectedAssignment.id,
          file_url: `https://res.cloudinary.com/satms/docs/${selectedFileName}`,
        }),
      );
      setIsSubmitting(false);
      setSelectedAssignment(null);
      setSelectedFileName("");
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-['Inter',sans-serif] text-[#121c2a]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Homework & Assignments
          </h1>
          <p className="text-xs text-[#464555]">
            Submit coursework, track evaluation statuses, and review instructor
            feedback.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-white border border-[#dee9fc] text-[#464555] font-semibold shadow-xs">
            {assignments.filter((a) => a.status === "pending").length} Pending
            Submissions
          </span>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#dee9fc] pb-3 text-xs">
        {["all", "pending", "submitted", "graded"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl font-bold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-[#3525cd] text-white shadow-xs"
                : "bg-white text-[#464555] hover:bg-[#dee9fc]/50 border border-[#dee9fc]"
            }`}
          >
            {tab === "all" ? "All Assignments" : tab}
          </button>
        ))}
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-[#dee9fc] text-xs text-gray-400">
            No assignments found under the "{activeTab}" filter.
          </div>
        ) : (
          filteredAssignments.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white rounded-2xl border border-[#dee9fc] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#3525cd]">
                    {item.subject}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full uppercase font-bold text-[10px] ${
                      item.status === "graded"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : item.status === "submitted"
                          ? "bg-indigo-50 text-[#3525cd] border border-indigo-200"
                          : "bg-rose-50 text-[#ba1a1a] border border-rose-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold leading-snug text-[#121c2a]">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1 font-mono">
                    <IconClock className="w-3.5 h-3.5" />
                    <span>Due: {item.due_date}</span>
                  </p>
                </div>

                {/* Grade & Instructor Feedback Section */}
                {item.status === "graded" && (
                  <div className="p-3 bg-[#f8f9ff] rounded-xl border border-[#dee9fc]/70 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#3525cd]">
                        Score Awarded:
                      </span>
                      <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        {item.grade}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#464555] leading-relaxed pt-1">
                      "{item.feedback}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button Workflow */}
              <div className="pt-3 border-t border-[#dee9fc]/60">
                {item.status === "pending" ? (
                  <button
                    onClick={() => setSelectedAssignment(item)}
                    className="w-full py-2 bg-[#3525cd] hover:bg-[#2c1ea8] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    + Submit Assignment
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                      <IconCheck className="w-4 h-4" />
                      <span>
                        {item.status === "graded"
                          ? "Graded & Reviewed"
                          : "File Submitted"}
                      </span>
                    </span>
                    <button
                      onClick={() =>
                        alert(`Opening submitted document for ${item.title}`)
                      }
                      className="text-[#3525cd] hover:underline font-bold text-[11px] cursor-pointer"
                    >
                      View File
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Assignment File Upload Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl border border-[#dee9fc]">
            <div>
              <h3 className="text-sm font-bold text-[#121c2a]">
                Upload Homework Submission
              </h3>
              <p className="text-xs text-[#464555] mt-0.5 truncate">
                {selectedAssignment.title}
              </p>
            </div>

            <form
              onSubmit={handleConfirmSubmission}
              className="space-y-4 text-xs"
            >
              <div className="p-4 border-2 border-dashed border-[#dee9fc] rounded-2xl bg-[#f8f9ff] text-center space-y-2 hover:bg-[#eff4ff]/50 transition-colors">
                <IconFileText className="w-8 h-8 text-[#3525cd] mx-auto" />
                <div className="text-gray-500">
                  <label className="text-[#3525cd] font-bold hover:underline cursor-pointer">
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
                <p className="text-[10px] text-gray-400">
                  PDF, DOCX, PNG up to 10MB
                </p>
                {selectedFileName && (
                  <p className="text-[11px] font-bold text-emerald-700 bg-white py-1 px-2 rounded-lg border border-emerald-200 truncate">
                    Selected: {selectedFileName}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#dee9fc]/60">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAssignment(null);
                    setSelectedFileName("");
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-[#464555] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFileName || isSubmitting}
                  className="px-5 py-2 bg-[#3525cd] hover:bg-[#2c1ea8] text-white rounded-xl font-bold disabled:opacity-50 transition-all cursor-pointer shadow-xs"
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
