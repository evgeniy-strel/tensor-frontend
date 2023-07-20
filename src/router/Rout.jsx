import { Routes, Route } from "react-router-dom";
import Redirect from "./Redirect";
import Event from "../views/Event";
import Messenger from "../views/Messenger";
import Profile from "../views/Profile";
import Auth from "../views/Auth";

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
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
};

export default Rout;
