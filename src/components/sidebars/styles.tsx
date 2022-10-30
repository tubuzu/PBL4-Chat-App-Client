import { ConversationSidebarItemProps, SettingsSidebarItemProps } from "src/utils/styleTypes";
import styled from "styled-components";

export const SidebarHeader = styled.header`
  height: 90px;
  padding: 10px 30px;
  box-sizing: border-box;
  flex-shrink: 0;
  border-bottom: 1px solid #49494925;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ScrollableContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  background-color: ${({ theme }) => theme.conversationSidebar.backgroundColor};
  flex: 0 0 auto;
  @media (max-width: 800px) {
    width: calc(100% - 80px);
  }
`;

export const ConversationSearchbar = styled.input`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  width: 100%;
  padding: 10px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: "Inter";
  border-radius: 5px;
  box-sizing: border-box;
`;

export const ConversationSidebarItemDetails = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  & .conversationName {
    display: block;
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.title.color};
  }
  & .conversationLastMessage {
    font-size: 15px;
    font-weight: 500;
    color: #868686;
    color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.title.lastMessageColor};
  }
`;

export const ConversationSidebarItemStyle = styled.div<ConversationSidebarItemProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 32px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${({ selected, theme }) =>
    selected && theme.conversationSidebar.conversationItem.selected};
  cursor: pointer;
  transition: 100ms background-color ease;
  &:hover {
    background-color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.hover.backgroundColor};
  }

  & .title {
    display: block;
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const GroupRecipientSidebarItemContainer = styled.div`
  color: ${({ theme }) => theme.text.primary};
  padding: 30px 0 0 30px;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

type GroupRecipientSidebarItemProps = {
  online: boolean;
};
export const GroupRecipientSidebarItem = styled.div<GroupRecipientSidebarItemProps>`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
  & .recipientDetails {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text.secondary};
  }
  & .left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  & .status {
    font-size: 12px;
    font-weight: 500;
    color: #929292;
  }
  opacity: ${({ online }) => !online && 0.2};
`;

export const GroupRecipientsSidebarHeader = styled.div`
  height: 90px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  color: ${({ theme }) => theme.text.primary};
  border-bottom: 1px solid #49494925;
  display: flex;
  align-items: center;
  gap: 20px;
  & span {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const GroupRecipientsSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 350px;
  background-color: ${({ theme }) => theme.background.secondary};
  flex: 0 0 auto;
`;

export const SettingsSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
  background-color: #111111;
  flex: 0 0 auto;
`;

export const SettingsSidebarHeader = styled.header`
  width: 100%;
  padding: 36px;
  font-weight: 500;
  box-sizing: border-box;
  & span {
    font-size: 20px;
  }
`;

export const SettingsSidebarItemContainer = styled.div``;

export const SettingsSidebarItemStyle = styled.div<SettingsSidebarItemProps>`
  padding: 10px 24px;
  cursor: pointer;
  & .settingItem {
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;
    padding: 14px;
    border-radius: 8px;
    background-color: ${({ isActive }) => isActive && '#070707'};
    & span {
      font-weight: 500;
    }
  }
`;