import { useEffect } from "react";
import {
  Avatar,
  Title,
  Button,
  Text,
  PanelSpinner,
  Card,
} from "@vkontakte/vkui";
import { Icon28FavoriteCircleFillGreen } from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userInfoById } from "../../store/reducers/userSlice";
import classes from "./profile.module.scss";

const Another = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loaderUserInfo, anothUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userInfoById(userId)).then((res) => {
      if (res.type !== "user/another/fulfilled") {
        navigate("/profile/me");
      }
    });
  }, []);

  const sendUser = () => {
    navigate("/messenger/create_chat_pm");
  };

  return (
    <>
      {loaderUserInfo ? (
        <PanelSpinner size="medium" />
      ) : (
        <Card mode="tint" className={classes.card}>
          {" "}
          <Avatar
            size={96}
            initials={
              !anothUser.avatar
                ? anothUser.firstName?.substr(0, 1) +
                  anothUser.lastName?.substr(0, 1)
                : null
            }
            src={
              anothUser.avatar &&
              process.env.REACT_APP_URL_API + anothUser.avatar
            }
          >
            <Avatar.Badge>
              <Icon28FavoriteCircleFillGreen />
            </Avatar.Badge>
          </Avatar>
          <Title level="2">{`${anothUser.firstName} ${anothUser.lastName}`}</Title>
          <Button size="l" stretched onClick={sendUser}>
            Написать
          </Button>
          <Text className={classes.description}>{anothUser?.description}</Text>
        </Card>
      )}
    </>
  );
};

export default Another;
