import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconBook,
  IconSparkle,
  IconCheck,
} from "../components/common/Icons";
import { addResource, setResourceFilter } from "../store/slices/resourcesSlice";

export default function BooksPage() {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.resources.items);
  const selectedFilter = useSelector((state) => state.resources.selectedFilter);

  const [previewItem, setPreviewItem] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [newDoc, setNewDoc] = useState({
    title: "",
    file_type: "PYQ",
    subject: "Mathematics",
    size: "3.5 MB",
  });

  const filteredItems = resources.filter((r) => {
    if (selectedFilter === "all") return true;
    return r.file_type.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newDoc.title) return;
    dispatch(
      addResource({
        id: `r-${Date.now()}`,
        ...newDoc,
        exam_year: 2024,
      })
    );
    setShowUploadModal(false);
    setNewDoc({ title: "", file_type: "PYQ", subject: "Mathematics", size: "3.5 MB" });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-['Inter',sans-serif] text-[#121c2a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resource & PYQ Library</h1>
          <p className="text-xs text-[#464555]">
            Access textbooks, previous year questions, and curated chapter notes.
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#3525cd]/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          + Upload Document
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#dee9fc] pb-3 text-xs">
        {["all", "pyq", "book", "notes"].map((filter) => (
          <button
            key={filter}
            onClick={() => dispatch(setResourceFilter(filter))}
            className={`px-3.5 py-1.5 rounded-xl font-bold capitalize transition-all cursor-pointer ${
              selectedFilter === filter
                ? "bg-[#3525cd] text-white shadow-xs"
                : "bg-white text-[#464555] hover:bg-[#dee9fc]/50 border border-[#dee9fc]"
            }`}
          >
            {filter === "all" ? "All Resources" : filter}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-2xl border border-[#dee9fc] shadow-xs flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#3525cd] text-[10px] font-bold">
                {item.file_type}
              </span>
              <h3 className="text-xs font-bold leading-snug">{item.title}</h3>
              <p className="text-[10px] text-gray-500">
                {item.subject} • {item.size} {item.exam_year ? `• Year ${item.exam_year}` : ""}
              </p>
            </div>
            <button
              onClick={() => setPreviewItem(item)}
              className="text-xs font-bold text-[#3525cd] hover:underline self-start cursor-pointer"
            >
              Preview Document
            </button>
          </div>
        ))}
      </div>

      {/* Document In-App Preview Modal (Section 5.2 - PDF preview) */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl border border-[#dee9fc]">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#121c2a]">{previewItem.title}</h3>
                <span className="text-[10px] text-gray-400">
                  {previewItem.subject} • Read Mode
                </span>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-gray-400 hover:text-gray-700 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[4/3] bg-[#f8f9ff] rounded-2xl border border-[#dee9fc] flex flex-col items-center justify-center p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-[#3525cd] flex items-center justify-center">
                <IconBook className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-[#121c2a]">
                Document Viewer: {previewItem.title}
              </p>
              <p className="text-[11px] text-[#464555] max-w-sm">
                Document parsed from secure Cloudinary storage with JWT authentication.
              </p>
            </div>

            <div className="flex justify-end gap-2 text-xs pt-2">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-[#dee9fc]">
            <h3 className="text-sm font-bold text-[#121c2a]">Upload Resource Material</h3>
            <form onSubmit={handleUpload} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#464555] font-semibold mb-1">Resource Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JEE Main 2024 Math PYQ"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">Type</label>
                  <select
                    value={newDoc.file_type}
                    onChange={(e) => setNewDoc({ ...newDoc, file_type: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                  >
                    <option value="PYQ">PYQ</option>
                    <option value="Book">Book</option>
                    <option value="Notes">Notes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">Subject</label>
                  <select
                    value={newDoc.subject}
                    onChange={(e) => setNewDoc({ ...newDoc, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#3525cd] text-white font-bold rounded-xl cursor-pointer"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}