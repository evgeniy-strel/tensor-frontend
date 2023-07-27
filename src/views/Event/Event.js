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
import { changeActiveModal } from "../../store/reducers/modalSlice";

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
                onClick={() => dispatch(changeActiveModal("filtration"))}
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
        <Tabs mode={"default"}>
          <HorizontalScroll arrowSize="m">
            <TabsItem aria-controls="all-event">Все события</TabsItem>
            <TabsItem>Избранное</TabsItem>
            <TabsItem>Мои события</TabsItem>
          </HorizontalScroll>
        </Tabs>
        <Group id="all-event">
          <div className="wrapper">
            {chats.map(({ chat, last_message }, i) => {
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
