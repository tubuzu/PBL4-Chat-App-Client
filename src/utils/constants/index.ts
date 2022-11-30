import {
    ContextMenuItemType,
    ConversationTypeData,
    SettingsItemType,
    UserSidebarItemType,
} from '../types';

export const chatTypes: ConversationTypeData[] = [
    {
        type: 'private',
        label: 'Private',
    },
    {
        type: 'group',
        label: 'Group',
    },
];

export const userContextMenuItems: ContextMenuItemType[] = [
    {
        label: 'Kick User',
        action: 'kick',
        color: '#ff0000',
        ownerOnly: true,
    },
    {
        label: 'Transfer Owner',
        action: 'transfer_owner',
        color: '#FFB800',
        ownerOnly: true,
    },
    {
        label: 'Profile',
        action: 'profile',
        color: '#7c7c7c',
        ownerOnly: false,
    },
];

export const friendsNavbarItems = [
    {
        id: 'friends',
        label: 'Friends',
        pathname: '/home/friends',
    },
    {
        id: 'requests',
        label: 'Requests',
        pathname: '/home/friends/requests',
    },
    // {
    //     id: 'blocked',
    //     label: 'Blocked',
    //     pathname: '/home/friends/blocked',
    // },
];

export const userSidebarItems: UserSidebarItemType[] = [
    {
        _id: 'conversations',
        pathname: '/home/conversations',
    },
    {
        _id: 'friends',
        pathname: '/home/friends',
    },
    {
        _id: 'settings',
        pathname: '/home/settings',
    },
];

export const settingsItems: SettingsItemType[] = [
    {
        _id: 'profile',
        label: 'Profile',
        pathname: '/home/settings/profile',
    },
    {
        _id: 'security',
        label: 'Security',
        pathname: '/home/settings/security',
    },
    // {
    //     _id: 'notifications',
    //     label: 'Notifications',
    //     pathname: '/home/settings/notifications',
    // },
    // {
    //     _id: 'integrations',
    //     label: 'Integrations',
    //     pathname: '/home/settings/integrations',
    // },
    {
        _id: 'appearance',
        label: 'Appearance',
        pathname: '/home/settings/appearance',
    },
];