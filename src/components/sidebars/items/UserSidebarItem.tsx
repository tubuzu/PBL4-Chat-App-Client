import React, { FC } from "react";
// import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserSidebarIcon } from "../../../utils/helpers";
import { UserSidebarItemType } from "../../../utils/types";

import styled, { css } from 'styled-components';
import { SidebarItemProps } from "src/utils/styleTypes";
// import { IRootState } from "src/store/reducers";

export const UserSidebarItemStyle = styled.div<SidebarItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 18px;
  box-sizing: border-box;
  background-color: ${({ active }) => active && '#2b2b2b'};
  position: relative;
  &:hover {
    background-color: #1e1e1e;
  }
`;

export const IconBadge = styled.div`
  background-color: #ff3535;
  height: 20px;
  width: 20px;
  border-radius: 5px;
  position: absolute;
  top: 2px;
  right: 4px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  item: UserSidebarItemType;
};

export const UserSidebarItem: FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const friendRequests = useSelector(
  //   (state: IRootState) => state.friends.friendRequests
  // );
  const Icon = getUserSidebarIcon(item._id);
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;

  const isActive = () => {
    if (pathname.includes("/groups") && item._id === "conversations")
      return true;
    return pathname.includes(item.pathname);
  };
  return (
    <UserSidebarItemStyle
      onClick={() => navigate(item.pathname)}
      active={isActive()}
    >
      <Icon size={ICON_SIZE} strokeWidth={STROKE_WIDTH} stroke="white" />
      {/* {item.id === "friends" && friendRequests.length > 0 && (
        <IconBadge>
          {friendRequests.length > 9 ? "10+" : friendRequests.length}
        </IconBadge>
      )} */}
    </UserSidebarItemStyle>
  );
};
