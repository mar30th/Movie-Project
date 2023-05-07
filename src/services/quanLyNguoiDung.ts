import { type } from "@testing-library/user-event/dist/type";
import http from "../constant/api";

export type LoginResponse = {
    taiKhoan: string,
    hoTen: string,
    email: string,
    soDT: string,
    maNhom: string,
    maLoaiNguoiDung: string,
    accessToken: string,
}

export type RegisterRequirement = {
    taiKhoan: string,
    matKhau: string,
    email: string,
    soDt: string,
    maNhom?: string,
    hoTen: string,
}

export type LoginRequirement = {
    taiKhoan: string,
    matKhau: string,
}

export type loaiNguoiDungResponse = {
    maLoaiNguoiDung: string,
    tenLoai: string,
}

export type danhSachGheResponse = {
    maHeThongRap: string,
    tenHeThongRap: string,
    maCumRap: string,
    tenCumRap: string,
    maRap: string,
    tenRap: string,
    maGhe: string,
    tenGhe: string,
}

export type thongTinDatVeResponse = {
    danhSachGhe: danhSachGheResponse,
    maVe: number,
    ngayDat: string,
    tenPhim: string,
    hinhAnh: string,
    giaVe: number,
    thoiLuongPhim: number,   
}

export type GetUserDataResponse = {
    taiKhoan: string,
    matKhau: string,
    hoTen: string,
    email: string,
    soDT: string,
    maNhom: string,
    maLoaiNguoiDung: string,
    loaiNguoiDung: loaiNguoiDungResponse,
    thongTinDatVe: thongTinDatVeResponse,
}

export type GetUserRegisterResponse = {
    taiKhoan: string,
    matKhau: string,
    hoTen: string,
    email: string,
    soDT: string,
    maNhom: string, 
}

export const quanLyNguoiDungServices = {
    login: (payload: LoginRequirement) => http.post<HttpResponse<LoginResponse>>(`QuanLyNguoiDung/DangNhap`, payload),
    handleRegister: (payload: RegisterRequirement) => http.post<HttpResponse<GetUserRegisterResponse>>(`QuanLyNguoiDung/DangKy`, payload),
    getUserData: () => http.post<HttpResponse<GetUserDataResponse>>(`/QuanLyNguoiDung/ThongTinTaiKhoan`),
};