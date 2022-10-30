import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { updateStatusMessage } from "src/Pages/SettingsPage/queries";
import {
  InputContainer,
  InputContainerHeader,
  InputField,
  InputLabel,
} from "../styles";
import styles from "../index.module.scss";
import { useSelector } from "react-redux";
import { User } from "src/utils/types";
import { Button } from "@chakra-ui/react";
import { useToastHook } from "src/utils/hooks/useToast";
import { RootState } from "src/store";

type FormProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const UpdateUserStatusForm: FC<FormProps> = ({ setShowModal }) => {
  const user = useSelector(
    (state: RootState) => state.authentication.userData as User
  );
  const { success, error } = useToastHook();
  const [statusMessage, setStatusMessage] = useState(user?.statusMessage || "");

  const saveStatus = (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("Updating Status...");
    updateStatusMessage({ statusMessage })
      .then(() => {
        success("Updated Status!");
        setShowModal(false);
        console.log(user)
      })
      .catch((err) => {
        console.log(err);
        error("Failed to Update Status");
      });
  };

  return (
    <form className={styles.updateUserStatusForm} onSubmit={saveStatus}>
      <InputContainer backgroundColor="#0A0A0A">
        <InputContainerHeader>
          <InputLabel htmlFor="message">Message</InputLabel>
        </InputContainerHeader>
        <InputField
          type="test"
          id="message"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
        />
      </InputContainer>
      <div className={styles.updateStatusFormButtons}>
        <Button colorScheme="green" size="md" onClick={saveStatus}>
          Save
        </Button>
      </div>
    </form>
  );
};
