import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Notifications from "../views/Notifications";
import Auth from "../views/Auth";

const Rout = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/notifications" element={<Notifications />}/>
            <Route path="/auth/*" element={<Auth />}/>
        </Routes>    
    )
}

export default Rout;