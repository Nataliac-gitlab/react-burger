import { useAppSelector } from "../../servives/hooks";
import { UserType } from "../../common/types";
import { getUser } from "../profile-components/services/selectors";
import { useLocation, Navigate } from "react-router-dom";
import React, { ReactElement, JSX } from "react";

type ProtectedRouteProps = {
  children: ReactElement | ((user: UserType) => ReactElement);
  isPublic?: boolean;
};

export const ProtectedRoute = ({
  children,
  isPublic = false,
}: ProtectedRouteProps): JSX.Element | null => {
  const user = useAppSelector(getUser);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  if (!isPublic && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (token && isPublic) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  if (typeof children === "function") {
    return children(user!);
  }

  return children;
};
