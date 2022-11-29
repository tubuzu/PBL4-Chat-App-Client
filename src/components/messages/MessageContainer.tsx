import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { GroupMessageType, MessageType } from "../../utils/types";
import { SelectedMessageContextMenu } from "../context-menus/SelectedMessageContextMenu";
import { selectConversationMessage } from "../../store/messages/messageSlice";
import { selectGroupMessage } from "../../store/groupMessageSlice";
import { selectType } from "../../store/selectedSlice";
import { MessageItemHeader } from "./MessageItemHeader";
import { MessageItemContainerBody } from "./MessageItemContainerBody";
import { useHandleClick, useKeydown } from "../../utils/hooks";
import { UserAvatar } from "src/components/users/UserAvatar";
import {
  MessageContainerStyle,
  MessageItemContainer,
  MessageItemDetails,
} from "./styles";
import {
  editMessageContent,
  resetMessageContainer,
  setContextMenuLocation,
  setIsEditing,
  setSelectedMessage,
  toggleContextMenu,
} from "../../store/messageContainerSlice";
import { SystemMessageList } from "./system/SystemMessageList";
import { Box } from "@chakra-ui/react";
import { ForwardMessageModal } from "../modals/ForwardMessageModal";

export const MessageContainer = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.authentication.userData);
  const dispatch = useDispatch<AppDispatch>();
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, id!)
  );
  const groupMessages = useSelector((state: RootState) =>
    selectGroupMessage(state, id!)
  );
  const selectedType = useSelector((state: RootState) => selectType(state));
  const { showContextMenu } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const handleKeydown = (e: KeyboardEvent) =>
    e.key === "Escape" && dispatch(setIsEditing(false));
  const handleClick = () => dispatch(toggleContextMenu(false));

  const { isForwardingMessage } = useSelector(
    (state: RootState) => state.messageContainer
  );

  useKeydown(handleKeydown, [id]);
  useHandleClick(handleClick, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer());
    };
  }, [id]);

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType | GroupMessageType
  ) => {
    e.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedMessage(message));
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageContent(e.target.value));

  const mapMessages = (
    message: MessageType | GroupMessageType,
    index: number,
    messages: MessageType[] | GroupMessageType[]
  ) => {
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    const showMessageHeader =
      messages.length === index + 1 ||
      currentMessage.sender._id !== nextMessage.sender._id;
    return (
      <MessageItemContainer
        key={message._id}
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        {showMessageHeader ? (
          user?._id === message.sender._id ? (
            <>
              <MessageItemDetails>
                <MessageItemHeader message={message} />
                <MessageItemContainerBody
                  message={message}
                  onEditMessageChange={onEditMessageChange}
                  padding="8px 0 0 0"
                />
              </MessageItemDetails>
              <Box sx={{ margin: "0 10px 0 0" }}>
                <UserAvatar user={message.sender} />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ margin: "0 0 0 10px" }}>
                <UserAvatar user={message.sender} />
              </Box>
              <MessageItemDetails>
                <MessageItemHeader message={message} />
                <MessageItemContainerBody
                  message={message}
                  onEditMessageChange={onEditMessageChange}
                  padding="8px 0 0 0"
                />
              </MessageItemDetails>
            </>
          )
        ) : (
          <>
            <MessageItemContainerBody
              message={message}
              onEditMessageChange={onEditMessageChange}
              padding={
                user._id === message.sender._id ? "0 80px 0 0" : "0 0 0 80px"
              }
            />
          </>
        )}
      </MessageItemContainer>
    );
  };

  return (
    <MessageContainerStyle
      onScroll={(e) => {
        const node = e.target as HTMLDivElement;
        const scrollTopMax = node.scrollHeight - node.clientHeight;
        if (-scrollTopMax === node.scrollTop) {
          console.log("");
        }
      }}
    >
      <>
        {/* <SystemMessageList /> */}
        {selectedType === "private"
          ? conversationMessages?.messages.map(mapMessages)
          : groupMessages?.messages.map(mapMessages)}
      </>
      {showContextMenu && <SelectedMessageContextMenu />}
      {isForwardingMessage && <ForwardMessageModal />}
    </MessageContainerStyle>
  );
};
