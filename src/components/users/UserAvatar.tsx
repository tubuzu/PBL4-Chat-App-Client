import React, { FC } from "react";
import { UserAvatarContainer } from "./styles";
import { User } from "../../utils/types";
import defaultAvatar from "src/assets/default_avatar.jpg";

type Props = {
  user: User;
};

export const UserAvatar: FC<Props> = ({ user }) => {
  const getProfilePicture = () => {
    const { avatar } = user;
    return avatar
      ? avatar.url
      : defaultAvatar;
  };

  return <UserAvatarContainer src={getProfilePicture()} alt="avatar" />;
};
