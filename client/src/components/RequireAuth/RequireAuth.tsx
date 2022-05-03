import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import useAuth from "hooks/useAuth";
import jwtDecode from "jwt-decode";
import { JwtToken } from "models/auth/auth";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactElement;
};

export default function RequireAuth({ children }: Props) {
  const appSelector = useAppSelector((state) => state.auth);

  const { logout } = useAuth();

  useEffect(() => {
    // JWT check if token expired
    if (appSelector.user) {
      const decodedToken: JwtToken = jwtDecode(appSelector.user.access_token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [appSelector.user, logout]);

  // redirect if there is no user
  if (!appSelector.user) {
    return <Navigate to={RouteUrls.Login} />;
  }

  return children || <Outlet />;
}
