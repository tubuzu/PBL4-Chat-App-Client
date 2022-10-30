import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FriendPageNavbar } from "src/components/navbar/FriendsPageNavbar";
import { FriendsPage } from "./FriendsPage";

function FriendsLayoutPage() {
  const { pathname } = useLocation();
  return (
    <Box sx={{backgroundColor: '#101010', height: '100%', width: '100%'}}>
      <FriendPageNavbar />
      {pathname === "/home/friends" && <FriendsPage />}
      <Outlet />
    </Box>
  );
}

export default FriendsLayoutPage;
