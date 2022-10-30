import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import {
  MessageAttachmentContainerStyle,
  MessageAttachmentStyle,
} from "../styles";
import { RiDeleteBin6Fill } from "react-icons/ri";
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
          <RiDeleteBin6Fill
            color="red"
            style={{ position: "absolute", zIndex: 1, right: 15, top: 10 }}
            size={30}
            onClick={() => onDeleteAttachment(attachment)}
          />
          <div>{attachment.file.name}</div>
        </MessageAttachmentStyle>
      ))}
    </MessageAttachmentContainerStyle>
  );
};
