import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderBack,
  Cell,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { setTagNewChat } from "../../store/reducers/chatSlice";
import { changeActiveModal, modalBack } from "../../store/reducers/modalSlice";
import { setTag } from "../../store/reducers/userSlice";

const CategoryModalPageChat = ({ id }) => {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.categories.tags);
  const { tagsNewChat: tags, categoryNewChat: activeCategory } = useSelector(
    (state) => state.chat
  );

  const handlerClose = () => {
    dispatch(changeActiveModal("hobbies_chat"));
  };

  return (
    <ModalPage id={id} onClose={handlerClose} hideCloseButton>
      <ModalPageHeader
        before={<PanelHeaderClose onClick={handlerClose} children={"Назад"} />}>
        {activeCategory?.title}
      </ModalPageHeader>
      <Group>
        {activeCategory?.title === "Пользовательская"
          ? tags
              .filter((el) => el.category_id === activeCategory.id)
              .map((el) => (
                <Cell
                  Component="label"
                  after={
                    <Cell.Checkbox
                      onChange={() => dispatch(setTag(el))}
                      defaultChecked={tags
                        .map((el) => el.title)
                        .includes(el.title)}
                    />
                  }
                  key={el.id}>
                  {el.title}
                </Cell>
              ))
          : allTags
              .filter((el) => el.category_id === activeCategory.id)
              .map((el) => (
                <Cell
                  Component="label"
                  after={
                    <Cell.Checkbox
                      onChange={() => dispatch(setTagNewChat(el))}
                      defaultChecked={tags
                        .map((el) => el.title)
                        .includes(el.title)}
                    />
                  }
                  key={el.id}>
                  {el.display}
                </Cell>
              ))}
      </Group>
    </ModalPage>
  );
};

export default CategoryModalPageChat;
