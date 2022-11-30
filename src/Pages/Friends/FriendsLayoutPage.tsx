import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FriendPageNavbar } from "src/components/navbar/FriendsPageNavbar";
import { Theme } from "src/utils/themes";
import { useTheme } from "styled-components";
import { FriendsPage } from "./FriendsPage";

function FriendsLayoutPage() {
  const { pathname } = useLocation();
  const theme = useTheme() as Theme;

  return (
    <Box sx={{backgroundColor: theme.background.primary, height: '100%', width: '100%'}}>
      <FriendPageNavbar />
      {pathname === "/home/friends" && <FriendsPage />}
      <Outlet />
    </Box>
  );
}

export default FriendsLayoutPage;
