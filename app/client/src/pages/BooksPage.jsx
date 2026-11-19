import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  FileText,
  PlayCircle,
  ArrowLeft,
  Download,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Sparkles,
  Check,
} from "lucide-react";
import WatchingPage from "../components/video/WatchingPage";

function HorizontalSectionRow({
  title,
  subtitle,
  icon: Icon,
  accentColor,
  children,
}) {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({
      left: direction === "left" ? -520 : 520,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-3.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accentColor}`}
          >
            <Icon className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {title}
            </h2>
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollRow("left")}
            className="p-2 rounded-xl bg-[#0F1624] hover:bg-slate-800 border border-slate-800 text-slate-300 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollRow("right")}
            className="p-2 rounded-xl bg-[#0F1624] hover:bg-slate-800 border border-slate-800 text-slate-300 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
      >
        {children}
      </div>
    </section>
  );
}

export default function BooksPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const resources = useSelector((state) => state.resources.items);

  const [view, setView] = useState("home"); // 'home' | 'pdf-reader' | 'course-watch'
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState([]);

  const matchesSearch = (item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.subject?.toLowerCase().includes(q) ||
      item.author?.toLowerCase().includes(q)
    );
  };

  const courses = resources.filter(
    (r) =>
      (r.file_type?.toLowerCase() === "course" || r.courseData) &&
      matchesSearch(r),
  );
  const pdfNotes = resources.filter(
    (r) => r.file_type?.toLowerCase() === "pdf" && matchesSearch(r),
  );
  const googleBooks = resources.filter(
    (r) => r.file_type?.toLowerCase() === "book" && matchesSearch(r),
  );

  const handleDownloadGeneratedPdf = async (item) => {
    const res = await fetch(
      `http://localhost:5000/api/resources/course/${item.id}/pdf`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.title.replace(/\s+/g, "_")}.pdf`;
      a.click();
    }
  };

  const handleOpenCourse = (course) => {
    const modules = course.courseData?.modules || [];
    const firstVid = modules.map((m) => m.video).find(Boolean) || {
      id: "Oe421EPjeBE",
      youtubeId: "Oe421EPjeBE",
      title: course.title,
      instructor: "Sync AI",
      description: course.courseData?.overview || "",
    };
    setSelectedCourse(course);
    setPlayingVideo(firstVid);
    setView("course-watch");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // VIEW A: PDF / Google Book Reader
  if (view === "pdf-reader" && selectedPdf) {
    const isSaved = savedIds.includes(selectedPdf.id);
    return (
      <div className="space-y-4 text-slate-100">
        <div className="bg-[#0F1624] border border-slate-800 rounded-2xl px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setView("home")}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Library
            </button>
            <div className="min-w-0">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300">
                {selectedPdf.file_type}
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                {selectedPdf.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleSave(selectedPdf.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                  : "bg-slate-900 border-slate-700 text-slate-200"
              }`}
            >
              {isSaved ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
              {isSaved ? "Saved" : "Save"}
            </button>

            {selectedPdf.courseData ? (
              <button
                type="button"
                onClick={() => handleDownloadGeneratedPdf(selectedPdf)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            ) : (
              selectedPdf.file_url && (
                <a
                  href={selectedPdf.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Google Book
                </a>
              )
            )}
          </div>
        </div>

        {selectedPdf.courseData ? (
          <div className="bg-[#0F1624] border border-slate-800 rounded-2xl p-6 space-y-5">
            <p className="text-xs text-slate-400">
              {selectedPdf.courseData.overview}
            </p>
            {selectedPdf.courseData.modules.map((mod, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#070A11] border border-slate-800 space-y-3"
              >
                <h2 className="text-base font-bold text-indigo-400">
                  Topic {idx + 1}: {mod.moduleTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {mod.explanation}
                </p>
                {mod.bookNotes && (
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-800 pt-3">
                    {mod.bookNotes}
                  </p>
                )}
                {mod.example && (
                  <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                    {mod.example}
                  </pre>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#0F1624] border border-slate-800 rounded-2xl p-10 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-indigo-400 mx-auto" />
            <h2 className="text-base font-bold text-white">
              {selectedPdf.title}
            </h2>
            <p className="text-xs text-slate-400">
              Author: {selectedPdf.author}
            </p>
            {selectedPdf.file_url && (
              <a
                href={selectedPdf.file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Read Reference Book <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  // VIEW B: Shared WatchingPage UI (Identical to VideoLessonPage)
  if (view === "course-watch" && selectedCourse && playingVideo) {
    const courseVideos = (selectedCourse.courseData?.modules || [])
      .map((m) => m.video)
      .filter(Boolean);
    const matchingPdfs = resources.filter(
      (r) =>
        (r.file_type?.toLowerCase() === "pdf" &&
          r.subject === selectedCourse.title) ||
        r.id === selectedCourse.id,
    );
    const matchingBooks = resources.filter(
      (r) =>
        r.file_type?.toLowerCase() === "book" &&
        r.subject === selectedCourse.title,
    );

    return (
      <WatchingPage
        video={playingVideo}
        recommendedVideos={courseVideos}
        relatedPdfs={matchingPdfs}
        relatedBooks={matchingBooks}
        savedIds={savedIds}
        onToggleSave={toggleSave}
        onSelectVideo={(vid) => setPlayingVideo(vid)}
        onBack={() => setView("home")}
        backLabel="Back to Books, PDFs & Courses"
        trackLabel={`Course Track • ${selectedCourse.title}`}
        onDownloadCustomPdf={handleDownloadGeneratedPdf}
      />
    );
  }

  // Empty State when no courses/PDFs have been created via Sync AI yet
  if (resources.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
          <BookOpen className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-white">Your Library Is Empty</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Open <strong>Sync AI Agent</strong> and select{" "}
          <strong>Complete Course</strong> or{" "}
          <strong>Assignment / Homework</strong> to generate custom courses,
          topic PDF notes, and Google Books.
        </p>
        <button
          type="button"
          onClick={() => navigate("/app/chat")}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" /> Create Content with Sync AI
        </button>
      </div>
    );
  }

  // VIEW C: Single-Row Shelves for Sync AI Courses, PDF Notes & Google Books
  return (
    <div className="space-y-8 text-slate-100 pb-12">
      <div className="bg-[#0F1624] border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Sync AI Generated Vault
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Books, PDF Notes & Video Courses
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Open any generated PDF book directly or launch a video course
            workspace.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter courses, PDFs, or books..."
            className="w-full h-10 pl-10 pr-4 bg-[#070A11] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {courses.length > 0 && (
        <HorizontalSectionRow
          title="Courses • Complete Video + PDF + Test Tracks"
          subtitle="Click any course to open the unified video & PDF watch workspace"
          icon={PlayCircle}
          accentColor="bg-cyan-500/15 text-cyan-400"
        >
          {courses.map((course) => {
            const firstThumb =
              course.courseData?.modules?.find((m) => m.video)?.video
                ?.thumbnail ||
              "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg";
            return (
              <div
                key={course.id}
                onClick={() => handleOpenCourse(course)}
                className="group w-72 sm:w-80 shrink-0 bg-[#0F1624] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col"
              >
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={firstThumb}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 text-[10px] font-bold uppercase">
                    Complete Course
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-cyan-300">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {course.courseData?.modules?.length || 0} Topics • Due{" "}
                    {course.timeBoundLabel || "Scheduled"}
                  </p>
                </div>
              </div>
            );
          })}
        </HorizontalSectionRow>
      )}

      {pdfNotes.length > 0 && (
        <HorizontalSectionRow
          title="PDF Files • Topic Notes & Homework Solutions"
          subtitle="Generated by Sync AI for each topic"
          icon={FileText}
          accentColor="bg-emerald-500/15 text-emerald-400"
        >
          {pdfNotes.map((pdf) => (
            <div
              key={pdf.id}
              onClick={() => {
                setSelectedPdf(pdf);
                setView("pdf-reader");
              }}
              className="group w-64 sm:w-72 shrink-0 bg-[#0F1624] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-bold uppercase">
                  {pdf.subject}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 line-clamp-2">
                  {pdf.title}
                </h3>
              </div>
              <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{pdf.size}</span>
                <span className="font-semibold text-emerald-400">
                  Open PDF →
                </span>
              </div>
            </div>
          ))}
        </HorizontalSectionRow>
      )}

      {googleBooks.length > 0 && (
        <HorizontalSectionRow
          title="Books • Google Books Reference Library"
          subtitle="Recommended reference books matched to your course topics"
          icon={BookOpen}
          accentColor="bg-indigo-500/15 text-indigo-400"
        >
          {googleBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => {
                setSelectedPdf(book);
                setView("pdf-reader");
              }}
              className="group w-64 shrink-0 bg-[#0F1624] border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 text-[10px] font-bold uppercase">
                  Google Book
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-400 truncate">{book.author}</p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-400 pt-2 border-t border-slate-800">
                Open Reference →
              </span>
            </div>
          ))}
        </HorizontalSectionRow>
      )}
    </div>
  );
}
