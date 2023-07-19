import { useState, useEffect } from "react";
import { PanelHeader, Group, List, Tabs, TabsItem, FixedLayout } from "@vkontakte/vkui";
import { allChats, myChats } from "../../../mocks/chats";
import "./index.scss";
import { Icon28AddOutline, Icon28SlidersOutline, Icon28Search } from "@vkontakte/icons";
import ChatItem from "../ChatItem";

const tabs = [
  {
    id: "my_chats",
    text: "Мои чаты",
  },
  {
    id: "all_chats",
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
  const [chats, setChats] = useState(myChats);
  const [selected, setSelected] = useState("my_chats");
  const [inputSearch, setInputSearch] = useState("");

  const onChangeInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  useEffect(() => {
    if (selected === "my_chats") setChats(myChats);
    else setChats(allChats);
  }, [selected]);

  return (
    <div className="list-chats-container">
      <PanelHeader
        separator={false}
        after={
          <>
            <Icon28AddOutline />
            <Icon28SlidersOutline />
            <Icon28Search />
          </>
        }>
        <span>Сообщения</span>
      </PanelHeader>
      <FixedLayout vertical="top" className="fixed-layout">
        <TabsHeader selected={selected} setSelected={setSelected} />
      </FixedLayout>
      <Group>
        <List className="list-chats">
          {chats
            .filter((chat) => chat.name.toLowerCase().includes(inputSearch.toLowerCase()))
            .map((chat) => {
              return <ChatItem key={chat.id} {...chat} />;
            })}
        </List>
      </Group>
    </div>
  );
};

export default ListChats;
