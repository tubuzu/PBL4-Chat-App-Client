import axios from "axios";
import { getToken } from "../helpers";
import { ConversationType, CreateMessageParams, DeleteGroupMessageParams, DeleteGroupMessageResponse, DeleteMessageParams, DeleteMessageResponse, EditMessagePayload, FetchGroupMessagePayload, FetchMessagePayload, GroupMessageType, MessageType, User } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

export const axiosClient = axios.create({ baseURL: API_URL });

export const config = () => {
    return {
        headers: {
            "Content-type": "application/json",
            "Authorization": `${"Bearer ".concat(getToken()!)}`,
        },
    }
};

export const formConfig = () => {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `${"Bearer ".concat(getToken()!)}`,
        },
    }
}

export const searchUsers = (query: string) =>
    axiosClient.get<User[]>(`/user?search=${query}`, config());

export const createMessage = (
    id: string,
    type: ConversationType,
    data: FormData
) => {
    const url =
        type === 'private'
            ? `/conversations/${id}/messages`
            : `/groups/${id}/messages`;
    return axiosClient.post(url, data, formConfig());
};

export const forwardMessage = (
    conversationId: string,
    type: ConversationType,
    messageBody: MessageType
) => {
    const url =
        type === 'private'
            ? `/conversations/${conversationId}/forward`
            : `/groups/${conversationId}/forward`;
    return axiosClient.post(url, { messageBody: messageBody }, config());
};

export const deleteMessage = ({ _id, messageId }: DeleteMessageParams) =>
    axiosClient.delete<DeleteMessageResponse>(
        `/conversations/${_id}/messages/${messageId}`,
        config()
    );

export const editMessage = ({ content, _id, messageId }: EditMessagePayload) =>
    axiosClient.patch<MessageType>(
        `/conversations/${_id}/messages/${messageId}`,
        { content },
        config()
    );

export const getConversationMessages = (conversationId: string) =>
    axiosClient.get<FetchMessagePayload>(
        `/conversations/${conversationId}/messages`,
        config()
    );

export const deleteGroupMessage = ({
    _id,
    messageId,
}: DeleteGroupMessageParams) =>
    axiosClient.delete<DeleteGroupMessageResponse>(
        `/groups/${_id}/messages/${messageId}`,
        config()
    );

export const editGroupMessage = ({
    content,
    _id,
    messageId,
}: EditMessagePayload) =>
    axiosClient.patch<GroupMessageType>(
        `/groups/${_id}/messages/${messageId}`,
        { content },
        config()
    );

export const fetchGroupMessages = (_id: string) =>
    axiosClient.get<FetchGroupMessagePayload>(`/groups/${_id}/messages`, config());

export const postGroupMessage = ({ _id, content }: CreateMessageParams) =>
    axiosClient.post(`/groups/${_id}/messages`, { content }, config());