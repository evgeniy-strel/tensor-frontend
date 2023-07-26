import { useState, useEffect } from "react";
import {
  Group,
  List,
  Tabs,
  TabsItem,
  FixedLayout,
  Search,
} from "@vkontakte/vkui";
import "./index.scss";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../store/reducers/chatSlice";
import {
  activeTabChatSelector,
  chatsSelector,
} from "../../../store/selectors/chatSelectors";
import { fetchChats } from "./../../../store/reducers/chatSlice";
import {
  addBounceEffect,
  removeBounceEffect,
} from "./../../../utils/bounceEffect";
import cn from "classnames";
import PanelHeader from "./PanelHeader";
import ListSubChats from "./ListSubChats";

const tabs = [
  {
    id: "my_chats",
    text: "Мои чаты",
  },
  {
    id: "others_chats",
    text: "Все чаты",
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
          aria-controls={id}>
          {text}
        </TabsItem>
      ))}
    </Tabs>
  );
};

const ListChats = () => {
  const dispatch = useDispatch();

  const chats = useSelector(chatsSelector);
  const selected = useSelector(activeTabChatSelector);
  const [search, setSearch] = useState({ isActive: false, text: "" });
  const [selectedChat, setSelectedChat] = useState();

  useEffect(() => {
    dispatch(fetchChats());
  }, [selected]);

  useEffect(() => {
    removeBounceEffect();

    return () => addBounceEffect();
  }, []);

  // TO DO: Изменить последнее сообщение и его дату
  // TO DO: Сделать анимацию загрузки чатов
  // TO DO: Фильтры(если все пойдет очень хорошо)

  // TO DO: Изменить key={i} на key={id}

  return (
    <div
      className={cn("list-chats-container", {
        "search-active": search.isActive,
        "shown-subchats": Boolean(selectedChat),
      })}>
      <PanelHeader
        isShownSubchats={Boolean(selectedChat)}
        hideSubChats={() => setSelectedChat(null)}
        showSubChats={() => setSelectedChat(chats[1])}
        title={selectedChat?.external?.title || "Тестовое название"}
        avatar={selectedChat?.external?.avatar}
        isSearchActive={search.isActive}
        setSearch={setSearch}
      />
      {!selectedChat && (
        <FixedLayout vertical="top" className="fixed-layout">
          <TabsHeader
            selected={selected}
            setSelected={(value) => dispatch(setActiveTab(value))}
          />
          <Search
            className="fixed-layout__search"
            value={search.text}
            onChange={(e) => setSearch((s) => ({ ...s, text: e.target.value }))}
            after={null}
          />
        </FixedLayout>
      )}
      <Group separator="hide" className="group-list-chats">
        <List className="list-chats">
          {chats
            .filter(({ chat }) =>
              chat?.external?.title
                ?.toLowerCase()
                .includes(search.text.toLowerCase())
            )
            .map(({ chat, last_message }, i) => {
              return (
                <ChatItem
                  isSelected={selectedChat?.id == chat?.id}
                  key={i}
                  lastMessage={last_message}
                  {...chat}
                />
              );
            })}
        </List>
      </Group>
      <ListSubChats subChats={chats} />
    </div>
  );
};

export default ListChats;
