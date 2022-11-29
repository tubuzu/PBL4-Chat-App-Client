import React, { FC, useRef, Dispatch, SetStateAction } from 'react';
import { FileInput } from 'src/utils/styles/Inputs';
import { SettingsProfileBanner } from 'src/Pages/SettingsPage/styles';
import { DivMouseEvent, InputChangeEvent } from 'src/utils/types';

type Props = {
  bannerSource: string;
  bannerSourceCopy: string;
  setBannerSourceCopy: Dispatch<SetStateAction<string>>;
  setBannerFile: Dispatch<SetStateAction<File | undefined>>;
};

export const UserBanner: FC<Props> = ({
  bannerSource,
  bannerSourceCopy,
  setBannerSourceCopy,
  setBannerFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const onBannerClick = (e: DivMouseEvent) => fileInputRef.current?.click();
  const onFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    setBannerSourceCopy(file ? URL.createObjectURL(file) : bannerSource);
    setBannerFile(file || undefined);
  };
console.log(bannerSourceCopy)
  return (
    <>
      <SettingsProfileBanner
        ref={bannerRef}
        onClick={onBannerClick}
        backgroundUrl={bannerSourceCopy}
      />
      <FileInput
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileChange}
      />
    </>
  );
};