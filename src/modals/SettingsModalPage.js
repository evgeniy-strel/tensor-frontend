import {
  Cell,
  CellButton,
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  Spacing,
  Separator,
} from "@vkontakte/vkui";
import {
  Icon24NotificationSlashOutline,
  Icon24PenOutline,
  Icon24DoorArrowLeftOutline,
} from "@vkontakte/icons";
import { useDispatch } from "react-redux";
import { changeActiveModal, modalBack } from "../store/reducers/modalSlice";
import { postLogout } from "../store/reducers/userSlice";

const SettingsModalPage = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <ModalPage id={id} onClose={() => dispatch(modalBack())} hideCloseButton>
      <ModalPageHeader
        before={<PanelHeaderClose onClick={() => dispatch(modalBack())} />}
      >
        Настройки
      </ModalPageHeader>
      <Group>
        <Cell before={<Icon24NotificationSlashOutline />}>Не беспокоить</Cell>
        <Cell
          before={<Icon24PenOutline />}
          onClick={() => dispatch(changeActiveModal("hobbies"))}
        >
          Редактировать увлечения
        </Cell>
        <Spacing>
          <Separator />
        </Spacing>
        <CellButton
          onClick={() => {
            dispatch(modalBack());
            dispatch(postLogout());
          }}
          before={<Icon24DoorArrowLeftOutline />}
          mode="danger"
        >
          Выйти
        </CellButton>
      </Group>
    </ModalPage>
  );
};

export default SettingsModalPage;
