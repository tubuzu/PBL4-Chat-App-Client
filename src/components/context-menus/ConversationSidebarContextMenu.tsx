import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ContextMenu, ContextMenuItem } from "./styles";
import { useNavigate } from "react-router-dom";
import { Person } from "akar-icons";

export const ConversationSidebarContextMenu: FC = () => {
  const points = useSelector((state: RootState) => state.conversations.points);
  const user = useSelector((state: RootState) => state.authentication.userData);
  const navigate = useNavigate();

  const contextMenuConversation = useSelector(
    (state: RootState) => state.conversations.selectedContextMenu
  );
  const recipientId = user._id === contextMenuConversation?.creator?._id ? contextMenuConversation?.recipient?._id : contextMenuConversation?.creator?._id

  const seeProfile = () => {
    if (!contextMenuConversation) return;
    console.log(`See profile User: ${recipientId}`);
    navigate(`/home/profile/${recipientId}`);
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem onClick={seeProfile}>
        <Person size={20} color="#7c7c7c" />
        <span style={{ color: '#7c7c7c' }}>Profile</span>
      </ContextMenuItem>
    </ContextMenu>
  );
};
