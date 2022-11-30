import React from "react";
import styled from "styled-components";
import { FcKey } from "react-icons/fc";
import ChangePasswordForm from "src/components/forms/ChangePasswordForm";

const SettingsSecurityLayout = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background.primary};
  gap: 30px;
`;

const SettingSecuritySession = styled.div``;

const SettingsSecuritySessionHeader = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.text.primary};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SettingsSecuritySessionContent = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.text.primary};
  font-weight: 700;
  padding: 0 30px;
`;

function SettingsSecurityPage() {
  return (
    <SettingsSecurityLayout>
      <SettingSecuritySession>
        <SettingsSecuritySessionHeader>
          <FcKey size={20} strokeWidth={2} />
          <p>Change password</p>
        </SettingsSecuritySessionHeader>
        <SettingsSecuritySessionContent>
          <ChangePasswordForm />
        </SettingsSecuritySessionContent>
      </SettingSecuritySession>
    </SettingsSecurityLayout>
  );
}

export default SettingsSecurityPage;
