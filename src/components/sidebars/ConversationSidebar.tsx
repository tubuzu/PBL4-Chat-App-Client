import React from "react";
import { Box } from "@chakra-ui/react";
import { ChatAdd } from "akar-icons";
import { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setContextMenuLocation as setGroupContextMenuLocation,
  setSelectedGroup,
  toggleContextMenu as toggleGroupContextMenu,
} from "../../store/groupSlice";
import {
  setContextMenuLocation,
  setSelectedConversation,
  toggleContextMenu,
} from "../../store/conversationSlice";
import {
  ConversationSearchbar,
  SidebarHeader,
  SidebarStyle,
  ScrollableContainer,
} from "./styles";
import { ContextMenuEvent, Conversation, Group } from "../../utils/types";
import { GroupSidebarContextMenu } from "../context-menus/GroupSidebarContextMenu";
import { ConversationSidebarItem } from "./items/ConversationSidebarItem";
import { ConversationTab } from "../conversations/ConversationTab";
import { GroupSidebarItem } from "../groups/GroupSidebarItem";
import { CreateConversationModal } from "../modals/CreateConversationModal";
import { CreateGroupModal } from "../modals/CreateGroupModal";
import { useTheme } from "styled-components";
import { Theme } from "src/utils/themes";
import { getRecipientFromConversation } from "src/utils/helpers";
import { ConversationSidebarContextMenu } from "../context-menus/ConversationSidebarContextMenu";

export const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.authentication.userData);
  const conversations = useSelector(
    (state: RootState) => state.conversations.conversations
  );
  const theme = useTheme() as Theme;
  const showGroupContextMenu = useSelector(
    (state: RootState) => state.groups.showGroupContextMenu
  );
  const showConversationContextMenu = useSelector(
    (state: RootState) => state.conversations.showContextMenu
  );
  const groups = useSelector((state: RootState) => state.groups.groups);
  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const [query, setQuery] = useState("");

  const onGroupContextMenu = (event: ContextMenuEvent, group: Group) => {
    event.preventDefault();
    dispatch(toggleGroupContextMenu(true));
    dispatch(setGroupContextMenuLocation({ x: event.pageX, y: event.pageY }));
    dispatch(setSelectedGroup(group));
  };

  const onConversationContextMenu = (
    event: ContextMenuEvent,
    conversation: Conversation
  ) => {
    event.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: event.pageX, y: event.pageY }));
    dispatch(setSelectedConversation(conversation));
  };

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      dispatch(toggleGroupContextMenu(false));
      dispatch(toggleContextMenu(false));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      dispatch(toggleGroupContextMenu(false));
      dispatch(toggleContextMenu(false));
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {showModal && conversationType === "private" && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      {showModal && conversationType === "group" && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}
      <SidebarStyle>
        <SidebarHeader>
          <ConversationSearchbar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Conversations"
          />
          {conversationType === "private" ? (
            <ChatAdd
              size={30}
              cursor="pointer"
              color={theme.text.primary}
              onClick={() => setShowModal(true)}
            />
          ) : (
            <AiOutlineUsergroupAdd
              size={30}
              cursor="pointer"
              color={theme.text.primary}
              onClick={() => setShowModal(true)}
            />
          )}
        </SidebarHeader>
        <ConversationTab />
        <ScrollableContainer>
          <Box>
            {conversationType === "private"
              ? query
                ? conversations
                    .filter((conv) => {
                      const recipient = getRecipientFromConversation(
                        conv,
                        user
                      );
                      return `${recipient?.firstname} ${recipient?.lastname}`
                        .toLowerCase()
                        .includes(query.toLowerCase());
                    })
                    .map((conversation) => (
                      <ConversationSidebarItem
                        key={conversation._id}
                        conversation={conversation}
                        onContextMenu={onConversationContextMenu}
                      />
                    ))
                : conversations.map((conversation) => (
                    <ConversationSidebarItem
                      key={conversation._id}
                      conversation={conversation}
                      onContextMenu={onConversationContextMenu}
                    />
                  ))
              : query
              ? groups
                  .filter((group) =>
                    group?.title?.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((group) => (
                    <GroupSidebarItem
                      key={group._id}
                      group={group}
                      onContextMenu={onGroupContextMenu}
                    />
                  ))
              : groups.map((group) => (
                  <GroupSidebarItem
                    key={group._id}
                    group={group}
                    onContextMenu={onGroupContextMenu}
                  />
                ))}
            {showConversationContextMenu && <ConversationSidebarContextMenu />}
            {showGroupContextMenu && <GroupSidebarContextMenu />}
          </Box>
        </ScrollableContainer>
        <footer></footer>
      </SidebarStyle>
    </>
  );
};
