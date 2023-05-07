import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { handleRegister } from "../store/QuanLyNguoiDung/thunkActions";

const Register = () => {
  const { userRegister } = useSelector((state: RootState) => state.quanLyNguoiDung)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(quanLyNguoiDungActions.getUser())
    // console.log("123"); 
    if(localStorage.getItem("userRegister")){
      navigate("/login")
    }
  }, [localStorage.getItem("userRegister")])

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    //   matKhauXacNhan: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
    onSubmit: (values) => {
    //   if (values.matKhau !== values.matKhauXacNhan) {
    //     console.log("Mật khẩu xác nhận không khớp với mật khẩu");
    //   } else {
    //     console.log(values);

    //   }
    console.log(values);
      dispatch(handleRegister(values));
      alert("Sign Up Successfully, Sign In Now!")
    },
  });

  const validate = (values: any, props: any /* only available when using withFormik */) => {
    const errors: any = {};
    
    if (!values.email) {
    errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    }
    
    //...
    
  return errors}


  return (
    <div className="">
      <section className="bg-[#fdfcf0]">
        <div className="flex flex-col items-center justify-center lg:py-0">
          <div className="rounded border-8 my-2 bg-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create account
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div className="flex">
                  <div className="pe-1">
                    <label
                      htmlFor="taiKhoan"
                      className="block mb-0.5 text-sm font-medium text-gray-900"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      name="taiKhoan"
                      onChange={formik.handleChange}
                      id="taiKhoan"
                      pattern=".{4,8}"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="User Name"
                      title="Sorry, your username must be between 4 and 8 characters long."
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-0.5 text-sm font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="hoTen"
                      id="hoTen"
                      onChange={formik.handleChange}
                      pattern=".{5,20}"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Your Full Name"
                      title="Sorry, your Full Name must be between 5 and 20 characters long."
                      required
                    />
                  </div>
                </div>
                <div className="pe-1">
                  <label
                    htmlFor="email"
                    className="block mb-0.5 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    placeholder="your email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="pe-1">
                    <label
                      htmlFor="password"
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="matKhau"
                      id="matKhau"
                      onChange={formik.handleChange}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                <div className="flex">
                  <div className="pe-1">
                    <label
                      htmlFor="number"
                      className="block mb-0.5 text-sm font-medium text-gray-900"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="soDt"
                      id="soDt"
                      pattern="[0-9]{10}"
                      onChange={formik.handleChange}
                      placeholder="Your phone number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      title="Sorry, your Phone Number must be 10 characters long."
                      required
                    />
                  </div>{" "}
                  <div className="pe-1">
                    <label
                      htmlFor="maNhom"
                      className="block mb-0.5 text-sm font-medium text-gray-900"
                    >
                      Group ID
                    </label>
                    <input
                      type="text"
                      name="maNhom"
                      id="maNhom"
                      onChange={formik.handleChange}
                      placeholder="Your Group ID"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                </div>



                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <NavLink
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
