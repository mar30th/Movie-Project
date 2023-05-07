import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { getMovieDetail } from "../store/QuanLyPhim/thunkActions";
import { Link } from "react-scroll";

const MovieDetail = () => {
  const { movieDetail } = useSelector((state: RootState) => state.quanLyPhim);
  // const [movieDetail, setMovieDetail] = useState();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const param = useParams();
  console.log(param);

  useEffect(() => {
    if (param?.id) {
      dispatch(getMovieDetail(param.id));
    }
  }, [dispatch, param?.id]);
  console.log(movieDetail);

  return (
    <div className="bg-[#fdfcf0]">
      <div className="w-3/4 m-auto p-10">
        <div className="mb-5">
          <h1 className="text-4xl">Movie Detail</h1>
          <hr className="border-2 border-black border-opacity-50 my-1" />
        </div>
        <div className="flex justify-between">
          <img
            src={movieDetail?.hinhAnh}
            alt={movieDetail?.biDanh}
            className="h-[400px] w-[300px] rounded object-cover object-center"
          />
          <div className="pl-5">
            <div className="mb-5">
              <h1 className="text-3xl">{movieDetail?.tenPhim}</h1>
              <hr className="my-1" />
              <p>
                <span className="font-bold">Detail: </span>
                {movieDetail?.moTa}
              </p>
              <p>
                <span className="font-bold">Release Date: </span>
                {moment(movieDetail?.ngayKhoiChieu)?.format("MM/DD/YYYY")}
              </p>
            </div>
            <Link
              activeClass="active"
              to="showtime"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <button className="text-white bg-red-600 border border-gray-300 rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-3 py-[10px]">
                BOOKING
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
