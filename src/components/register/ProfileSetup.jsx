import { useState } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  File,
  FormItem,
  Title,
  Button,
  Avatar,
  FormLayout,
  Input,
  FormLayoutGroup,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";

const ProfileSetup = ({ formData, setFormData, setActivePanel }) => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (formData.external.name === "") {
      setIsValid(true);
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => setActivePanel("register")} />}
      >
        Регистрация
      </PanelHeader>
      <Group
        header={
          <Title level="2" style={{ textAlign: "center" }}>
            Настройка профиля
          </Title>
        }
      >
        <FormLayout onSubmit={handlerSubmit}>
          <FormLayoutGroup
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "16px",
            }}
          >
            <Avatar size={104} />
            <FormItem>
              <File
                onChange={uploadAvatar}
                align="center"
                mode="secondary"
              ></File>
            </FormItem>
          </FormLayoutGroup>
          <FormItem
            htmlFor="name"
            status={isValid && formData.external.name === "" && "error"}
            bottom={isValid && formData.external.name === "" && "Введите имя"}
          >
            <Input
              id="name"
              type="text"
              placeholder="Введите имя аккаунта"
              onChange={(e) =>
                setFormData({ ...formData, external: { name: e.target.value } })
              }
              value={formData.external.name}
            />
          </FormItem>
          <FormItem>
            <Button onClick={handlerSubmit} size="l" stretched>
              Завершить регистрацию
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
};

export default ProfileSetup;
