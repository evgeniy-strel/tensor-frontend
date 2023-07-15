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
  Icon28DoorArrowLeftOutline,
  Icon28MessageOutline,
  Icon28Profile,
  Icon28CalendarOutline,
} from "@vkontakte/icons";
import Mobile from "./layouts/Mobile";
import Desktop from "./layouts/Desktop";
import { useLocation } from "react-router-dom";
import Rout from "./components/Rout";
import useStory from "./hooks/useStory";

const pages = [
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
    path: "/profile/:username",
  },
  {
    id: "auth",
    name: "Войти",
    icon: <Icon28DoorArrowLeftOutline />,
    path: "/auth",
  },
];

function App() {
  const platform = usePlatform();
  const isVKCOM = platform !== Platform.VKCOM;
  const { viewWidth } = useAdaptivityConditionalRender();
  const location = useLocation();
  const [activeStory, setActiveStory] = useStory("/", "home", 1);
  const isNeedTabbar = !location.pathname.includes("/messenger/");

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
            viewWidth.tabletMinus &&
            isNeedTabbar && (
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
