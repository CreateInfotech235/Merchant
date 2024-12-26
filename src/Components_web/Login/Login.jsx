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

const Login = ({ Login, setLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "demo@gmail.com",
    password: "demoDEMO@1121",
    personType: "CUSTOMER",
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
        navigate("/");
      }
      setLogin(true);
    } else {
      setErrors({ apiError: response.message });
    }
    setSubmitting(false);
  };

  return (
    <>
      {/* <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-[#fff]">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <img src={Logo} alt="Logo" className="mx-auto h-24 w-auto mb-4" />
              <h2 className="text-4xl font-extrabold text-[#221F92] mb-2">
                Sign In
              </h2>
              <p className="text-gray-600">Please enter your credentials</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                  <div className="rounded-md shadow-sm space-y-4">
                    <div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-400" />
                        ) : (
                          <FaEye className="text-gray-400" />
                        )}
                      </button>
                      {errors.password && touched.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-[#fff] bg-[#221F92] hover:bg-[#1a1873] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#221F92]"
                    >
                      {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                  </div>

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

        <div className="hidden lg:flex lg:w-1/2 bg-[#221F92] justify-center items-center">
          <div className="max-w-2xl">
            <img
              src={Image}
              alt="Illustration"
              className="object-cover w-full h-full rounded-lg shadow-2xl"
            />
            <div className="text-[#fff] text-center mt-8">
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg">Login to access your account</p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(50deg,_#B6C9E7,_#ffe5e1,_#939ccb,_#e6eff8)]">
        {/* Container */}
        <div className="flex items-center justify-between w-[1100px] h-[600px] rounded-lg overflow-hidden">
          {/* Left Section */}
          <div className="w-1/2 flex flex-col items-center justify-center  p-8">
            {/* Illustration */}
            <div className="relative">
              {/* Mockup Illustration */}
              <img src={loginImage} alt="Laptop Illustration" className="" />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/2 p-12 flex flex-col justify-center bg-gradient-to-br backdrop-blur-[82px] rounded-lg from-[#ffffff9e] from-50% to-[#e3e4ff] to-100%">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              LOGIN
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              How to get started lorem ipsum dolor at?
            </p>
            {/* Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
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
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaLock className="text-gray-400" />
                      </span> */}
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
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
      </div>
    </>
  );
};

export default Login;
