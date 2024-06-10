import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddService from "./pages/AddService";
import Services from "./pages/Services";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/add-service" element={<AddService />} />
      </Routes>
    </div>
  );
}

export default App;
