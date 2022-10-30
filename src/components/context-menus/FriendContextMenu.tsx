import React from "react";
import { useContext } from "react";
import { MdPersonRemove, MdOutlineTextsms } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { toggleContextMenu } from "../../store/friends/friendsSlice";
import { removeFriendThunk } from "../../store/friends/friendsThunk";
import { postNewConversation } from "src/Pages/Conversation/queries";
import { SocketContext } from "../../utils/context/SocketContext";
import { ContextMenu, ContextMenuItem } from "./styles";

export const FriendContextMenu = () => {
  const user = useSelector((state: RootState) => state.authentication.userData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { points, selectedFriendContextMenu } = useSelector(
    (state: RootState) => state.friends
  );
  const socket = useContext(SocketContext);

  const getUserFriendInstance = () =>
    user?._id === selectedFriendContextMenu?.sender._id
      ? selectedFriendContextMenu?.receiver
      : selectedFriendContextMenu?.sender;

  const removeFriend = () => {
    if (!selectedFriendContextMenu) return;
    dispatch(toggleContextMenu(false));
    dispatch(removeFriendThunk(selectedFriendContextMenu._id)).then(() =>
      socket.emit("getOnlineFriends", { userId: user._id })
    );
  };

  const sendMessage = () => {
    const recipient = getUserFriendInstance();
    recipient &&
      postNewConversation({ userId: recipient._id, message: "" })
        .then(({ data }) => {
          console.log(data);
          navigate(`/home/conversations/${data._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem onClick={removeFriend}>
        <MdPersonRemove size={20} color="#ff0000" />
        <span style={{ color: "#ff0000" }}>Remove Friend</span>
      </ContextMenuItem>
      <ContextMenuItem onClick={sendMessage}>
        <MdOutlineTextsms size={20} color="#fff" />
        <span style={{ color: "#fff" }}>Message</span>
      </ContextMenuItem>
    </ContextMenu>
  );
};
