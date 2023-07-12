import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";

const Mobile = ({ viewWidth, pages, activeStory, setActiveStory }) => {
  const navigate = useNavigate();

  return (
    <Tabbar
      className={viewWidth.tabletMinus.className}
      style={{ justifyContent: "space-around" }}
    >
      {pages.map((el) => (
        <TabbarItem
          onClick={(e) => {
            setActiveStory(e.currentTarget.dataset.story);
            navigate(el.path);
          }}
          selected={activeStory === el.id}
          data-story={el.id}
          text={el.name}
          key={el.id}
        >
          {el.icon}
        </TabbarItem>
      ))}
    </Tabbar>
  );
};

export default Mobile;
