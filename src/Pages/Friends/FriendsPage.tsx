import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FriendList } from "../../components/friends/FriendList";
import { AppDispatch, RootState } from "../../store";
import {
  removeFriend,
  setOfflineFriends,
  setOnlineFriends,
} from "../../store/friends/friendsSlice";
import { fetchFriendsThunk } from "../../store/friends/friendsThunk";
import { SocketContext } from "../../utils/context/SocketContext";
import { Friend } from "../../utils/types";

export const FriendsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const userId = useSelector(
    (state: RootState) => state.authentication.userData._id
  );
  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (userId) socket.emit("getOnlineFriends", { userId });
    const interval = setInterval(() => {
      socket.emit("getOnlineFriends", { userId });
    }, 10000);

    socket.on("onFriendRemoved", (friend: Friend) => {
      console.log("onFriendRemoved");
      dispatch(removeFriend(friend));
      socket.emit("getOnlineFriends", { userId });
    });

    return () => {
      console.log("clearing interval");
      clearInterval(interval);
      socket.off("getOnlineFriends");
      socket.off("onFriendRemoved");
    };
  }, []);

  useEffect(() => {
    socket.on("getOnlineFriends", (friends: Friend[]) => {
      console.log("received online friends");
      console.log(friends);
      dispatch(setOnlineFriends(friends));
      dispatch(setOfflineFriends());
    });
  }, []);

  return <FriendList />;
};
