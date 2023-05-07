import { createSlice } from "@reduxjs/toolkit";
import { GetUserDataResponse, GetUserRegisterResponse, LoginResponse } from "../../services/quanLyNguoiDung";
import { getUserData, login, handleRegister } from "./thunkActions";

type quanLyNguoiDungInitialState = {
    userRegisterResponse?: GetUserRegisterResponse,
    userInfo?: LoginResponse | undefined,
    userData?: GetUserDataResponse,
    userRegister?: GetUserRegisterResponse | undefined,
}

const initialState: quanLyNguoiDungInitialState = {
    userInfo: undefined,
    userRegister: undefined,
}

export const {reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungActions} = createSlice({
    name: 'quanLyNguoiDung',
    initialState,
    reducers: {
        getUser: (state) => {
            const userInfo = localStorage.getItem("user");
            if (userInfo) {
                state.userInfo = JSON.parse(userInfo);
            }
        },
        logOut: (state) => {
            localStorage.removeItem("user");
            state.userInfo = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            console.log(action.payload);
            state.userInfo = action.payload;
            localStorage.setItem("user", JSON.stringify(state.userInfo));
            localStorage.removeItem("userRegister");
            // if(state.user){
            //     localStorage.setItem("TOKEN", state.user.accessToken)
            // }
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            state.userData = action.payload;
        })
        .addCase(handleRegister.fulfilled, (state, action) => {
            state.userRegisterResponse = action.payload;
            localStorage.setItem("userRegister", JSON.stringify(state.userRegisterResponse))
        })
    }
})
