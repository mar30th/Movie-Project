import { createSlice } from "@reduxjs/toolkit";
import { GetTheaterSystemResponse, GetTheaterResponse, GetShowTimeByMovie } from "../../services/quanLyRap";
import { getShowTimeByMovie, getTheaterSystem } from "./thunkAction";



type quanLyRapInitialState = {
    theaterSystem?: GetTheaterSystemResponse[],
    showTimeDetail?: GetShowTimeByMovie,
}

const initialState: quanLyRapInitialState = {
    // theaterList: [],
}


export const {reducer: quanLyRapReducer, actions: quanLyRapActions} = createSlice({
    name: 'quanLyRap',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getTheaterSystem.fulfilled, (state, action) => {
            state.theaterSystem = action.payload;
        })
        .addCase(getShowTimeByMovie.fulfilled, (state, action) => {
            state.showTimeDetail = action.payload;
        })
    }
})