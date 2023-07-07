import React from 'react';
import {
  SplitLayout,
  PanelHeader,
  Platform,
  usePlatform,
  useAdaptivityConditionalRender
} from '@vkontakte/vkui';
import { 
  Icon28HomeOutline,
  Icon28BookOutline,
  Icon28DoorArrowLeftOutline,
  Icon28Notifications
} from "@vkontakte/icons";
import Main from './components/Main';
import '@vkontakte/vkui/dist/vkui.css';
import './styles/App.css';


const pages = [
  { id: "home", name: "Home", icon: <Icon28HomeOutline /> },
  { id: "about", name: "About", icon: <Icon28BookOutline /> },
  { id: "notifications", name: "Notifications", icon: <Icon28Notifications /> },
  { id: "login", name: "Login", icon: <Icon28DoorArrowLeftOutline /> },
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
      <Main 
        isVKCOM={isVKCOM} 
        activeStory={activeStory} 
        onStoryChange={onStoryChange}
        viewWidth={viewWidth}
        pages={pages}
      />
    </SplitLayout>
  );
}

export default App;
