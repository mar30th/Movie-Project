import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import {
  getBookingList,
  handleBooking,
} from "../store/QuanLyDatVe/thunkActions";
import {
  CloseOutlined,
  DollarOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { checkToken } from "../constant/api";
import "./Booking.css";
// import style from "../module/Booking/Booking.module.css";
import clsx from "clsx";
import {
  quanLyDatVeActions,
  quanLyDatVeReducer,
} from "../store/QuanLyDatVe/slice";
import { BookingRequirement } from "../services/quanLyDatVe";
import { toast } from "react-toastify";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { getUserData } from "../store/QuanLyNguoiDung/thunkActions";

export const BookingInfo = (props: any) => {
  const {
    bookingInfo,
    movieBookingInfo,
    bookingSeatInfo,
    seatBookingInfo,
    bookingSeatList,
    tabActive,
  } = useSelector((state: RootState) => state.quanLyDatVe);
  const { userInfo } = useSelector((state: RootState) => state.quanLyNguoiDung);
  const param = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  checkToken();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("Please login frist!")
      return navigate("/login");
    } else if (param?.id) {
      dispatch(getBookingList(param.id));
    }
  }, [dispatch]);

  const renderSeats = () => {
    return seatBookingInfo?.map((seat, index) => {
      return (
        <Fragment key={index}>
          <button
            className={clsx("seat", {
              bookedSeat: seat.daDat,
              vipSeat: seat.loaiGhe == "Vip",
              bookingSeat: !!bookingSeatList?.find(
                (item: any) => item.maGhe === seat.maGhe
              ),
            })}
            disabled={seat.daDat}
            onClick={() => {
              dispatch(quanLyDatVeActions.booking({ seat }));
              console.log(seat);
            }}
          >
            {seat.daDat ? <CloseOutlined className="text-xl" /> : seat.stt}
          </button>

          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="">
      <div className="text-center bg-black text-white text-2xl p-1">
        <h1>BOOKING ONLINE</h1>
      </div>
      <div className="bg-[#fdfcf0] p-1 mb-2">
        <div>
          <h1 className="text-xl font-bold">{movieBookingInfo?.tenCumRap}</h1>
          <p>
            {movieBookingInfo?.diaChi} | {movieBookingInfo?.tenRap}
          </p>
        </div>
      </div>
      <div className="text-center p-1 my-1 text-2xl font-bold bg-gray-400">
        People / Seats
      </div>
      <div className="">
        <div>
          <div className="bg-black h-[10px] w-4/5 m-auto"></div>
          <div className="flex justify-center mb-10 relative">
            <div className="trapezoid"></div>
            <h3 className="p-1 absolute">SCREEN</h3>
          </div>
          <div className="text-center">{renderSeats()}</div>
        </div>
      </div>
      <div className="flex justify-center text-white">
        <div className="bg-black flex w-4/5 rounded">
          <div className="flex w-4/5 pe-1">
            <div className="p-5 border-r-2 w-2/5">
              <img
                src={movieBookingInfo?.hinhAnh}
                className="h-[250px] w-[200px]"
                alt=""
              />
            </div>
            <div className="p-5 border-r-2 w-3/5">
              <h1>
                <span className="text-gray-400">Movie: </span>
                {movieBookingInfo?.tenPhim}
              </h1>
              <p>
                <span className="text-gray-400">Theater: </span>
                {movieBookingInfo?.tenCumRap}
              </p>
              <p>
                <span className="text-gray-400">Showtime: </span>
                {movieBookingInfo?.gioChieu}
              </p>
              <p>
                <span className="text-gray-400">Screen: </span>
                {movieBookingInfo?.tenRap}
              </p>
              <div className="flex mt-1">
                <div className="border-r-2 pe-1">
                  <div className="flex mb-1">
                    <button className="bookingSeat"></button>
                    <p className=" ms-1" style={{ lineHeight: 2 }}>
                      Checked
                    </p>
                  </div>
                  <div className="flex">
                    <button className="bookedSeat">
                      <CloseOutlined className="text-xl" />
                    </button>
                    <p className=" ms-1" style={{ lineHeight: 2 }}>
                      Occupied
                    </p>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex mb-1">
                    <button className="vipSeat"></button>
                    <p className=" ms-1" style={{ lineHeight: 2 }}>
                      VIP
                    </p>
                  </div>
                  <div className="flex">
                    <button className="seat !m-0"></button>
                    <p className=" ms-1" style={{ lineHeight: 2 }}>
                      Standard
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border-r-2 w-3/5">
              <div>
                <div className="flex">
                  <span className="text-lg">Seat: </span>
                  <div>
                    {bookingSeatList?.map((seat: any, index) => (
                      <span
                        key={seat.maGhe}
                        className={`text-green-500 text-xl mx-[5px] ${
                          (index + 1) % 4 === 0 ? "block" : "inline-block"
                        }`}
                      >
                        {seat.stt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex">
                  <span className="text-lg">Total: </span>
                  <div className="mx-[5px] text-xl font-bold">
                    {(bookingSeatList as any[])
                      .reduce((total: number, seat: any) => {
                        return (total += seat.giaVe);
                      }, 0)
                      .toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/5 relative">
            <button
              className="text-white p-9 bg-red-500 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              onClick={() => {
                dispatch(quanLyDatVeActions.handleChangeTab());
              }}
            >
              <RightSquareOutlined className="text-5xl" /> <br />
              <span className="text-xl">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingDetail = (props: any) => {
  const {
    bookingInfo,
    movieBookingInfo,
    bookingSeatInfo,
    seatBookingInfo,
    bookingSeatList,
    tabActive,
  } = useSelector((state: RootState) => state.quanLyDatVe);
  const { userData, userInfo } = useSelector(
    (state: RootState) => state.quanLyNguoiDung
  );
  const dispatch = useDispatch<AppDispatch>();
  const param = useParams();
  const navigate = useNavigate();
  const { TabPane } = Tabs;

  useEffect(() => {
    if (bookingSeatList?.length === 0 && tabActive === "2") {
      navigate("/home");
    }
  }, [bookingSeatList]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div>
      <div className="text-center bg-black text-white text-2xl p-1">
        <h1>PAYMENT</h1>
      </div>
      <div className="flex justify-center p-1">
        <div className="border w-3/5">
          <div className="p-1 flex">
            <div className="px-5">
              <img
                src={movieBookingInfo?.hinhAnh}
                className="h-[250px] w-[200px]"
                alt=""
              />
            </div>
            <div>
              <div>
                <h1 className="text-3xl">{movieBookingInfo?.tenPhim}</h1>
                <hr />
                <p className="text-green-700 font-bold">
                  {movieBookingInfo?.tenCumRap}
                </p>
                <p className="text-green-700 font-bold">
                  {movieBookingInfo?.diaChi}
                </p>
              </div>
              <div>
                <h1>
                  <span className="text-gray-500">Showtime: </span>
                  {movieBookingInfo?.gioChieu} | {movieBookingInfo?.ngayChieu}
                </h1>
                <h1>
                  <span className="text-gray-500">Screen: </span>
                  {movieBookingInfo?.tenRap}
                </h1>
                <h1>
                  <span className="text-gray-500">Seat: </span>
                  {bookingSeatList?.map((seat: any, index) => (
                    <span
                      key={seat.maGhe}
                      className={`text-green-500 text-xl mx-[5px]`}
                    >
                      {seat.stt}
                      {/* {index !== seat.length - 1 && ","}
                        {index !== seat.length - 1 && ","} */}
                      {index + 1 !== seat.length ? "," : ""}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
          </div>
          <hr />
          <div className="px-10 py-1">
            <div className="flex overflow-x-auto bg-black">
              <div className="border-r-2">
                <table className=" text-sm text-left text-white">
                  <thead className="text-xs text-white uppercase">
                    <tr>
                      <th scope="col" className="px-1 py-1 ">
                        <h1 className="text-2xl">Booking Infomation</h1>
                      </th>
                      <th scope="col" className="px-1 py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b ">
                      <th
                        scope="row"
                        className="px-1 py-4 font-medium text-white whitespace-nowrap border-gray-400"
                      >
                        Name:
                      </th>
                      <td className="py-4">
                        <p>{userData?.hoTen}</p>
                      </td>
                    </tr>
                    <tr className="border-b ">
                      <th
                        scope="row"
                        className="px-1 py-4 font-medium text-white whitespace-nowrap "
                      >
                        Phone:
                      </th>
                      <td className="py-4">
                        <p>{userData?.soDT}</p>
                      </td>
                    </tr>
                    <tr className="border-b ">
                      <th
                        scope="row"
                        className="px-1 py-4 font-medium text-white whitespace-nowrap "
                      >
                        Email:
                      </th>
                      <td className="py-4">
                        <p>{userData?.email}</p>
                      </td>
                    </tr>
                    <tr className="border-b ">
                      <th
                        scope="row"
                        className="px-1 py-4 font-medium text-white whitespace-nowrap "
                      >
                        Total:
                      </th>
                      <td className="py-4">
                        <div className="text-xl font-bold text-green-500">
                          {(bookingSeatList as any[])
                            .reduce((total: number, seat: any) => {
                              return (total += seat.giaVe);
                            }, 0)
                            .toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-3/6 relative">
                <button
                  className="text-white p-9 bg-red-500 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={() => {
                    const cloneBookingSeatInfo: BookingRequirement = {
                      maLichChieu: Number(param.id ? param.id : 0), // Kiểm tra nếu param.id không phải là undefined thì mới gán giá trị
                      danhSachVe: bookingSeatList || [],
                    };
                    dispatch(handleBooking(cloneBookingSeatInfo));
                    alert("Booking Successfully!")
                  }}
                >
                  {" "}
                  <DollarOutlined className="text-5xl" /> <br />
                  <span className="text-xl">Purchase</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Booking: React.FC = () => {
  const {
    bookingInfo,
    movieBookingInfo,
    bookingSeatInfo,
    seatBookingInfo,
    bookingSeatList,
    tabActive,
  } = useSelector((state: RootState) => state.quanLyDatVe);
  const { userInfo } = useSelector((state: RootState) => state.quanLyNguoiDung);
  const param = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <Tabs
        className="px-5"
        defaultActiveKey={tabActive}
        activeKey={tabActive}
        onTabClick={(key) => {
          dispatch(quanLyDatVeActions.handleChangeActiveTab(key));
        }}
      >
        <TabPane tab="Booking" key="1">
          <BookingInfo />
        </TabPane>
        <TabPane tab="Booking Detail" key="2" disabled>
          <BookingDetail />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Booking;
