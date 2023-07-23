import { useState, useEffect } from "react";
import {
  PanelHeader,
  Group,
  List,
  Tabs,
  TabsItem,
  FixedLayout,
} from "@vkontakte/vkui";
import "./index.scss";
import {
  Icon28AddOutline,
  Icon28SlidersOutline,
  Icon28Search,
} from "@vkontakte/icons";
import ChatItem from "../ChatItem";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../store/reducers/chatSlice";
import {
  activeTabChatSelector,
  chatsSelector,
} from "../../../store/selectors/chatSelectors";
import { fetchChats } from "./../../../store/reducers/chatSlice";

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

const TabsItemCustom = ({ selected, setSelected, id, text }) => (
  <TabsItem
    selected={selected === id}
    onClick={() => {
      setSelected(id);
    }}
    id={id}
    aria-controls={id}>
    {text}
  </TabsItem>
);

const TabsHeader = ({ selected, setSelected }) => {
  return (
    <Tabs>
      {tabs.map(({ id, text }) => (
        <TabsItemCustom
          selected={selected}
          setSelected={setSelected}
          id={id}
          key={id}
          text={text}
          key={id}
        />
      ))}
    </Tabs>
  );
};

const ListChats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chats = useSelector(chatsSelector);
  const selected = useSelector(activeTabChatSelector);
  const [inputSearch, setInputSearch] = useState("");

  const onChangeInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchChats());
  }, [selected]);

  const createChatFunc = () => {
    navigate("/messenger/create_chat");
  };

  return (
    <div className="list-chats-container">
      <PanelHeader
        separator={false}
        after={
          <>
            <Icon28AddOutline onClick={createChatFunc} />
            <Icon28SlidersOutline />
            <Icon28Search />
          </>
        }>
        <span>Сообщения</span>
      </PanelHeader>
      <FixedLayout vertical="top" className="fixed-layout">
        <TabsHeader
          selected={selected}
          setSelected={(value) => dispatch(setActiveTab(value))}
        />
      </FixedLayout>
      <Group>
        <List className="list-chats">
          {chats
            .filter((chat) =>
              chat.external.title
                .toLowerCase()
                .includes(inputSearch.toLowerCase())
            )
            .map((chat) => {
              return <ChatItem key={chat.id} {...chat} />;
            })}
        </List>
      </Group>
    </div>
  );
};

export default ListChats;
