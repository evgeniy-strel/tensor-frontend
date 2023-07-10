import React, { useState, useEffect } from 'react';
import {
  SplitLayout,
  SplitCol,
  Epic,
  PanelHeader,
  Platform,
  usePlatform,
  useAdaptivityConditionalRender
} from '@vkontakte/vkui';
import { 
  Icon28HomeOutline,
  Icon28DoorArrowLeftOutline,
  Icon28Notifications
} from "@vkontakte/icons";
import Mobile from "./layouts/Mobile";
import Desktop from "./layouts/Desktop";
import { useLocation } from 'react-router-dom';
import Rout from './components/Rout';
import '@vkontakte/vkui/dist/vkui.css';

const pages = [
  { id: "home", name: "Home", icon: <Icon28HomeOutline />, path: "/" },
  { id: "notifications", name: "Notifications", icon: <Icon28Notifications />, path: "/notifications" },
  { id: "auth", name: "Auth", icon: <Icon28DoorArrowLeftOutline />, path: "/auth" },
]

function App() {
  const platform = usePlatform();
  const isVKCOM = platform !== Platform.VKCOM;
  const { viewWidth } = useAdaptivityConditionalRender();
  const location = useLocation();
  const currentStory = () => location.pathname === "/" ? "home" : location.pathname.split("/")[1];
  const [activeStory, setActiveStory] = useState(currentStory());
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

  useEffect(() => setActiveStory(currentStory()), [location.pathname])

  return (
    <SplitLayout
      header={isVKCOM && <PanelHeader separator={false} />}
      style={{ justifyContent: 'center' }}
    >
      {viewWidth.tabletPlus && 
        <Desktop 
          isVKCOM={isVKCOM} 
          activeStory={activeStory} 
          onStoryChange={onStoryChange}
          viewWidth={viewWidth}
          pages={pages}
        />
      }
        <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
          <Epic
            activeStory={activeStory}
            tabbar={viewWidth.tabletMinus && 
              <Mobile 
                activeStory={activeStory} 
                onStoryChange={onStoryChange} 
                viewWidth={viewWidth}
                pages={pages}
              />
            }
          >
            <Rout id={activeStory}/>
          </Epic>
        </SplitCol>
    </SplitLayout>
  );
}

export default App;
