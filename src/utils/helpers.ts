import {
  ChatDots,
  Crown,
  Minus,
  Person,
  PersonCross,
  Gear,
} from 'akar-icons';
import {
  IoIosPerson,
  IoIosNotifications,
  IoIosLock,
  IoMdInfinite,
  IoMdColorPalette,
} from 'react-icons/io';
import {
  Conversation,
  Friend,
  FriendRequest,
  FriendRequestDetailsType,
  Group,
  SettingsSidebarRouteType,
  User,
  UserContextMenuActionType,
  UserSidebarRouteType,
} from './types';

export const getRecipientFromConversation = (
  conversation?: Conversation,
  user?: User
) => {
  return user?._id === conversation?.creator._id
    ? conversation?.recipient
    : conversation?.creator;
};

export const getUserContextMenuIcon = (type: UserContextMenuActionType) => {
  switch (type) {
    case 'kick':
      return { icon: PersonCross, color: '#ff0000' };
    case 'transfer_owner':
      return { icon: Crown, color: '#FFB800' };
    default:
      return { icon: Minus, color: '#7c7c7c' };
  }
};

export const isGroupOwner = (user?: User, group?: Group) =>
  user?._id === group?.owner._id;

export const getUserSidebarIcon = (_id: UserSidebarRouteType) => {
  switch (_id) {
    case 'conversations':
      return ChatDots;
    case 'friends':
      return Person;
    case 'settings':
      return Gear;
    default:
      return ChatDots;
  }
};

export const getSettingSidebarIcon = (_id: SettingsSidebarRouteType) => {
  switch (_id) {
    case 'profile':
      return IoIosPerson;
    case 'security':
      return IoIosLock;
    case 'notifications':
      return IoIosNotifications;
    case 'integrations':
      return IoMdInfinite;
    case 'appearance':
      return IoMdColorPalette;
  }
};

export const getFriendRequestDetails = (
  { receiver, sender }: FriendRequest,
  user?: User
): FriendRequestDetailsType =>
  user?._id === receiver._id
    ? {
      status: 'Incoming Friend Request',
      displayName: `${sender.firstname} ${sender.lastname}`,
      user: sender,
      incoming: true,
    }
    : {
      status: 'Outgoing Friend Request',
      displayName: `${receiver.firstname} ${receiver.lastname}`,
      user: receiver,
      incoming: false,
    };

export const getUserFriendInstance = (
  authenticatedUser: User,
  selectedFriend: Friend
) =>
  authenticatedUser?._id === selectedFriend?.sender._id
    ? selectedFriend?.receiver
    : selectedFriend?.sender;

export const getToken = () => localStorage.getItem("token")?.replaceAll('"', '');
export const getUserData = () => localStorage.getItem("userData");
