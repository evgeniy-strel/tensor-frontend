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
        <FormLayout onSubmit={handlerSubmit}>
          <FormItem style={{ textAlign: "center" }}>
            <File onChange={handlerChange} mode="link">
              <Avatar
                src={avatarSrc}
                size={104}
                fallbackIcon={!avatarSrc && <Icon36Users />}
              />
            </File>
          </FormItem>
          <FormLayoutGroup>
            <FormItem
              htmlFor="first"
              status={!isValid && name.first === "" && "error"}
              bottom={!isValid && name.first === "" && "Введите имя"}
              style={{ padding: "12px 16px 8px" }}
            >
              <Input
                id="first"
                type="text"
                placeholder="Имя"
                maxLength={32}
                onChange={(e) =>
                  setName({
                    ...name,
                    first: e.target.value,
                  })
                }
                value={name.first}
              />
            </FormItem>
            <FormItem
              htmlFor="last"
              status={!isValid && name.last === "" && "error"}
              bottom={!isValid && name.last === "" && "Введите фамилию"}
              style={{ padding: "8px 16px 12px" }}
            >
              <Input
                id="last"
                type="text"
                placeholder="Фамилия"
                maxLength={32}
                onChange={(e) =>
                  setName({
                    ...name,
                    last: e.target.value,
                  })
                }
                value={name.last}
              />
            </FormItem>
          </FormLayoutGroup>
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
