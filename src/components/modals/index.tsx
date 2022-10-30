import React, { FC, PropsWithChildren } from "react";
import styled, { keyframes } from "styled-components";

export const fadeInUpwards = keyframes`
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

type ModalProps = Partial<{
  showModal: boolean;
}>;

export const ModalContainerStyle = styled.div<ModalProps>`
  position: relative;
  background-color: #121212;
  width: 650px;
  box-sizing: border-box;
  border-radius: 10px;
  animation: ${fadeInUpwards} 500ms ease;
`;

export const ModalContentBodyStyle = styled.div`
  padding: 24px;
  position: relative;
`;

export const ModalHeaderStyle = styled.header`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  & h2 {
    font-weight: 500;
    margin: 0;
  }
`;

export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
  return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
};

export const ModalContentBody: FC<PropsWithChildren> = ({ children }) => {
  return <ModalContentBodyStyle>{children}</ModalContentBodyStyle>;
};

type ModalContainerProps = {
  showModal?: boolean;
};

export const ModalContainer: FC<PropsWithChildren & ModalContainerProps> = ({
  children,
  showModal,
}) => {
  console.log(`showModal: ${showModal}`);
  return (
    <ModalContainerStyle showModal={showModal}>{children}</ModalContainerStyle>
  );
};
