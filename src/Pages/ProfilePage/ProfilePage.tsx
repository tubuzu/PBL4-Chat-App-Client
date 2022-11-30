import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { OverlayStyle } from "src/components/modals/styles";
import {
  Page,
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileBanner,
  ProfileDescriptionField,
  ProfileSection,
  SettingsProfileUserDetails,
  UserAvatarContainer,
} from "src/Pages/ProfilePage/styles";
import { UserProfileResponse } from "src/utils/types";
import { useParams } from "react-router-dom";
import { getProfileById } from "./queries";

export const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<UserProfileResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      console.log(id)
      const response = await getProfileById(id!);
      console.log(response);
      setProfile(response.data);
    }
    fetchData();
  }, [id]);

  return (
    <>
      {loading && (
        <OverlayStyle>
          <MoonLoader size={40} color="#fff" />
        </OverlayStyle>
      )}
      <Page>
        <ProfileBanner backgroundUrl={profile?.background?.url} />
        <ProfileSection>
          <SettingsProfileUserDetails>
            <UserAvatarContainer url={profile?.background?.url} />
            <span>@{profile?.username}</span>
          </SettingsProfileUserDetails>
          <ProfileAboutSection>
            <ProfileAboutSectionHeader>
              <label htmlFor="about">About {profile?.username}</label>
            </ProfileAboutSectionHeader>
            <ProfileDescriptionField>
              {profile?.about}
            </ProfileDescriptionField>
          </ProfileAboutSection>
        </ProfileSection>
      </Page>
    </>
  );
};
