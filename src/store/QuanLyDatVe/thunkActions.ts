import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { BookingRequirement, quanLyDatVeServices } from "../../services/quanLyDatVe";

export const getBookingList = createAsyncThunk(
    "quanlydatve/getbookinglist",
    async (payload: string, {rejectWithValue}) => {
        try {
            const res = await quanLyDatVeServices.getBookingList(payload);
            // console.log(res.data.content);
            
            return res.data.content;
        }catch (error){
            return rejectWithValue(error)
        }
    }
)

export const handleBooking = createAsyncThunk(
    "quanglydatve/handlebooking",
    async (payload: BookingRequirement, {rejectWithValue}) => {
        try{
            const res = await quanLyDatVeServices.handleBooking(payload);
            console.log(res.data);
            return res.data
        }catch(error){
            return rejectWithValue
            
        }
    }
)