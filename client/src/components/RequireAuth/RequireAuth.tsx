import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import jwtDecode from "jwt-decode";
import { JwtToken } from "models/auth/auth";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "reducers/authSlice";
import { clearCharacters } from "reducers/characterSlice";
import authService from "services/auth.service";

type Props = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactElement;
};

export default function RequireAuth({ children }: Props) {
  const dispatch = useAppDispatch();
  const appSelector = useAppSelector((state) => state.auth);

  useEffect(() => {
    // JWT check if token expired
    if (appSelector.user) {
      const decodedToken: JwtToken = jwtDecode(appSelector.user.access_token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(clearCharacters());
        dispatch(logout(authService.logout()));
      }
    }
  }, [dispatch, appSelector.user]);

  // redirect if there is no user
  if (!appSelector.user) {
    return <Navigate to={RouteUrls.Login} />;
  }

  return children || <Outlet />;
}
