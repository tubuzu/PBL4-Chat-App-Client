import styled, { css } from 'styled-components';

export const FileInput = styled.input`
  ${({ type }) =>
    type === 'file' &&
    css`
      display: none;
    `}
`;