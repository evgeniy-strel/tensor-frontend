import { Routes, Route } from "react-router-dom";
import Redirect from "./Redirect";
import Event from "../views/Event";
import Messenger from "../views/Messenger";
import Profile from "../views/Profile";
import Auth from "../views/Auth";
import { useSelector } from "react-redux";

const Rout = () => {
  const token = useSelector((state) => state.user.token);

  return (
    <Routes>
      <Route path="/*" element={<Redirect />} />
      {token !== "" ? (
        <>
          <Route path="/event" element={<Event />} />
          <Route path="/messenger/">
            <Route path="" element={<Messenger />} />
            <Route path="chat/:id" element={<Messenger />} />
            <Route path="subchats/:id" element={<Messenger />} />
            <Route path="description/:id" element={<Messenger />} />
            <Route path="create_chat" element={<Messenger />} />
          </Route>
          <Route path="/profile/:username" element={<Profile />} />{" "}
        </>
      ) : (
        <Route path="/auth/*" element={<Auth />} />
      )}
    </Routes>
  );
};

export default Rout;
