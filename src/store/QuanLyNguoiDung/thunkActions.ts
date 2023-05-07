import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "../../module/ToastMessage/ToastMessage";
import { LoginRequirement, LoginResponse, quanLyNguoiDungServices, RegisterRequirement } from "../../services/quanLyNguoiDung";

export const login = createAsyncThunk(
    "quanLyNguoiDung/login",
    async (payload: LoginRequirement, {rejectWithValue}) => {
        try{
            const res = await quanLyNguoiDungServices.login(payload);
            return res.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getUserData = createAsyncThunk(
    "quanlynguoidung/getuserdata",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await quanLyNguoiDungServices.getUserData();
            console.log(res);
            return res.data.content
        }catch(error) {
            return rejectWithValue(error)
        }
    }
)

export const handleRegister = createAsyncThunk(
    "quanlynguoidung/register",
    async (payload: RegisterRequirement, {rejectWithValue, dispatch}) => {
        try{
            const res = await quanLyNguoiDungServices.handleRegister(payload);
            console.log(res.data.content);
            return res.data.content
            if(res?.data.statusCode !== 400){
                message.success("Register Successfully!");
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
