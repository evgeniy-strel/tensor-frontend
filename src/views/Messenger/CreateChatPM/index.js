import {
  PanelHeader,
  PanelHeaderBack,
  Avatar,
  PanelHeaderContent,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFullUrlImg } from "../../../utils/helpersMethods";
import CustomWriteBar from "./../CustomWriteBar";
import { createNewChat } from "./../../../store/reducers/chatSlice";

const CreateChatPM = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const receivedUser = useSelector((state) => state.user.anothUser);
  const currentUser = useSelector((state) => state.user.user);

  console.log(currentUser, receivedUser);

  const onClickBack = () => {
    navigate(-1);
  };

  const onMessage = async () => {
    const users = [currentUser.id, receivedUser.id];

    const chat = {
      chat: {
        type: "private",
        parent_id: null,
        external: {},
      },
      users_id: [currentUser.id, receivedUser.id],
    };

    const chatInfo = (await dispatch(createNewChat({ chat }))).payload;

    return chatInfo;
  };

  return (
    <div className="pm-chat-container">
      <PanelHeader
        className="panel-header-pm"
        before={<PanelHeaderBack onClick={onClickBack} />}>
        <PanelHeaderContent
          status={<span className="was-online">Была онлайн</span>}
          before={
            <Avatar
              size={36}
              src={getFullUrlImg(receivedUser?.avatar)}
              initials={
                receivedUser?.firstName?.at(0) + receivedUser?.lastName?.at(0)
              }
              gradientColor="blue"
            />
          }>
          <div className="chat-name">
            {`${receivedUser?.firstName} ${receivedUser?.lastName}`}
          </div>
        </PanelHeaderContent>
      </PanelHeader>
      <div>
        <CustomWriteBar
          onMessage={onMessage}
          chatId={receivedUser.id}
          user={currentUser}
        />
      </div>
    </div>
  );
};

export default CreateChatPM;
