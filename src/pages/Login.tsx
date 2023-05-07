import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/QuanLyNguoiDung/thunkActions";
import { AppDispatch, RootState } from "../store";
import { useFormik } from "formik";
import { quanLyNguoiDungActions } from "../store/QuanLyNguoiDung/slice";
import { NavLink, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.quanLyNguoiDung);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  useEffect(() => {
    // dispatch(quanLyNguoiDungActions.getUser())
    // console.log("123"); 
    if(localStorage.getItem("user")){
      navigate("/home")
    }
  }, [localStorage.getItem("user")])

  const formik = useFormik({
    initialValues: {
        taiKhoan: '',
        matKhau: '',
    },
  onSubmit: values => {
      dispatch(login(values));
      alert("Sign in Successfully!")
  }
  }) 


  return (
<section className="bg-[#fdfcf0]">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Stories move us.</h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">At NetflixPlus, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV series, documentaries, feature films and mobile games. Our members control what they want to watch, when they want it, in one simple subscription. We’re streaming in more than 30 languages and 190 countries, because great stories can come from anywhere and be loved everywhere. We are the world’s biggest fans of entertainment, and we’re always looking to help you find your next favorite story.</p>
      <NavLink to={"/home"} className="text-blue-600 hover:underline font-medium text-lg inline-flex items-center">Find out movie selection. 
        <svg aria-hidden="true" className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </NavLink>
    </div>
    <div>
      <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900">
          Sign in to NetflixPlus
        </h2>
        <form onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
            }}  className="mt-8 space-y-6" action="#">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input type="text" name="taiKhoan" onChange={formik.handleChange} id="taiKhoan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
            <input type="password" name="matKhau" onChange={formik.handleChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <button type="submit" className="w-full px-5 py-1 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto">Login to your account</button>
          <div className="text-sm font-medium text-gray-900">
            Not registered yet? <NavLink to={"/register"} className="text-blue-600 hover:underline">Create account</NavLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
  );
};

export default Login;
