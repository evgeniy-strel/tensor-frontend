import React from "react";
import {
  usePlatform,
  Platform,
  FixedLayout,
  Separator,
  AdaptiveIconRenderer,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";

import {
  Icon28SmileOutline,
  Icon24SmileOutline,
  Icon28VoiceOutline,
  Icon24VoiceOutline,
} from "@vkontakte/icons";
import { useState, useCallback } from "react";

const CustomWriteBar = ({ onSendMessage, user }) => {
  const platform = usePlatform();
  const [text, setText] = React.useState("");

  const sendMessage = () => {
    onSendMessage({ text, user });
    setText("");
    writeBarRef.focus();
  };

  const SmileOutlineIcon = (
    <AdaptiveIconRenderer
      IconCompact={platform === Platform.IOS ? Icon28SmileOutline : Icon24SmileOutline}
      IconRegular={Icon28SmileOutline}
    />
  );

  const VoiceOutlineIcon = (
    <AdaptiveIconRenderer
      IconCompact={platform === Platform.IOS ? Icon28VoiceOutline : Icon24VoiceOutline}
      IconRegular={Icon28VoiceOutline}
    />
  );

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

  return (
    <FixedLayout vertical="bottom" filled>
      <div>
        <Separator wide />
        <WriteBar
          onKeyDown={onKeyDown}
          getRef={handleGetRef}
          before={<WriteBarIcon mode="attach" />}
          after={
            <>
              {/* {text.length === 0 && (
                <WriteBarIcon aria-label="Записать голосовое сообщение">
                  {VoiceOutlineIcon}
                </WriteBarIcon>
              )} */}
              {text.length > 0 && <WriteBarIcon onClick={sendMessage} mode="send" />}
            </>
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Сообщение"
        />
      </div>
    </FixedLayout>
  );
};

export default CustomWriteBar;
