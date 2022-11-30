import { InputContainerProps } from "src/utils/styleTypes";
import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  outline: none;
  border: none;
  font-family: "Inter";
  font-size: 16px;
  background-color: #0c6930;
  color: #fff;
  border-radius: 10px;
  padding: 25px 0;
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
    background-color: #3c8558;
    cursor: not-allowed;
  }
`;

export const ButtonSubmit = styled.button`
  width: 100px;
  outline: none;
  border: none;
  font-size: 16px;
  background-color: #0c6930;
  color: #fff;
  border-radius: 10px;
  padding: 10px 0;
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
    background-color: #3c8558;
    cursor: not-allowed;
  }
`;

export const TextField = styled.textarea`
  font-family: "Inter";
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const InputField = styled.input`
  font-family: "Inter";
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
`;

export const InputOutlineField = styled.input`
  font-family: "Inter";
  outline: none;
  background-color: ${({ theme }) =>
    theme.messagePanel.inputContainer.backgroundColor};
  border-radius: 8.47407px;
  border: ${({ theme }) =>
    "0.52963px solid " + theme.messagePanel.inputContainer.borderColor};
  color: #fff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin: 4px 0;
`;

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${(prop) => prop.backgroundColor || "#131313"};
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;
export const InputOutlineContainer = styled.div<InputContainerProps>`
  background-color: ${({ theme }) =>
    theme.messagePanel.inputContainer.backgroundColor};
  border-radius: 8.47407px;
  border: ${({ theme }) =>
    "0.52963px solid " + theme.messagePanel.inputContainer.borderColor};
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
`;
export const InputContainerHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const InputLabel = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const InputError = styled.span`
  color: #ff0000;
  text-transform: uppercase;
  font-size: 11px;
`;

export const RecipientChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  border-radius: 10px;
  gap: 4px 10px;
`;
