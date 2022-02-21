import { CssBaseline } from "@mui/material";
import AppBar from "components/AppBar/AppBar";
import Home from "pages/Home/Home";
import Shops from "pages/Shops/Shops";
import Signin from "pages/Signin/Signin";
import Signup from "pages/Signup/Signup";
import Statistics from "pages/Statistics/Statistics";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
