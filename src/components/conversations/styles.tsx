import { ConversationSelectedProps } from "src/utils/styleTypes";
import styled, { css } from "styled-components";

export const ConversationSelectedStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 20px 32px;
  background-color: #0f0f0f;
  border-bottom: 1px solid #4343435f;
  box-sizing: border-box;
`;

export const ConversationSelectedItem = styled.div<ConversationSelectedProps>`
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  background-color: #212121;
  color: #f0f0f0;
  ${(props) =>
    props.selected &&
    css`
      background-color: #444444;
    `};
`;

export const ConversationTabStyle = styled.section`
  display: flex;
  gap: 20px;
  margin: 18px 22px;
`;

export const ConversationTabItemStyle = styled.section<ConversationSelectedProps>`
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
  background-color: #1f1f1f;
  text-transform: uppercase;
  padding: 8px 18px;
  border-radius: 5px;
  &:hover {
    background-color: #2b2b2b;
  }
  ${({ selected }) =>
    selected &&
    css`
      background-color: #424242 !important;
    `};
`;