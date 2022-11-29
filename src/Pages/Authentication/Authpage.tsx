import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../../components/forms/LoginForm";
import Signup from "../../components/forms/SignupForm";
import NotificationWrapper from "../Notification/NotificationWrapper";

function Authpage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")!);

    if (user) navigate("/home/conversations");
  }, [navigate]);

  return (
    <NotificationWrapper>
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg="var(--main-form-background)"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
        >
          <Text
            fontSize="4xl"
            fontWeight={700}
            textAlign="center"
            color="var(--main-title-color)"
          >
            BK Zalo
          </Text>
        </Box>
        <Box bg="var(--main-form-background)" w="100%" p={4} borderRadius="lg">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab
                color="white"
                _hover={{ bg: "#505050", color: "white" }}
                _selected={{ color: "black", bg: "white" }}
                sx={{ marginRight: "10px" }}
              >
                Login
              </Tab>
              <Tab
                color="white"
                _hover={{ bg: "#505050", color: "white" }}
                _selected={{ color: "black", bg: "white" }}
              >
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </NotificationWrapper>
  );
}

export default Authpage;
