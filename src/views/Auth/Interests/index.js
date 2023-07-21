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
import { postRegister } from "../../../store/reducers/userSlice";
import classes from "../auth.module.scss";
import Cards from "./Cards";

const Interests = ({ setActivePanel, formData, setFormData }) => {
  const dispatch = useDispatch();
  const { loader, resultReg } = useSelector((state) => state.user);

  const handleSubmit = () => {
    if (formData.external.tags.length >= 3) {
      dispatch(postRegister(formData));
      setActivePanel("selector");
      setFormData({ ...formData, password: "" });
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
        {loader ? (
          <PanelSpinner size="medium" />
        ) : (
          <>
            {resultReg.error !== "" && (
              <FormStatus header="Ошибка" mode="error">
                {resultReg.error}
              </FormStatus>
            )}
            <Cards formData={formData} setFormData={setFormData} />
            <ButtonGroup className={classes.button_group} stretched>
              <Button
                onClick={handleSubmit}
                size="l"
                disabled={formData.external.tags.length < 3}
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
