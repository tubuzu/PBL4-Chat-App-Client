
import styled, { css } from "styled-components";

export const UserAvatarContainer = styled.div<{ url?: string }>`
height: 150px;
width: 150px;
border-radius: 100%;
border: 4px solid #afafaf;
${({ url }) =>
  url
    ? css`
        transition: 1s background ease;
        background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          url('${url}') no-repeat center;
        opacity: 100%;
        transition: 300ms opacity ease;
        background-size: cover;
        &:hover {
          opacity: 100%;
        }
      `
    : css`
        background-color: #404040;
      `};
cursor: pointer;
&::before {
  background-color: none;
  content: 'Change Avatar';
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b5b5b5;
  font-size: 15px;
  font-weight: 500;
  opacity: 0;
  transition: 300ms opacity ease;
}
&:hover:before {
  opacity: 1;
}
`;