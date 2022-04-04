import { CssBaseline } from "@mui/material";
import AppBar from "components/AppBar/AppBar";
import MainLayout from "components/MainLayout/MainLayout";
import RequireAuth from "components/RequireAuth/RequireAuth";
import { RouteUrls } from "config";
import CreateCharacter from "pages/CreateCharacter/CreateCharacter";
import CreateSchool from "pages/CreateSchool/CreateSchool";
import Home from "pages/Home/Home";
import Index from "pages/Index/Index";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import SelectCharacter from "pages/SelectCharacter/selectCharacter";
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

            <Route element={<RequireAuth />}>
              <Route path={RouteUrls.SelectCharacter} element={<SelectCharacter />} />
              <Route path={RouteUrls.CreateCharacter} element={<CreateCharacter />} />

              <Route path={RouteUrls.Home} element={<Home />} />
              <Route path={RouteUrls.Shops} element={<Shops />} />
              <Route path={RouteUrls.Statistics} element={<Statistics />} />

              <Route path={RouteUrls.CreateSchool} element={<CreateSchool />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
