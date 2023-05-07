import { UserOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useScrollDirection } from "react-use-scroll-direction";
import { AppDispatch, RootState } from "../store";
import { quanLyNguoiDungActions } from "../store/QuanLyNguoiDung/slice";

const Header = () => {
  const { userInfo } = useSelector((state: RootState) => state.quanLyNguoiDung);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(quanLyNguoiDungActions.getUser());
  }, []);

  console.log(userInfo);
  const srcollDirection = useScrollDirection();

  return (
    <nav className="bg-white border-b-2 border-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to={"/home"} className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-1"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowra">
            Netflixplus
          </span>
        </NavLink>
        <div className="flex justify-center md:order-2">
          <div className="border rounded flex">
            {/* <span className="sr-only">Open user menu</span> */}
            <UserOutlined className="text-4xl px-1" />
            <div className="text-xl">
              {!!!userInfo && (
                <div className="px-1">
                  <div>
                    <NavLink
                      to={"/login"}
                      className="cursor-pointer text-lg text-center hover:text-green-600"
                    >
                      <span className="">Sign In</span>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to={"/register"}
                      className="border-t-2 hover:text-green-600 text-lg"
                      onClick={() => {
                        if(localStorage.getItem("userRegister")){
                          localStorage.removeItem("userRegister")
                        }
                      }}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                </div>
              )}
              {userInfo && (
                <div className="px-1">
                  <p
                    className="cursor-pointer text-lg text-center border-b-2"
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    Hello <span className="text-green-500">{userInfo.taiKhoan}</span>
                  </p>
                  <p
                    className="hover:text-red-300 text-lg text-center"
                    onClick={() => {
                      dispatch(quanLyNguoiDungActions.logOut());
                    }}
                  >
                    Sign Out
                  </p>
                </div>
              )}
            </div>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <NavLink
              to="/home"
              className="text-2xl block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
            >
              Home
            </NavLink>
            <Link
              activeClass="active"
              to="movieList"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <p
              // to="/booking"
              className="text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
            >
              Movie
            </p>
            </Link>
            <Link
              activeClass="active"
              to="theaterList"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <p
              // to="/booking"
              className="text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
            >
              Showtime
            </p>
            </Link>
            {/* <NavLink
            to="/login"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
            >
                Login
            </NavLink> */}
            {/* <NavLink
            to="/register"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
            >
                Register
            </NavLink> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
