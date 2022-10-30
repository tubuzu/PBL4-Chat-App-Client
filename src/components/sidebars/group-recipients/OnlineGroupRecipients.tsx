import { Crown } from "akar-icons";
import React, { FC } from "react";
import { GroupRecipientSidebarItem } from "../styles";
import { ContextMenuEvent, Group, User } from "../../../utils/types";
import { UserAvatar } from "../../users/UserAvatar";

type Props = {
  users: User[];
  group?: Group;
  onUserContextMenu: (e: ContextMenuEvent, user: User) => void;
};

export const OnlineGroupRecipients: FC<Props> = ({
  users,
  group,
  onUserContextMenu,
}) => {
  const formatStatusMessage = ({ statusMessage }: User) => {
    if (!statusMessage) return null;
    return statusMessage.length > 30
      ? statusMessage.slice(0, 30).concat("...")
      : statusMessage;
  };

  return (
    <>
      {users.map((user) => (
        <GroupRecipientSidebarItem
          key={user._id}
          online={true}
          onContextMenu={(e) => onUserContextMenu(e, user)}
        >
          <div className="left">
            <UserAvatar user={user} />
            <div className="recipientDetails">
              <span>{user.firstname}</span>
              <span className="status">{formatStatusMessage(user)}</span>
            </div>
          </div>
          {user._id === group?.owner._id && <Crown color="#ffbf00" />}
        </GroupRecipientSidebarItem>
      ))}
    </>
  );
};
