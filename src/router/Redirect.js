import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => (token !== "" ? navigate("/event") : navigate("/auth")));

  return;
};

export default Redirect;
