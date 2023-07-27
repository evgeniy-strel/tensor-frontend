import "./CreateEvent.scss";
import {
  View,
  Panel,
  PanelHeader,
  Group,
  PanelHeaderButton,
  Title,
  unstable_ChipsSelect as ChipsSelect,
  Input,
  Select,
  FormLayout,
  FormItem,
  File,
  Image,
  Textarea,
} from "@vkontakte/vkui";
import { Icon28Cancel, Icon28AddOutline } from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RequestAPI from "../../API/requests";
import { useSelector, useDispatch } from "react-redux";
import { createNewChat } from "./../../store/reducers/chatSlice";
import { categoriesSelector } from "./../../store/selectors/categoriesSelector";
import { getFullUrlImg } from "../../utils/helpersMethods";

const numbers = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

const month = [{ value: "1", label: "январь" }];

const initialData = {
  avatar: "",
  title: "",
  description: "",
  place: "",
  day: "",
  month: "",
  year: "",
  hour: "",
  minute: "",
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const categories = useSelector(categoriesSelector);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState(initialData);
  const [isSubmited, setIsSubmited] = useState(false);

  const fileOnChange = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    const formData = new FormData();
    formData.append("files", img);
    const dataImg = (await RequestAPI.uploadFiles(formData))[0];
    setData((prev) => ({ ...prev, avatar: dataImg.link }));
  };

  const tagsChipsProps = {
    value: tags,
    onChange: setTags,
    options: categories.map(({ title }) => ({ label: title, value: title })),
    placeholder: "Выберите или напишите свои теги",
    emptyText: "Ничего не найдено",
  };

  const rules = {
    title: data.title.length < 4,
    tags: tags.length === 0,
    description: data.description.length < 10,
    place: data.place.length < 4,
  };

  const onSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    setIsSubmited(true);
    if (Object.values(rules).filter((rule) => rule).length !== 0) return;
    const chat = {
      chat: {
        type: "event",
        parent_id: null,
        external: { ...data, admins: [user.id] },
      },
      users_id: [user.id],
    };
    const chatInfo = (await dispatch(createNewChat({ chat, tags }))).payload;
    navigate(`/messenger/chat/${chatInfo.id}`);
  };

  return (
    <View id="createEvent" activePanel="createEvent">
      <Panel id="createEvent">
        <PanelHeader
          className="header"
          before={
            <PanelHeaderButton
              onClick={() => navigate("/event")}
              aria-label="back"
            >
              <Icon28Cancel />
            </PanelHeaderButton>
          }
        >
          <Title>Создание события</Title>
        </PanelHeader>
        <Group>
          <FormLayout className="formLayout">
            <FormItem className="eventsImage">
              <File onChange={fileOnChange} accept="image/*">
                <Image
                  borderRadius="s"
                  // size={196}
                  src={getFullUrlImg(data.avatar)}
                  fallbackIcon={<Icon28AddOutline />}
                />
              </File>
            </FormItem>
            <div className="container">
              <FormItem
                status={isSubmited && rules.title ? "error" : "default"}
                bottom={
                  isSubmited &&
                  rules.title &&
                  "Введите название от 4-х символов"
                }
              >
                <Input
                  type="text"
                  minLength={4}
                  value={data.title}
                  maxLength={40}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Название мероприятия"
                />
              </FormItem>
              <FormItem
                status={isSubmited ? "error" : "default"}
                bottom={isSubmited && "Заполните поля"}
              >
                <div className="date">
                  <Select
                    placeholder="День"
                    id="formSelect"
                    options={numbers}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, day: e.target.value }));
                    }}
                  ></Select>
                  <Select
                    placeholder="Месяц"
                    id="formSelect"
                    options={month}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, month: e.target.value }));
                    }}
                  ></Select>
                  <Select
                    placeholder="Год"
                    id="formSelect"
                    options={numbers}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, year: e.target.value }));
                    }}
                  ></Select>
                </div>
              </FormItem>
              <FormItem
                status={isSubmited ? "error" : "default"}
                bottom={isSubmited && "Заполните поля"}
              >
                <div className="time">
                  <Select
                    placeholder="Часов"
                    options={numbers}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, hour: e.target.value }));
                    }}
                  ></Select>
                  <Select
                    placeholder="Минут"
                    options={numbers}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, minute: e.target.value }));
                    }}
                  ></Select>
                </div>
              </FormItem>
              <FormItem
                status={isSubmited && rules.place ? "error" : "default"}
                bottom={
                  isSubmited &&
                  rules.title &&
                  "Введите название от 4-х символов"
                }
              >
                <Input
                  placeholder="Место проведения"
                  type="text"
                  minLength={4}
                  value={data.place}
                  maxLength={60}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, place: e.target.value }))
                  }
                />
              </FormItem>
              <FormItem
                status={isSubmited && rules.tags ? "error" : "default"}
                bottom={isSubmited && rules.tags && "Выберите хотя-бы 1 тег"}
              >
                <ChipsSelect
                  {...tagsChipsProps}
                  showSelected={false}
                  closeAfterSelect={false}
                  creatable={true}
                />
              </FormItem>
              <FormItem
                status={isSubmited && rules.description ? "error" : "default"}
                bottom={
                  isSubmited &&
                  rules.description &&
                  "Опишите событие от 10 символов"
                }
              >
                <Textarea
                  placeholder="Описание события"
                  value={data.description}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </FormItem>
              <FormItem>
                <button className="btn" onClick={onSubmit}>
                  Создать
                </button>
              </FormItem>
            </div>
          </FormLayout>
        </Group>
      </Panel>
    </View>
  );
};

export default CreateEvent;
