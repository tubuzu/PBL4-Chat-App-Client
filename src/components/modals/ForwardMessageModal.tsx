import React, { useEffect, createRef, useState } from "react";
import { OverlayStyle } from "./styles";
import { ModalContainer, ModalContentBody, ModalHeader } from ".";
import { Box, Text } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useTheme } from "styled-components";
import { Theme } from "src/utils/themes";
import { ConversationSearchbar, ScrollableContainer } from "../sidebars/styles";
import { chatTypes } from "../../utils/constants";
import {
  ConversationTabItemStyle,
  ConversationTabStyle,
} from "../conversations/styles";
import { useDispatch } from "react-redux";
import { setIsForwarding } from "src/store/messageContainerSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { getRecipientFromConversation } from "src/utils/helpers";
import { Conversation, Group } from "src/utils/types";
import { ForwardConversationItem } from "./items/ForwardConversationItem";
import { forwardMessage } from "src/utils/apis";
import { useParams } from "react-router-dom";
import { fetchConversationsThunk } from "src/store/conversationSlice";
import { fetchGroupsThunk } from "src/store/groupSlice";

type conversationType = "private" | "group";

export const ForwardMessageModal = () => {
  const ref = createRef<HTMLDivElement>();
  const theme = useTheme() as Theme;
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<conversationType>("private");

  const user = useSelector((state: RootState) => state.authentication.userData);
  let conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  conversations = conversations.filter((conv) => conv._id !== id);
  let groups = useSelector((state: RootState) => state.groups.groups);
  groups = groups.filter((group) => group._id !== id);
  const { messageBeingForward } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const onForwardClick = (conversation: Conversation | Group) => {
    forwardMessage(conversation._id, selectedType, messageBeingForward!);
  };
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { current } = ref;
    if (current === e.target) {
      console.log("Close Modal");
      dispatch(setIsForwarding(false));
    }
  };
  const onSelectType = (type: conversationType) => {
    if (type === "private") setSelectedType("private");
    else setSelectedType("group");
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) =>
      e.key === "Escape" && dispatch(setIsForwarding(false));
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    dispatch(fetchConversationsThunk());
    dispatch(fetchGroupsThunk());
  }, []);

  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <Text sx={{ color: theme.text.primary }}>Forward Message</Text>
          <MdClose
            size={32}
            onClick={() => dispatch(setIsForwarding(false))}
            color={theme.text.primary}
            style={{ cursor: "pointer" }}
          />
        </ModalHeader>
        <ModalContentBody>
          <ConversationSearchbar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Conversations"
          />
          <ConversationTabStyle>
            {chatTypes.map((chat) => (
              <ConversationTabItemStyle
                selected={chat.type === selectedType}
                key={chat.type}
                onClick={() => onSelectType(chat.type)}
              >
                {chat.label}
              </ConversationTabItemStyle>
            ))}
          </ConversationTabStyle>
          <ScrollableContainer>
            <Box>
              {selectedType === "private"
                ? query
                  ? conversations
                      .filter((conv) =>
                        `${
                          getRecipientFromConversation(conv, user)?.firstname
                        } ${getRecipientFromConversation(conv, user)?.lastname}`
                          .toLowerCase()
                          .includes(query.toLowerCase())
                      )
                      .map((conversation) => (
                        <ForwardConversationItem
                          key={conversation._id}
                          selectedType={selectedType}
                          conversation={conversation}
                          onForwardClick={onForwardClick}
                        />
                      ))
                  : conversations.map((conversation) => (
                      <ForwardConversationItem
                        key={conversation._id}
                        selectedType={selectedType}
                        conversation={conversation}
                        onForwardClick={onForwardClick}
                      />
                    ))
                : query
                ? groups
                    .filter((group) =>
                      group?.title?.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((group) => (
                      <ForwardConversationItem
                        key={group._id}
                        selectedType={selectedType}
                        conversation={group}
                        onForwardClick={onForwardClick}
                      />
                    ))
                : groups.map((group) => (
                    <ForwardConversationItem
                      key={group._id}
                      selectedType={selectedType}
                      conversation={group}
                      onForwardClick={onForwardClick}
                    />
                  ))}
            </Box>
          </ScrollableContainer>
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
