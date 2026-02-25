import { useLocation, Navigate } from "react-router-dom";
import React, { ReactNode } from "react";

interface IProtectedRouteProps {
  children: ReactNode;
  isPublic?: boolean;
}

export const ProtectedRoute = ({
  children,
  isPublic = false,
}: IProtectedRouteProps) => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  if (!isPublic && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (token && isPublic) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
