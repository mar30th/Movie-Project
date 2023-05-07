import http from "../constant/api";

export type GetTheaterResponse = {
    maHeThongRap: string,
    tenHeThongRap: string,
    biDanh: string,
    logo: string,
};

export type GetTheaterSystemResponse = {
    lstCumRap: [],
    maHeThongRap: string,
    tenHeThongRap: string,
    logo: string,
    mahom: string
}

export type GetTheaterListResponse = {
    danhSachPhim: [],
    maCumRap: string,
    tenCumRap: string,
    hinhAnh: string,
    diaChi: string,
}

export type GetMovieListByTheater = {
    lstLichChieuTheoPhim: [],
    maPhim: string,
    tenPhim: string,
    hinhAnh: string,
    hot: boolean,
    dangChieu: boolean,
    sapChieu: boolean,
}

export type GetShowTimeDetail = {
    maLichChieu: number,
    maRap: string,
    tenRap: string,
    ngayChieuGioChieu: string,
    giaVe: number,
}

export type GetShowTimeByMovie = {
    heThongRapChieu: [],
    maPhim: number,
    tenPhim: string,
    biDanh: string,
    trailer: string,
    hinhAnh: string,
    moTa: string,
    maNhom: string,
    hot: boolean,
    dangChieu: boolean,
    sapChieu: boolean,
    ngayKhoiChieu: string,
    danhGia: number,
}

export type GetTheaterListByMovie = {
    cumRapChieu: [],
    maHeThongRap: string,
    tenHeThongRap: string,
    logo: string,
}

export type GetShowTimeListByMovie = {
    lichChieuPhim: [],
    maCumRap: string,
    tenCumRap: string,
    hinhAnh: string,
    diaChi: string,
}

export const quanLyRapServices = {
    getTheaterSystem: (query = '') => http.get<HttpResponse<GetTheaterSystemResponse[]>>(`QuanLyRap/LayThongTinLichChieuHeThongRap${query}`),
    getShowTimeByMovie: (query: string) => http.get<HttpResponse<GetShowTimeByMovie>>(`https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${query}`)
}