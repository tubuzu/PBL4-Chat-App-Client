import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { deleteGroupMessageThunk } from "../../store/groupMessageSlice";
import {
  setIsEditing,
  setIsForwarding,
  setMessageBeingEdited,
  setMessageBeingForward,
} from "../../store/messageContainerSlice";
import { deleteMessageThunk } from "../../store/messages/messageThunk";
import { selectType } from "../../store/selectedSlice";
import { ContextMenu, ContextMenuItem } from "./styles";

export const SelectedMessageContextMenu = () => {
  const { id: routeId } = useParams();
  const user = useSelector((state: RootState) => state.authentication.userData);
  const dispatch = useDispatch<AppDispatch>();
  const conversationType = useSelector((state: RootState) => selectType(state));
  const { selectedMessage: message, points } = useSelector(
    (state: RootState) => state.messageContainer
  );

  const deleteMessage = () => {
    const _id = routeId?.toString()!;
    console.log(`Delete message ${message?._id}`);
    if (!message) return;
    const messageId = message._id;
    return conversationType === "private"
      ? dispatch(deleteMessageThunk({ _id, messageId: message._id }))
      : dispatch(deleteGroupMessageThunk({ _id, messageId }));
  };

  const editMessage = () => {
    dispatch(setIsEditing(true));
    dispatch(setMessageBeingEdited(message));
  };

  const forwardMessage = () => {
    dispatch(setIsForwarding(true));
    dispatch(setMessageBeingForward(message));
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      {message?.sender._id === user?._id && (
        <ContextMenuItem onClick={deleteMessage}>Delete</ContextMenuItem>
      )}
      {message?.sender._id === user?._id && (
        <ContextMenuItem onClick={editMessage}>Edit</ContextMenuItem>
      )}
      <ContextMenuItem onClick={forwardMessage}>Forward</ContextMenuItem>
    </ContextMenu>
  );
};
