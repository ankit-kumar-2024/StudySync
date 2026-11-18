import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  Play,
  Clock,
  Sparkles,
  Flame,
  BookOpen,
  Bookmark,
  X,
  AlertCircle,
} from "lucide-react";
import CourseVideoWatchView from "../components/video/WatchingPage";

const YT_API_KEY = import.meta.env?.VITE_YOUTUBE_API_KEY || "";

function formatDuration(iso) {
  if (!iso) return "12:40";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "12:40";
  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);
  const pad = (n) => String(n).padStart(2, "0");
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}

function formatViews(num) {
  if (!num) return "24K views";
  const n = Number(num);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K views`;
  return `${n} views`;
}

const FALLBACK_SECTIONS = {
  recommended: [
    {
      id: "SqcY0GlETPk",
      category: "React & Frontend",
      title: "React Tutorial for Beginners - Full Course with Projects",
      channelTitle: "Programming with Mosh",
      publishedAt: "2025-02-14",
      views: "2.4M views",
      duration: "1:20:14",
      description:
        "Master React fundamentals, components, state, props, and modern hooks by building real interactive UI components.",
      thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg",
    },
    {
      id: "bMknfKXIFA8",
      category: "React & Frontend",
      title: "React Course - Beginner to Advanced Architecture",
      channelTitle: "freeCodeCamp.org",
      publishedAt: "2025-05-10",
      views: "4.1M views",
      duration: "11:55:27",
      description:
        "Comprehensive curriculum covering React internals, custom hooks, context patterns, and production deployment.",
      thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg",
    },
    {
      id: "TNhaISOUy6Q",
      category: "React Hooks",
      title: "All 10 React Hooks Explained with Practical Examples",
      channelTitle: "Fireship",
      publishedAt: "2025-08-21",
      views: "1.8M views",
      duration: "12:52",
      description:
        "Fast-paced breakdown of useState, useEffect, useMemo, useCallback, useRef, and custom hook patterns.",
      thumbnail: "https://i.ytimg.com/vi/TNhaISOUy6Q/hqdefault.jpg",
    },
    {
      id: "7CqJlxBYj-M",
      category: "Full-Stack MERN",
      title: "Full Stack MERN Application – Complete Build",
      channelTitle: "freeCodeCamp.org",
      publishedAt: "2025-06-03",
      views: "1.3M views",
      duration: "1:45:10",
      description:
        "Build and connect a full REST API backend with a responsive React frontend.",
      thumbnail: "https://i.ytimg.com/vi/7CqJlxBYj-M/hqdefault.jpg",
    },
  ],
  trending: [
    {
      id: "8aGhZQkoFbQ",
      category: "JavaScript Runtime",
      title: "What the heck is the event loop anyway? | JSConf",
      channelTitle: "JSConf",
      publishedAt: "2025-01-19",
      views: "3.9M views",
      duration: "26:52",
      description:
        "Visualizing the JavaScript call stack, Web APIs, callback queue, and microtask execution.",
      thumbnail: "https://i.ytimg.com/vi/8aGhZQkoFbQ/hqdefault.jpg",
    },
    {
      id: "cCOL7MC4Pl0",
      category: "Browser Internals",
      title: "In The Loop - Browser Rendering & Microtasks",
      channelTitle: "JSConf",
      publishedAt: "2025-03-11",
      views: "920K views",
      duration: "35:10",
      description:
        "Deep dive into requestAnimationFrame, layout thrashing, and browser rendering pipelines.",
      thumbnail: "https://i.ytimg.com/vi/cCOL7MC4Pl0/hqdefault.jpg",
    },
    {
      id: "PkZNo7MFNFg",
      category: "Data Structures",
      title: "JavaScript Algorithms & Data Structures Masterclass",
      channelTitle: "freeCodeCamp.org",
      publishedAt: "2025-04-02",
      views: "5.2M views",
      duration: "3:26:42",
      description:
        "Core problem-solving patterns, Big-O notation, recursion, and tree traversal.",
      thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg",
    },
    {
      id: "Oe421EPjeBE",
      category: "Node.js APIs",
      title: "Node.js and Express.js - Complete Backend Engineering",
      channelTitle: "freeCodeCamp.org",
      publishedAt: "2025-07-18",
      views: "2.7M views",
      duration: "8:16:48",
      description:
        "Design scalable REST APIs, middleware pipelines, authentication, and database integrations.",
      thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg",
    },
  ],
  deepDives: [
    {
      id: "f2EqECiTBL8",
      category: "Node.js APIs",
      title: "Node.js Ultimate Beginner Guide in 7 Hours",
      channelTitle: "Dave Gray",
      publishedAt: "2025-09-01",
      views: "640K views",
      duration: "6:58:12",
      description:
        "Step-by-step Node.js architecture, streams, file system, and production security.",
      thumbnail: "https://i.ytimg.com/vi/f2EqECiTBL8/hqdefault.jpg",
    },
    {
      id: "zJSY8tbf_ys",
      category: "Frontend Bootcamp",
      title: "Frontend Web Development Bootcamp Course",
      channelTitle: "freeCodeCamp.org",
      publishedAt: "2025-04-25",
      views: "3.1M views",
      duration: "21:14:00",
      description:
        "HTML, CSS Grid/Flexbox, responsive UI architecture, and modern JavaScript.",
      thumbnail: "https://i.ytimg.com/vi/zJSY8tbf_ys/hqdefault.jpg",
    },
    {
      id: "W6NZfCO5SIk",
      category: "JavaScript",
      title: "JavaScript Tutorial for Beginners: Learn JS in 1 Hour",
      channelTitle: "Programming with Mosh",
      publishedAt: "2025-02-09",
      views: "11.4M views",
      duration: "48:17",
      description:
        "Crisp introduction to variables, functions, arrays, objects, and ES6 syntax.",
      thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
    },
    {
      id: "rfscVS0vtbw",
      category: "Python & AI",
      title: "Learn Python - Full Course for Beginners",
      channelTitle: "freeCodeCamp.org",
      publishedAt: "2025-03-30",
      views: "42M views",
      duration: "4:26:52",
      description:
        "Complete foundation in Python programming, OOP, file handling, and data structures.",
      thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/hqdefault.jpg",
    },
  ],
};

const QUICK_TOPICS = [
  "All Topics",
  "React & Frontend",
  "System Design",
  "Python & AI",
  "Data Structures",
  "UI/UX Design",
  "Node.js APIs",
];

export default function VideoLessonPage() {
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [orderBy, setOrderBy] = useState("relevance");
  const [durationFilter, setDurationFilter] = useState("any");

  const [sections, setSections] = useState(FALLBACK_SECTIONS);
  const [searchResults, setSearchResults] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiNotice, setApiNotice] = useState("");

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [savedIds, setSavedIds] = useState([]);

  const fetchYouTubeVideos = useCallback(
    async ({
      query,
      maxResults = 8,
      order = "relevance",
      videoDuration = "any",
    }) => {
      if (!YT_API_KEY) return null;

      const searchParams = new URLSearchParams({
        part: "snippet",
        q: query,
        type: "video",
        videoEmbeddable: "true",
        maxResults: String(maxResults),
        order,
        key: YT_API_KEY,
      });

      if (videoDuration !== "any") {
        searchParams.set("videoDuration", videoDuration);
      }

      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`,
      );
      if (!searchRes.ok) throw new Error("YouTube Search API error");
      const searchData = await searchRes.json();

      const items = searchData.items || [];
      const videoIds = items.map((item) => item.id?.videoId).filter(Boolean);
      if (videoIds.length === 0) return [];

      const detailsParams = new URLSearchParams({
        part: "contentDetails,statistics,snippet",
        id: videoIds.join(","),
        key: YT_API_KEY,
      });

      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?${detailsParams.toString()}`,
      );
      const detailsData = detailsRes.ok
        ? await detailsRes.json()
        : { items: [] };
      const detailsMap = new Map(
        (detailsData.items || []).map((v) => [v.id, v]),
      );

      return items.map((item) => {
        const vidId = item.id.videoId;
        const full = detailsMap.get(vidId);
        return {
          id: vidId,
          category: query,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt?.slice(0, 10) || "",
          description: full?.snippet?.description || item.snippet.description,
          thumbnail:
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.medium?.url,
          views: formatViews(full?.statistics?.viewCount),
          duration: formatDuration(full?.contentDetails?.duration),
        };
      });
    },
    [],
  );

  useEffect(() => {
    if (!YT_API_KEY) {
      setApiNotice(
        "Demo Mode: Add VITE_YOUTUBE_API_KEY to fetch live YouTube videos.",
      );
      return;
    }

    let cancelled = false;
    async function loadInitialSections() {
      setLoading(true);
      try {
        const [rec, trend, deep] = await Promise.all([
          fetchYouTubeVideos({
            query: "react web development tutorial",
            maxResults: 4,
          }),
          fetchYouTubeVideos({
            query: "software engineering trending 2026",
            maxResults: 4,
            order: "viewCount",
          }),
          fetchYouTubeVideos({
            query: "system design full course",
            maxResults: 4,
            videoDuration: "long",
          }),
        ]);
        if (!cancelled && rec && trend && deep) {
          setSections({ recommended: rec, trending: trend, deepDives: deep });
          setApiNotice("");
        }
      } catch {
        if (!cancelled) {
          setApiNotice(
            "Using curated fallback videos (check API key or quota).",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInitialSections();
    return () => {
      cancelled = true;
    };
  }, [fetchYouTubeVideos]);

  const runSearch = async (
    queryText,
    customOrder = orderBy,
    customDuration = durationFilter,
  ) => {
    const trimmed = queryText.trim();
    setActiveQuery(trimmed);

    if (!trimmed) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const apiResults = await fetchYouTubeVideos({
        query: trimmed,
        maxResults: 12,
        order: customOrder,
        videoDuration: customDuration,
      });

      if (apiResults) {
        setSearchResults(apiResults);
      } else {
        const allLocal = [
          ...sections.recommended,
          ...sections.trending,
          ...sections.deepDives,
        ];
        const filtered = allLocal.filter(
          (v) =>
            v.title.toLowerCase().includes(trimmed.toLowerCase()) ||
            v.channelTitle.toLowerCase().includes(trimmed.toLowerCase()),
        );
        setSearchResults(filtered.length > 0 ? filtered : allLocal.slice(0, 6));
      }
    } catch {
      setApiNotice("Search fell back to local catalog due to API error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSelectedVideo(null);
    runSearch(searchInput);
  };

  const handleTopicPillClick = (topic) => {
    setSelectedTopic(topic);
    setSelectedVideo(null);
    if (topic === "All Topics") {
      setSearchInput("");
      setActiveQuery("");
      setSearchResults([]);
    } else {
      setSearchInput(topic);
      runSearch(topic);
    }
  };

  const handleSelectVideo = async (video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fallbackPool = [
      ...sections.recommended,
      ...sections.trending,
      ...sections.deepDives,
    ].filter((v) => v.id !== video.id);

    setRelatedVideos(fallbackPool.slice(0, 6));

    if (YT_API_KEY) {
      try {
        const keyword = video.title.split(" ").slice(0, 4).join(" ");
        const liveRelated = await fetchYouTubeVideos({
          query: keyword,
          maxResults: 6,
        });
        if (liveRelated && liveRelated.length > 0) {
          setRelatedVideos(liveRelated.filter((v) => v.id !== video.id));
        }
      } catch {
        // Keep fallbackPool silently
      }
    }
  };

  const toggleSaveVideo = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const VideoCard = ({ video, badge }) => {
    const isSaved = savedIds.includes(video.id);
    return (
      <div
        onClick={() => handleSelectVideo(video)}
        className="group bg-[#121824] border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-black/20 flex flex-col"
      >
        <div className="relative aspect-video bg-slate-900 overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
            <div className="w-11 h-11 rounded-full bg-indigo-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition shadow-lg">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          </div>

          {badge && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-indigo-600/90 text-[10px] font-semibold uppercase tracking-wider text-white">
              {badge}
            </span>
          )}

          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/85 text-[11px] font-mono text-slate-100">
            {video.duration}
          </span>
        </div>

        <div className="p-3.5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 group-hover:text-indigo-300 transition leading-snug">
              {video.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 font-medium">
              {video.channelTitle}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>{video.views}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveVideo(video.id);
              }}
              className={`p-1 rounded-lg transition cursor-pointer ${
                isSaved ? "text-cyan-400 bg-cyan-500/10" : "hover:text-white"
              }`}
              title={isSaved ? "Saved" : "Save for later"}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans pb-16">
      {/* Search & Filter Header */}
      <section className="bg-gradient-to-b from-[#131B2E] to-[#0B0F17] border-b border-slate-800/80 px-4 sm:px-6 pt-6 pb-5">
        <div className="max-w-7xl mx-auto space-y-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row gap-3 items-stretch md:items-center"
          >
            <div className="relative flex-1">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search any video lesson, topic, or channel on YouTube..."
                className="w-full h-11.5 pl-11 pr-10 bg-[#0B0F17] border border-slate-700/90 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setActiveQuery("");
                    setSearchResults([]);
                    setSelectedTopic("All Topics");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#0B0F17] border border-slate-700/90 rounded-xl px-3 h-11.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={orderBy}
                  onChange={(e) => {
                    setOrderBy(e.target.value);
                    if (activeQuery)
                      runSearch(activeQuery, e.target.value, durationFilter);
                  }}
                  className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="relevance" className="bg-slate-900">
                    Sort: Relevance
                  </option>
                  <option value="viewCount" className="bg-slate-900">
                    Sort: Most Viewed
                  </option>
                  <option value="date" className="bg-slate-900">
                    Sort: Latest
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-[#0B0F17] border border-slate-700/90 rounded-xl px-3 h-11.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={durationFilter}
                  onChange={(e) => {
                    setDurationFilter(e.target.value);
                    if (activeQuery)
                      runSearch(activeQuery, orderBy, e.target.value);
                  }}
                  className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="any" className="bg-slate-900">
                    Any Length
                  </option>
                  <option value="short" className="bg-slate-900">
                    Under 4 min
                  </option>
                  <option value="medium" className="bg-slate-900">
                    4 – 20 min
                  </option>
                  <option value="long" className="bg-slate-900">
                    Over 20 min
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="h-11.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition shrink-0 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              {QUICK_TOPICS.map((topic) => {
                const active = selectedTopic === topic;
                return (
                  <button
                    key={topic}
                    onClick={() => handleTopicPillClick(topic)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                      active
                        ? "bg-indigo-500 text-white"
                        : "bg-[#121824] text-slate-300 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>

            {apiNotice && (
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
                {apiNotice}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content: Reusable Course Watch View vs Recommendation Feed */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {selectedVideo ? (
          <CourseVideoWatchView
            video={selectedVideo}
            recommendedVideos={relatedVideos}
            savedIds={savedIds}
            onToggleSave={toggleSaveVideo}
            onSelectVideo={handleSelectVideo}
            onBack={() => setSelectedVideo(null)}
            backLabel="Back to Video Recommendations"
            trackLabel={`Course Track • ${selectedVideo.category || "Video Lesson"}`}
          />
        ) : (
          <div className="space-y-10">
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-64 rounded-2xl bg-[#121824] border border-slate-800 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!loading && activeQuery && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Search Results for{" "}
                    <span className="text-indigo-400">“{activeQuery}”</span>
                  </h2>
                  <span className="text-xs text-slate-400">
                    {searchResults.length} videos found
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {searchResults.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </section>
            )}

            {!loading && !activeQuery && (
              <>
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        Recommended Lessons For You
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400">
                      Personalized picks
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {sections.recommended.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        badge="Top Pick"
                      />
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-400" />
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        Trending in Engineering & Dev
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400">
                      High engagement
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {sections.trending.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        badge="Trending"
                      />
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        Complete Masterclasses & Deep Dives
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400">
                      Long-form courses
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {sections.deepDives.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        badge="Full Course"
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
