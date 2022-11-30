import { axiosClient, config } from 'src/utils/apis';
import { UserProfileResponse } from 'src/utils/types';

export const getProfileById = (id: string) =>
    axiosClient.get<UserProfileResponse>(`/user/profile/${id}`, config());