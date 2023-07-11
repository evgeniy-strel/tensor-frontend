import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Messenger from "./../views/Messenger";
import Auth from "../views/Auth";

const Rout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/messenger" element={<Messenger />} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
};

export default Rout;
