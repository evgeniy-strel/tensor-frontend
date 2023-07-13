import React, { useState, useEffect } from "react";
import {
  SplitLayout,
  SplitCol,
  Epic,
  PanelHeader,
  Platform,
  usePlatform,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import {
  Icon28HomeOutline,
  Icon28DoorArrowLeftOutline,
  Icon28MessageOutline,
  Icon28Profile,
  Icon28CalendarOutline,
  Icon28KeySquareOutline,
} from "@vkontakte/icons";
import Mobile from "./layouts/Mobile";
import Desktop from "./layouts/Desktop";
import { useLocation } from "react-router-dom";
import Rout from "./components/Rout";

const pages = [
  { id: "home", name: "Home", icon: <Icon28HomeOutline />, path: "/" },
  {
    id: "event",
    name: "События",
    icon: <Icon28CalendarOutline />,
    path: "/event",
  },
  {
    id: "messenger",
    name: "Мессенджер",
    icon: <Icon28MessageOutline />,
    path: "/messenger",
  },
  {
    id: "profile",
    name: "Профиль",
    icon: <Icon28Profile />,
    path: "/profile/:id",
  },
  {
    id: "auth",
    name: "Войти",
    icon: <Icon28DoorArrowLeftOutline />,
    path: "/auth",
  },
  {
    id: "register",
    name: "Регистрация",
    icon: <Icon28KeySquareOutline />,
    path: "/register",
  },
];

function App() {
  const platform = usePlatform();
  const isVKCOM = platform !== Platform.VKCOM;
  const { viewWidth } = useAdaptivityConditionalRender();
  const location = useLocation();
  const currentStory = () =>
    location.pathname === "/" ? "home" : location.pathname.split("/")[1];
  const [activeStory, setActiveStory] = useState(currentStory());

  useEffect(() => setActiveStory(currentStory()), [location.pathname]);

  return (
    <SplitLayout
      header={isVKCOM && <PanelHeader separator={false} />}
      style={{ justifyContent: "center" }}
    >
      {viewWidth.tabletPlus && (
        <Desktop
          isVKCOM={isVKCOM}
          viewWidth={viewWidth}
          pages={pages}
          activeStory={activeStory}
          setActiveStory={setActiveStory}
        />
      )}
      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            viewWidth.tabletMinus && (
              <Mobile
                viewWidth={viewWidth}
                pages={pages}
                activeStory={activeStory}
                setActiveStory={setActiveStory}
              />
            )
          }
        >
          <Rout id={activeStory} />
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
}

export default App;
