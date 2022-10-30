import styled from "styled-components";

export const RecipientResultContainerStyle = styled.div`
  position: absolute;
  background-color: #161616;
  right: 0;
  left: 0;
  margin: 4px 24px;
`;

export const RecipientScrollableItemContainer = styled.div`
  max-height: 200px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RecipientBottomSection = styled.div`
  border-top: 1px solid #fff;
  margin: 4px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px 0;
`;

export const RecipientResultItem = styled.div`
  padding: 20px 28px;
  transition: 100ms background-color ease;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: #0c0c0c;
  }
`;

export const SelectedRecipientPillStyle = styled.div`
  border: 2px solid #323232b0;
  border-radius: 14px;
  width: fit-content;
  padding: 6px 18px;
  font-size: 14px;
  & .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }
  & .icon {
    margin-left: 10px;
    color: #656565;
    cursor: pointer;
    transition: 300ms color ease;
    :hover {
      color: #c62d2d;
    }
  }
`;