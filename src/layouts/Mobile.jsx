import React from "react";
import { 
  Tabbar,
  TabbarItem 
} from "@vkontakte/vkui";


const Mob = ({ activeStory, onStoryChange, viewWidth, pages }) => {
    return (
        <Tabbar className={viewWidth.tabletMinus.className}>
            {pages.map((el, i) => 
                <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === el.id}
                data-story={el.id}
                text={el.name}
                key={el.id}
              >
                {el.icon}
              </TabbarItem>
            )}
        </Tabbar>
    )
}

export default Mob;