import {
  FormLayout,
  FormItem,
  File,
  Avatar,
  Input,
  FormLayoutGroup,
  Textarea,
  ChipsInput,
  Chip,
} from "@vkontakte/vkui";
import { Icon28AddOutline } from "@vkontakte/icons";
import { useDispatch } from "react-redux";
import { setTag } from "../../store/reducers/userSlice";
import classes from "./index.module.scss";

const Form = ({
  user,
  newData,
  setNewData,
  avatarSrc,
  isValid,
  handlerChangeAvatar,
  handlerSubmit,
  newTags,
}) => {
  const dispatch = useDispatch();
  return (
    <FormLayout onSubmit={handlerSubmit}>
      <FormItem className={classes.form_item_avatar}>
        <File onChange={handlerChangeAvatar} mode="link">
          <Avatar
            src={avatarSrc}
            size={104}
            fallbackIcon={!avatarSrc || <Icon28AddOutline />}
            initials={
              !user.avatar
                ? user.firstName?.substr(0, 1) + user.lastName?.substr(0, 1)
                : null
            }
          />
        </File>
      </FormItem>
      <FormLayoutGroup>
        <FormItem
          className={classes.form_item}
          htmlFor="first"
          status={!isValid && newData.firstName === "" && "error"}
          bottom={!isValid && newData.firstName === "" && "Введите имя"}
        >
          <Input
            id="first"
            type="text"
            placeholder="Имя"
            maxLength={20}
            onChange={(e) =>
              setNewData({
                ...newData,
                firstName: e.target.value,
              })
            }
            value={newData.firstName}
          />
        </FormItem>
        <FormItem
          className={classes.form_item}
          htmlFor="last"
          status={!isValid && newData.lastName === "" && "error"}
          bottom={!isValid && newData.lastName === "" && "Введите фамилию"}
        >
          <Input
            id="last"
            type="text"
            placeholder="Фамилия"
            maxLength={20}
            onChange={(e) =>
              setNewData({
                ...newData,
                lastName: e.target.value,
              })
            }
            value={newData.lastName}
          />
        </FormItem>
        <FormItem className={classes.form_item}>
          <Textarea
            placeholder="Описание"
            maxLength={600}
            onChange={(e) =>
              setNewData({ ...newData, description: e.target.value })
            }
            value={newData.description}
          />
        </FormItem>
        {/* <FormItem htmlFor="custom">
          <ChipsInput
            id="custom"
            value={newData.tags}
            onChange={(e) => {
              newTags.current = e;
              console.log(newTags.current, "change");
              dispatch(
                setTag({
                  category_id: "154c82bf-1883-4fd8-b9db-83df7f3d0529",
                  title: e?.at(-1)?.value,
                })
              );
            }}
            renderChip={({ value, label }) => (
              <Chip
                key={value}
                value={value}
                onRemove={(e) => {
                  console.log("remove", e);
                }}
              >
                {label}
              </Chip>
            )}
          />
        </FormItem> */}
      </FormLayoutGroup>
    </FormLayout>
  );
};

export default Form;
