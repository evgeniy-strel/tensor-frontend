import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Notifications from "../views/Notifications";
import Auth from "../views/Auth";

const Rout = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Router>
    )
}

export default Rout;