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
import Categories from "./Categories";
import classes from "./index.module.scss";

const HobbiesModalPage = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [categories, setCategories] = useState(user.categories || []);

  const handleSubmit = () => {
    if (categories.length >= 3) {
      dispatch(changeActiveModal("settings"));
    }
  };

  return (
    <ModalPage id={id} onClose={() => dispatch(modalBack())} hideCloseButton {...props}>
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
        <Categories categories={categories} setCategories={setCategories} />
        <ButtonGroup className={classes.button_group} stretched>
          <Button
            onClick={handleSubmit}
            size="l"
            disabled={categories.length < 3}
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
