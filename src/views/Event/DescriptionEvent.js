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
  const dispatch = useDispatch();
  const location = useLocation();
  const [event, setEvent] = useState();

  useEffect(() => {
    RequestAPI.fetchChatById(location.pathname.split("/")[2]).then((e) =>
      setEvent(e?.data?.external)
    );
  }, []);

  const onSubmit = async (e) => {
    const chatInfo = (
      await dispatch(fetchChatById("e51101c1-d361-4bed-a702-fe4dcdc627e9"))
    ).payload;
  };

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
            <div>
              <div className="eventsImage">
                <img src="https://ic.pics.livejournal.com/evfimi/71423938/386042/386042_original.jpg" />
                <div className="infoImage">
                  <div>Танцы</div>
                  <PanelHeaderButton
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(123);
                    }}
                  >
                    <Icon28LikeOutline
                      fill="white"
                      style={{ padding: "0px" }}
                    />
                  </PanelHeaderButton>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="title">
                <p>{event?.title}</p>
                <div>
                  <span>12</span>
                  <PanelHeaderButton>
                    <Icon16Users />
                  </PanelHeaderButton>
                </div>
              </div>
              <div className="time">
                <p>
                  {event?.date?.day} {months[event?.date?.month]}, {event?.hour}
                  :{event?.minute}
                </p>
                <p>{event?.place}</p>
              </div>
            </div>
          </div>
          <div className="desc">
            <p>{event?.description}</p>
            <div className="btns">
              <button className="btn">Присоединиться</button>
              <button className="btn">Чат</button>
              <button className="btn noActive">Не участвовать</button>
              <button
                className="btn noActive"
                onClick={() => navigate("/event/create")}
              >
                Редактировать
              </button>
            </div>
          </div>
        </Group>
      </Panel>
    </View>
  );
};

export default DescriptionEvent;
