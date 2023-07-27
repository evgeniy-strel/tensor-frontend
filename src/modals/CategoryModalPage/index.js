import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderBack,
  Cell,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal, modalBack } from "../../store/reducers/modalSlice";
import { setTag } from "../../store/reducers/userSlice";

const CategoryModalPage = ({ id }) => {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.categories.tags);
  const { token, tags, activeCategory } = useSelector((state) => state.user);
  const isAuth = token !== "";

  const handlerClose = () => {
    if (isAuth) {
      dispatch(changeActiveModal("hobbies"));
    } else {
      dispatch(modalBack());
    }
  };

  return (
    <ModalPage id={id} onClose={handlerClose} hideCloseButton>
      <ModalPageHeader
        children={"Назад"}
        before={
          isAuth ? (
            <PanelHeaderBack onClick={handlerClose} />
          ) : (
            <PanelHeaderClose onClick={handlerClose} />
          )
        }>
        {activeCategory.title}
      </ModalPageHeader>
      <Group>
        {activeCategory.title === "Пользовательская"
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
                      onChange={() => dispatch(setTag(el))}
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

export default CategoryModalPage;
