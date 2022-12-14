import React from "react";
import { settingsItems } from "../../../utils/constants";
import {
  SettingsSidebarHeader,
  SettingsSidebarItemContainer,
  SettingsSidebarItemStyle,
  SettingsSidebarStyle,
} from "src/components/sidebars/styles";
import { SettingsSidebarItem } from "../items/SettingsSidebarItem";
import { useDispatch } from "react-redux";
import { logoutThunk } from "src/store/authenticationSlice";
import { AppDispatch } from "src/store";
import { IoLogOutOutline } from "react-icons/io5";

export const SettingsSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    await dispatch(logoutThunk());
    window.location.href = process.env.REACT_APP_URL!;
  };

  return (
    <SettingsSidebarStyle>
      <SettingsSidebarHeader>
        <span>Settings</span>
      </SettingsSidebarHeader>
      <SettingsSidebarItemContainer>
        {settingsItems.map((item) => (
          <SettingsSidebarItem key={item._id} item={item} />
        ))}
        <SettingsSidebarItemStyle onClick={handleLogout} isActive={true}>
          <div className="logout-btn">
            <IoLogOutOutline size={30} strokeWidth={2} />
            <span>Logout</span>
          </div>
        </SettingsSidebarItemStyle>
      </SettingsSidebarItemContainer>
    </SettingsSidebarStyle>
  );
};
