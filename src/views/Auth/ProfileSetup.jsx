import { useState, useEffect } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  File,
  FormItem,
  Title,
  Button,
  Avatar,
  FormLayout,
  Input,
  FormLayoutGroup,
} from "@vkontakte/vkui";
import { Icon36Users } from "@vkontakte/icons";
import classes from "./auth.module.scss";

const ProfileSetup = ({ setActivePanel, formData, setFormData }) => {
  const [isValid, setIsValid] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState("");

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
      external: { ...formData.external, avatar: file },
    });
    uploadAvatar(file);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (formData.external.name === "") {
      setIsValid(false);
    } else {
      setActivePanel("interests");
    }
  };

  useEffect(() => {
    if (formData.external.avatar) {
      uploadAvatar(formData.external.avatar);
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
        <FormLayout onSubmit={handlerSubmit}>
          <FormLayoutGroup
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormItem>
              <File onChange={handlerChange} mode="link">
                <Avatar
                  src={avatarSrc}
                  size={104}
                  fallbackIcon={!avatarSrc && <Icon36Users />}
                />
              </File>
            </FormItem>
          </FormLayoutGroup>
          <FormItem
            htmlFor="name"
            status={!isValid && formData.external.name === "" && "error"}
            bottom={!isValid && formData.external.name === "" && "Введите имя"}
          >
            <Input
              id="name"
              type="text"
              placeholder="Имя"
              maxLength={32}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  external: { ...formData.external, name: e.target.value },
                })
              }
              value={formData.external.name}
            />
          </FormItem>
          <FormItem>
            <Button onClick={handlerSubmit} size="l" stretched>
              Продолжить
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
};

export default ProfileSetup;
