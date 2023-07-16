import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useStory = (rootPath, rootPanel, index) => {
  const location = useLocation();

  const currentStory = () => {
    return location.pathname === rootPath
      ? rootPanel
      : location.pathname.split("/")[index];
  };

  const [activeStory, setActiveStory] = useState(currentStory());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setActiveStory(currentStory()), [location.pathname]);

  return [activeStory, setActiveStory]
};

export default useStory;
