import React from "react";
import { useState } from "react";
import styled from "styled-components";
import styles from "./index.module.scss";
import avatar from "src/assets/default_avatar.jpg";
import { userSidebarItems } from "src/utils/constants";
import { Image } from "@chakra-ui/react";
import { User } from "src/utils/types";
import { useSelector } from "react-redux";
import { UserSidebarItem } from "./items/UserSidebarItem";
import { UpdatePresenceStatusModal } from "../modals/UpdatePresenceStatusModal";
import { RootState } from "src/store";
import { Theme } from "src/utils/themes";

const UserSidebarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserSidebarStyle = styled.div`
  height: 100%;
  background-color: ${({ theme }: { theme: Theme }) =>
    theme?.userSidebar?.backgroundColor};
  border-right: ${({ theme }: { theme: Theme }) => theme?.border?.primary};
  display: flex;
  flex: 0 0 80px;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(
    (state: RootState) => state.authentication.userData as unknown as User
  );

  return (
    <>
      {showModal && <UpdatePresenceStatusModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <Image
          sx={{
            width: "55px",
            height: "55px",
            borderRadius: "55px",
            margin: "10px 0",
            cursor: "pointer",
          }}
          src={user?.avatar ? user?.avatar.url : avatar}
          alt="avatar"
          onClick={() => setShowModal(true)}
        />
        <hr className={styles.hr} />
        <UserSidebarContainer>
          <div>
            {userSidebarItems.map((item, index) => {
              if (index !== userSidebarItems.length - 1)
                return <UserSidebarItem item={item} key={item._id} />;
            })}
          </div>
          <UserSidebarItem
            item={userSidebarItems[userSidebarItems.length - 1]}
            key={userSidebarItems[userSidebarItems.length - 1]._id}
          />
        </UserSidebarContainer>
      </UserSidebarStyle>
    </>
  );
};
