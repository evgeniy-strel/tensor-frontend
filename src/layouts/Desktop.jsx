import { PanelHeader, SplitCol, Panel, Group, Cell } from "@vkontakte/vkui";
import { Link } from "react-router-dom";

const Desktop = ({
    isVKCOM,
    viewWidth,
    pages,
    activeStory,
    setActiveStory,
}) => {
    return (
        <SplitCol
            className={viewWidth.tabletPlus.className}
            fixed
            width={280}
            maxWidth={280}
        >
            <Panel>
                {isVKCOM && <PanelHeader />}
                <Group>
                    {pages.map((el) => (
                        <Link to={el.path} key={el.id}>
                            <Cell
                                disabled={activeStory === el.id}
                                style={
                                    activeStory === el.id
                                        ? {
                                              backgroundColor:
                                                  "var(--vkui--color_background_secondary)",
                                              borderRadius: 8,
                                          }
                                        : {}
                                }
                                data-story={el.id}
                                onClick={(e) =>
                                    setActiveStory(
                                        e.currentTarget.dataset.story
                                    )
                                }
                                before={el.icon}
                            >
                                {el.name}
                            </Cell>
                        </Link>
                    ))}
                </Group>
            </Panel>
        </SplitCol>
    );
};

export default Desktop;
