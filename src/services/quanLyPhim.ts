import http from "../constant/api";

export type GetMovieResponse = {
    maPhim: number,
    tenPhim: string,
    biDanh: string,
    trailer: string,
    hinhAnh: string,
    moTa: string,
    maNhom: string,
    ngayKhoiChieu: string,
    danhGia: number,
    hot: boolean,
    dangChieu: boolean,
    sapChieu: boolean
}

export type GetMovieBannerResponse = {
    maBanner: number,
    maPhim: number,
    hinhAnh: string,
}

export type GetMovieDetail = {
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

export const quanLyPhimServices = {
    getBannerList: () => http.get<HttpResponse<GetMovieBannerResponse[]>>(`QuanLyPhim/LayDanhSachBanner`),
    getMovieList: (query = '') => http.get<HttpResponse<GetMovieResponse[]>>(`QuanLyPhim/LayDanhSachPhim${query}`),
    getMovieDetail: (query: string) => http.get<HttpResponse<GetMovieDetail>>(`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${query}`),
};

