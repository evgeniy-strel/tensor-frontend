import { useState, useEffect } from "react";
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
import { updateUser } from "../../store/reducers/userSlice";
import Form from "./Form";
import classes from "./index.module.scss";

const EditProfile = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const { user, tags } = useSelector((state) => state.user);
  const [newData, setNewData] = useState({
    avatar: user.avatar,
    firstName: user?.firstName,
    lastName: user?.lastName,
    description: user?.description,
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
      dispatch(modalBack());
    }
  };

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
        />
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
