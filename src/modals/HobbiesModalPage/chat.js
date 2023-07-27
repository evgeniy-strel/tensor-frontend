import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderBack,
  PanelHeaderClose,
  ButtonGroup,
  Button,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import {
  resetNewChatState,
  resetTagsNewChat,
  setCategoryNewChat,
} from "../../store/reducers/chatSlice";
import { changeActiveModal, modalBack } from "../../store/reducers/modalSlice";
import {
  updateUserTags,
  resetTags,
  setCategoryModal,
} from "../../store/reducers/userSlice";
import { tagsNewChatSelector } from "../../store/selectors/chatSelectors";
import Cards from "../../views/Auth/Interests/Cards";
import classes from "./index.module.scss";

const HobbiesModalPageChat = ({ id, ...props }) => {
  const tags = useSelector(tagsNewChatSelector);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (tags.length >= 3) {
      dispatch(modalBack());
    }
  };

  const onClickCard = (category) => {
    dispatch(changeActiveModal("tags_chat"));
    dispatch(setCategoryNewChat(category));
  };

  return (
    <ModalPage
      id={id}
      onClose={() => {
        dispatch(resetTagsNewChat());
        dispatch(modalBack());
      }}
      hideCloseButton
      {...props}>
      <ModalPageHeader
        before={
          <PanelHeaderClose
            onClick={() => {
              dispatch(resetTagsNewChat());
              dispatch(modalBack());
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

export default HobbiesModalPageChat;
