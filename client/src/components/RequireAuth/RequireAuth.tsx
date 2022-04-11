import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import jwtDecode from "jwt-decode";
import { JwtToken } from "models/auth/auth";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "reducers/authSlice";
import authService from "services/auth.service";

export default function RequireAuth() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // JWT check if token expired
    if (user) {
      const decodedToken: JwtToken = jwtDecode(user.access_token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout(authService.logout()));
      }
    }
  }, [dispatch, user]);

  // redirect if there is no user
  if (!user) {
    return <Navigate to={RouteUrls.Login} />;
  }

  return <Outlet />;
}
