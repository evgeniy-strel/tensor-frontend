import { useState } from "react";
import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  ButtonGroup,
  Button,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { modalBack } from "../store/reducers/modalSlice";
import classes from "./HobbiesModalPage/index.module.scss";

const EditProfile = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleSubmit = () => {};

  return (
    <ModalPage id={id} onClose={() => dispatch(modalBack())} hideCloseButton>
      <ModalPageHeader
        before={<PanelHeaderClose onClick={() => dispatch(modalBack())} />}
      >
        Увлечения
      </ModalPageHeader>
      <Group>
        <ButtonGroup className={classes.button_group} stretched>
          <Button onClick={handleSubmit} size="l" stretched>
            Применить
          </Button>
        </ButtonGroup>
      </Group>
    </ModalPage>
  );
};

export default EditProfile;
