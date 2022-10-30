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
  ProfileEditActionBar,
  ProfileSection,
  SettingsProfileUserDetails,
} from "src/Pages/SettingsPage/styles";
import { Button } from "../../utils/styles/button";
import { AppDispatch, RootState } from "src/store";
import { useSelector } from "react-redux";
import { updateUserProfile } from "./queries";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "src/store/authenticationSlice";
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

  const save = async () => {
    const formData = new FormData();
    bannerFile && formData.append("background", bannerFile);
    avatarFile && formData.append("avatar", avatarFile);
    about !== aboutCopy && formData.append("about", aboutCopy);
    try {
      setLoading(true);
      const { data: updatedUser } = await updateUserProfile(formData);
      console.log(updatedUser);
      URL.revokeObjectURL(bannerSourceCopy);
      URL.revokeObjectURL(avatarSourceCopy);
      setBannerFile(undefined);
      setAvatarFile(undefined);
      dispatch(updateUserThunk(updatedUser))
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
        {isChanged() && (
          <ProfileEditActionBar>
            <div>
              <span>You have unsaved changes</span>
            </div>
            <div className="buttons">
              <Button
                size="md"
                variant="secondary"
                onClick={reset}
                disabled={loading}
              >
                Reset
              </Button>
              <Button size="md" onClick={save} disabled={loading}>
                Save
              </Button>
            </div>
          </ProfileEditActionBar>
        )}
      </Page>
    </>
  );
};
