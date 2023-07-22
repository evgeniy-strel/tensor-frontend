import { useState } from "react";
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
import Tags from "./Tags";
import classes from "./index.module.scss";

const HobbiesModalPage = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [tags, setTags] = useState(user.tags);

  const handleSubmit = () => {
    if (tags.length >= 3) {
      dispatch(changeActiveModal("settings"));
      console.log(tags);
    }
  };

  return (
    <ModalPage id={id} onClose={() => dispatch(modalBack())} hideCloseButton>
      <ModalPageHeader
        before={
          <PanelHeaderBack
            onClick={() => dispatch(changeActiveModal("settings"))}
          />
        }
      >
        Увлечения
      </ModalPageHeader>
      <Group>
        <Tags tags={tags} setTags={setTags} />
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
