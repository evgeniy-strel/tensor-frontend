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
import {
  updateUserTags,
  resetTags,
  setCategoryModal,
} from "../../store/reducers/userSlice";
import Cards from "../../views/Auth/Interests/Cards";
import classes from "./index.module.scss";

const HobbiesModalPage = ({ id, ...props }) => {
  const tags = useSelector((state) => state.user.tags);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (tags.length >= 3) {
      dispatch(changeActiveModal("settings"));
      console.log(tags);
      dispatch(updateUserTags(tags));
    }
  };

  const onClickCard = (category) => {
    dispatch(changeActiveModal("tags"));
    dispatch(setCategoryModal(category));
  };

  return (
    <ModalPage
      id={id}
      onClose={() => {
        dispatch(resetTags());
        dispatch(modalBack());
      }}
      hideCloseButton
      {...props}>
      <ModalPageHeader
        before={
          <PanelHeaderBack
            onClick={() => {
              dispatch(resetTags());
              dispatch(changeActiveModal("settings"));
            }}
          />
        }>
        Увлечения
      </ModalPageHeader>
      <Group>
        <Cards tags={tags} onClick={onClickCard} />
        <ButtonGroup className={classes.button_group} stretched>
          <Button
            onClick={handleSubmit}
            size="l"
            disabled={tags.length < 3}
            stretched>
            Готово
          </Button>
        </ButtonGroup>
      </Group>
    </ModalPage>
  );
};

export default HobbiesModalPage;
