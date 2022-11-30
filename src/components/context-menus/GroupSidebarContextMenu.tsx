import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  // leaveGroupThunk,
  // selectGroupById,
  toggleContextMenu,
} from "../../store/groupSlice";
// import { isGroupOwner } from "../../utils/helpers";
import { ContextMenu, ContextMenuItem } from "./styles";
import { IoMdExit } from "react-icons/io";
import { leaveGroupAPI } from "src/Pages/GroupPage/queries";

export const GroupSidebarContextMenu: FC = () => {
  // const { id } = useParams();
  // const user = useSelector((state: RootState) => state.authentication.userData);
  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector((state: RootState) => state.groups.points);
  // const navigate = useNavigate();

  // const group = useSelector((state: RootState) => selectGroupById(state, id!));

  const contextMenuGroup = useSelector(
    (state: RootState) => state.groups.selectedGroupContextMenu
  );

  // const isOwner = isGroupOwner(user, group);

  const leaveGroup = () => {
    if (!contextMenuGroup) return;
    console.log(contextMenuGroup);
    // dispatch(leaveGroupThunk(contextMenuGroup._id))
    leaveGroupAPI(contextMenuGroup._id).finally(() => {
      dispatch(toggleContextMenu(false));
      // navigate("/home/groups");
    });
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem onClick={leaveGroup}>
        <IoMdExit size={20} color="#ff0000" />
        <span style={{ color: "#ff0000" }}>Leave Group</span>
      </ContextMenuItem>
    </ContextMenu>
  );
};
