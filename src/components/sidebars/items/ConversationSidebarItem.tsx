import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipientFromConversation } from "../../../utils/helpers";
import {
  ConversationSidebarItemDetails,
  ConversationSidebarItemStyle,
} from "../styles";
import { ContextMenuEvent, Conversation } from "../../../utils/types";
import defaultAvatar from "src/assets/default_avatar.jpg";

import styles from "../index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

type Props = {
  conversation: Conversation;
  onContextMenu: (event: ContextMenuEvent, group: Conversation) => void;
};

export const ConversationSidebarItem: React.FC<Props> = ({
  conversation,
  onContextMenu,
}) => {
  const MESSAGE_LENGTH_MAX = 50;
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.authentication.userData);
  const navigate = useNavigate();
  const recipient = getRecipientFromConversation(conversation, user);
  const latestMessageContent = () => {
    const { latestMessage } = conversation;
    if (latestMessage && latestMessage.content)
      return latestMessage.content?.length >= MESSAGE_LENGTH_MAX
        ? latestMessage.content?.slice(0, MESSAGE_LENGTH_MAX).concat("...")
        : latestMessage.content;
    if (latestMessage && latestMessage.attachments) {
      let msg =
        latestMessage.sender === user._id
          ? `You has sent an attachment`
          : `${recipient?.firstname} ${recipient?.lastname} has sent an attachment`;
      return msg.length >= MESSAGE_LENGTH_MAX
        ? msg.slice(0, MESSAGE_LENGTH_MAX).concat("...")
        : msg;
    }
    return null;
  };

  const hasProfilePicture = () => recipient?.avatar;

  return (
    <>
      <ConversationSidebarItemStyle
        onClick={() => navigate(`/home/conversations/${conversation._id}`)}
        onContextMenu={(e) => onContextMenu(e, conversation)}
        selected={id! === conversation._id}
      >
        <img
          src={hasProfilePicture() ? recipient?.avatar?.url! : defaultAvatar}
          alt="avatar"
          className={styles.conversationAvatar}
        />
        <ConversationSidebarItemDetails>
          <span className="conversationName">
            {`${recipient?.firstname} ${recipient?.lastname}`}
          </span>
          <span className="conversationLastMessage">
            {latestMessageContent()}
          </span>
        </ConversationSidebarItemDetails>
      </ConversationSidebarItemStyle>
    </>
  );
};
