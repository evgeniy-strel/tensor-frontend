import React from 'react';
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
import Home from "./views/Home";
import Notifications from "./views/Notifications";
import Auth from "./views/Auth";
import '@vkontakte/vkui/dist/vkui.css';
import './styles/App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const pages = [
  { id: "home", name: "Home", icon: <Icon28HomeOutline /> },
  { id: "notifications", name: "Notifications", icon: <Icon28Notifications /> },
  { id: "auth", name: "Auth", icon: <Icon28DoorArrowLeftOutline /> },
]


function App() {
  const platform = usePlatform();
  const isVKCOM = platform !== Platform.VKCOM;
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = React.useState('home');
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

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
            {/* <Home id="home" />
            <Notifications id="notifications" />
            <Auth id="auth" /> */}
            <Router>
              <Routes>
                  <Route path="/" element={<Home id="home"/>} />
                  <Route path="/notifications" element={<Notifications id="notifications"/>} />
                  <Route path="/auth" element={<Auth id="auth"/>} />
              </Routes>
            </Router>
          </Epic>
        </SplitCol>
    </SplitLayout>
  );
}

export default App;
