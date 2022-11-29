import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { Edit } from "akar-icons";
import { UserBanner } from "src/components/setttings/profile/UserBanner";
import { OverlayStyle } from "src/components/modals/styles";
import {
  Page,
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileDescriptionField,
  ProfileSection,
  SettingsProfileUserDetails,
} from "src/Pages/SettingsPage/styles";
import { AppDispatch, RootState } from "src/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UserAvatar } from "src/components/setttings/profile/UserAvatar";

export const SettingsProfilePage = () => {
  const user = useSelector((state: RootState) => state.authentication.userData);

  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarSource, setAvatarSource] = useState(user?.avatar.url || "");
  const [avatarSourceCopy, setAvatarSourceCopy] = useState(avatarSource);

  const [bannerSource, setBannerSource] = useState(user?.background.url || "");
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [about, setAbout] = useState(user?.about || "");
  const [aboutCopy, setAboutCopy] = useState(about);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("Updating About");
    setAbout(user?.about || "");
  }, [user?.about]);

  useEffect(() => {
    console.log("Updating Banner URL");
    console.log(user?.background.url);
    setBannerSource(user?.background.url || "");
    setBannerSourceCopy(user?.background.url || "");
  }, [user?.background.url]);

  const isChanged = () => aboutCopy !== about || bannerFile || avatarFile;

  const reset = () => {
    setAboutCopy(about);
    setBannerSourceCopy(bannerSource);
    setAvatarSourceCopy(avatarSource);
    setIsEditing(false);
    setAvatarFile(undefined);
    setBannerFile(undefined);
    URL.revokeObjectURL(bannerSourceCopy);
    URL.revokeObjectURL(avatarSourceCopy);
  };

  return (
    <>
      {loading && (
        <OverlayStyle>
          <MoonLoader size={40} color="#fff" />
        </OverlayStyle>
      )}
      <Page>
        <UserBanner
          bannerSource={bannerSource}
          bannerSourceCopy={bannerSourceCopy}
          setBannerSourceCopy={setBannerSourceCopy}
          setBannerFile={setBannerFile}
        />
        <ProfileSection>
          <SettingsProfileUserDetails>
            <UserAvatar
              avatarSource={avatarSource}
              avatarSourceCopy={avatarSourceCopy}
              setAvatarSourceCopy={setAvatarSourceCopy}
              setAvatarFile={setAvatarFile}
            />
            <span>@{user?.username}</span>
          </SettingsProfileUserDetails>
          <ProfileAboutSection>
            <ProfileAboutSectionHeader>
              <label htmlFor="about">About Me</label>
              <Edit
                cursor="pointer"
                strokeWidth={2}
                size={28}
                onClick={() => setIsEditing(!isEditing)}
              />
            </ProfileAboutSectionHeader>
            <ProfileDescriptionField
              maxLength={200}
              disabled={!isEditing}
              value={aboutCopy}
              onChange={(e) => setAboutCopy(e.target.value)}
            />
          </ProfileAboutSection>
        </ProfileSection>
      </Page>
    </>
  );
};
