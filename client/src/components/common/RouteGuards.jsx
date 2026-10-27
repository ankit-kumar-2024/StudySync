import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Guard for private / protected routes (e.g., /app/*)
export function ProtectedRoute() {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated && !token) {
    // Redirect unauthenticated visitors to login, preserving intended path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

// Guard for guest-only public routes (e.g., /login, /register)
export function PublicRoute() {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  if (isAuthenticated && token) {
    // Redirect authenticated users away from login/register to dashboard
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
