import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => true ? navigate("/event") : navigate("/auth"));

  return;
};

export default Redirect;
