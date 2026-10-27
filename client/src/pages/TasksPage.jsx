import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconChecklist,
  IconClock,
  IconCheck,
} from "../components/common/Icons";
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
} from "../store/slices/tasksSlice";

export default function TasksPage() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);

  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subject: "Mathematics",
    priority: "med",
    type: "study",
    deadline: "",
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.deadline) return;

    dispatch(
      addTask({
        id: `t-${Date.now()}`,
        ...newTask,
        status: "pending",
        progress: 0,
      }),
    );
    setShowModal(false);
    setNewTask({
      title: "",
      description: "",
      subject: "Mathematics",
      priority: "med",
      type: "study",
      deadline: "",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || task.subject === subjectFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesSubject && matchesPriority && matchesStatus;
  });

  return (
    <div className="w-full space-y-6 font-['Inter',sans-serif] text-[#121c2a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Academic Task Manager
          </h1>
          <p className="text-xs text-[#464555]">
            Track, prioritize, and submit academic workloads across
            subjects[cite: 14].
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#3525cd]/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          + Create Task
        </button>
      </div>

      {/* Filter and Search Bar: Fully responsive flex wrap */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#dee9fc] shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row gap-2.5 sm:gap-3">
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20"
          />

          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-2 sm:px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs font-semibold focus:outline-none w-full sm:w-auto"
            >
              <option value="all">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2 sm:px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs font-semibold focus:outline-none w-full sm:w-auto"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="med">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 sm:px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs font-semibold focus:outline-none w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Grid: Responsive breakpoints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full p-8 sm:p-12 text-center bg-white rounded-2xl border border-[#dee9fc] text-xs text-gray-400">
            No matching tasks found.
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between shadow-xs ${
                t.status === "done"
                  ? "border-gray-200 opacity-60"
                  : "border-[#dee9fc] hover:shadow-md"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#3525cd]">
                    {t.subject}
                  </span>
                  <span
                    className={`uppercase font-bold ${
                      t.priority === "high"
                        ? "text-[#ba1a1a]"
                        : t.priority === "med"
                          ? "text-amber-600"
                          : "text-emerald-600"
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-xs sm:text-sm font-bold leading-snug ${
                      t.status === "done"
                        ? "line-through text-gray-500"
                        : "text-[#121c2a]"
                    }`}
                  >
                    {t.title}
                  </h3>
                  <p className="text-xs text-[#464555] mt-1 line-clamp-2">
                    {t.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#dee9fc]/60 space-y-3">
                <div className="flex justify-between items-center text-[11px] text-[#464555]">
                  <span className="flex items-center gap-1 font-mono text-[10px] sm:text-xs">
                    <IconClock className="w-3.5 h-3.5 shrink-0" />
                    {new Date(t.deadline).toLocaleDateString()}
                  </span>
                  <span className="font-semibold capitalize text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                    {t.type}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => dispatch(toggleTaskStatus(t.id))}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      t.status === "done"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-[#3525cd] text-white hover:bg-[#2c1ea8]"
                    }`}
                  >
                    <IconCheck className="w-3.5 h-3.5" />
                    <span>{t.status === "done" ? "Pending" : "Complete"}</span>
                  </button>
                  <button
                    onClick={() => dispatch(deleteTask(t.id))}
                    className="p-1.5 rounded-xl border border-gray-200 hover:bg-rose-50 hover:text-rose-600 text-gray-400 text-xs cursor-pointer"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Task Creation Modal: Viewport Scroll Safe */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-[#dee9fc] max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-[#121c2a]">
              Create New Academic Task
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#464555] font-semibold mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wave Optics Mock Review"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#464555] font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Chapter or problem targets..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
                    Subject
                  </label>
                  <select
                    value={newTask.subject}
                    onChange={(e) =>
                      setNewTask({ ...newTask, subject: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                  >
                    <option value="high">High</option>
                    <option value="med">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
                    Type
                  </label>
                  <select
                    value={newTask.type}
                    onChange={(e) =>
                      setNewTask({ ...newTask, type: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                  >
                    <option value="study">Study</option>
                    <option value="homework">Homework</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#464555] font-semibold mb-1">
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={newTask.deadline}
                    onChange={(e) =>
                      setNewTask({ ...newTask, deadline: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-[#464555] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#2c1ea8] text-white font-bold cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
