import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Footer from "./Footer";
import { setTasks } from "../../store/slices/tasksSlice";
import { setAssignments } from "../../store/slices/assignmentsSlice";
import { setTestHistory } from "../../store/slices/testsSlice";
import { setResources } from "../../store/slices/resourcesSlice";
import { setFullSchedule } from "../../store/slices/plannerSlice";

export default function AppLayout() {
  const [leftOpen, setLeftOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/workspace", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.tasks) dispatch(setTasks(data.tasks));
        if (data.assignments) dispatch(setAssignments(data.assignments));
        if (data.history) dispatch(setTestHistory(data.history));
        if (data.resources) dispatch(setResources(data.resources));
        if (data.days) dispatch(setFullSchedule(data.days));
      })
      .catch(() => {});
  }, [token, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setLeftOpen(true);
      } else {
        setLeftOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) setLeftOpen(false);
  }, [location.pathname]);

  return (
    <div className="bg-[#070A11] text-slate-100 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white relative">
      {/* Subtle ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[38rem] h-[38rem] rounded-full bg-indigo-600/[0.06] blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-[30rem] h-[30rem] rounded-full bg-cyan-500/[0.05] blur-[110px]" />
      </div>

      <Header onToggleSidebar={() => setLeftOpen(!leftOpen)} />

      {leftOpen && (
        <div
          onClick={() => setLeftOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <LeftSidebar isOpen={leftOpen} onClose={() => setLeftOpen(false)} />

      <div
        className={`relative z-10 flex-1 transition-all duration-300 ease-out ${
          leftOpen ? "lg:pl-64" : "pl-0"
        }`}
      >
        <main className="pt-16 min-h-screen flex flex-col justify-between">
          <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-w-0">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
