import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Clock, Check, Plus, Trash2, Search } from "lucide-react";
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
} from "../store/slices/tasksSlice";

export default function TasksPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
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

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.deadline) return;

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newTask, status: "pending", progress: 0 }),
    });
    const data = await res.json();
    if (res.ok && data.task) dispatch(addTask(data.task));
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

  const handleToggle = async (task) => {
    const nextStatus = task.status === "pending" ? "done" : "pending";
    const nextProgress = nextStatus === "done" ? 100 : 0;
    dispatch(toggleTaskStatus(task.id));
    await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: nextStatus, progress: nextProgress }),
    });
  };

  const handleDelete = async (id) => {
    dispatch(deleteTask(id));
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
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
    <div className="w-full space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Academic Task Manager
          </h1>
          <p className="text-xs text-slate-400">
            Track, prioritize, and complete academic workloads across subjects.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Task
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0F1624] p-4 rounded-2xl border border-slate-800 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#070A11] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#070A11] border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none"
          >
            <option value="all">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#070A11] border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="med">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#070A11] border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-[#0F1624] rounded-2xl border border-slate-800 text-xs text-slate-400">
            No matching tasks found.
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`p-5 rounded-2xl bg-[#0F1624] border transition-all flex flex-col justify-between ${
                t.status === "done"
                  ? "border-slate-800/60 opacity-60"
                  : "border-slate-800 hover:border-indigo-500/40"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {t.subject}
                  </span>
                  <span
                    className={`uppercase font-bold ${
                      t.priority === "high"
                        ? "text-rose-400"
                        : t.priority === "med"
                          ? "text-amber-400"
                          : "text-emerald-400"
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-sm font-bold leading-snug ${
                      t.status === "done"
                        ? "line-through text-slate-500"
                        : "text-white"
                    }`}
                  >
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {t.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {new Date(t.deadline).toLocaleDateString()}
                  </span>
                  <span className="font-semibold capitalize text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded text-[10px]">
                    {t.type}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggle(t)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      t.status === "done"
                        ? "bg-slate-800 text-slate-300"
                        : "bg-indigo-600 text-white hover:bg-indigo-500"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>
                      {t.status === "done" ? "Reopen" : "Mark Complete"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 hover:text-rose-400 text-slate-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1624] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-700">
            <h3 className="text-base font-bold text-white">
              Create Academic Task
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
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
                  className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Chapter or problem targets..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Subject
                  </label>
                  <select
                    value={newTask.subject}
                    onChange={(e) =>
                      setNewTask({ ...newTask, subject: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white"
                  >
                    <option value="high">High</option>
                    <option value="med">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Type
                  </label>
                  <select
                    value={newTask.type}
                    onChange={(e) =>
                      setNewTask({ ...newTask, type: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#070A11] border border-slate-700 rounded-xl text-white"
                  >
                    <option value="study">Study</option>
                    <option value="homework">Homework</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={newTask.deadline}
                    onChange={(e) =>
                      setNewTask({ ...newTask, deadline: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#070A11] border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
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
