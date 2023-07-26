import { useState, useEffect } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  Title,
} from "@vkontakte/vkui";
import FormPS from "./FormPS";
import classes from "../auth.module.scss";

const ProfileSetup = ({ setActivePanel, formData, setFormData }) => {
  const [isValid, setIsValid] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [name, setName] = useState({ first: "", last: "" });

  const uploadAvatar = (file) => {
    const fr = new FileReader();
    fr.onload = function () {
      setAvatarSrc(fr.result);
    };
    fr.readAsDataURL(file);
  };

  const handlerChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      avatar: file,
    });
    uploadAvatar(file);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (name.first === "" || name.last === "") {
      setIsValid(false);
    } else {
      setFormData({
        ...formData,
        firstName: name.first,
        lastName: name.last,
      });
      setActivePanel("interests");
    }
  };

  useEffect(() => {
    if (formData.avatar) {
      uploadAvatar(formData.avatar);
    }
  }, []);

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => setActivePanel("register")} />}
      >
        Регистрация
      </PanelHeader>
      <Group>
        <Div className={classes.header_title}>
          <Title level="2" weight="3">
            Настройка профиля
          </Title>
        </Div>
        <FormPS
          handlerSubmit={handlerSubmit}
          handlerChange={handlerChange}
          avatarSrc={avatarSrc}
          isValid={isValid}
          name={name}
          setName={setName}
        />
      </Group>
    </>
  );
};

export default ProfileSetup;
