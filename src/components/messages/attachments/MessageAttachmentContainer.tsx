import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import {
  MessageAttachmentContainerStyle,
  MessageAttachmentStyle,
} from "../styles";
// import { RiDeleteBin6Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { MessageImageCanvas } from "./MessageImageCanvas";
import { Attachment } from "src/utils/types";
import { removeAttachment } from "src/store/message-panel/messagePanelSlice";

export const MessageAttachmentContainer = () => {
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const dispatch = useDispatch<AppDispatch>();

  const onDeleteAttachment = (attachment: Attachment) => {
    dispatch(removeAttachment(attachment));
  };
  return (
    <MessageAttachmentContainerStyle>
      {attachments.map((attachment) => (
        <MessageAttachmentStyle
          key={attachment._id}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MessageImageCanvas file={attachment.file} />
          <TiDelete
            color="white"
            style={{ position: "absolute", zIndex: 1, right: 0, top: 0, cursor: "pointer" }}
            size={40}
            onClick={() => onDeleteAttachment(attachment)}
          />
          <div>{attachment.file.name}</div>
        </MessageAttachmentStyle>
      ))}
    </MessageAttachmentContainerStyle>
  );
};
