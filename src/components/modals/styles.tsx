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

// export const ButtonForward = styled.div`
//   padding: 10px 8px 10px 12px;
//   border-radius: ;
//   border: 2px solid #ffffff;
//   transition: ease .2s;
//   cursor: pointer;
//   &:hover {
//     background: #ffffff;
//     & svg {
//       color: #000000 !important;
//     }
//   }
// `;

export const ButtonForward = styled.button`
  width: 80px;
  outline: none;
  border: none;
  font-family: 'Inter';
  font-size: 16px;
  background-color: #0c6930;
  color: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 500;
  transition: 250ms background-color ease;
  &:hover {
    cursor: pointer;
    background-color: #1da953;
  }
  &:active {
    background-color: #1da953;
  }
  &:disabled {
    background-color: #3d3d3d;
    cursor: not-allowed;
  }
`;