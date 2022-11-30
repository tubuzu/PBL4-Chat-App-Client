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
  GroupMessageEventPayload,
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
      const { group, message } = payload;
      console.log(group, message);
      dispatch(addGroupMessage(payload));
    });

    socket.on("onGroupMessageDelete", (payload) => {
      dispatch(deleteGroupMessage(payload));
    });

    socket.on("onGroupCreate", (payload: Group) => {
      dispatch(addGroup(payload));
    });

    // add group for user being added to group
    socket.on("onGroupUserAdd", (payload) => {
      dispatch(addGroup(payload));
    });

    // update all user in room to see new member
    socket.on(
      "onGroupReceivedNewUser",
      (payload) => {
        dispatch(updateGroup(payload));
      }
    );

    socket.on(
      "onGroupRecipientRemoved",
      (payload) => {
        dispatch(updateGroup(payload));
      }
    );

    socket.on("onGroupRemoved", (payload) => {
      dispatch(removeGroup(payload));
      if (id && id === payload._id) {
        navigate("/home/groups");
      }
    });

    socket.on("onGroupParticipantLeft", (payload) => {
      dispatch(updateGroup(payload.group));
      if (payload.userId === user?._id) {
        dispatch(removeGroup(payload.group));
        navigate("/home/groups");
      }
    });

    socket.on("onGroupOwnerUpdate", (payload: Group) => {
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
