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

const CustomWriteBar = () => {
  const platform = usePlatform();
  const [text, setText] = React.useState("");

  const sendMessage = () => {
    console.log(text);
    setText("");
  };

  const SmileOutlineIcon = (
    <AdaptiveIconRenderer
      IconCompact={
        platform === Platform.IOS ? Icon28SmileOutline : Icon24SmileOutline
      }
      IconRegular={Icon28SmileOutline}
    />
  );

  const VoiceOutlineIcon = (
    <AdaptiveIconRenderer
      IconCompact={
        platform === Platform.IOS ? Icon28VoiceOutline : Icon24VoiceOutline
      }
      IconRegular={Icon28VoiceOutline}
    />
  );

  return (
    <FixedLayout vertical="bottom" filled>
      <div>
        <Separator wide />
        <WriteBar
          before={<WriteBarIcon mode="attach" />}
          inlineAfter={
            text.length > 0 && (
              <WriteBarIcon aria-label="Смайлы и стикеры">
                {SmileOutlineIcon}
              </WriteBarIcon>
            )
          }
          after={
            <>
              {text.length === 0 && (
                <WriteBarIcon aria-label="Смайлы и стикеры">
                  {SmileOutlineIcon}
                </WriteBarIcon>
              )}
              {text.length === 0 && (
                <WriteBarIcon aria-label="Записать голосовое сообщение">
                  {VoiceOutlineIcon}
                </WriteBarIcon>
              )}
              {text.length > 0 && (
                <WriteBarIcon onClick={sendMessage} mode="send" />
              )}
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
