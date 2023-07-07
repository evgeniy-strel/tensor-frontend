import React from "react";
import { 
    SplitCol,
    Epic,
} from "@vkontakte/vkui";
import Home from "../views/Home";
import About from "../views/About";
import Notifications from "../views/Notifications";
import Login from "../views/Auth/Login";
import Mobile from "../layouts/Mobile";
import Desktop from "../layouts/Desktop";


const Main = ({ isVKCOM, activeStory, onStoryChange, viewWidth, pages }) => {
    return (
        <>
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
              tabbar={viewWidth.tabletMinus && <Mobile 
                activeStory={activeStory} 
                onStoryChange={onStoryChange} 
                viewWidth={viewWidth}
                pages={pages}
              />}
            >
              <Home id="home" />
              <About id="about" />
              <Notifications id="notifications" />
              <Login id="login" />
            </Epic>
      </SplitCol>
        </>

    )
}

export default Main;