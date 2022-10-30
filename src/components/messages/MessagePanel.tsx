import { AxiosError } from "axios";
import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useToastHook } from "src/utils/hooks/useToast";
import { RootState } from "src/store";
import { selectConversationById } from "src/store/conversationSlice";
import { selectGroupById } from "src/store/groupSlice";
import { removeAllAttachments } from "src/store/message-panel/messagePanelSlice";
import {
  addSystemMessage,
  clearAllMessages,
} from "src/store/system-messages/systemMessagesSlice";
import { createMessage } from "src/utils/apis";
import { getRecipientFromConversation } from "src/utils/helpers";
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
  MessageTypingStatus,
} from "./styles";
import { MessageAttachmentContainer } from "./attachments/MessageAttachmentContainer";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessagePanelHeader } from "./MessagePanelHeader";

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};
export const MessagePanel: FC<Props> = ({
  sendTypingStatus,
  isRecipientTyping,
}) => {
  const dispatch = useDispatch();
  const { messageCounter } = useSelector(
    (state: RootState) => state.systemMessages
  );
  const [content, setContent] = useState("");
  const { id: routeId } = useParams();
  const user = useSelector((state: RootState) => state.authentication.userData);
  const { error } = useToastHook();
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, routeId!)
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, routeId!)
  );
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const recipient = getRecipientFromConversation(conversation, user);

  useEffect(() => {
    return () => {
      dispatch(clearAllMessages());
    };
  }, []);

  const sendMessage = async () => {
    const trimmedContent = content.trim();
    const attachmentPayload = attachments;
    setContent("");
    dispatch(removeAllAttachments());
    dispatch(clearAllMessages());
    if (!routeId) return;
    if (!trimmedContent && !attachmentPayload.length) return;
    const formData = new FormData();
    formData.append("id", routeId);
    trimmedContent && formData.append("content", trimmedContent);
    attachmentPayload.forEach((attachment) =>
      formData.append("attachments", attachment.file)
    );
    try {
      await createMessage(routeId, selectedType, formData);
      // setContent("");
      // dispatch(removeAllAttachments());
      // dispatch(clearAllMessages());
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 429) {
        error("You are rate limited");
        dispatch(
          addSystemMessage({
            _id: messageCounter,
            level: "error",
            content: "You are being rate limited. Slow down.",
          })
        );
      } else if (axiosError.response?.status === 404) {
        dispatch(
          addSystemMessage({
            _id: messageCounter,
            level: "error",
            content:
              "The recipient is not in your friends list or they may have blocked you.",
          })
        );
      }
    }
  };

  return (
    <>
      <MessagePanelStyle>
        <MessagePanelHeader />
        <MessagePanelBody>
          <MessageContainer />
        </MessagePanelBody>
        <MessagePanelFooter>
          {attachments.length > 0 && <MessageAttachmentContainer />}
          <MessageInputField
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
            sendTypingStatus={sendTypingStatus}
            placeholderName={
              selectedType === "group"
                ? group?.title || "Group"
                : recipient?.firstname || "user"
            }
          />
          <MessageTypingStatus>
            {isRecipientTyping ? `${recipient?.firstname} is typing...` : ""}
          </MessageTypingStatus>
        </MessagePanelFooter>
      </MessagePanelStyle>
    </>
  );
};
