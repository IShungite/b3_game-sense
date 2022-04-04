import { CssBaseline } from "@mui/material";
import AppBar from "components/AppBar/AppBar";
import ShopDetails from "pages/Shops/ShopDetails";
import { RouteUrls } from "config";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
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
          <Route path={RouteUrls.Home} element={<Home />} />
          <Route path={RouteUrls.Login} element={<Login />} />
          <Route path={RouteUrls.Register} element={<Register />} />
          <Route path={RouteUrls.Shops} element={<Shops />} />
          <Route path={`${RouteUrls.Shops}/:id`} element={<ShopDetails />}/>
          <Route path={RouteUrls.Statistics} element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
