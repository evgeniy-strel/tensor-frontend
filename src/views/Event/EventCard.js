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
import { months } from "./values";
import { useEffect, useState } from "react";
import RequestAPI from "../../API/requests";

const EventCard = ({ id, external: { title, avatar, place, datetime } }) => {
  const navigate = useNavigate();
  const [countUsers, setCountUsers] = useState(0);
  const [date, setDate] = useState();

  function convertor(dateTime) {
    const str = dateTime?.split(" ");
    const [year, month, day] = str[0]?.split("-");
    const [hour, minute] = str[1]?.split(":");
    let hD = day;
    let hM = month;

    if (day[0] === "0") {
      hD = day[1];
    }
    if (month[0] === "0") {
      hM = month[1];
    }

    return { day: hD, month: hM, hour: hour, minute: minute };
  }

  useEffect(() => {
    RequestAPI.fetchUsersByChatId(id).then((e) => {
      setCountUsers(e?.data.length);
    });
    setDate(convertor(datetime));
  }, []);

  return (
    <div id="eventCard" onClick={() => navigate(`/event/${id}`)} key={id}>
      <div>
        <div className="eventsImage">
          <img src={getFullUrlImg(avatar)} />
          <div className="infoImage">
            <div>Tag</div>
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
            <span>{countUsers}</span>
            <PanelHeaderButton>
              <Icon16Users />
            </PanelHeaderButton>
          </div>
        </div>
        <div className="time">
          <p>
            {date?.day} {months[date?.month]}, {date?.hour}:{date?.minute}
          </p>
          <p>{place}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
