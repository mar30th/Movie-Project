import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space, Tabs } from "antd";
import {
  GetMovieListByTheater,
  GetShowTimeDetail,
  GetTheaterListResponse,
  GetTheaterSystemResponse,
  quanLyRapServices,
} from "../services/quanLyRap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getTheaterSystem } from "../store/QuanLyRap/thunkAction";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

type TabPosition = "left" | "right" | "top" | "bottom";

const TheaterList: React.FC = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");
  // const [ theaterList, setTheaterList ] = useState<GetTheaterResponse[]>();
  const { theaterSystem } = useSelector((state: RootState) => state.quanLyRap);
  // useEffect(() => {
  //   (async () => {
  //     const res = await quanLyRapServices.getTheaterList();
  //     // console.log(res.data.content);
  //     setTheaterList(res.data.content)
  //   })();
  // }, []);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getTheaterSystem());
  }, [dispatch]);

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };

  return (
    <div id="theaterList" className="border-2 border-black rounded pt-5 my-5 w-4/5 m-auto h-[500px] overflow-y-scroll">
      <Tabs tabPosition={tabPosition}>
        {theaterSystem?.map((theatersystem) => (
          <TabPane
            tab={
              <img src={theatersystem.logo} alt="Logo" className="w-12 h-12" />
            }
            key={theatersystem.maHeThongRap}
          >
            <Tabs tabPosition={tabPosition} className="h-[500px]">
              {theatersystem?.lstCumRap.map(
                (theaterList: GetTheaterListResponse) => (
                  <TabPane
                    tab={
                      <div className="w-[450px]">
                        <div className="mb-1 flex">
                          <img
                            src={theaterList.hinhAnh}
                            alt="theater"
                            className="w-12 h-12"
                          />
                          <div className="text-left px-1">
                            <h1 className="text-lg">{theaterList.tenCumRap}</h1>
                            <p className="text-xs">{theaterList.diaChi}</p>
                          </div>
                        </div>
                        <hr />
                      </div>
                    }
                    key={theaterList.maCumRap}
                  >
                    <Tabs tabPosition={tabPosition} className="h-[500px]">
                      {theaterList?.danhSachPhim
                        .slice(0, 4)
                        .map((movieList: GetMovieListByTheater) => (
                          <TabPane
                            tab={
                              <div>
                                <div
                                  key={movieList.maPhim}
                                  className="w-[500px]"
                                >
                                  <div className="flex mb-1">
                                    <img
                                      src={movieList.hinhAnh}
                                      alt={movieList.tenPhim}
                                      className="w-16 h-16"
                                    />
                                    <div className="px-1">
                                      <h1 className="text-xl text-left">
                                        {movieList.tenPhim}
                                      </h1>
                                      <p>{theaterList.diaChi}</p>
                                      <p>{movieList.maPhim}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="grid grid-cols-4 gap-x-1">
                                      {movieList?.lstLichChieuTheoPhim
                                        .slice(0, 12)
                                        .map(
                                          (
                                            showTime: GetShowTimeDetail,
                                            index
                                          ) => {
                                            return (
                                              <NavLink
                                                to={`/booking/${showTime.maLichChieu}`}
                                                key={index}
                                                className="text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm mb-[10px]"
                                              >
                                                {moment(
                                                  showTime.ngayChieuGioChieu
                                                ).format("hh:mm A")}
                                              </NavLink>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              </div>
                            }
                          />
                        ))}
                    </Tabs>
                  </TabPane>
                )
              )}
            </Tabs>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default TheaterList;
