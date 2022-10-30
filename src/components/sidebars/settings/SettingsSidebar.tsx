import React from 'react';
import { settingsItems } from '../../../utils/constants';
import {
  SettingsSidebarHeader,
  SettingsSidebarItemContainer,
  SettingsSidebarStyle,
} from 'src/components/sidebars/styles';
import { SettingsSidebarItem } from '../items/SettingsSidebarItem';

export const SettingsSidebar = () => {
  return (
    <SettingsSidebarStyle>
      <SettingsSidebarHeader>
        <span>Settings</span>
      </SettingsSidebarHeader>
      <SettingsSidebarItemContainer>
        {settingsItems.map((item) => (
          <SettingsSidebarItem key={item._id} item={item} />
        ))}
      </SettingsSidebarItemContainer>
    </SettingsSidebarStyle>
  );
};
