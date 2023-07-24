import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  PanelSpinner,
  FormStatus,
  Div,
  Title,
  Text,
  ButtonGroup,
  Button,
} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";
import {
  postRegister,
  postLogin,
  updateUser,
  getUserInfo,
} from "../../../store/reducers/userSlice";
import classes from "../auth.module.scss";
import Cards from "./Cards";
import RequestAPI from "../../../API/requests";

const Interests = ({ setActivePanel, formData, setFormData }) => {
  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.user.registerState);

  const handleSubmit = () => {
    if (formData.external.categories.length >= 3) {
      if (formData.external.avatar) {
        const file = new FormData();
        file.append("files", formData.external.avatar);
        // регестрация -> вход -> загрузка картинки -> обновление пользователя
        dispatch(postRegister(formData))
          .then((res) =>
            dispatch(
              postLogin({
                email: formData.email,
                password: formData.password,
              })
            )
          )
          .then((res) => RequestAPI.uploadFiles(file))
          .then((res) => res[0])
          .then((res) => {
            return {
              ...formData,
              external: { ...formData.external, avatar: res.link },
            };
          })
          .then((res) => {
            dispatch(updateUser(res));
          });
      } else {
        // регестрация -> вход -> загрузка информации о пользователе
        dispatch(postRegister(formData))
          .then((res) =>
            dispatch(
              postLogin({
                email: formData.email,
                password: formData.password,
              })
            )
          )
          .then((res) => dispatch(getUserInfo()));
      }
    }
  };

  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderBack
            onClick={() => {
              setActivePanel("profsetup");
            }}
          />
        }
      >
        Регистрация
      </PanelHeader>
      <Group>
        <Div className={classes.header}>
          <Title className={classes.title} level="2" weight="3">
            Выбор увлечений
          </Title>
          <Text>Выберите минимум 3 увлечений</Text>
        </Div>
        {registerState.loader ? (
          <PanelSpinner size="medium" />
        ) : (
          <>
            {registerState.error !== "" && (
              <FormStatus header="Ошибка" mode="error">
                {registerState.error}
              </FormStatus>
            )}
            <Cards formData={formData} setFormData={setFormData} />
            <ButtonGroup className={classes.button_group} stretched>
              <Button
                onClick={handleSubmit}
                size="l"
                disabled={formData.external.categories.length < 3}
                stretched
              >
                Зарегистрироваться
              </Button>
            </ButtonGroup>
          </>
        )}
      </Group>
    </>
  );
};

export default Interests;
