import React from "react";
import { CirclePlusFill } from "akar-icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToastHook } from "src/utils/hooks/useToast";
import { AppDispatch, RootState } from "../../store";
import { addAttachment } from "../../store/message-panel/messagePanelSlice";
import { DivMouseEvent, InputChangeEvent } from "../../utils/types";
import "./index.scss";
import { Input } from "@chakra-ui/react";

export const MessageAttachmentActionIcon = () => {
  const attachmentIconRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useToastHook();
  const { attachmentCounter, attachments } = useSelector(
    (state: RootState) => state.messagePanel
  );
  console.log(attachmentCounter, attachments);

  const onClick = (e: DivMouseEvent) => {
    console.log("on click");
    fileInputRef.current?.click();
  };

  const onChange = (e: InputChangeEvent) => {
    const { files } = e.target;
    if (!files) return;
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

  return (
    <div ref={attachmentIconRef} onClick={onClick}>
      <CirclePlusFill size={36} className="icon" cursor="pointer" />
      <Input
        multiple
        ref={fileInputRef}
        type="file"
        sx={{ display: "none" }}
        accept="image/*"
        onChange={onChange}
        name="attachments"
      />
    </div>
  );
};
