import RequireAuth from "components/RequireAuth/RequireAuth";
import React from "react";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
}
