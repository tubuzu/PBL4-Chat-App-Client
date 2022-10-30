import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { ModalContainer, ModalContentBody, ModalHeader } from ".";

import { UpdateUserStatusForm } from "../forms/status/UpdateUserStatusForm";

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000e3;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

type ModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const UpdatePresenceStatusModal: FC<ModalProps> = ({ setShowModal }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <OverlayStyle ref={ref}>
      <ModalContainer>
        <ModalHeader>
          <h2>Set Custom Status</h2>
          <MdClose size={32} onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalContentBody>
          <UpdateUserStatusForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
