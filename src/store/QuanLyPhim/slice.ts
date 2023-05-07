import { createSlice } from "@reduxjs/toolkit";
import { GetMovieBannerResponse, GetMovieDetail, GetMovieResponse } from "../../services/quanLyPhim";
import { getBannerList, getMovieDetail, getMovieList } from "./thunkActions";

type quanLyPhimInitialState = {
    movieList?: GetMovieResponse[],
    bannerList?: GetMovieBannerResponse[],
    movieDetail?: GetMovieDetail,
}

const initialState: quanLyPhimInitialState = {
    // movieList: [],
}

export const {reducer: quanLyPhimReducer, actions: quanLyPhimActions} = createSlice({
    name: 'quanLyPhim',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getMovieList.fulfilled, (state, action) => {
            state.movieList = action.payload;
        })
        .addCase(getBannerList.fulfilled, (state, action) => {
            state.bannerList = action.payload;
        })
        .addCase(getMovieDetail.fulfilled, (state, action) => {
            state.movieDetail = action.payload;
        })
    },
})