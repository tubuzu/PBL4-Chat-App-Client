import styled from "styled-components";

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

export const ButtonForward = styled.div`
  padding: 10px 8px 10px 12px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  transition: ease .2s;
  cursor: pointer;
  &:hover {
    background: #ffffff;
    & svg {
      color: #000000 !important;
    }
  }
`;
