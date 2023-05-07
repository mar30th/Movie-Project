import { createSlice } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetBookingInfoResponse, GetSeatBookingInfoResponse, GetMovieBookingInfoResponse, BookingListRequirement, BookingRequirement } from "../../services/quanLyDatVe"
import { getBookingList, handleBooking } from "./thunkActions"



type quanLyDatVeInitialState = {
    bookingInfo?: GetBookingInfoResponse,
    movieBookingInfo?: GetMovieBookingInfoResponse,
    seatBookingInfo?: GetSeatBookingInfoResponse,
    bookingSeatInfo?: BookingRequirement | {},
    bookingSeatList?: GetSeatBookingInfoResponse | [],
    tabActive?: string,
}

const initialState: quanLyDatVeInitialState = {
    bookingSeatList: [],
    bookingSeatInfo: {},
    tabActive: "1",
}

const deepCopyFunction = (inObject: any): any => {
    let outObject: any, value: any, key: any;

    if (typeof inObject !== "object" || inObject === null) {
        return inObject; // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
        value = inObject[key];

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopyFunction(value);
    }

    return outObject;
};


export const {reducer: quanLyDatVeReducer, actions: quanLyDatVeActions} = createSlice({
    name: "quanLyDatVe",
    initialState,
    reducers: {
        booking: (state, action) => {
            let clonebookingSeatList = deepCopyFunction(state.bookingSeatList)
            let index = clonebookingSeatList.findIndex(((bookingchair: any) => bookingchair.maGhe === action.payload.seat.maGhe))
            if (index !== -1) {
                clonebookingSeatList.splice(index, 1)
            } else {
                clonebookingSeatList.push(action.payload.seat)
            }
            console.log(clonebookingSeatList);
            
            return { ...state, bookingSeatList: clonebookingSeatList }
          },      
        handleBooking: (state, action) => {
            let cloneBookingSeat = deepCopyFunction(state.bookingSeatList)
            let user = action.payload.user.taiKhoan
            let maLichChieu = action.payload.maLichChieu
            cloneBookingSeat = JSON.stringify(cloneBookingSeat)
            state.bookingSeatList = []
            // connection.invoke("datGhe", user, cloneBookingSeat, maLichChieu)
        },
        handleChangeTab: (state) => {
            state.tabActive = "2";
        },
        handleChangeActiveTab: (state, action) => {
            state.tabActive = action.payload
        }
    },
    extraReducers: (builer) => {
        builer
        .addCase(getBookingList.fulfilled, (state, action) => {
            state.bookingInfo = action.payload;            
            state.movieBookingInfo = state.bookingInfo?.thongTinPhim;            
            state.seatBookingInfo = state.bookingInfo?.danhSachGhe;            
        })
        .addCase(handleBooking.fulfilled, (state, action) => {
            state.bookingSeatList = [];
            console.log(state.bookingSeatList);           
            // if (action.payload.data.statusCode === 200) {
            //     alert("Booking Successfully")
            // }
        })
    }
})