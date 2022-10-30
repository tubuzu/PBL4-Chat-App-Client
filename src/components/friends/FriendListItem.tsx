import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { FriendListItemContainer } from 'src/Pages/Friends/styles';
import { ContextMenuEvent, Friend } from '../../utils/types';
import { UserAvatar } from '../users/UserAvatar';

type Props = {
  friend: Friend;
  online: boolean;
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void;
};

export const FriendListItem: FC<Props> = ({
  friend,
  online,
  onContextMenu,
}) => {
  const user = useSelector((state: RootState) => state.authentication.userData);
  const friendUserInstance =
    user?._id === friend.sender._id ? friend.receiver : friend.sender;

  return (
    <FriendListItemContainer
      onContextMenu={(e) => onContextMenu(e, friend)}
      online={online}
    >
      <UserAvatar user={friendUserInstance} />
      <div className="friendDetails">
        <span className="username">{friendUserInstance.username}</span>
        {online && (
          <span className="status">
            {friendUserInstance.statusMessage}
          </span>
        )}
      </div>
    </FriendListItemContainer>
  );
};
