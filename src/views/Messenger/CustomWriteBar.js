import { useState, useCallback, useRef, useEffect } from "react";
import {
  FixedLayout,
  Separator,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";
import { useDispatch } from "react-redux";
import { addMessage } from "../../store/reducers/chatSlice";

const CustomWriteBar = ({ user, chatId }) => {
  const token = localStorage.getItem("token");
  const socket = useRef();
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (text.length == 0) return;

    const message = {
      type: "text",
      chat_id: chatId,
      external: {
        user: user,
        message: text,
      },
    };

    socket.current.send(JSON.stringify(message));

    dispatch(addMessage(message));

    setText("");
    writeBarRef.focus();
  };

  const [writeBarRef, setWriteBarRef] = useState();

  const handleGetRef = useCallback((ref) => {
    setWriteBarRef(ref);
  }, []);

  const onKeyDown = (e) => {
    if (e.code === "Enter") {
      sendMessage();
      e.preventDefault();
    }
  };

  // TO DO: Замена последнего сообщения чата
  useEffect(() => {
    socket.current = new WebSocket(
      "ws://176.215.13.242:8080/websocket/?token=" + token
    );

    socket.current.onopen = () => {
      console.log("Произошло подключение к сокету");
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("get message from ws", message);

      if (chatId == message.chat_id) dispatch(addMessage(message));
    };
    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Произошла ошибка в socket");
    };
  }, []);

  return (
    <FixedLayout vertical="bottom" filled>
      <div>
        <Separator wide />
        <WriteBar
          onKeyDown={onKeyDown}
          getRef={handleGetRef}
          before={<WriteBarIcon mode="attach" />}
          after={<WriteBarIcon onClick={sendMessage} mode="send" />}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Сообщение"
        />
      </div>
    </FixedLayout>
  );
};

export default CustomWriteBar;
