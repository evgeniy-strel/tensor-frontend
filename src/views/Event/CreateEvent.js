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
  DatePicker,
  CustomSelect,
  FormLayoutGroup,
} from "@vkontakte/vkui";
import { Icon28Cancel, Icon28AddOutline } from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RequestAPI from "../../API/requests";
import { useSelector, useDispatch } from "react-redux";
import { createNewChat } from "./../../store/reducers/chatSlice";
import { categoriesSelector } from "./../../store/selectors/categoriesSelector";
import { getFullUrlImg } from "../../utils/helpersMethods";

const hours = [
  { value: "00", label: "00" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
];

const minutes = [
  { value: "00", label: "00" },
  { value: "01", label: "01" },
  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
  { value: "05", label: "05" },
  { value: "06", label: "06" },
  { value: "07", label: "07" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
  { value: "32", label: "32" },
  { value: "33", label: "33" },
  { value: "34", label: "34" },
  { value: "35", label: "35" },
  { value: "36", label: "36" },
  { value: "37", label: "37" },
  { value: "38", label: "38" },
  { value: "39", label: "39" },
  { value: "40", label: "40" },
  { value: "41", label: "41" },
  { value: "42", label: "42" },
  { value: "43", label: "43" },
  { value: "44", label: "44" },
  { value: "45", label: "45" },
  { value: "46", label: "46" },
  { value: "47", label: "47" },
  { value: "48", label: "48" },
  { value: "49", label: "49" },
  { value: "50", label: "50" },
  { value: "51", label: "51" },
  { value: "52", label: "52" },
  { value: "53", label: "53" },
  { value: "54", label: "54" },
  { value: "55", label: "55" },
  { value: "56", label: "56" },
  { value: "57", label: "57" },
  { value: "58", label: "58" },
  { value: "59", label: "59" },
];

const initialData = {
  avatar: "",
  title: "",
  description: "",
  place: "",
  datetime: "",
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const categories = useSelector(categoriesSelector);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState(initialData);
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
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

    const tagsValues = tags.map((tag) => tag.value);

    const chatInfo = (await dispatch(createNewChat({ chat, tags: tagsValues })))
      .payload;
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
              {!data.avatar ? (
                <File onChange={fileOnChange} accept="image/*" mode="link">
                  <Image
                    borderRadius="s"
                    // size={196}
                    fallbackIcon={<Icon28AddOutline />}
                  />
                </File>
              ) : (
                <img src={getFullUrlImg(data.avatar)} className="img" />
              )}
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
                <DatePicker
                  // min={{ day: 1, month: 1, year: 1901 }}
                  max={{ day: 1, month: 1, year: 2030 }}
                  onDateChange={(value) => {
                    setDate(`${value.year}-${value.month}-${value.day}`);
                  }}
                  dayPlaceholder="ДД"
                  monthPlaceholder="ММММ"
                  yearPlaceholder="ГГГГ"
                />
              </FormItem>
              <FormLayoutGroup segmented mode="horizontal">
                <FormItem
                  status={isSubmited ? "error" : "default"}
                  bottom={isSubmited && "Заполните поля"}
                >
                  <Select
                    placeholder="Часов"
                    options={hours}
                    onChange={(e) => {
                      setHour(e.target.value);
                    }}
                  ></Select>
                </FormItem>
                <FormItem>
                  <Select
                    placeholder="Минут"
                    options={minutes}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        datetime: `${date} ${hour}:${e.target.value}`,
                      }));
                    }}
                  ></Select>
                </FormItem>
              </FormLayoutGroup>
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
