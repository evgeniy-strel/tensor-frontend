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
  setCategoryModal,
} from "../../../store/reducers/userSlice";
import classes from "../auth.module.scss";
import Cards from "./Cards";
import { changeActiveModal } from "../../../store/reducers/modalSlice";

const Interests = ({ setActivePanel, formData, setFormData }) => {
  const dispatch = useDispatch();
  const { tags, registerState } = useSelector((state) => state.user);

  const handleSubmit = () => {
    if (tags.length >= 3) {
      if (formData.avatar) {
        const file = new FormData();
        file.append("files", formData.avatar);
        dispatch(postRegister([formData, file, tags]));
      } else {
        dispatch(postRegister([formData, null, tags]));
      }
    }
  };

  const onClickCard = (category) => {
    dispatch(changeActiveModal("tags"));
    dispatch(setCategoryModal(category));
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
            <Cards tags={tags} onClick={onClickCard} />
            <ButtonGroup className={classes.button_group} stretched>
              <Button
                onClick={handleSubmit}
                size="l"
                disabled={tags.length < 3}
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
