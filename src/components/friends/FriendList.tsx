import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store';
import { FriendListContainer } from 'src/Pages/Friends/styles';
import { FriendListItem } from './FriendListItem';
import { FriendContextMenu } from '../context-menus/FriendContextMenu';
import { ContextMenuEvent, Friend } from '../../utils/types';
import {
  setContextMenuLocation,
  setSelectedFriend,
  toggleContextMenu,
} from '../../store/friends/friendsSlice';

export const FriendList = () => {
  const { showContextMenu, friends, onlineFriends } = useSelector(
    (state: RootState) => state.friends
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false));
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const onContextMenu = (e: ContextMenuEvent, friend: Friend) => {
    e.preventDefault();
    console.log('Friend Context Menu');
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedFriend(friend));
  };

  return (
    <FriendListContainer>
      {onlineFriends.length > 0 && <span>Online ({onlineFriends.length})</span>}
      {onlineFriends.map((friend) => (
        <FriendListItem
          key={friend._id}
          friend={friend}
          onContextMenu={onContextMenu}
          online={true}
        />
      ))}
      <div style={{marginTop: '10px'}}><span>Offline</span></div>
      {friends
        .filter(
          (friend) =>
            !onlineFriends.find((onlineFriend) => onlineFriend._id === friend._id)
        )
        .map((friend) => (
          <FriendListItem
            key={friend._id}
            friend={friend}
            onContextMenu={onContextMenu}
            online={false}
          />
        ))}
      {showContextMenu && <FriendContextMenu />}
    </FriendListContainer>
  );
};
