import React from "react";
import "./App.css";
import Authpage from "./Pages/Authentication/Authpage";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import { PropsWithChildren } from "react";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { ConversationPage } from "src/Pages/Conversation/ConversationPage";
import { ConversationPageGuard } from "./guards/ConversationPageGuard";
import { ConversationChannelPage } from "./Pages/Conversation/ConversationChannelPage";
import GroupPage from "./Pages/GroupPage/GroupPage";
import FriendsLayoutPage from "./Pages/Friends/FriendsLayoutPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import { Socket } from "socket.io-client";
import { Provider as ReduxProvider } from "react-redux";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { store } from "./store";
import NotFoundPage from "./Pages/NotFound/NotFoundPage";
import { GroupPageGuard } from "./guards/GroupPageGuard";
import { GroupChannelPage } from "./Pages/GroupPage/GroupChannelPage";
import { FriendRequestPage } from "./Pages/Friends/FriendRequestPage";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraTheme } from "./utils/themes";
import { SettingsProfilePage } from "./Pages/SettingsPage/SettingsProfilePage";
import ProfileLayoutPage from "./Pages/ProfilePage/ProfileLayoutPage";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import SettingsSecurityPage from "./Pages/SettingsPage/SettingsSecurityPage";
import SettingsAppearancePage from "./Pages/SettingsPage/SettingsAppearancePage";

type Props = {
  socket: Socket;
};

function AppWithProviders({ children }: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </ReduxProvider>
  );
}

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={ChakraTheme}>
        <AppWithProviders socket={socket}>
          <Routes>
            <Route path="/" element={<Authpage />} />
            <Route
              path="/home"
              element={<AuthenticatedRoute children={<Homepage />} />}
            >
              <Route path="conversations" element={<ConversationPage />}>
                <Route
                  path=":id"
                  element={
                    <ConversationPageGuard
                      children={<ConversationChannelPage />}
                    />
                  }
                />
              </Route>
              <Route path="groups" element={<GroupPage />}>
                <Route
                  path=":id"
                  element={<GroupPageGuard children={<GroupChannelPage />} />}
                />
              </Route>
              <Route path="friends" element={<FriendsLayoutPage />}>
                <Route path="requests" element={<FriendRequestPage />} />
              </Route>
              <Route path="profile" element={<ProfileLayoutPage />}>
                <Route
                  path=":id"
                  element={
                    <ProfilePage />
                  }
                />
              </Route>
              <Route path="settings" element={<SettingsPage />}>
                <Route path="profile" element={<SettingsProfilePage />} />
                <Route path="security" element={<SettingsSecurityPage />} />
                <Route path="appearance" element={<SettingsAppearancePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppWithProviders>
      </ChakraProvider>
    </div>
  );
}

export default App;
