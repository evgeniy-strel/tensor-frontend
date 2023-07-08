import React from "react";
import { 
    PanelHeader,
    SplitCol,
    Panel,
    Group,
    Cell,
} from "@vkontakte/vkui";


const Desktop = ({ isVKCOM, activeStory, onStoryChange, viewWidth, pages }) => {
    return (
      <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
        <Panel>
          {isVKCOM && <PanelHeader />}
          <Group>
            {pages.map(el => 
              <Cell
                disabled={activeStory === el.id}
                style={
                  activeStory === el.id
                    ? {
                        backgroundColor: 'var(--vkui--color_background_secondary)',
                        borderRadius: 8,
                      }
                    : {}
                }
                data-story={el.id}
                onClick={onStoryChange}
                before={el.icon}
                key={el.id}
              >
                {el.name}
              </Cell> 
            )}
          </Group>
        </Panel>
      </SplitCol>
    );
  };
  
export default Desktop;