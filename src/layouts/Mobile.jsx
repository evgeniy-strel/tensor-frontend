import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { Link } from "react-router-dom";

const Mobile = ({ activeStory, onStoryChange, viewWidth, pages }) => {
    return (
        <Tabbar className={viewWidth.tabletMinus.className} style={{justifyContent: "space-around"}}>
            {pages.map(el => 
            <Link to={el.path} key={el.id}>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === el.id}
                data-story={el.id}
                text={el.name}
              >
                {el.icon}
              </TabbarItem>
            </Link>
            )}
        </Tabbar>
    )
}

export default Mobile;