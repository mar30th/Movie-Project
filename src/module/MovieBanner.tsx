import React, { useEffect, useState } from "react";
import {
  GetMovieBannerResponse,
  quanLyPhimServices,
} from "../services/quanLyPhim";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getBannerList } from "../store/QuanLyPhim/thunkActions";

const MovieBanner = () => {
  // const [bannerList, setBannerList] = useState<GetMovieBannerResponse[]>();
  const {bannerList} = useSelector((state: RootState) => state.quanLyPhim)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBannerList())
  }, [dispatch])

  const sliderBanner = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // useEffect(() => {
  //   (async () => {
  //     const res = await quanLyPhimServices.getBannerList();
  //     console.log(res.data.content);
  //     setBannerList(res.data.content);
  //     console.log(bannerList);
  //   })();
  // }, []);

  return (
<Slider {...sliderBanner} className='text-center'>
    {bannerList?.map((movie) => {
      return (
        <img src={movie.hinhAnh} key={movie.maBanner} className="h-[400px] object-cover"/>
      )
    })}
    </Slider>
  );
};

export default MovieBanner;
