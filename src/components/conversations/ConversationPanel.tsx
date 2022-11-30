import React from "react";
import Robot from "src/assets/robot.gif";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { Text } from "@chakra-ui/react";
import { useTheme } from "styled-components";
import { Theme } from "src/utils/themes";

export const ConversationPanel = () => {
  const theme = useTheme() as Theme;
  const user = useSelector((state: RootState) => state.authentication.userData);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        background: theme?.background?.primary,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        flexDirection: "column",
      }}
    >
      {/* ConversationPanel */}
      <img src={Robot} alt="" style={{ height: "20rem" }} />
      <Text fontSize="xl">
        Welcome,{" "}
        <Text as="span" sx={{ color: "#87e5ff", fontWeight: "bold" }}>
          {user.username}!
        </Text>
      </Text>
      <Text fontSize="xl">Please select a chat to Start messaging.</Text>
    </Box>
  );
};
