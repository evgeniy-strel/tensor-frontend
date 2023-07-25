import { useEffect } from "react";
import { Avatar, Title, Button, Text, PanelSpinner } from "@vkontakte/vkui";
import { Icon28FavoriteCircleFillGreen } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { userInfoById } from "../../store/reducers/userSlice";

const Another = ({ userId }) => {
  const dispatch = useDispatch();
  const { loaderUserInfo, anothUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Получение информации о другом пользователе
    dispatch(userInfoById(userId));
  }, []);

  return (
    <>
      {loaderUserInfo ? (
        <PanelSpinner size="medium" />
      ) : (
        <>
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
          <Button size="l" stretched>
            Написать
          </Button>
          ;
          <Text style={{ lineHeight: "20px", letterSpacing: "0.2px" }}>
            {anothUser?.description}
          </Text>
        </>
      )}
    </>
  );
};

export default Another;
