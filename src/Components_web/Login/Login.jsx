import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Image from "../../assets_web/illustration-dashboard.webp";
import Logo from "../../assets_web/logoCreateBlack.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Components_merchant/Api/Auth";
import loginImage from "../../assets_web/Computer login-amico 1.png";
import { FaLock } from "react-icons/fa";
import { forgotPassword } from "../Api/Webapi";
import { socket } from "../../Components_merchant/Api/Api";

const Login = ({ Login, setLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [iserror,setIserror]=useState("");
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, and one number"
      )
      .required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const response = await login(values);
    console.log("response",response);

    if (response.status) {
      localStorage.setItem("merchnatId", response.data.userData._id);
      localStorage.setItem(
        "accessToken",
        response.data.userAuthData.accessToken
      );
      localStorage.setItem("userData", JSON.stringify(response.data.userData));
      
   

      const trackingNumber = localStorage.getItem("trackingNumber");
      if (trackingNumber) {
        navigate("/tracking");
      } else {
           // Reconnect socket with new credentials
      socket.auth = { token: response.data.userAuthData.accessToken };
      socket.io.opts.query = { userId: response.data.userData._id };
      console.log(socket.auth, 'socket.auth');
      socket.connect();
        navigate("/");
      }
      setLogin(true);
    } else {
      setIserror(response.message);
      setErrors({ apiError: response.message });
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(50deg,_#B6C9E7,_#ffe5e1,_#939ccb,_#e6eff8)]">
        {/* Container */}
        <div className="flex items-center justify-between max:w-[1100px] max:h-[600px] rounded-lg overflow-hidden" style={{width:window.innerWidth>768?"1100px":"100%"}}>
          {/* Left Section */}
          <div className="w-full hidden  md:block  md:w-1/2  flex-col p-8">
            {/* Illustration */}
            <div className="relative">
              {/* Mockup Illustration */}
              <img src={loginImage} alt="Laptop Illustration" className="" />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[90%] mx-auto md:w-1/2 p-4 md:p-12 flex flex-col justify-center bg-gradient-to-br backdrop-blur-[82px] rounded-lg from-[#ffffff9e] from-50% to-[#e3e4ff] to-100%">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              LOGIN
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              How to get started lorem ipsum dolor at?
            </p>
            {iserror && <p className="text-red-500 text-sm mt-1">Error: {iserror}</p>}
            {/* Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isSubmitting, values }) => (
                <Form className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="fas fa-user text-gray-400"></i>
                      </span>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />


                      {errors.email && touched.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className=" mt-0">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="Password"
                          className="w-full py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        />


                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEye className="text-gray-400" />
                          ) : (
                            <FaEyeSlash className="text-gray-400" />
                          )}
                        </button>
                        {errors.password && touched.password && (
                          <p className="text-red-500 text-sm mt-1 w-full">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                
                    <div className="d-flex justify-content-end mt-0 ">
                      <Link
                        to="/forgot-password"
                        state={{ email: values.email }}
                        className="block text-[14px] cursor-pointer font-medium text-[#221F92] hover:text-[#1a1873]"
                      >

                        <label htmlFor="personType" className="block text-[14px] cursor-pointer font-medium text-[#221F92] hover:text-[#1a1873]">
                          Forgot Password
                        </label>
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg"
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don&apos;t have an account?{" "}
                      <Link
                        to="/register"
                        className="font-medium text-[#221F92] hover:text-[#1a1873]"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div >
    </>
  );
};

export default Login;
