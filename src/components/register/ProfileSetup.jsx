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
  FormStatus,
  PanelSpinner,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../store/reducers/userSlice";

const ProfileSetup = ({ formData, setFormData, setActivePanel }) => {
  const dispatch = useDispatch();
  const { loader, resultReg } = useSelector((state) => state.user);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (formData.external.name === "") {
      setIsValid(true);
    } else {
      console.log(formData);
      await dispatch(postRegister(formData));
      if (resultReg.error === "") {
        navigate("/auth");
      }
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
        {loader ? (
          <PanelSpinner size="medium" />
        ) : (
          <FormLayout onSubmit={handlerSubmit}>
            {resultReg.error !== "" && (
              <FormStatus header="Ошибка" mode="error">
                {resultReg.error}
              </FormStatus>
            )}
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
                  setFormData({
                    ...formData,
                    external: { name: e.target.value },
                  })
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
        )}
      </Group>
    </>
  );
};

export default ProfileSetup;
