import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "../../assets_web/illustration-dashboard.webp";
import Logo from "../../assets_web/tracking.png";
import GoogleSvg from "../../assets_web/tracking.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Components_merchant/Api/Auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

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
        localStorage.setItem('merchnatId',response.data.userData._id)
        localStorage.setItem("accessToken", response.data.userAuthData.accessToken);
        localStorage.setItem('userData', JSON.stringify(response.data.userData))
        navigate("/Merchant-dashboard");
        console.log(accessToken);
    } else {
        // Handle API error
        setErrors({ apiError: response.message });
    }

    setSubmitting(false);
};

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="hidden md:flex flex-1 bg-gray-100 justify-center items-center">
        <img src={Image} alt="Illustration" className="w-100" />
      </div>

      {/* Right Side */}
      <div className="flex flex-1 justify-center items-center">
        <div className="w-4/5 max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src={Logo} alt="Logo" className="w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Welcome back!</h2>
            <p className="text-gray-600">Please enter your details</p>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue, errors }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="relative mb-4">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  <div
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <label className="flex items-center text-sm text-gray-600">
                    <Field type="checkbox" name="rememberMe" className="mr-2" />
                    Remember for 30 days
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                  >
                       {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                  <button
                    type="button"
                    className="w-full bg-gray-100 py-3 rounded-lg flex justify-center items-center hover:bg-gray-200"
                  >
                    <img src={GoogleSvg} alt="Google" className="w-6 h-6 mr-3" />
                    Log In with Google
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Bottom Text */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
