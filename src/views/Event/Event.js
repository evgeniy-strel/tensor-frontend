import { useState } from "react";
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

const Event = () => {
  const [selected, setSelected] = useState("events");
  const navigate = useNavigate();

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
        <Tabs mode={"default"}>
          <HorizontalScroll arrowSize="m">
            <TabsItem
              selected={selected === "events"}
              onClick={() => setSelected("events")}
            >
              Все события
            </TabsItem>
            <TabsItem
              selected={selected === "favorites"}
              onClick={() => setSelected("favorites")}
            >
              Избранное
            </TabsItem>
            <TabsItem
              selected={selected === "myEvents"}
              onClick={() => setSelected("myEvents")}
            >
              Мои события
            </TabsItem>
          </HorizontalScroll>
        </Tabs>
        <Group onClick={() => navigate("/event/event1")} className="wrapper">
          <EventCard />
          <EventCard />
          <EventCard />
        </Group>
      </Panel>
    </View>
  );
};

export default Event;
