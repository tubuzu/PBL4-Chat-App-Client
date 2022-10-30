import { axiosClient, config } from 'src/utils/apis';
import { AcceptFriendRequestResponse, CancelFriendRequestResponse, Friend, FriendRequest } from "src/utils/types";

export const fetchFriends = () => axiosClient.get<Friend[]>('/friends', config());

export const fetchFriendRequests = () =>
  axiosClient.get<FriendRequest[]>('/friends/requests', config());

export const createFriendRequest = (friendId: string) =>
  axiosClient.post<FriendRequest>('/friends/requests', { friendId }, config());

export const cancelFriendRequest = (id: string) =>
  axiosClient.delete<CancelFriendRequestResponse>(
    `/friends/requests/${id}/cancel`,
    config()
  );

export const acceptFriendRequest = (id: string) =>
  axiosClient.patch<AcceptFriendRequestResponse>(
    `/friends/requests/${id}/accept`,
    {},
    config()
  );

export const rejectFriendRequest = (id: string) =>
  axiosClient.patch<FriendRequest>(
    `/friends/requests/${id}/reject`,
    {},
    config()
  );

export const removeFriend = (id: string) =>
  axiosClient.delete<Friend>(`/friends/${id}/delete`, config());