import React, { useState, useRef } from "react";
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
  Clock,
  Sparkles,
  Check,
} from "lucide-react";

// ============================================================================
// 1. STRUCTURED DATA BY CATEGORY SECTIONS (SINGLE-ROW SHELVES)
// ============================================================================

const BOOK_SECTIONS = [
  {
    sectionId: "books-cs",
    categoryTitle: "Books • Software Engineering & Architecture",
    subtitle: "Core programming & system architecture reference books",
    items: [
      {
        id: "book-1",
        type: "book",
        category: "Software Engineering",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        pages: 464,
        size: "8.4 MB",
        cover:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "book-2",
        type: "book",
        category: "System Design",
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        pages: 616,
        size: "14.2 MB",
        cover:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "book-3",
        type: "book",
        category: "Algorithms",
        title: "Introduction to Algorithms (CLRS)",
        author: "Thomas H. Cormen",
        pages: 1312,
        size: "22.1 MB",
        cover:
          "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "book-4",
        type: "book",
        category: "JavaScript",
        title: "You Don’t Know JS Yet: Scope & Closures",
        author: "Kyle Simpson",
        pages: 280,
        size: "4.6 MB",
        cover:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "book-5",
        type: "book",
        category: "Operating Systems",
        title: "Operating System Concepts (Dinosaur Book)",
        author: "Abraham Silberschatz",
        pages: 944,
        size: "18.5 MB",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
  {
    sectionId: "books-core",
    categoryTitle: "Books • Computer Science & Databases",
    subtitle: "Foundational textbooks for networking, databases, and compilers",
    items: [
      {
        id: "book-6",
        type: "book",
        category: "Networking",
        title: "Computer Networking: A Top-Down Approach",
        author: "James Kurose & Keith Ross",
        pages: 852,
        size: "16.0 MB",
        cover:
          "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "book-7",
        type: "book",
        category: "Databases",
        title: "Database System Concepts (7th Edition)",
        author: "Silberschatz, Korth & Sudarshan",
        pages: 1376,
        size: "24.3 MB",
        cover:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "book-8",
        type: "book",
        category: "AI & ML",
        title: "Hands-On Machine Learning with Scikit-Learn & PyTorch",
        author: "Aurélien Géron",
        pages: 856,
        size: "19.7 MB",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "book-9",
        type: "book",
        category: "Architecture",
        title: "Clean Architecture: A Craftsman’s Guide",
        author: "Robert C. Martin",
        pages: 432,
        size: "7.9 MB",
        cover:
          "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=450&q=80",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
];

const PDF_FILE_SECTIONS = [
  {
    sectionId: "pdfs-notes",
    categoryTitle: "PDF Files • Handwritten & Semester Revision Notes",
    subtitle: "Concise topic-wise PDFs for rapid exam & interview prep",
    items: [
      {
        id: "pdf-1",
        type: "pdf",
        category: "React & Frontend",
        title: "React Hooks, Fiber & Virtual DOM Complete Notes.pdf",
        author: "Frontend Academy",
        pages: 42,
        size: "3.1 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "pdf-2",
        type: "pdf",
        category: "DBMS & SQL",
        title: "SQL Queries, Indexing & Normalization Cheat-Sheet.pdf",
        author: "CS Core Notes",
        pages: 36,
        size: "2.8 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "pdf-3",
        type: "pdf",
        category: "Operating Systems",
        title: "OS Deadlocks, Paging & Scheduling Solved PDF.pdf",
        author: "GATE Prep Series",
        pages: 58,
        size: "4.9 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "pdf-4",
        type: "pdf",
        category: "System Design",
        title: "Caching, Load Balancers & Rate Limiting Blueprint.pdf",
        author: "Backend Guild",
        pages: 29,
        size: "2.4 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "pdf-5",
        type: "pdf",
        category: "Computer Networks",
        title: "TCP/IP, HTTP/3, DNS & TLS Handshake Diagrams.pdf",
        author: "NetStack Notes",
        pages: 31,
        size: "3.5 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
  {
    sectionId: "pdfs-cheatsheets",
    categoryTitle: "PDF Files • Interview Question Banks & Formula Sheets",
    subtitle: "Printable quick-reference PDF documents",
    items: [
      {
        id: "pdf-6",
        type: "pdf",
        category: "DSA Patterns",
        title: "Top 75 Sliding Window & Graph Patterns Handbook.pdf",
        author: "AlgoMaster",
        pages: 64,
        size: "5.2 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "pdf-7",
        type: "pdf",
        category: "JavaScript",
        title: "JS Event Loop, Promises & Closures Q&A Bank.pdf",
        author: "JS Weekly",
        pages: 27,
        size: "1.9 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "pdf-8",
        type: "pdf",
        category: "Docker & Linux",
        title: "Linux Commands, Git & Docker Compose Reference.pdf",
        author: "DevOps Lab",
        pages: 22,
        size: "1.6 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "pdf-9",
        type: "pdf",
        category: "TypeScript",
        title: "Advanced TypeScript Generics & Utility Types.pdf",
        author: "TS Handbook",
        pages: 34,
        size: "2.7 MB",
        pdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
];

const COURSE_SECTIONS = [
  {
    sectionId: "courses-web",
    categoryTitle: "Courses • Web & Full-Stack Engineering",
    subtitle:
      "Video courses paired with recommended videos, PDF files, and books",
    items: [
      {
        id: "course-1",
        type: "course",
        category: "Frontend Architecture",
        title: "React & Modern Frontend Architecture Complete Course",
        instructor: "Ananya Sharma",
        duration: "1h 20m",
        views: "2.4M views",
        youtubeId: "SqcY0GlETPk",
        thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg",
        description:
          "Learn component architecture, state colocation, custom hooks, and scalable UI engineering with hands-on examples.",
        recommendedVideos: [
          {
            id: "rec-v1",
            title: "All 10 React Hooks Explained with Practical Examples",
            instructor: "Fireship",
            duration: "12:52",
            views: "1.8M views",
            youtubeId: "TNhaISOUy6Q",
            thumbnail: "https://i.ytimg.com/vi/TNhaISOUy6Q/hqdefault.jpg",
            description:
              "Fast-paced walkthrough of essential React hooks and custom hook patterns.",
          },
          {
            id: "rec-v2",
            title: "React Course - Beginner to Advanced Architecture",
            instructor: "freeCodeCamp.org",
            duration: "11:55:27",
            views: "4.1M views",
            youtubeId: "bMknfKXIFA8",
            thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg",
            description:
              "Deep dive into React rendering, context API, and production folder structures.",
          },
          {
            id: "rec-v3",
            title: "What the heck is the JavaScript Event Loop anyway?",
            instructor: "JSConf",
            duration: "26:52",
            views: "3.9M views",
            youtubeId: "8aGhZQkoFbQ",
            thumbnail: "https://i.ytimg.com/vi/8aGhZQkoFbQ/hqdefault.jpg",
            description:
              "Understand call stack, microtasks, and browser rendering under the hood.",
          },
        ],
        relatedPdfs: [
          PDF_FILE_SECTIONS[0].items[0],
          PDF_FILE_SECTIONS[1].items[1],
          PDF_FILE_SECTIONS[1].items[3],
        ],
        relatedBooks: [BOOK_SECTIONS[0].items[0], BOOK_SECTIONS[0].items[3]],
      },
      {
        id: "course-2",
        type: "course",
        category: "Backend & APIs",
        title: "Node.js, Express & Scalable REST API Engineering",
        instructor: "Vikramaditya Rao",
        duration: "8h 16m",
        views: "2.7M views",
        youtubeId: "Oe421EPjeBE",
        thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg",
        description:
          "Build production-ready backend services, authentication middleware, database connections, and error pipelines.",
        recommendedVideos: [
          {
            id: "rec-v4",
            title: "Full Stack MERN Application – Complete Build",
            instructor: "freeCodeCamp.org",
            duration: "1:45:10",
            views: "1.3M views",
            youtubeId: "7CqJlxBYj-M",
            thumbnail: "https://i.ytimg.com/vi/7CqJlxBYj-M/hqdefault.jpg",
            description: "End-to-end backend and frontend integration project.",
          },
          {
            id: "rec-v5",
            title: "Node.js Ultimate Beginner to Pro Guide",
            instructor: "Dave Gray",
            duration: "6:58:12",
            views: "640K views",
            youtubeId: "f2EqECiTBL8",
            thumbnail: "https://i.ytimg.com/vi/f2EqECiTBL8/hqdefault.jpg",
            description:
              "Streams, file system, event emitters, and REST architecture.",
          },
        ],
        relatedPdfs: [
          PDF_FILE_SECTIONS[0].items[1],
          PDF_FILE_SECTIONS[0].items[3],
          PDF_FILE_SECTIONS[1].items[2],
        ],
        relatedBooks: [BOOK_SECTIONS[0].items[1], BOOK_SECTIONS[1].items[1]],
      },
      {
        id: "course-3",
        type: "course",
        category: "JavaScript Mastery",
        title: "Modern JavaScript ES6+ & Asynchronous Programming",
        instructor: "Rohan Kulkarni",
        duration: "48:17",
        views: "11.4M views",
        youtubeId: "W6NZfCO5SIk",
        thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
        description:
          "Master closures, prototypes, promises, async/await, and clean functional JavaScript patterns.",
        recommendedVideos: [
          {
            id: "rec-v6",
            title: "In The Loop - Browser Rendering & Microtasks",
            instructor: "JSConf",
            duration: "35:10",
            views: "920K views",
            youtubeId: "cCOL7MC4Pl0",
            thumbnail: "https://i.ytimg.com/vi/cCOL7MC4Pl0/hqdefault.jpg",
            description:
              "Detailed look at browser frame scheduling and task queues.",
          },
        ],
        relatedPdfs: [
          PDF_FILE_SECTIONS[1].items[1],
          PDF_FILE_SECTIONS[0].items[0],
        ],
        relatedBooks: [BOOK_SECTIONS[0].items[3], BOOK_SECTIONS[0].items[0]],
      },
      {
        id: "course-4",
        type: "course",
        category: "Full-Stack Bootcamp",
        title: "Complete Frontend & Responsive UI Bootcamp",
        instructor: "Neha Verma",
        duration: "21:14:00",
        views: "3.1M views",
        youtubeId: "zJSY8tbf_ys",
        thumbnail: "https://i.ytimg.com/vi/zJSY8tbf_ys/hqdefault.jpg",
        description:
          "From semantic HTML and modern CSS layouts to interactive JavaScript applications.",
        recommendedVideos: [
          {
            id: "rec-v7",
            title: "React Tutorial for Beginners - Full Course",
            instructor: "Programming with Mosh",
            duration: "1:20:14",
            views: "2.4M views",
            youtubeId: "SqcY0GlETPk",
            thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg",
            description: "Next step after mastering core HTML, CSS, and JS.",
          },
        ],
        relatedPdfs: [
          PDF_FILE_SECTIONS[0].items[0],
          PDF_FILE_SECTIONS[1].items[3],
        ],
        relatedBooks: [BOOK_SECTIONS[0].items[3]],
      },
    ],
  },
  {
    sectionId: "courses-cs",
    categoryTitle: "Courses • Algorithms, Python & Core CS",
    subtitle: "Problem-solving and computer science fundamentals",
    items: [
      {
        id: "course-5",
        type: "course",
        category: "Algorithms & DSA",
        title: "JavaScript & Python Algorithms and Data Structures",
        instructor: "Meera Krishnan",
        duration: "3:26:42",
        views: "5.2M views",
        youtubeId: "PkZNo7MFNFg",
        thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg",
        description:
          "Master arrays, hash maps, trees, graphs, recursion, and dynamic programming for technical interviews.",
        recommendedVideos: [
          {
            id: "rec-v8",
            title: "Learn Python - Full Course for Beginners",
            instructor: "freeCodeCamp.org",
            duration: "4:26:52",
            views: "42M views",
            youtubeId: "rfscVS0vtbw",
            thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/hqdefault.jpg",
            description:
              "Complete Python foundation for algorithms and backend scripting.",
          },
        ],
        relatedPdfs: [
          PDF_FILE_SECTIONS[1].items[0],
          PDF_FILE_SECTIONS[0].items[2],
        ],
        relatedBooks: [BOOK_SECTIONS[0].items[2], BOOK_SECTIONS[1].items[2]],
      },
      {
        id: "course-6",
        type: "course",
        category: "Python & AI",
        title: "Python Programming & Data Foundations Masterclass",
        instructor: "Siddharth Malhotra",
        duration: "4:26:52",
        views: "42M views",
        youtubeId: "rfscVS0vtbw",
        thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/hqdefault.jpg",
        description:
          "Comprehensive Python programming covering OOP, data structures, file I/O, and clean coding practices.",
        recommendedVideos: [
          {
            id: "rec-v9",
            title: "Algorithms & Data Structures Masterclass",
            instructor: "freeCodeCamp.org",
            duration: "3:26:42",
            views: "5.2M views",
            youtubeId: "PkZNo7MFNFg",
            thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg",
            description: "Apply Python skills to algorithmic problem solving.",
          },
        ],
        relatedPdfs: [PDF_FILE_SECTIONS[1].items[0]],
        relatedBooks: [BOOK_SECTIONS[1].items[2], BOOK_SECTIONS[0].items[2]],
      },
      {
        id: "course-7",
        type: "course",
        category: "Systems & Runtime",
        title: "Browser Internals, Event Loop & Asynchronous Runtimes",
        instructor: "Philip Roberts",
        duration: "26:52",
        views: "3.9M views",
        youtubeId: "8aGhZQkoFbQ",
        thumbnail: "https://i.ytimg.com/vi/8aGhZQkoFbQ/hqdefault.jpg",
        description:
          "Deep visual breakdown of how runtimes execute non-blocking asynchronous code.",
        recommendedVideos: [
          {
            id: "rec-v10",
            title: "In The Loop - Browser Rendering & Microtasks",
            instructor: "JSConf",
            duration: "35:10",
            views: "920K views",
            youtubeId: "cCOL7MC4Pl0",
            thumbnail: "https://i.ytimg.com/vi/cCOL7MC4Pl0/hqdefault.jpg",
            description:
              "Companion talk on rendering frames and task prioritization.",
          },
        ],
        relatedPdfs: [
          PDF_FILE_SECTIONS[0].items[2],
          PDF_FILE_SECTIONS[1].items[1],
        ],
        relatedBooks: [BOOK_SECTIONS[0].items[4], BOOK_SECTIONS[1].items[0]],
      },
    ],
  },
];

// ============================================================================
// 2. REUSABLE SINGLE-ROW HORIZONTAL SHELF COMPONENT
// ============================================================================
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
    const distance = direction === "left" ? -520 : 520;
    rowRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="space-y-3.5">
      {/* Section Header + Left/Right Scroll Arrows */}
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

        {/* Row Scroll Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scrollRow("left")}
            className="p-2 rounded-xl bg-[#121824] hover:bg-slate-800 border border-slate-800 text-slate-300 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollRow("right")}
            className="p-2 rounded-xl bg-[#121824] hover:bg-slate-800 border border-slate-800 text-slate-300 transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Single Horizontal Row */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
      >
        {children}
      </div>
    </section>
  );
}

// ============================================================================
// 3. MAIN PAGE COMPONENT
// ============================================================================
export default function BooksPage() {
  // Active View: 'home' | 'pdf-reader' | 'course-watch'
  const [view, setView] = useState("home");
  const [returnView, setReturnView] = useState("home");

  // Selected PDF (Book or PDF File)
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Selected Course + Active Playing Video inside Course View
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  // Search & Saved State
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState([]);

  // --- Handlers ---
  const handleOpenPdf = (item, from = "home") => {
    setSelectedPdf(item);
    setReturnView(from);
    setView("pdf-reader");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
    setPlayingVideo({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      duration: course.duration,
      views: course.views,
      youtubeId: course.youtubeId,
      description: course.description,
    });
    setView("course-watch");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // Filter helper for search
  const matchesSearch = (item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.author || item.instructor || "").toLowerCase().includes(q)
    );
  };

  // ==========================================================================
  // VIEW A: PDF VIEWER (WHEN USER CLICKS ANY BOOK OR ANY PDF FILE)
  // ==========================================================================
  if (view === "pdf-reader" && selectedPdf) {
    const isBook = selectedPdf.type === "book";
    const isSaved = savedIds.includes(selectedPdf.id);

    return (
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col">
        {/* Top PDF Reader Bar */}
        <header className="sticky top-0 z-40 bg-[#121824] border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setView(returnView)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              {returnView === "course-watch"
                ? "Back to Course Video"
                : "Back to Library"}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    isBook
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {isBook ? "Book PDF" : "PDF Document"}
                </span>
                <span className="text-xs text-slate-400 truncate">
                  {selectedPdf.category} • {selectedPdf.pages} Pages •{" "}
                  {selectedPdf.size}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                {selectedPdf.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSave(selectedPdf.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                isSaved
                  ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                  : "bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600"
              }`}
            >
              {isSaved ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
              {isSaved ? "Saved" : "Save"}
            </button>

            <a
              href={selectedPdf.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
          </div>
        </header>

        {/* Embedded PDF Viewport */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-400 bg-[#121824] border border-slate-800 px-4 py-2.5 rounded-xl">
            <span>
              Author / Source:{" "}
              <strong className="text-slate-200">{selectedPdf.author}</strong>
            </span>
            <a
              href={selectedPdf.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
            >
              Open in full tab <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <iframe
              src={`${selectedPdf.pdfUrl}#toolbar=1`}
              title={selectedPdf.title}
              className="w-full h-[78vh]"
            />
          </div>
        </main>
      </div>
    );
  }

  // ==========================================================================
  // VIEW B: VIDEO COURSE PLAYER UI (VIDEO + RECOMMENDED VIDEOS + PDF FILES + BOOKS)
  // ==========================================================================
  if (view === "course-watch" && selectedCourse && playingVideo) {
    // Combine main course video + recommended videos so user can switch between them
    const allCourseVideos = [
      {
        id: selectedCourse.id,
        title: selectedCourse.title,
        instructor: selectedCourse.instructor,
        duration: selectedCourse.duration,
        views: selectedCourse.views,
        youtubeId: selectedCourse.youtubeId,
        thumbnail: selectedCourse.thumbnail,
        description: selectedCourse.description,
      },
      ...selectedCourse.recommendedVideos,
    ];

    return (
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 pb-16">
        {/* Top Course Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#121824]/95 backdrop-blur border-b border-slate-800 px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={() => setView("home")}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Books, PDFs & Courses
            </button>

            <span className="text-xs font-semibold text-cyan-400 hidden sm:inline">
              Course Track • {selectedCourse.category}
            </span>
          </div>
        </header>

        {/* Main Watch Layout: Left Player + Right Recommended Videos, PDF Files & Books */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT 7 COLUMNS: ACTIVE VIDEO PLAYER + DETAILS */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${playingVideo.youtubeId}?autoplay=1&rel=0`}
                title={playingVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400 font-semibold">
                <span>{selectedCourse.category}</span>
                <span>•</span>
                <span>{playingVideo.duration}</span>
                <span>•</span>
                <span>{playingVideo.views}</span>
              </div>

              <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {playingVideo.title}
              </h1>

              <p className="text-xs text-slate-400">
                Instructor:{" "}
                <strong className="text-slate-200">
                  {playingVideo.instructor}
                </strong>
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                {playingVideo.description}
              </p>
            </div>

            {/* Related Reference Books Row inside Course View */}
            <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white">
                  Related Reference Books ({selectedCourse.relatedBooks.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCourse.relatedBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleOpenPdf(book, "course-watch")}
                    className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition"
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase text-indigo-400">
                        Book PDF • {book.pages} pgs
                      </span>
                      <h3 className="text-xs font-semibold text-white group-hover:text-indigo-300 line-clamp-2 leading-snug mt-0.5">
                        {book.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: RECOMMENDED VIDEOS + RELATED PDF FILES */}
          <aside className="lg:col-span-5 space-y-5">
            {/* 1. Recommended Videos Section */}
            <div className="bg-[#121824] border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-sm font-bold text-white">
                    Recommended Course Videos
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400">
                  {allCourseVideos.length} videos
                </span>
              </div>

              <div className="space-y-2.5">
                {allCourseVideos.map((vid) => {
                  const isCurrent = vid.youtubeId === playingVideo.youtubeId;
                  return (
                    <div
                      key={vid.id}
                      onClick={() => setPlayingVideo(vid)}
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
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono">
                          {vid.duration}
                        </span>
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
                          {vid.instructor}
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

            {/* 2. Related PDF Files Section */}
            <div className="bg-[#121824] border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white">
                    Related PDF Files & Notes (
                    {selectedCourse.relatedPdfs.length})
                  </h2>
                </div>
                <span className="text-[11px] text-slate-400">
                  Click to open
                </span>
              </div>

              <div className="space-y-2">
                {selectedCourse.relatedPdfs.map((pdf) => (
                  <div
                    key={pdf.id}
                    onClick={() => handleOpenPdf(pdf, "course-watch")}
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
                          {pdf.category} • {pdf.pages} pages • {pdf.size}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>
    );
  }

  // ==========================================================================
  // VIEW C: MAIN PAGE (SINGLE-ROW CATEGORY SECTIONS FOR BOOKS, PDFS & COURSES)
  // ==========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 pb-20">
      {/* Top Search Header */}
      <header className="bg-gradient-to-b from-[#131B2E] to-[#0B0F17] border-b border-slate-800/80 px-4 sm:px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Categorized Learning Shelves
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Books, PDF Files & Video Courses
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Browse single-row category shelves—open any Book or PDF directly,
              or launch a Video Course workspace.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter books, PDF files, or courses..."
              className="w-full h-11 pl-10 pr-4 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>
      </header>

      {/* Single-Row Category Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-11">
        {/* -------------------- 1. BOOKS SECTIONS (BY CATEGORY, SINGLE ROW) -------------------- */}
        {BOOK_SECTIONS.map((section) => {
          const filtered = section.items.filter(matchesSearch);
          if (filtered.length === 0) return null;

          return (
            <HorizontalSectionRow
              key={section.sectionId}
              title={section.categoryTitle}
              subtitle={section.subtitle}
              icon={BookOpen}
              accentColor="bg-indigo-500/15 text-indigo-400"
            >
              {filtered.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleOpenPdf(book, "home")}
                  className="group w-60 sm:w-64 shrink-0 bg-[#121824] border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col"
                >
                  <div className="relative h-40 bg-slate-900 overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-bold uppercase text-white">
                      Book PDF
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-200">
                      {book.pages} pgs
                    </span>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-indigo-400">
                        {book.category}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-2 group-hover:text-indigo-300 transition leading-snug">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 truncate">
                        {book.author}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{book.size}</span>
                      <span className="font-semibold text-indigo-400">
                        Open PDF →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </HorizontalSectionRow>
          );
        })}

        {/* -------------------- 2. PDF FILES SECTIONS (BY CATEGORY, SINGLE ROW) -------------------- */}
        {PDF_FILE_SECTIONS.map((section) => {
          const filtered = section.items.filter(matchesSearch);
          if (filtered.length === 0) return null;

          return (
            <HorizontalSectionRow
              key={section.sectionId}
              title={section.categoryTitle}
              subtitle={section.subtitle}
              icon={FileText}
              accentColor="bg-emerald-500/15 text-emerald-400"
            >
              {filtered.map((pdf) => (
                <div
                  key={pdf.id}
                  onClick={() => handleOpenPdf(pdf, "home")}
                  className="group w-64 sm:w-72 shrink-0 bg-[#121824] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-bold uppercase">
                        {pdf.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {pdf.pages} pgs
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition line-clamp-2 leading-snug">
                        {pdf.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate">
                      {pdf.author} • {pdf.size}
                    </span>
                    <span className="font-semibold text-emerald-400 shrink-0 ml-2">
                      View PDF →
                    </span>
                  </div>
                </div>
              ))}
            </HorizontalSectionRow>
          );
        })}

        {/* -------------------- 3. COURSES SECTIONS (MULTIPLE CATEGORY ROWS) -------------------- */}
        {COURSE_SECTIONS.map((section) => {
          const filtered = section.items.filter(matchesSearch);
          if (filtered.length === 0) return null;

          return (
            <HorizontalSectionRow
              key={section.sectionId}
              title={section.categoryTitle}
              subtitle={section.subtitle}
              icon={PlayCircle}
              accentColor="bg-cyan-500/15 text-cyan-400"
            >
              {filtered.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleOpenCourse(course)}
                  className="group w-72 sm:w-80 shrink-0 bg-[#121824] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col"
                >
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                        <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 text-[10px] font-bold uppercase">
                      Video Course
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/85 text-[11px] font-mono text-white">
                      {course.duration}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-cyan-400">
                        {course.category}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-2 group-hover:text-cyan-300 transition leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {course.instructor}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />{" "}
                        {course.views}
                      </span>
                      <span className="text-cyan-300 font-semibold">
                        Watch + PDFs & Books →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </HorizontalSectionRow>
          );
        })}
      </main>
    </div>
  );
}
