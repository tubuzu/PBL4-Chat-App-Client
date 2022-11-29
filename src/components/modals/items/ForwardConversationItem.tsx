import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import {
  ConversationSidebarItemDetails,
  ConversationSidebarItemStyle,
} from "src/components/sidebars/styles";
import { RootState } from "src/store";
import { getRecipientFromConversation } from "src/utils/helpers";
import { Conversation, ConversationType, Group } from "src/utils/types";
import defaultAvatar from "src/assets/default_avatar.jpg";
import styles from "../../sidebars/index.module.scss";
import { IoMdSend } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ButtonForward } from "../styles";
import { Box } from "@chakra-ui/react";
import modalStyles from '../index.module.scss';

type Props = {
  conversation: Conversation | Group;
  selectedType: ConversationType;
  onForwardClick: (conversation: Conversation | Group) => void;
};

export const ForwardConversationItem: FC<Props> = ({
  conversation,
  selectedType,
  onForwardClick,
}) => {
  const MAX_TITLE_LENGTH = 20;
  const user = useSelector((state: RootState) => state.authentication.userData);
  const recipient = getRecipientFromConversation(
    conversation as Conversation,
    user
  );

  const [sended, setSended] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForward = async () => {
    setLoading(true);
    await onForwardClick(conversation);
    setSended(true);
    setLoading(false);
  };
  const getTransformedTitle = () => {
    if (!(conversation as Group).title) {
      const usersToString = (conversation as Group).users
        .map((user) => user.firstname)
        .join(", ");
      return usersToString.length > MAX_TITLE_LENGTH
        ? usersToString.slice(0, MAX_TITLE_LENGTH).concat("...")
        : usersToString;
    }
    return (conversation as Group).title?.length! > MAX_TITLE_LENGTH
      ? (conversation as Group).title?.slice(0, MAX_TITLE_LENGTH).concat("...")
      : (conversation as Group).title;
  };

  return (
    <ConversationSidebarItemStyle
      style={{ cursor: "default" }}
      selected={false}
    >
      {selectedType === "private" ? (
        <img
          src={recipient?.avatar ? recipient?.avatar! : defaultAvatar}
          alt="avatar"
          className={styles.conversationAvatar}
        />
      ) : (
        <div className={modalStyles.groupAvatar}></div>
      )}
      <ConversationSidebarItemDetails>
        <span className="conversationName">
          {selectedType === "private"
            ? `${recipient?.firstname} ${recipient?.lastname}`
            : getTransformedTitle()}
        </span>
      </ConversationSidebarItemDetails>
      {sended && !loading ? (
        <ButtonForward disabled>
          {/* <TiTick style={{ color: "#80eb81", fontSize: "2rem" }} /> */}
          Sent
        </ButtonForward>
      ) : sended && loading ? (
        <Box sx={{ padding: "10px 8px 10px 12px" }}>
          <AiOutlineLoading3Quarters
            style={{ color: "#ffffff", fontSize: "2rem" }}
          />
        </Box>
      ) : (
        <ButtonForward onClick={handleForward}>
          {/* <IoMdSend style={{ color: "#ffffff", fontSize: "2rem" }} /> */}
          Send
        </ButtonForward>
      )}
    </ConversationSidebarItemStyle>
  );
};
