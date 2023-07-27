import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderBack,
  ButtonGroup,
  Button,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal, modalBack } from "../../store/reducers/modalSlice";
import { updateUserTags, resetTags } from "../../store/reducers/userSlice";
import Cards from "../../views/Auth/Interests/Cards";
import classes from "./index.module.scss";

const HobbiesModalPage = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.user.tags);

  const handleSubmit = () => {
    if (tags.length >= 3) {
      dispatch(changeActiveModal("settings"));
      dispatch(updateUserTags(tags));
    }
  };

  return (
    <ModalPage id={id} hideCloseButton {...props}>
      <ModalPageHeader
        before={
          <PanelHeaderBack
            onClick={() => {
              dispatch(resetTags());
              dispatch(changeActiveModal("settings"));
            }}
          />
        }
      >
        Увлечения
      </ModalPageHeader>
      <Group>
        <Cards />
        <ButtonGroup className={classes.button_group} stretched>
          <Button
            onClick={handleSubmit}
            size="l"
            disabled={tags.length < 3}
            stretched
          >
            Готово
          </Button>
        </ButtonGroup>
      </Group>
    </ModalPage>
  );
};

export default HobbiesModalPage;
