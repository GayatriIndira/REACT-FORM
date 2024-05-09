import React from "react";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup.js";
import Home from "./Home.js";
import ApplyLeave from "./ApplyLeave.js";
import Dashboard from "./Dashboard.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/dashboard" element={< Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;