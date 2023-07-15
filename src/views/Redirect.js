import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => true ? navigate("/event") : navigate("/auth"));

  return;
};

export default Redirect;
