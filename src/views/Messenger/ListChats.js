import { useState, useEffect } from "react";
import {
  PanelHeader,
  Group,
  List,
  Cell,
  Avatar,
  Counter,
  Tabs,
  TabsItem,
  Search,
} from "@vkontakte/vkui";
import { allChats, myChats } from "../../mocks/chats";
import { Link } from "react-router-dom";

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
    aria-controls={id}
  >
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
    <>
      <PanelHeader className="panel-header-custom">
        <TabsHeader selected={selected} setSelected={setSelected} />
      </PanelHeader>
      <Group>
        <Search
          value={inputSearch}
          onChange={onChangeInputSearch}
          after={null}
        />
        <List>
          {chats
            .filter((chat) =>
              chat.name.toLowerCase().includes(inputSearch.toLowerCase())
            )
            .map(({ id, name, img, countUnread }) => {
              return (
                <Link to={`${id}`} key={id}>
                  <Cell
                    before={<Avatar src={img} />}
                    subtitle="последнее сообщение чата"
                    indicator={
                      Boolean(countUnread) && <Counter>{countUnread}</Counter>
                    }
                  >
                    {name}
                  </Cell>
                </Link>
              );
            })}
        </List>
      </Group>
    </>
  );
};

export default ListChats;
