import React from "react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ConversationPanel } from "../../components/conversations/ConversationPanel";
import { ConversationSidebar } from "../../components/sidebars/ConversationSidebar";
import { AppDispatch, RootState } from "../../store";
import { addGroupMessage, deleteGroupMessage } from "../../store/groupMessageSlice";
import {
  addGroup,
  fetchGroupsThunk,
  removeGroup,
  updateGroup,
} from "../../store/groupSlice";
import { updateType } from "../../store/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import {
  Group,
  AddGroupUserMessagePayload,
  GroupMessageEventPayload,
  RemoveGroupUserMessagePayload,
  DeleteGroupMessageResponse,
} from "../../utils/types";

const GroupPage = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.authentication.userData);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 800);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, []);

  useEffect(() => {
    const handleResize = () => setShowSidebar(window.innerWidth > 800);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    socket.on("onGroupMessage", (payload: GroupMessageEventPayload) => {
      console.log("Group Message Received");
      const { group, message } = payload;
      console.log(group, message);
      dispatch(addGroupMessage(payload));
    });

    socket.on("onGroupMessageDelete", (payload) => {
      console.log("GroupMessage Deleted");
      console.log(payload);
      dispatch(deleteGroupMessage(payload));
    });

    socket.on("onGroupCreate", (payload: Group) => {
      console.log("Group Created...");
      dispatch(addGroup(payload));
    });

    /**
     * Adds the group for the user being added
     * to the group.
     */
    socket.on("onGroupUserAdd", (payload) => {
      console.log("onGroupUserAdd");
      console.log(payload);
      dispatch(addGroup(payload));
    });

    /**
     * Update all other clients in the room
     * so that they can also see the participant
     */
    socket.on(
      "onGroupReceivedNewUser",
      (payload) => {
        console.log("Received onGroupReceivedNewUser");
        dispatch(updateGroup(payload));
      }
    );

    socket.on(
      "onGroupRecipientRemoved",
      (payload) => {
        console.log("onGroupRecipientRemoved");
        console.log(payload);
        dispatch(updateGroup(payload));
      }
    );

    socket.on("onGroupRemoved", (payload) => {
      console.log("onGroupRemoved");
      console.log("user is logged in was removed from the group");
      console.log("navigating...");
      console.log("id:", id);
      dispatch(removeGroup(payload));
      if (id && id === payload._id) {
        console.log("Navigating User to /home/groups");
        navigate("/home/groups");
      }
    });

    socket.on("onGroupParticipantLeft", (payload) => {
      console.log("onGroupParticipantLeft received");
      console.log(payload);
      dispatch(updateGroup(payload.group));
      if (payload.userId === user?._id) {
        console.log("payload.userId matches user.id...");
        dispatch(removeGroup(payload.group));
        navigate("/home/groups");
      }
    });

    socket.on("onGroupOwnerUpdate", (payload: Group) => {
      console.log("received onGroupOwnerUpdate");
      dispatch(updateGroup(payload));
    });

    return () => {
      socket.off("onGroupMessage");
      socket.off("onGroupMessageDelete");
      socket.off("onGroupCreate");
      socket.off("onGroupUserAdd");
      socket.off("onGroupReceivedNewUser");
      socket.off("onGroupRecipientRemoved");
      socket.off("onGroupRemoved");
      socket.off("onGroupParticipantLeft");
      socket.off("onGroupOwnerUpdate");
    };
  }, [id]);

  return (
    <>
      {showSidebar && <ConversationSidebar />}
      {!id && !showSidebar && <ConversationSidebar />}
      {!id && showSidebar && <ConversationPanel />}
      <Outlet />
    </>
  );
};

export default GroupPage;
