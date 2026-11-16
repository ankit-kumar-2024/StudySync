import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout & Route Guards
import AppLayout from "./components/layout/AppLayout";
import { ProtectedRoute, PublicRoute } from "./components/common/RouteGuards";

// Public Pages
import Welcome from "./pages/Welcome";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Private / Protected Pages
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import BooksPage from "./pages/BooksPage";
import TestsPage from "./pages/TestsPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfileSettingsPage";
import StudyPlannerPage from "./pages/StudyPlannerPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import VideoLessonPage from "./pages/VideoLessonPage";

export const router = createBrowserRouter([
  // 1. Completely Public Landing Route
  {
    path: "/",
    element: <Welcome />,
  },
  // 2. Guest-Only Public Routes
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  // 3. Private Protected Routes
  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "tasks",
            element: <TasksPage />,
          },
          {
            path: "planner",
            element: <StudyPlannerPage />,
          },
          {
            path: "assignments",
            element: <AssignmentsPage />,
          },
          {
            path: "books",
            element: <BooksPage />,
          },
          {
            path: "tests",
            element: <TestsPage />,
          },
          {
            path: "videos",
            element: <VideoLessonPage />,
          },
          {
            path: "chat",
            element: <ChatPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  // 4. Wildcard Catch-All Route
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);