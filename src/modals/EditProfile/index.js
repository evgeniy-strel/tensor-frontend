import { useState, useEffect, useRef } from "react";
import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  ButtonGroup,
  Button,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { modalBack } from "../../store/reducers/modalSlice";
import { updateUser, updateUserTags } from "../../store/reducers/userSlice";
import Form from "./Form";
import classes from "./index.module.scss";
import { useModalRootContext } from "@vkontakte/vkui";

const EditProfile = ({ id, ...props }) => {
  const { updateModalHeight } = useModalRootContext();
  const dispatch = useDispatch();
  const { user, tags } = useSelector((state) => state.user);
  const newTags = useRef(null);
  const [newData, setNewData] = useState({
    avatar: user.avatar,
    firstName: user?.firstName,
    lastName: user?.lastName,
    description: user?.description,
    tags: tags
      .filter((el) => el.category_id === "154c82bf-1883-4fd8-b9db-83df7f3d0529")
      .map((el) => {
        return { value: el.title, label: el.title };
      }),
  });
  const [avatarSrc, setAvatarSrc] = useState(
    user.avatar ? `${process.env.REACT_APP_URL_API}${user.avatar}` : ""
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
      if (
        user.firstName !== newData.firstName ||
        user.lastName !== newData.lastName ||
        user.avatar !== newData.avatar ||
        user.description !== newData.description
      ) {
        const formData = {
          ...user,
          firstName: newData.firstName,
          lastName: newData.lastName,
          description: newData.description,
        };
        const file = new FormData();
        file.append("files", newData.avatar);

        dispatch(
          updateUser([formData, user.avatar !== newData.avatar ? file : null])
        );
      }

      dispatch(updateUserTags(tags));
      dispatch(modalBack());
    }
  };

  useEffect(() => updateModalHeight, [newData.description, newData.tags]);

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
        <Form
          user={user}
          newData={newData}
          setNewData={setNewData}
          avatarSrc={avatarSrc}
          isValid={isValid}
          handlerChangeAvatar={handlerChangeAvatar}
          handlerSubmit={handlerSubmit}
          newTags={newTags}
        />
      </Group>
      <ButtonGroup className={classes.button_group} stretched>
        <Button onClick={handlerSubmit} size="l" stretched>
          Применить
        </Button>
      </ButtonGroup>
    </ModalPage>
  );
};

export default EditProfile;
