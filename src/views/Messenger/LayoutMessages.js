import "./LayoutMessages.scss";
import { Group } from "@vkontakte/vkui";
import { useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { addBounceEffect, removeBounceEffect } from "../../utils/bounceEffect";

const LayoutMessages = ({ children }) => {
  const scrollableRef = useRef();

  const scrollBottom = () => scrollableRef.current.scrollToBottom();

  useEffect(() => {
    scrollBottom();
  }, []);

  useEffect(() => {
    removeBounceEffect();

    return () => addBounceEffect();
  }, []);

  return (
    <div className="messages-container">
      <Group className="messages">
        <ScrollableFeed ref={scrollableRef}>
          <table className="table-messages">
            <tr>
              <td valign="bottom">{children}</td>
            </tr>
          </table>
        </ScrollableFeed>
      </Group>
    </div>
  );
};

export default LayoutMessages;
