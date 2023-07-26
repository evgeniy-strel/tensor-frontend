import { useState, useEffect } from "react";
import {
  SplitLayout,
  SplitCol,
  Epic,
  PanelHeader,
  Platform,
  usePlatform,
  useAdaptivityConditionalRender,
  ModalRoot,
} from "@vkontakte/vkui";
import {
  Icon28MessageOutline,
  Icon28Profile,
  Icon28CalendarOutline,
} from "@vkontakte/icons";
import Mobile from "./layouts/Mobile";
import Desktop from "./layouts/Desktop";
import { useLocation } from "react-router-dom";
import Rout from "./router/Rout";
import useStory from "./hooks/useStory";
import calculateAppHeight from "./utils/calculateAppHeight";
import { useSelector, useDispatch } from "react-redux";
import { modalBack } from "./store/reducers/modalSlice";
import SettingsModalPage from "./modals/SettingsModalPage";
import HobbiesModalPage from "./modals/HobbiesModalPage";
import EditProfile from "./modals/EditProfile";
import { fetchCategories } from "./store/reducers/categoriesSlice";

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
    path: "/profile/me",
  },
];

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const activeModal = useSelector((state) => state.modal.activeModal);
  const platform = usePlatform();
  const isVKCOM = platform !== Platform.VKCOM;
  const { viewWidth } = useAdaptivityConditionalRender();
  const location = useLocation();
  const [activeStory, setActiveStory] = useStory("/", "home", 1);

  const pathname = location.pathname;
  const isNeedTabbar =
    !pathname.includes("/messenger/") || pathname.length < 12;

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => dispatch(modalBack())}>
      <SettingsModalPage id="settings" />
      <HobbiesModalPage id="hobbies" settlingHeight={100} />
      <EditProfile id="editprofile" settlingHeight={100} />
    </ModalRoot>
  );

  useEffect(() => {
    dispatch(fetchCategories());
    calculateAppHeight();
  }, []);

  return (
    <SplitLayout
      header={isVKCOM && <PanelHeader separator={false} />}
      style={{ justifyContent: "center" }}
      modal={modal}
    >
      {viewWidth.tabletPlus && token !== "" && (
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
            isNeedTabbar &&
            token !== "" && (
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
