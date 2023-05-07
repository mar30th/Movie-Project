import http from "../constant/api";

export type GetMovieBookingInfoResponse = {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
};

export type GetSeatBookingInfoResponse = [
  {
    maGhe: number;
    tenGhe: string;
    maRap: number;
    loaiGhe: string;
    stt: number;
    giaVe: number;
    daDat: boolean;
    taiKhoanNguoiDat: string;
  }
];
export type GetBookingInfoResponse = {
  thongTinPhim: GetMovieBookingInfoResponse;
  danhSachGhe: GetSeatBookingInfoResponse;
};

export type BookingListRequirement = {
    maGhe: number,
    giaVe: number,
}

export type BookingRequirement = {
    maLichChieu: number,
    danhSachVe: BookingListRequirement[],
}

export const quanLyDatVeServices = {
  getBookingList: (query: string) => http.get<HttpResponse<GetBookingInfoResponse>>(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${query}`),
  handleBooking: (query: BookingRequirement) => http.post(`QuanLyDatVe/DatVe`, query)

};
