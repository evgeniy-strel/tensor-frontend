import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import About from "../views/About";
import Notifications from "../views/Notifications";
import Login from "../views/Login";


const Rout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default Rout;