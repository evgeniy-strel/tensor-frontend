import { Routes, Route } from "react-router-dom";
import Redirect from "./Redirect";
import Event from "../views/Event";
import Messenger from "../views/Messenger";
import Profile from "../views/Profile";
import Auth from "../views/Auth";
import Login from "../views/Auth/Login"
import ForgotPassword from "../views/Auth/ForgotPassword";
import Register from "../views/Register";

const Rout = () => {
  return (
    <Routes>
      <Route path="/*" element={<Redirect />} />
      <Route path="/event" element={<Event />} />
      <Route path="/messenger/">
        <Route path="" element={<Messenger />} />
        <Route path=":id" element={<Messenger />} />
      </Route>
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/auth/*" element={<Auth />}>
        <Route path="" element={<Login />} />
        <Route path="forgot" element={<ForgotPassword />} />
      </Route>
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default Rout;
