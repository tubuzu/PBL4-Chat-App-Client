import {
  CharacterLimitProps,
  MessageInputContainerProps,
  MessageItemContentProps,
} from "src/utils/styleTypes";
import styled from "styled-components";

export const MessagePanelBody = styled.div`
  padding: 32px 32px 0 32px;
  padding-top: 0;
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  height: calc(100% - 600px);
`;

export const MessagePanelFooter = styled.footer`
  padding: 0 32px 10px 32px;
  margin-top: 0;
`;

export const MessagePanelStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.messagePanel.backgroundColor};
`;

export const MessageTypingStatus = styled.div`
  width: 100%;
  font-size: 15px;
  color: ${({ theme }) => theme.text.secondary};
  box-sizing: border-box;
  margin-bottom: 5px;
  height: 20px;
`;

export const EditMessageActionsContainer = styled.div`
  font-size: 12px;
  & span {
    color: #1d77ff;
  }
`;

export const EditMessageInputField = styled.input`
  outline: none;
  background-color: ${({ theme }) =>
    theme.messagePanel.inputContainer.backgroundColor};
  border-radius: 8.47407px;
  border: ${({ theme }) =>
    "0.52963px solid " + theme.messagePanel.inputContainer.borderColor};
  color: #bababa;
  font-family: "Inter";
  box-sizing: border-box;
  font-size: 15px;
  padding: 18px 22px;
  margin: 4px 0;
  width: 100%;
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0 0 0;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.scrollBar.track};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrollBar.thumb};
    width: 5px;
    border-radius: 20px;
  }
`;

export const MessageItemContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 0;
  word-break: break-word;
`;

export const MessageItemDetails = styled.div`
  flex: 1;
`;

export const CharacterLimit = styled.span<CharacterLimitProps>`
  position: absolute;
  bottom: 8px;
  right: 36px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ atMaxLength }) =>
    atMaxLength ? "#ff0000" : "rgb(129, 129, 129)"};
`;

export const MessageInputContainer = styled.div<MessageInputContainerProps>`
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme.messagePanel.inputContainer.backgroundColor};
  border-radius: 8.47407px;
  border: ${({ theme }) =>
    "0.52963px solid " + theme.messagePanel.inputContainer.borderColor};
  width: 100%;
  padding: 13px 32px;
  display: flex;
  gap: 20px;
  align-items: top;
  position: relative;
`;
//${({ isMultiLine }) => (isMultiLine ? "top" : "center")}

export const MessageTextarea = styled.textarea`
  background-color: inherit;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.messagePanel.inputContainer.color};
  font-family: "Inter";
  box-sizing: border-box;
  font-size: 18px;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
  width: calc(100% - 112px);
  height: 28px;
  max-height: 200px;
  flex: 0 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageItemContent = styled.div<MessageItemContentProps>`
  padding: ${({ padding }) => padding};
  width: 100%;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.messagePanel.body.content.color};
`;

export const MessageItemHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .time {
    color: #6d6d6d;
    font-size: 14px;
    font-weight: bold;
  }
  .authorName {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const GroupHeaderIcons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const MessagePanelHeaderStyle = styled.header`
  height: 83px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  border-bottom: ${({ theme }) => theme.border.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.messagePanel.header.title};
`;

export const MessageAttachmentContainerStyle = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.scrollBar.track};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrollBar.thumb};
    border-radius: 5px;
  }
`;

export const MessageAttachmentStyle = styled.div`
  box-sizing: border-box;
  padding: 50px 0 0 0;
  position: relative;
  max-height: 250px;
  height: 250px;
  background-color: ${({ theme }) => theme.background.active};
  margin: 10px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

export const SystemMessageContainer = styled.div`
  width: 80%;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: #1c1c1c;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  & .header {
    display: flex;
    align-items: center;
    gap: 10px;
    & .icon {
      font-size: 20px;
    }
    & span {
      font-weight: bold;
    }
  }
  & .content {
    font-size: 14px;
    font-style: italic;
    padding-left: 28px;
    color: #656565;
  }
`;
