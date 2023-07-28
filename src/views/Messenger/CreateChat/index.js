import React from "react";
import "./index.scss";
import {
  File,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Group,
  Image,
  Input,
  PanelHeader,
  Textarea,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router";
import { Icon28AddOutline, Icon28CancelOutline } from "@vkontakte/icons";
import { useState } from "react";
import RequestAPI from "../../../API/requests";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewChat,
  resetNewChatState,
} from "./../../../store/reducers/chatSlice";
import { getFullUrlImg } from "../../../utils/helpersMethods";
import { changeActiveModal } from "../../../store/reducers/modalSlice";
import { tagsNewChatSelector } from "../../../store/selectors/chatSelectors";
import cn from "classnames";
import { useLocation } from "react-router";

const initialData = {
  avatar: "",
  title: "",
  description: "",
  mutedUsers: [],
};

const CreateChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState(initialData);
  const tags = useSelector(tagsNewChatSelector);
  const [isSubmited, setIsSubmited] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;
  const onThisPage = pathname?.includes("create_chat");

  const onClickBack = () => {
    navigate(-1);
  };

  // tags
  const onChooseTags = (e) => {
    e.preventDefault();
    dispatch(changeActiveModal("hobbies_chat"));
  };

  // обработка фотографии
  const fileOnChange = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    const formData = new FormData();
    formData.append("files", img);
    const dataImg = (await RequestAPI.uploadFiles(formData))[0];
    setData((prev) => ({ ...prev, avatar: dataImg.link }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmited(true);

    if (Object.values(rules).filter((rule) => rule).length !== 0) return;

    const chat = {
      chat: {
        type: "group",
        parent_id: null,
        external: { ...data },
      },
      users_id: [user.id],
    };

    const chatInfo = (await dispatch(createNewChat({ chat, tags }))).payload;
    navigate(`/messenger/chat/${chatInfo.id}`);
    dispatch(resetNewChatState());
  };

  const rules = {
    title: data.title.length < 4,
    tags: tags.length < 3,
    description: data.description.length < 10,
  };

  return (
    <div className="create-chat">
      <PanelHeader
        className="panel-header"
        before={
          <Icon28CancelOutline
            className="panel-header__icon"
            onClick={onClickBack}
          />
        }>
        <span className="panel-header__title">Создание чата</span>
      </PanelHeader>
      <Group className="create-chat__group">
        <main className="main">
          <FormLayout className="form-layout" onSubmit={onSubmit}>
            <FormLayoutGroup>
              <FormItem className="form-layout__item-image">
                <File onChange={fileOnChange} accept="image/*">
                  <Image
                    size={96}
                    borderRadius="s"
                    fallbackIcon={<Icon28AddOutline />}
                    src={getFullUrlImg(data.avatar)}
                  />
                </File>
              </FormItem>
              <FormItem
                htmlFor="title"
                className="form-layout__title"
                status={isSubmited && rules.title ? "error" : "default"}
                bottom={
                  isSubmited &&
                  rules.title &&
                  "Введите название от 4-х символов"
                }>
                <Input
                  name="title"
                  id="form-layout__title"
                  type="text"
                  align="center"
                  minLength={4}
                  value={data.title}
                  maxLength={40}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Название чата"
                />
              </FormItem>

              <FormItem
                status={
                  isSubmited && rules.tags && onThisPage ? "error" : "default"
                }
                bottom={
                  isSubmited &&
                  rules.tags &&
                  onThisPage &&
                  "Выберите от 3-х тегов"
                }>
                <div
                  className={cn("form-layout__tags", {
                    error: isSubmited && rules.tags && onThisPage,
                  })}
                  onClick={onChooseTags}>
                  {tags.length
                    ? tags.map(({ title }) => (
                        <div className="form-layout__tag">{title}</div>
                      ))
                    : "Теги чата"}
                </div>
              </FormItem>
              <FormItem
                status={isSubmited && rules.description ? "error" : "default"}
                bottom={
                  isSubmited &&
                  rules.description &&
                  "Опишите чат от 10 символов"
                }>
                <Textarea
                  placeholder="Описание чата"
                  value={data.description}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </FormItem>
              <FormItem className="main__join">
                <div className="main__join__button" onClick={onSubmit}>
                  Создать
                </div>
              </FormItem>
            </FormLayoutGroup>
          </FormLayout>
        </main>
      </Group>
    </div>
  );
};

export default CreateChat;
