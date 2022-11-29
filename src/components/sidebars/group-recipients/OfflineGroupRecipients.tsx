import { Crown } from "akar-icons";
import React, { FC } from "react";
import { GroupRecipientSidebarItem } from "../styles";
import { ContextMenuEvent, Group, User } from "../../../utils/types";
import { UserAvatar } from "../../users/UserAvatar";

type Props = {
  onlineUsers: User[];
  group?: Group;
  onUserContextMenu: (e: ContextMenuEvent, user: User) => void;
};

export const OfflineGroupRecipients: FC<Props> = ({
  onlineUsers,
  group,
  onUserContextMenu,
}) => (
  <>
    {group?.users
      .filter(
        (user) => !onlineUsers.find((onlineUser) => onlineUser._id === user._id)
      )
      .map((user) => (
        <GroupRecipientSidebarItem
          key={user._id}
          online={false}
          onContextMenu={(e) => onUserContextMenu(e, user)}
        >
          <div className="left">
            <UserAvatar user={user} />
            <span>{user.firstname}</span>
          </div>
          {user._id === group?.owner._id && <Crown color="#ffbf00" />}
        </GroupRecipientSidebarItem>
      ))}
  </>
);
