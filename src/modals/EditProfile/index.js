import { useState, useEffect } from "react";
import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  ButtonGroup,
  Button,
  FormLayout,
  FormItem,
  File,
  Avatar,
  Input,
  FormLayoutGroup,
  Textarea,
} from "@vkontakte/vkui";
import { Icon28AddOutline } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { modalBack } from "../../store/reducers/modalSlice";
import RequestAPI from "../../API/requests";
import { userTags, updateUser } from "../../store/reducers/userSlice";
import classes from "./index.module.scss";
import { Icon36Users } from "@vkontakte/icons";

const EditProfile = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const { user, tags } = useSelector((state) => state.user);
  const [newData, setNewData] = useState({
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    description: user?.description || "",
    tags: [],
  });
  const [avatarSrc, setAvatarSrc] = useState(
    user.avatar ? `${process.env.REACT_APP_URL_API}/${user.avatar}` : ""
  );
  const [isValid, setIsValid] = useState(true);

  const uploadAvatar = (file) => {
    const fr = new FileReader();
    fr.onload = function () {
      setAvatarSrc(fr.result);
    };
    fr.readAsDataURL(file);
  };

  const handlerChangeAvatar = (e) => {
    const file = e.target.files[0];
    setNewData({ ...newData, avatar: file });
    uploadAvatar(file);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (newData.firstName === "" || newData.lastName === "") {
      setIsValid(false);
    } else {
      if (user.avatar !== newData.avatar) {
        RequestAPI.uploadFiles(newData.avatar)
          .then((res) => res[0])
          .then((res) => {
            return {
              email: "",
              external: {
                firstName: newData.firstName,
                lastName: newData.lastName,
                avatar: res.link,
                categories: user.categories,
                description: newData.description,
              },
            };
          })
          .then((res) => {
            dispatch(updateUser(res));
          });
      }
    }
  };

  useEffect(() => {
    dispatch(userTags());
  }, []);

  return (
    <ModalPage
      id={id}
      onClose={() => dispatch(modalBack())}
      hideCloseButton
      {...props}
    >
      <ModalPageHeader
        before={<PanelHeaderClose onClick={() => dispatch(modalBack())} />}
      >
        Редактирование
      </ModalPageHeader>
      <Group>
        <FormLayout onSubmit={handlerSubmit}>
          <FormItem className={classes.form_item_avatar}>
            <File onChange={handlerChangeAvatar} mode="link">
              <Avatar
                src={avatarSrc}
                size={104}
                fallbackIcon={!avatarSrc || <Icon36Users />}
                initials={
                  !user.avatar
                    ? user.firstName.substr(0, 1) + user.lastName.substr(0, 1)
                    : null
                }
              >
                {" "}
                <Avatar.Overlay>
                  <Icon28AddOutline />
                </Avatar.Overlay>
              </Avatar>
            </File>
          </FormItem>
          <FormLayoutGroup>
            <FormItem
              className={classes.form_item}
              htmlFor="first"
              status={!isValid && newData.firstName === "" && "error"}
              bottom={!isValid && newData.firstName === "" && "Введите имя"}
            >
              <Input
                id="first"
                type="text"
                placeholder="Имя"
                maxLength={32}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    firstName: e.target.value,
                  })
                }
                value={newData.firstName}
              />
            </FormItem>
            <FormItem
              className={classes.form_item}
              htmlFor="last"
              status={!isValid && newData.lastName === "" && "error"}
              bottom={!isValid && newData.lastName === "" && "Введите фамилию"}
            >
              <Input
                id="last"
                type="text"
                placeholder="Фамилия"
                maxLength={32}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    lastName: e.target.value,
                  })
                }
                value={newData.lastName}
              />
            </FormItem>
            <FormItem className={classes.form_item}>
              <Textarea
                placeholder="Описание"
                onChange={(e) =>
                  setNewData({ ...newData, description: e.target.value })
                }
                value={newData.description}
              />
            </FormItem>
          </FormLayoutGroup>
        </FormLayout>
        <ButtonGroup className={classes.button_group} stretched>
          <Button onClick={handlerSubmit} size="l" stretched>
            Применить
          </Button>
        </ButtonGroup>
      </Group>
    </ModalPage>
  );
};

export default EditProfile;
