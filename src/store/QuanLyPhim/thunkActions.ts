import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyPhimServices } from "../../services/quanLyPhim";

export const getMovieList = createAsyncThunk(
    "quanlyphim/getmovielist",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await quanLyPhimServices.getMovieList("?maNhom=GP03");
            return res.data.content
        }catch (error){
            return rejectWithValue(error);
        }
    }
)

export const getBannerList = createAsyncThunk(
    "quanlyphim/getbannerlist",
    async (payload, {rejectWithValue}) => {
        try {
            const res = await quanLyPhimServices.getBannerList();            
            return res.data.content
        }catch (error){
            return rejectWithValue(error);
        }
    }
)

export const getMovieDetail = createAsyncThunk(
    "quanlyphim/getmoviedetail",
    async (query: string, {rejectWithValue}) => {
        try {
            const res = await quanLyPhimServices.getMovieDetail(query);
            return res.data.content
        }catch (error){
            return rejectWithValue(error);
        }
    }
)