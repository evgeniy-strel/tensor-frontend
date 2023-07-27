import {
  View,
  Panel,
  PanelHeader,
  Group,
  PanelHeaderButton,
  Title,
  Select,
} from "@vkontakte/vkui";
import {
  Icon28ArrowLeftOutline,
  Icon28LikeOutline,
  Icon16Users,
} from "@vkontakte/icons";
import "./DescriptionEvent.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchChatById } from "../../store/reducers/chatSlice";
import { useLocation, matchRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import RequestAPI from "../../API/requests";
import { months } from "./values";

const DescriptionEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [idChat, setIdChat] = useState();
  const [event, setEvent] = useState();
  const [tags, setTags] = useState();
  const [users, setUsers] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [participant, setParticipant] = useState(false);
  const [idUser, setIdUser] = useState();

  useEffect(() => {
    setIdChat(location.pathname.split("/")[2]);
    RequestAPI.fetchChatById(location.pathname.split("/")[2]).then((e) =>
      setEvent(e?.data?.external)
    );
    RequestAPI.fetchTagsByChatId(location.pathname.split("/")[2]).then((e) =>
      setTags(e?.data)
    );
    RequestAPI.currentUser().then((e) => setIdUser(e?.data?.id));
  }, []);

  useEffect(() => {
    RequestAPI.fetchUsersByChatId(location.pathname.split("/")[2]).then((e) => {
      setUsers(e?.data?.length);
      e?.data?.map((v) => {
        if (v?.user?.id === idUser) {
          setParticipant(true);
          if (v?.role === "admin" && v?.user?.id === idUser) {
            setIsAdmin(true);
          }
        }
      });
    });
  }, [idUser]);

  return (
    <View id="description" activePanel="description">
      <Panel id="description">
        <PanelHeader
          className="header"
          before={
            <PanelHeaderButton
              onClick={() => navigate("/event")}
              aria-label="back"
            >
              <Icon28ArrowLeftOutline />
            </PanelHeaderButton>
          }
        >
          <Title>Описание события</Title>
        </PanelHeader>
        <Group className="wrapper">
          <div>
            <div className="eventsImage">
              <img src="https://ic.pics.livejournal.com/evfimi/71423938/386042/386042_original.jpg" />
              <div className="infoImage">
                <PanelHeaderButton
                  aria-label="favorites"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(idChat);
                  }}
                >
                  <Icon28LikeOutline fill="white" style={{ padding: "0px" }} />
                </PanelHeaderButton>
              </div>
              <div className="tags">
                {tags?.map((e) => {
                  return <div key={e?.tag_id}>{e?.title}</div>;
                })}
              </div>
            </div>
          </div>
          <div className="info">
            <div className="title">
              <p>{event?.title}</p>
              <div>
                <span>{users}</span>
                <PanelHeaderButton aria-label="users">
                  <Icon16Users />
                </PanelHeaderButton>
              </div>
            </div>
            <div className="time">
              <p>
                {event?.date?.day} {months[event?.date?.month]}, {event?.hour}:
                {event?.minute}
              </p>
              <p>{event?.place}</p>
            </div>
          </div>
          <div className="desc">
            <p>{event?.description}</p>
            <div className="btns">
              {isAdmin && (
                <>
                  <button
                    className="btn"
                    onClick={() => navigate(`/messenger/chat/${idChat}`)}
                  >
                    Чат
                  </button>
                  <button
                    className="btn noActive"
                    onClick={() => navigate("/event/create")}
                  >
                    Редактировать
                  </button>
                </>
              )}
              {participant && !isAdmin && (
                <>
                  <button
                    className="btn"
                    onClick={() => navigate(`/messenger/chat/${idChat}`)}
                  >
                    Чат
                  </button>
                  <button className="btn noActive">Не участвовать</button>
                </>
              )}
              {!isAdmin && !participant && (
                <button
                  className="btn"
                  onClick={() => navigate(`/messenger/chat/${idChat}`)}
                >
                  Присоединиться
                </button>
              )}
            </div>
          </div>
        </Group>
      </Panel>
    </View>
  );
};

export default DescriptionEvent;
