import {
  View,
  Panel,
  PanelHeader,
  Group,
  PanelHeaderButton,
  Title,
  Select,
} from "@vkontakte/vkui";
import { Icon28LikeOutline, Icon16Users } from "@vkontakte/icons";
import "./EventCard.scss";

const EventCard = () => {
  return (
    <div id="eventCard">
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
              <Icon28LikeOutline fill="white" style={{ padding: "0px" }} />
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
  );
};

export default EventCard;
