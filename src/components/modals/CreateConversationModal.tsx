import React, { createRef, Dispatch, FC, useEffect } from "react";
import { ModalContainer, ModalContentBody, ModalHeader } from ".";
import { OverlayStyle } from "./styles";
import { CreateConversationForm } from "../forms/CreateConversationForm";
import { MdClose } from "react-icons/md";
import { Text } from "@chakra-ui/react";
import { Theme } from "src/utils/themes";
import { useTheme } from "styled-components";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationModal: FC<Props> = ({ setShowModal }) => {
  const ref = createRef<HTMLDivElement>();
  const theme = useTheme() as Theme;

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) =>
      e.key === "Escape" && setShowModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { current } = ref;
    if (current === e.target) {
      console.log("Close Modal");
      setShowModal(false);
    }
  };

  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <Text sx={{ color: theme.text.primary }}>Create a Conversation</Text>
          <MdClose
            size={32}
            onClick={() => setShowModal(false)}
            color={theme.text.primary}
            style={{ cursor: "pointer" }}
          />
        </ModalHeader>
        <ModalContentBody>
          {/* <ConversationTypeForm type={type} setType={setType} /> */}
          <CreateConversationForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
