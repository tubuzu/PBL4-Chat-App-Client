import { axiosClient, config } from 'src/utils/apis';
import { getToken } from 'src/utils/helpers';
import { CreateUserParams, User, UserCredentialsParams } from 'src/utils/types';

export const postRegisterUser = (data: CreateUserParams) =>
    axiosClient.post(`/user`, data, config());

export const postLoginUser = (data: UserCredentialsParams) =>
    axiosClient.post(`/user/login`, data, config());

export const getAllUsers = () =>
    axiosClient.get<User[]>(`/user`, config());

export const getAuthJWT = () =>
    axiosClient.get(`/user/authJWT`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `${"Bearer ".concat(getToken()!)}`,
        },
    });