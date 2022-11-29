import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MessageItemContent } from "./styles";
import { GroupMessageType, MessageType } from "../../utils/types";
import { MessageItemAttachmentContainer } from "./attachments/MessageItemAttachmentContainer";
import { EditMessageContainer } from "./EditMessageContainer";
import { Box } from "@chakra-ui/react";

type Props = {
  message: MessageType | GroupMessageType;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  padding: string;
};

export const MessageItemContainerBody: FC<Props> = ({
  message,
  onEditMessageChange,
  padding,
}) => {
  const user = useSelector((state: RootState) => state.authentication.userData);
  const isUserMsg = user?._id === message.sender._id;
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  return (
    <>
      {isEditingMessage && message._id === messageBeingEdited?._id ? (
        <MessageItemContent padding={padding}>
          <EditMessageContainer
            align={isUserMsg ? "right" : "left"}
            onEditMessageChange={onEditMessageChange}
          />
        </MessageItemContent>
      ) : (
        <MessageItemContent padding={padding}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: isUserMsg ? "flex-end" : "flex-start",
              gap: "10px",
            }}
          >
            {message?.content?.length! && (
              <Box
                sx={{
                  maxWidth: '60%',
                  padding: "8px 15px",
                  borderRadius: "4px",
                  backgroundColor: isUserMsg ? "#D4EBFB" : "rgba(255, 252, 252, 0.18)",
                  color: isUserMsg ? "#242424" : "#FAFAFA",
                }}
              >
                {message.content}
              </Box>
            )}
            {message?.attachments?.length ? (
              <MessageItemAttachmentContainer
                align={isUserMsg ? "right" : "left"}
                message={message}
              />
            ) : (
              <></>
            )}
          </Box>
        </MessageItemContent>
      )}
    </>
  );
};
