import { useState, useEffect } from "react";
import {
  View,
  Panel,
  PanelHeader,
  Group,
  Placeholder,
  PanelHeaderButton,
  Tabs,
  TabsItem,
  HorizontalScroll,
  Title,
  Image,
  FormLayout,
  FormItem,
} from "@vkontakte/vkui";
import {
  Icon28CalendarOutline,
  Icon28AddOutline,
  Icon28SlidersOutline,
  Icon28SearchOutline,
  Icon28LikeOutline,
  Icon16Users,
} from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import "./Event.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  activeTabChatSelector,
  chatsSelector,
} from "../../store/selectors/chatSelectors";
import { setActiveTab } from "../../store/reducers/chatSlice";
import { fetchChats } from "./../../store/reducers/chatSlice";

const tabs = [
  {
    id: "all_events",
    text: "Все события",
  },
  {
    id: "favorites_events",
    text: "Избранное",
  },
  {
    id: "my_events",
    text: "Мои события",
  },
];

const TabsHeader = ({ selected, setSelected }) => {
  return (
    <Tabs>
      {tabs.map(({ id, text }) => (
        <TabsItem
          selected={selected === id}
          onClick={() => {
            setSelected(id);
          }}
          key={id}
          id={id}
          aria-controls={id}
        >
          {text}
        </TabsItem>
      ))}
    </Tabs>
  );
};

const Event = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chats = useSelector(chatsSelector);
  const selected = useSelector(activeTabChatSelector);

  useEffect(() => {
    dispatch(fetchChats());
  }, [selected]);

  return (
    <View id="event" activePanel="event">
      <Panel id="event">
        <PanelHeader
          after={
            <>
              <PanelHeaderButton
                onClick={() => navigate("/event/create")}
                aria-label="addition"
              >
                <Icon28AddOutline />
              </PanelHeaderButton>
              <PanelHeaderButton
                onClick={() => console.log("filters")}
                aria-label="filtration"
              >
                <Icon28SlidersOutline />
              </PanelHeaderButton>
              <PanelHeaderButton
                onClick={() => console.log("search")}
                aria-label="search"
              >
                <Icon28SearchOutline />
              </PanelHeaderButton>
            </>
          }
        >
          <Title>События</Title>
        </PanelHeader>
        <TabsHeader
          selected={selected}
          setSelected={(value) => dispatch(setActiveTab(value))}
        />
        <Group>
          <div className="wrapper">
            {chats.map(({ chat }, i) => {
              return (
                <EventCard
                  // isSelected={selectedChat?.id == chat?.id}
                  key={i}
                  {...chat}
                />
              );
            })}
          </div>
        </Group>
      </Panel>
    </View>
  );
};

export default Event;
