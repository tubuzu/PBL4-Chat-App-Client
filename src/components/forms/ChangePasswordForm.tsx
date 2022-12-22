import React, { useState } from "react";
import { changePassword } from "src/Pages/SettingsPage/queries";
import { useToastHook } from "src/utils/hooks/useToast";
import styled from "styled-components";
import styles from "./index.module.scss";
import { ButtonSubmit, InputLabel, InputOutlineField } from "./styles";

const FieldSession = styled.div`
  margin: 10px 0;
`;

function ChangePasswordForm() {
  const { success, error } = useToastHook();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetForm = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !newPassword || !confirmPassword) {
      error("Do not leave empty fields!");
      return;
    }
    if (newPassword !== confirmPassword) {
      error("Confirm password is not match new password!");
      return;
    }
    if (password === confirmPassword) {
      error("New password is the same as old password!");
      return;
    }
    async function handleChangePassword() {
      const response = await changePassword({
        password: password,
        newPassword: confirmPassword,
      });
      if (response.data) success(response.data);
    }
    handleChangePassword().then(() => resetForm());
  };
  return (
    <form className={styles.changePasswordForm} onSubmit={onSubmit}>
      <FieldSession>
        <InputLabel>Password</InputLabel>
        <InputOutlineField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </FieldSession>
      <FieldSession>
        <InputLabel>New password</InputLabel>
        <InputOutlineField
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
        />
      </FieldSession>
      <FieldSession>
        <InputLabel>Confirm password</InputLabel>
        <InputOutlineField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />
      </FieldSession>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <ButtonSubmit>OK</ButtonSubmit>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
