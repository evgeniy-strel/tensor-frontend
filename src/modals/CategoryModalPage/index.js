import { useState, useEffect } from "react";
import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderBack,
  Cell,
  FormLayout,
  FormLayoutGroup,
  FormItem,
  Input,
  Button,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal, modalBack } from "../../store/reducers/modalSlice";
import { setTag } from "../../store/reducers/userSlice";
import { useModalRootContext } from "@vkontakte/vkui";

const CategoryModalPage = ({ id }) => {
  const { updateModalHeight } = useModalRootContext();
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.categories.tags);
  const { token, tags, activeCategory } = useSelector((state) => state.user);
  const isAuth = token !== "";
  const isCustom = activeCategory.title === "Пользовательская";
  const [newTag, setNewTag] = useState("");
  const [isExist, setIsExist] = useState(false);

  const handlerClose = () => {
    if (isAuth) {
      dispatch(changeActiveModal("hobbies"));
    } else {
      dispatch(modalBack());
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!tags.map((el) => el.title).includes(newTag) && newTag !== "") {
      dispatch(
        setTag({
          category_id: "154c82bf-1883-4fd8-b9db-83df7f3d0529",
          title: newTag,
        })
      );
      setNewTag("");
    } else if (newTag !== "") {
      setIsExist(true);
    }
  };

  useEffect(() => {
    updateModalHeight();
  }, [tags]);

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
        }
      >
        {activeCategory.title}
      </ModalPageHeader>
      <Group>
        {isCustom && (
          <FormLayout onSubmit={handlerSubmit}>
            <FormLayoutGroup mode="horizontal" segmented>
              <FormItem
                htmlFor="customTag"
                top="Ваш тег"
                status={isExist && "error"}
                bottom={isExist && "Такой тег уже существует"}
              >
                <Input
                  id="password"
                  onChange={(e) => {
                    setIsExist(false);
                    setNewTag(e.target.value);
                  }}
                  value={newTag}
                />
              </FormItem>
              <FormItem>
                <Input type="submit" value="Создать"/>
              </FormItem>
            </FormLayoutGroup>
          </FormLayout>
        )}
        {isCustom
          ? tags
              .filter((el) => el.category_id === activeCategory.id)
              .map((el) => (
                <Cell
                  Component="label"
                  mode="removable"
                  onRemove={() => dispatch(setTag(el))}
                  key={el.id}
                >
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
                  key={el.id}
                >
                  {el.display}
                </Cell>
              ))}
      </Group>
    </ModalPage>
  );
};

export default CategoryModalPage;
