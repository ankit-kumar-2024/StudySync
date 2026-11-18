import React, { useState } from "react";
import {
  ArrowLeft,
  Eye,
  Calendar,
  BookOpen,
  Bookmark,
  Check,
  Send,
  PlayCircle,
  FileText,
  ChevronRight,
  Download,
  ExternalLink,
} from "lucide-react";

export default function WatchingPage({
  video,
  recommendedVideos = [],
  relatedPdfs = [],
  relatedBooks = [],
  savedIds = [],
  onToggleSave,
  onSelectVideo,
  onBack,
  backLabel = "Back to Library",
  trackLabel = "Course Video Track",
  onDownloadCustomPdf,
}) {
  const [descExpanded, setDescExpanded] = useState(false);
  const [activePdf, setActivePdf] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Review key examples and attempt the 50-question practice test after watching.",
    },
  ]);

  if (!video) return null;

  const embedId = video.youtubeId || video.id;
  const instructorName =
    video.channelTitle || video.instructor || "Sync AI Instructor";
  const isSaved = savedIds.includes(video.id);

  const queueVideos = [
    video,
    ...recommendedVideos.filter((v) => (v.youtubeId || v.id) !== embedId),
  ];

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    setNotes([{ id: Date.now(), text: noteInput.trim() }, ...notes]);
    setNoteInput("");
  };

  // Inline PDF Book Reader when clicking any Related Book or PDF
  if (activePdf) {
    return (
      <div className="space-y-4">
        <div className="bg-[#121824] border border-slate-800 rounded-2xl px-4 sm:px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setActivePdf(null)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Lesson Video
            </button>

            <div className="min-w-0">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300">
                {activePdf.file_type || "PDF Book"}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                {activePdf.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onDownloadCustomPdf && activePdf.courseData ? (
              <button
                onClick={() => onDownloadCustomPdf(activePdf)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download Generated PDF
              </button>
            ) : (
              <a
                href={activePdf.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open PDF
              </a>
            )}
          </div>
        </div>

        {activePdf.courseData ? (
          <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 space-y-5">
            <p className="text-xs text-slate-400">
              {activePdf.courseData.overview}
            </p>
            {activePdf.courseData.modules.map((mod, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0B0F17] border border-slate-800 space-y-3"
              >
                <h3 className="text-base font-bold text-indigo-400">
                  Topic {idx + 1}: {mod.moduleTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {mod.explanation}
                </p>
                {mod.bookNotes && (
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-800 pt-3">
                    {mod.bookNotes}
                  </p>
                )}
                <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                  {mod.example}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <iframe
              src={`${activePdf.pdfUrl}#toolbar=1`}
              title={activePdf.title}
              className="w-full h-[76vh]"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-[#121824]/95 border border-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>
        <span className="text-xs font-semibold text-cyan-400 hidden sm:inline">
          {trackLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 COLUMNS: Video Player + Metadata + Books + Scratchpad */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400 font-semibold">
                  <span>{video.category || "Sync AI Lecture"}</span>
                  {video.duration && (
                    <>
                      <span>•</span>
                      <span>{video.duration}</span>
                    </>
                  )}
                  {video.views && (
                    <>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {video.views}
                      </span>
                    </>
                  )}
                  {video.publishedAt && (
                    <>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {video.publishedAt}
                      </span>
                    </>
                  )}
                </div>

                <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {video.title}
                </h1>

                <p className="text-xs text-slate-400">
                  Instructor:{" "}
                  <strong className="text-slate-200">{instructorName}</strong>
                </p>
              </div>

              {onToggleSave && (
                <button
                  onClick={() => onToggleSave(video.id)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
                    isSaved
                      ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                      : "bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600"
                  }`}
                >
                  {isSaved ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  {isSaved ? "Saved" : "Save Lesson"}
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className={descExpanded ? "" : "line-clamp-3"}>
                {video.description ||
                  "Watch this topic lecture and review the paired PDF book and practice test."}
              </p>
              {video.description?.length > 140 && (
                <button
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="mt-1.5 text-xs text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  {descExpanded ? "Show less" : "Show full description"}
                </button>
              )}
            </div>
          </div>

          {relatedBooks.length > 0 && (
            <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white">
                  Related Reference Books ({relatedBooks.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => setActivePdf(book)}
                    className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition"
                  >
                    <img
                      src={
                        book.cover ||
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=450&q=80"
                      }
                      alt={book.title}
                      className="w-12 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase text-indigo-400">
                        Book PDF • {book.pages || 24} pgs
                      </span>
                      <h3 className="text-xs font-semibold text-white group-hover:text-indigo-300 line-clamp-2 mt-0.5">
                        {book.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {book.author || "Sync AI"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Lesson Scratchpad & Key Takeaways
            </h2>
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Write a quick takeaway while watching..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Save
              </button>
            </form>
            <div className="space-y-2">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-200"
                >
                  {n.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Recommended Videos + Topic PDF Books */}
        <aside className="lg:col-span-5 space-y-5">
          <div className="bg-[#121824] border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white">
                  Course & Recommended Videos
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">
                {queueVideos.length} videos
              </span>
            </div>

            <div className="space-y-2.5">
              {queueVideos.map((vid) => {
                const vidEmbedId = vid.youtubeId || vid.id;
                const isCurrent = vidEmbedId === embedId;
                return (
                  <div
                    key={vid.id}
                    onClick={() => {
                      setDescExpanded(false);
                      onSelectVideo(vid);
                    }}
                    className={`group flex gap-3 p-2 rounded-xl border cursor-pointer transition ${
                      isCurrent
                        ? "bg-cyan-500/10 border-cyan-500/40"
                        : "bg-slate-900/70 border-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-slate-950 shrink-0">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                      {vid.duration && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono">
                          {vid.duration}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-xs font-semibold line-clamp-2 leading-snug ${
                          isCurrent
                            ? "text-cyan-300"
                            : "text-slate-100 group-hover:text-cyan-200"
                        }`}
                      >
                        {vid.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 truncate">
                        {vid.channelTitle || vid.instructor}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {isCurrent ? "Now Playing" : vid.views}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {relatedPdfs.length > 0 && (
            <div className="bg-[#121824] border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white">
                    Topic PDF Books & Notes ({relatedPdfs.length})
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400">
                  Click to open
                </span>
              </div>

              <div className="space-y-2">
                {relatedPdfs.map((pdf) => (
                  <div
                    key={pdf.id}
                    onClick={() => setActivePdf(pdf)}
                    className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                        <FileText className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300 truncate">
                          {pdf.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {pdf.subject || pdf.category} • {pdf.pages || 18}{" "}
                          pages
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
