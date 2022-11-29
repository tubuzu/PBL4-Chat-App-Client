import React, { useContext, useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { Outlet } from "react-router-dom";
import { UserSidebar } from "src/components/sidebars/UserSidebar";
import { ThemeProvider } from "styled-components";
import { SelectableTheme } from "src/utils/types";
import { RootState } from "src/store";
import { useSelector } from "react-redux";
import { DarkTheme, LightTheme } from "src/utils/themes";
import { SocketContext } from "src/utils/context/SocketContext";
import NotificationWrapper from "./Notification/NotificationWrapper";

const Homepage = () => {
  const storageTheme = localStorage.getItem("theme") as SelectableTheme;
  const { theme } = useSelector((state: RootState) => state.settings);
  const socket = useContext(SocketContext);
  const user = useSelector((state: RootState) => state.authentication.userData);

  useEffect(() => {
    socket.emit("identity", user._id);
    return () => {
      socket.off("connected");
    };
  }, []);

  return (
    <NotificationWrapper>
      <ThemeProvider
        theme={
          storageTheme
            ? storageTheme.localeCompare("dark")
              ? DarkTheme
              : LightTheme
            : theme === "dark"
            ? DarkTheme
            : LightTheme
        }
      >
        <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
          <UserSidebar />
          <Outlet />
        </Box>
      </ThemeProvider>
    </NotificationWrapper>
  );
};

export default Homepage;
