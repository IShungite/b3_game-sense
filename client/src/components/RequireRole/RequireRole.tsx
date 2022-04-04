import RequireAuth from "components/RequireAuth/RequireAuth";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import jwtDecode from "jwt-decode";
import { JwtToken, Role } from "models/auth/auth";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {
  role: Role;
};

export default function RequireRole({ role }: Props) {
  const dispatch = useAppDispatch();
  const appSelector = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // JWT check if token expired
    if (appSelector.user) {
      const decodedToken: JwtToken = jwtDecode(appSelector.user.access_token);
      if (!decodedToken.roles.includes(role) && !decodedToken.roles.includes(Role.Super_Admin)) {
        navigate(RouteUrls.Home);
      }
    }
  }, [dispatch, appSelector.user, role, navigate]);

  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
}
