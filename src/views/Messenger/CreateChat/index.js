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
  unstable_ChipsSelect as ChipsSelect,
  Textarea,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router";
import { Icon28AddOutline, Icon28CancelOutline } from "@vkontakte/icons";
import { useState } from "react";
import RequestAPI from "../../../API/requests";

const initialData = {
  img: "",
  title: "",
  tags: [],
  description: "",
};

const tags = [
  { value: "Музыка", label: "Музыка" },
  { value: "Поесть", label: "Поесть" },
  { value: "Фотография", label: "Фотография" },
  { value: "Игры", label: "Игры" },
  { value: "Путешествия", label: "Путешествия" },
  { value: "Одежда", label: "Одежда" },
  { value: "Животные", label: "Животные" },
  { value: "Иностранные языки", label: "Иностранные языки" },
  { value: "Чтение", label: "Чтение" },
];

const CreateChat = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [imgBase64, setImgBase64] = useState();

  const [formData, setFormData] = useState(new FormData());

  const [isSubmited, setIsSubmited] = useState(false);

  const tagsChipsProps = {
    value: data.tags,
    onChange: (tags) => setData((prev) => ({ ...prev, tags })),
    options: tags,
    placeholder: "Выберите тэги",
    emptyText: "Ничего не найдено",
  };

  const onClickBack = () => {
    navigate(-1);
  };

  const handlerImgBase64 = (img) => {
    const reader = new FileReader();
    reader.onload = function () {
      const img64 = reader.result;
      setImgBase64(img64);
    };
    reader.readAsDataURL(img);
  };

  const fileOnChange = (e) => {
    const img = e.target.files[0];
    if (!img) return;

    setData((prev) => ({ ...prev, img }));

    const testFormData = new FormData();

    setFormData((prev) => prev.append("img", img));
    testFormData.append("img", img, "img.png");
    console.log(testFormData);

    RequestAPI.createNewChat(testFormData);

    handlerImgBase64(img);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(true);

    const basicChat = {
      type: "group",
      parent_id: null,
      external: { ...data },
    };

    if (Object.values(rules).filter((rule) => rule).length !== 0) return;

    // const usersId = ["123-44"];

    // formData.set("type", "group");
    // formData.set("parent_id", null);
    // formData.set("img", data.img);

    // Object.keys(data).forEach((key) => {
    //   formData.set(key, JSON.stringify(data[key]));
    // });

    RequestAPI.createNewChat(formData);
  };

  const rules = {
    title: data.title.length < 4,
    tags: data.tags.length == 0,
    description: data.description.length < 10,
  };

  return (
    <div className="create-chat">
      <PanelHeader
        className="panel-header"
        before={<Icon28CancelOutline className="panel-header__icon" onClick={onClickBack} />}>
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
                    src={imgBase64}
                  />
                </File>
              </FormItem>
              <FormItem
                htmlFor="title"
                className="form-layout__title"
                status={isSubmited && rules.title ? "error" : "default"}
                bottom={isSubmited && rules.title && "Введите название от 4-х символов"}>
                <Input
                  name="title"
                  id="form-layout__title"
                  type="text"
                  align="center"
                  minLength={4}
                  value={data.title}
                  maxLength={40}
                  onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Название чата"
                />
              </FormItem>
              <FormItem
                status={isSubmited && rules.tags ? "error" : "default"}
                bottom={isSubmited && rules.tags && "Выберите хотя-бы 1 тег"}>
                <ChipsSelect
                  id="groups"
                  {...tagsChipsProps}
                  showSelected={false}
                  closeAfterSelect={false}
                  creatable={true}
                />
              </FormItem>
              <FormItem
                status={isSubmited && rules.description ? "error" : "default"}
                bottom={isSubmited && rules.description && "Опишите чат от 10 символов"}>
                <Textarea
                  placeholder="Описание чата"
                  value={data.description}
                  onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
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
