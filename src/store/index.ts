import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { quanLyDatVeReducer } from "./QuanLyDatVe/slice";
import { quanLyNguoiDungReducer } from "./QuanLyNguoiDung/slice";
import { quanLyPhimReducer } from "./QuanLyPhim/slice";
import { quanLyRapReducer } from "./QuanLyRap/slice";

export const store = configureStore({
    reducer: {
        quanLyPhim: quanLyPhimReducer,
        quanLyRap: quanLyRapReducer,
        quanLyNguoiDung: quanLyNguoiDungReducer,
        quanLyDatVe: quanLyDatVeReducer,
    },
})

export type RootState = ReturnType <typeof store['getState']>
export type AppDispatch = typeof store['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch