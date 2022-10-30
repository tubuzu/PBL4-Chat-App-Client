import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import {
  CharacterLimit,
  MessageInputContainer,
  MessageTextarea,
} from "./styles";
// import { MessageTextField } from "./MessageTextField";
import { FaceVeryHappy } from "akar-icons";
import "./index.scss";
import { MessageAttachmentActionIcon } from "./MessageAttachmentActionIcon";
import { useDispatch } from "react-redux";
import { useToastHook } from "src/utils/hooks/useToast";
import { RootState } from "src/store";
import { useSelector } from "react-redux";
import { addAttachment } from "src/store/message-panel/messagePanelSlice";
import { ClipboardEvent, DragEvent } from "../../utils/types";
import Picker from "emoji-picker-react";
import { Box } from "@chakra-ui/react";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  placeholderName: string;
  sendMessage: () => void;
  sendTypingStatus: () => void;
};

export const MessageInputField: FC<Props> = ({
  content,
  placeholderName,
  setContent,
  sendMessage,
  sendTypingStatus,
}) => {
  const DEFAULT_TEXTAREA_HEIGHT = 21;
  const ref = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const { error } = useToastHook();
  // const [message, setMessage] = useState("");
  const { attachments, attachmentCounter } = useSelector(
    (state: RootState) => state.messagePanel
  );

  const ICON_SIZE = 36;
  const MAX_LENGTH = 2048;
  const [isMultiLine, setIsMultiLine] = useState(false);
  const atMaxLength = content.length === MAX_LENGTH;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    // setMessage(e.target.value);
    setContent(e.target.value);
    const { current } = ref;
    if (current) {
      const height = parseInt(current.style.height);
      current.style.height = "5px";
      current.style.height = current.scrollHeight + "px";
      height > DEFAULT_TEXTAREA_HEIGHT
        ? setIsMultiLine(true)
        : setIsMultiLine(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    sendTypingStatus();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // setMessage("");
      sendMessage();
      setIsMultiLine(false);
      if (ref.current) ref.current.style.height = "21px";
    }
  };

  const handleFileAdd = (files: FileList) => {
    const maxFilesDropped = 5 - attachments.length;
    if (maxFilesDropped === 0) return error("Max files reached");
    const filesArray = Array.from(files);
    let localCounter = attachmentCounter;
    for (let i = 0; i < filesArray.length; i++) {
      console.log(filesArray[i]);
      if (i === maxFilesDropped) break;
      dispatch(addAttachment({ _id: localCounter++, file: filesArray[i] }));
    }
  };

  const onDrop = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    handleFileAdd(files);
  };

  const onPaste = (e: ClipboardEvent) => {
    const { files } = e.clipboardData;
    console.log("pasting...");
    console.log(files);
    handleFileAdd(files);
  };

  const handleEmojiClick = (event: any, emojiObject: any) => {
    let msg = content;
    msg += emojiObject.emoji;
    // setMessage(msg);
    setContent(msg);
  };

  return (
    <>
      <MessageInputContainer isMultiLine={isMultiLine}>
        <MessageAttachmentActionIcon />
        {/* <form onSubmit={sendMessage} className="form"> */}
        {/* <MessageTextField
            content={content}
            setContent={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiLine={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
          /> */}
        <MessageTextarea
          ref={ref}
          value={content}
          onChange={onMessageChange}
          placeholder="Send a Message"
          maxLength={MAX_LENGTH}
          onKeyDown={onKeyDown}
          onDrop={onDrop}
          onPaste={onPaste}
        ></MessageTextarea>
        {/* </form> */}
        <Box className="emoji">
          <FaceVeryHappy
            className="icon"
            size={ICON_SIZE}
            onClick={handleEmojiPickerhideShow}
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </Box>
        {atMaxLength && (
          <CharacterLimit atMaxLength={atMaxLength}>
            {`${content.length}/${MAX_LENGTH}`}
          </CharacterLimit>
        )}
      </MessageInputContainer>
    </>
  );
};
