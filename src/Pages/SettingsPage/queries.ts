import { axiosClient, config, formConfig } from 'src/utils/apis';
import { UpdateStatusParams, User } from "src/utils/types";

export const updateUserProfile = (data: FormData) =>
  axiosClient.patch<User>('/user/profile', data, formConfig());

export const updateStatusMessage = (data: UpdateStatusParams) =>
  axiosClient.patch('/user/status', data, config());