import { CssBaseline } from "@mui/material";
import AppBar from "components/AppBar/AppBar";
import MainLayout from "components/MainLayout/MainLayout";
import RequireAuth from "components/RequireAuth/RequireAuth";
import RequireRole from "components/RequireRole/RequireRole";
import { RouteUrls } from "config";
import { Role } from "models/auth/auth";
import CreateCharacter from "pages/CreateCharacter/CreateCharacter";
import CreateSchool from "pages/CreateSchool/CreateSchool";
import Home from "pages/Home/Home";
import Index from "pages/Index/Index";
import Login from "pages/Login/Login";
import Promotion from "pages/Promotion/Promotion";
import Register from "pages/Register/Register";
import School from "pages/School/School";
import SelectCharacter from "pages/SelectCharacter/selectCharacter";
import SelectSchool from "pages/SelectSchool/SelectSchool";
import Shops from "pages/Shops/Shops";
import Statistics from "pages/Statistics/Statistics";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={RouteUrls.Index} element={<Index />} />
            <Route path={RouteUrls.Login} element={<Login />} />
            <Route path={RouteUrls.Register} element={<Register />} />

            {/* Required to be logged in */}
            <Route element={<RequireAuth />}>
              <Route path={RouteUrls.SelectCharacter} element={<SelectCharacter />} />
              <Route path={RouteUrls.CreateCharacter} element={<CreateCharacter />} />

              <Route path={RouteUrls.Home} element={<Home />} />
              <Route path={RouteUrls.Shops} element={<Shops />} />
              <Route path={RouteUrls.Statistics} element={<Statistics />} />
            </Route>

            {/* Required the Director or Super_Admin role */}
            <Route element={<RequireRole role={Role.Director} />}>
              <Route path={RouteUrls.CreateSchool} element={<CreateSchool />} />
              <Route path={RouteUrls.SelectSchool} element={<SelectSchool />} />

              <Route path={RouteUrls.School} element={<School />} />
              <Route path={RouteUrls.Promotion} element={<Promotion />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
