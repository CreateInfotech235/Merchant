import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Image from "../../assets_web/illustration-dashboard.webp";
import Logo from "../../assets_web/logoCreateBlack.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Components_merchant/Api/Auth";

const Login = ({ Login, setLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "demo@gmail.com",
    password: "demoDEMO@1121",
    personType: "CUSTOMER"
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
      localStorage.setItem('merchnatId', response.data.userData._id);
      localStorage.setItem("accessToken", response.data.userAuthData.accessToken);
      localStorage.setItem('userData', JSON.stringify(response.data.userData));
      const trackingNumber = localStorage.getItem("trackingNumber")
      if (trackingNumber) {
        navigate("/tracking")
      } else {
        navigate("/");
      }
      setLogin(true)

    } else {
      setErrors({ apiError: response.message });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}


      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-[#fff]">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src={Logo} alt="Logo" className="mx-auto h-24 w-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-[#221F92] mb-2">Sign In</h2>
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
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                      {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                    </button>
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
                    <Link to="/register" className="font-medium text-[#221F92] hover:text-[#1a1873]">
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
          <img src={Image} alt="Illustration" className="object-cover w-full h-full rounded-lg shadow-2xl" />
          <div className="text-[#fff] text-center mt-8">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg">Login to access your account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
