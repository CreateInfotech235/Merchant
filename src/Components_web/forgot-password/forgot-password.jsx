import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { forgotPassword, verifyOTP, changePassword } from "../Api/Webapi"; // Assuming changePassword API exists
import loginImage from "../../assets_web/Computer login-amico 1.png";
import { toast } from "react-toastify";

const ForgotPassword = ({ Login, setLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(true);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });


  useEffect(() => {
    const OtpSent = localStorage.getItem("OtpSent");
    if (OtpSent !== null) {
      if (OtpSent === "true") {
        setIsOtpSent(true);
      } else {
        setIsOtpSent(false);
      }
    }
  }, []);



  useEffect(() => {
    if (isOtpVerified) {
      localStorage.removeItem("OtpSent");
    }
  }, [isOtpVerified]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    otp: Yup.string().when("isOtpVerified", {
      is: false,
      then: Yup.string().required("OTP is required"),
    }),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, and one number"
      )
      .when("isOtpVerified", {
        is: true,
        then: Yup.string().required("Password is required"),
      }),
    confirmPassword: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, and one number"
      )
      .when("isOtpVerified", {
        is: true,
        then: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
      }),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    if (isOtpVerified) {
      // Change Password
      try {
        const response = await changePassword(values.email, values.password);
        console.log(response);
        if (response.status == "SUCCESS") {
          navigate("/login"); // Redirect to login page after successful change
        } else {
          setErrors({ general: response.message });
        }
      } catch (error) {
        console.error("Error changing password:", error);
        setErrors({ general: "Error changing password" });
      }
    } else {
      // Verify OTP
      try {
        const response = await verifyOTP(values.email, values.otp);
        console.log(response);
        if (response.status == "SUCCESS") {
          setIsOtpVerified(true); // OTP verified, show password fields
        } else {
          setErrors({ otp: "Invalid OTP" });
        }
      } catch (error) {
        setErrors({ general: "Error verifying OTP" });
      }
    }
    setSubmitting(false);
  };

  const handleSendOtp = async () => {
    setIsOtpSending(true);
    try {
      const response = await forgotPassword(initialValues.email);
      console.log(response);
      setIsOtpSending(false);
      if (response == "SUCCESS") {
        setIsOtpSent(false); // OTP sent successfully
        localStorage.setItem("OtpSent", false);
        toast.success("OTP sent successfully");
      } else {
        toast.error("Error sending OTP");
        console.error("Error sending OTP:", response);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP");
      setIsOtpSending(false);
    }
  };

  const location = useLocation();

  useEffect(() => {
    const email = location.state?.email;
    if (email) {
      setInitialValues({ ...initialValues, email: email });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(50deg,_#B6C9E7,_#ffe5e1,_#939ccb,_#e6eff8)] p-4">
      {/* Container */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1100px] h-auto min-h-[500px] md:h-[600px] rounded-lg overflow-hidden mx-4">
        {/* Left Section */}
        <div className="w-full md:w-1/2 hidden md:flex flex-col items-center justify-center p-4 md:p-8">
          {/* Illustration */}
          <div className="relative w-full">
            <img src={loginImage} alt="Laptop Illustration" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-4 sm:p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br backdrop-blur-[82px] rounded-lg from-[#ffffff9e] from-50% to-[#e3e4ff] to-100%">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Forgot Password</h1>

          {/* Form */}
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                {/* Email Input */}
                {!isOtpVerified && (
                  <div className="mt-0">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        className="w-full pl-4 md:pl-10 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* OTP Input */}
                {!isOtpVerified && (
                  <div className="mt-0 flex flex-col sm:flex-row gap-3 sm:gap-0">
                    <div className="w-full sm:w-[60%]">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                        OTP
                      </label>
                      <div className="relative">
                        <Field
                          type="number"
                          name="otp"
                          id="otp"
                          placeholder="Enter OTP"
                          className="w-full pl-4 md:pl-10 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
                        />
                        {errors.otp && touched.otp &&
                          <p className="text-red-500 text-xs md:text-sm mt-1">{errors.otp}</p>
                        }
                      </div>
                    </div>
                    <div className="w-full sm:w-[40%] sm:pl-3 sm:mt-6">
                      <button
                        type="button"
                        className="w-full h-[42px] md:h-[50px] px-2 md:px-3 border border-gray-300 bg-purple-500 text-white rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 hover:bg-purple-600 text-sm md:text-base"
                        onClick={handleSendOtp}
                      >
                        {isOtpSent ? isOtpSending ? "Sending OTP..." : "Send OTP" : isOtpSending ? "Resending OTP..." : "Resend OTP"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Password Input */}
                {isOtpVerified && (
                  <div className="mt-0">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Enter Your New Password"
                        className="w-full py-2 md:py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye className="text-gray-400 text-sm md:text-base" /> : <FaEyeSlash className="text-gray-400 text-sm md:text-base" />}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                )}

                {/* Confirm Password */}
                {isOtpVerified && (
                  <div className="mt-0">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Your Password"
                        className="w-full py-2 md:py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye className="text-gray-400 text-sm md:text-base" /> : <FaEyeSlash className="text-gray-400 text-sm md:text-base" />}
                      </button>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-500 text-xs md:text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 md:py-3 px-4 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg text-sm md:text-base mt-4"
                >
                  {isOtpVerified
                    ? isSubmitting
                      ? "Changing Password..."
                      : "Change Password"
                    : isSubmitting
                      ? "Verifying OTP..."
                      : "Verify OTP"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Links */}
          <div className="mt-4 text-center">
            <Link to="/login" className="text-xs md:text-sm text-blue-500 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
