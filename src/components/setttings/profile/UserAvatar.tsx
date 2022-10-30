import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import { FileInput } from 'src/utils/styles/Inputs';
import { DivMouseEvent, InputChangeEvent } from 'src/utils/types';
import { UserAvatarContainer } from './styles';

type Props = {
  avatarSource: string;
  avatarSourceCopy: string;
  setAvatarSourceCopy: Dispatch<SetStateAction<string>>;
  setAvatarFile: Dispatch<SetStateAction<File | undefined>>;
};

export const UserAvatar: FC<Props> = ({
  avatarSource,
  avatarSourceCopy,
  setAvatarSourceCopy,
  setAvatarFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onAvatarClick = (e: DivMouseEvent) => fileInputRef.current?.click();
  const onFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    setAvatarSourceCopy(file ? URL.createObjectURL(file) : avatarSource);
    setAvatarFile(file || undefined);
  };

  return (
    <>
      <UserAvatarContainer onClick={onAvatarClick} url={avatarSourceCopy} />
      <FileInput
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileChange}
      />
    </>
  );
};
