import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
