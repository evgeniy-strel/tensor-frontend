import {
  File,
  FormItem,
  Button,
  Avatar,
  FormLayout,
  Input,
  FormLayoutGroup,
} from "@vkontakte/vkui";
import { Icon36Users } from "@vkontakte/icons";

const FormPS = ({
  handlerSubmit,
  handlerChange,
  avatarSrc,
  isValid,
  name,
  setName,
}) => {
  return (
    <FormLayout onSubmit={handlerSubmit}>
      <FormItem style={{ textAlign: "center" }}>
        <File onChange={handlerChange} mode="link">
          <Avatar
            src={avatarSrc}
            size={104}
            fallbackIcon={!avatarSrc && <Icon36Users />}
          />
        </File>
      </FormItem>
      <FormLayoutGroup>
        <FormItem
          htmlFor="first"
          status={!isValid && name.first === "" && "error"}
          bottom={!isValid && name.first === "" && "Введите имя"}
          style={{ padding: "12px 16px 8px" }}
        >
          <Input
            id="first"
            type="text"
            placeholder="Имя"
            maxLength={32}
            onChange={(e) =>
              setName({
                ...name,
                first: e.target.value,
              })
            }
            value={name.first}
          />
        </FormItem>
        <FormItem
          htmlFor="last"
          status={!isValid && name.last === "" && "error"}
          bottom={!isValid && name.last === "" && "Введите фамилию"}
          style={{ padding: "8px 16px 12px" }}
        >
          <Input
            id="last"
            type="text"
            placeholder="Фамилия"
            maxLength={32}
            onChange={(e) =>
              setName({
                ...name,
                last: e.target.value,
              })
            }
            value={name.last}
          />
        </FormItem>
      </FormLayoutGroup>
      <FormItem>
        <Button onClick={handlerSubmit} size="l" stretched>
          Продолжить
        </Button>
      </FormItem>
    </FormLayout>
  );
};

export default FormPS;
