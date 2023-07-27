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
import { getFullUrlImg } from "../../utils/helpersMethods";
import { useNavigate } from "react-router-dom";

const EventCard = ({
  id,
  external: { title, avatar, place, day, month, year, hour, minute },
}) => {
  const navigate = useNavigate();

  return (
    <div id="eventCard" onClick={() => navigate(`event/${id}`)} key={id}>
      <div>
        <div className="eventsImage">
          <img src={getFullUrlImg(avatar)} />
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
          <p>{title}</p>
          <div>
            <span>12</span>
            <PanelHeaderButton>
              <Icon16Users />
            </PanelHeaderButton>
          </div>
        </div>
        <div className="time">
          <p>
            {day} {month}октября, {hour}:{minute}
          </p>
          <p>{place}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
