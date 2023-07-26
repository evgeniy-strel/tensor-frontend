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

const DescriptionEvent = () => {
  const navigate = useNavigate();

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
                      console.log("123");
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
                <p>Исторические танцы</p>
                <div>
                  <span>12</span>
                  <PanelHeaderButton>
                    <Icon16Users />
                  </PanelHeaderButton>
                </div>
              </div>
              <div className="time">
                <p>10 октября, 12:00</p>
                <p>ул. Колотушкина, 23</p>
              </div>
            </div>
          </div>
          <div className="desc">
            <p>
              Берите с собой свои гитары - чем больше, тем лучше. Посидим на
              плотинке, попоем песни. Потом можно сходить перекусить
            </p>
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
