import { Routes, Route } from "react-router-dom";
import Redirect from "./Redirect";
import Event from "../views/Event/Event";
import Messenger from "../views/Messenger";
import Profile from "../views/Profile";
import Auth from "../views/Auth";
import CreateEvent from "../views/Event/CreateEvent";
import { useSelector } from "react-redux";
import DescriptionEvent from "../views/Event/DescriptionEvent";
import EditEvent from "../views/Event/EditEvent";

const Rout = () => {
  const token = useSelector((state) => state.user.token);

  return (
    <Routes>
      <Route path="/*" element={<Redirect />} />
      {token !== "" ? (
        <>
          <Route path="/event/">
            <Route path="" element={<Event />} />
            <Route path="create" element={<CreateEvent />} />
            <Route path="edit/:id" element={<EditEvent />} />
            <Route path=":id" element={<DescriptionEvent />} />
          </Route>
          <Route path="/messenger/">
            <Route path="" element={<Messenger />} />
            <Route path="chat/:id" element={<Messenger />} />
            <Route path="subchats/:id" element={<Messenger />} />
            <Route path="join/:id" element={<Messenger />} />
            <Route path="settings/:id" element={<Messenger />} />
            <Route path="create_chat" element={<Messenger />} />
          </Route>
          <Route path="/profile/:id" element={<Profile />} />{" "}
        </>
      ) : (
        <Route path="/auth/*" element={<Auth />} />
      )}
    </Routes>
  );
};

export default Rout;
