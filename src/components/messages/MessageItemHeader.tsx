import { formatRelative } from "date-fns";
import React, { FC } from "react";
import { MessageItemHeaderContainer } from "./styles";
import { GroupMessageType, MessageType } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

type Props = {
  message: MessageType | GroupMessageType;
};

export const MessageItemHeader: FC<Props> = ({ message }) => {
  const user = useSelector(
    (state: RootState) => state.authentication.userData
  );
  return (
    <MessageItemHeaderContainer style={{
      justifyContent: user?._id === message.sender._id ? 'flex-end' : 'flex-start',
    }}>
      <span
        className="authorName"
        style={{
          color: user?._id === message.sender._id ? "#989898" : "#5E8BFF",
          order: user?._id === message.sender._id ? 2 : 1,
        }}
      >
        {message.sender.firstname} {message.sender.lastname}
      </span>
      <span
        className="time"
        style={{
          order: user?._id === message.sender._id ? 1 : 2,
        }}
      >
        {formatRelative(new Date(message.createdAt), new Date())}
      </span>
    </MessageItemHeaderContainer>
  );
};
