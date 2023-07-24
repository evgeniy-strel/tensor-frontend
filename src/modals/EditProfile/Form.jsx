import {
  FormLayout,
  FormItem,
  File,
  Avatar,
  Input,
  FormLayoutGroup,
  Textarea,
} from "@vkontakte/vkui";
import { Icon28AddOutline, Icon36Users } from "@vkontakte/icons";
import classes from "./index.module.scss";

const Form = ({
  user,
  newData,
  setNewData,
  avatarSrc,
  isValid,
  handlerChangeAvatar,
  handlerSubmit,
}) => {
  return (
    <FormLayout onSubmit={handlerSubmit}>
      <FormItem className={classes.form_item_avatar}>
        <File onChange={handlerChangeAvatar} mode="link">
          <Avatar
            src={avatarSrc}
            size={104}
            fallbackIcon={!avatarSrc || <Icon36Users />}
            initials={
              !user.avatar
                ? user.firstName.substr(0, 1) + user.lastName.substr(0, 1)
                : null
            }
          >
            {/* <Avatar.Overlay>
                <Icon28AddOutline />
              </Avatar.Overlay> */}
          </Avatar>
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
            maxLength={32}
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
            maxLength={32}
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
            onChange={(e) =>
              setNewData({ ...newData, description: e.target.value })
            }
            value={newData.description}
          />
        </FormItem>
      </FormLayoutGroup>
    </FormLayout>
  );
};

export default Form;
