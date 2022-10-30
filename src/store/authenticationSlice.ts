import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CreateUserParams, User, UserCredentialsParams, UserResponse } from '../utils/types';
import { postRegisterUser, postLoginUser } from 'src/Pages/Authentication/queries';

export interface AuthState {
    loading: boolean,
    token: string,
    userData: any,
}

const initialState: AuthState = {
    loading: false,
    token: '',
    userData: null,
};


export const loginThunk = createAsyncThunk(
    'authentication/login',
    async (data: UserCredentialsParams) => {
        return postLoginUser(data);
    }
);

export const registerThunk = createAsyncThunk(
    'authentication/register',
    async (data: CreateUserParams) => {
        return postRegisterUser(data);
    }
);

export const logoutThunk = createAsyncThunk(
    'authentication/logout',
    () => { }
);

export const updateStateThunk = createAsyncThunk(
    'authentication/updateState',
    (data: UserResponse) => {
        return data;
    }
);

export const updateUserThunk = createAsyncThunk(
    'authentication/updateUser',
    (data: User) => {
        return data;
    }
);

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserResponse>) => {
            console.log('login');
            localStorage.setItem("userData", JSON.stringify(action.payload.userData));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            state.userData = action.payload.userData;
            state.token = action.payload.token;
        },
        register: (state, action: PayloadAction<UserResponse>) => {
            console.log('register');
            localStorage.setItem("userData", JSON.stringify(action.payload.userData));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            state.userData = action.payload.userData;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            console.log('logout');
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            state = initialState;
        },
        updateState: (state, action: PayloadAction<UserResponse>) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                localStorage.setItem("userData", JSON.stringify(action.payload.data.userData));
                localStorage.setItem("token", JSON.stringify(action.payload.data.token));
                state.userData = action.payload.data.userData;
                state.token = action.payload.data.token;
                state.loading = false;
            })
            .addCase(loginThunk.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                localStorage.removeItem("userData");
                localStorage.removeItem("token");
                state = initialState;
                // state.loading = false;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                localStorage.setItem("userData", JSON.stringify(action.payload.data.userData));
                localStorage.setItem("token", JSON.stringify(action.payload.data.token));
                state.userData = action.payload.data.userData;
                state.token = action.payload.data.token;
                state.loading = false;
            })
            .addCase(registerThunk.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                localStorage.removeItem("userData");
                localStorage.removeItem("token");
                state = initialState;
                // state.loading = false;
            })
            .addCase(logoutThunk.fulfilled, (state, action) => {
                localStorage.removeItem("userData");
                localStorage.removeItem("token");
                state = initialState;
                // state.loading = false;
            })
            .addCase(updateStateThunk.fulfilled, (state, action) => {
                state.userData = action.payload.userData;
                state.token = action.payload.token;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.userData = action.payload;
            })
    },
});

// Action creators are generated for each case reducer function
export const { register, login, logout, updateState } = authenticationSlice.actions;

export default authenticationSlice.reducer;
