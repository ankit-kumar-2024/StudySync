import React from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import { ProtectedRoute, PublicRoute } from "./components/common/RouteGuards";

import Welcome from "./pages/Welcome";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import BooksPage from "./pages/BooksPage";
import TestsPage from "./pages/TestsPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfileSettingsPage";
import StudyPlannerPage from "./pages/StudyPlannerPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import VideoLessonPage from "./pages/VideoLessonPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import HelpPage from "./pages/HelpPage";

export const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "chat", element: <ChatPage /> },
          { path: "tasks", element: <TasksPage /> },
          { path: "planner", element: <StudyPlannerPage /> },
          { path: "assignments", element: <AssignmentsPage /> },
          { path: "books", element: <BooksPage /> },
          { path: "tests", element: <TestsPage /> },
          { path: "videos", element: <VideoLessonPage /> },
          { path: "analytics", element: <AnalyticsPage /> },
          { path: "help", element: <HelpPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
