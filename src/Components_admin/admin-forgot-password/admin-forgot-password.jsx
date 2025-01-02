import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { forgotPassword, verifyOTP, changePassword } from "../Api/AdminForgotPassword"; // Assuming changePassword API exists

const AdminForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(true);
    const [isOtpSending, setIsOtpSending] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [initialValues, setInitialValues] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const email = location.state?.email;
        if (email && email !== initialValues.email) {
            setInitialValues(prevValues => ({
                ...prevValues,
                email: email // Update email when location changes
            }));
        }
    }, [location.state?.email]); // Ensure this is only dependent on the email change

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
        console.log(values, "values");
        if (isOtpVerified) {
            // Change Password
            try {
                const response = await changePassword(values.email, values.password);
                console.log(response);
                if (response.status === "SUCCESS") {
                    navigate("/admin-login"); // Redirect to login page after successful change
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
                if (response.status === "SUCCESS") {
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
        console.log(initialValues);
        try {
            setIsOtpSending(true);
            const response = await forgotPassword(initialValues.email);
            setIsOtpSending(false);
            if (response === "SUCCESS") {
                setIsOtpSent(false); // OTP sent successfully
            } else {
                console.error("Error sending OTP:", response);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            setIsOtpSending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(50deg,_#B6C9E7,_#ffe5e1,_#939ccb,_#e6eff8)]">
            {/* Container */}
            <div className="flex items-center justify-between w-[1100px] h-[600px] rounded-lg overflow-hidden">
                <div className="w-50% mx-auto p-12 flex flex-col justify-center bg-gradient-to-br backdrop-blur-[82px] rounded-lg from-[#ffffff9e] from-50% to-[#e3e4ff] to-100%">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Admin Forgot Password</h1>

                    {/* Form */}
                    <Formik
                        enableReinitialize={true} // This will ensure form reinitializes on state changes
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
                                                value={initialValues.email}
                                                onChange={(e) => setInitialValues({ ...initialValues, email: e.target.value })}
                                                placeholder="Enter Your Email"
                                                className="w-full pl-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                            {errors.email && touched.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* OTP Input */}
                                {!isOtpVerified && (
                                    <div className="mt-0 flex">
                                        <div className="w-[60%]">
                                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                                OTP
                                            </label>
                                            <div className="relative">
                                                <Field
                                                    type="number"
                                                    name="otp"
                                                    id="otp"
                                                    value={initialValues.otp}
                                                    onChange={(e) => setInitialValues({ ...initialValues, otp: e.target.value })}
                                                    disabled={isOtpSent}
                                                    placeholder="Enter OTP"
                                                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                />
                                                {errors.otp && touched.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
                                            </div>
                                        </div>
                                        <div className="mt-10 w-[40%] pl-3">
                                            <div className="relative mt-0 w-full">
                                                <button
                                                    type="button"
                                                    className="w-full p-3 border border-gray-300 bg-purple-500 text-white rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 hover:bg-purple-600"
                                                    onClick={handleSendOtp}
                                                >
                                                    {isOtpSent ? isOtpSending ? "Sending OTP..." : "Send OTP" : isOtpSending ? "Resending OTP..." : "Resend OTP"}
                                                </button>
                                            </div>
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
                                                value={initialValues.password}
                                                onChange={(e) => setInitialValues({ ...initialValues, password: e.target.value })}
                                                placeholder="Enter Your New Password"
                                                className="w-full py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEye className="text-gray-400" /> : <FaEyeSlash className="text-gray-400" />}
                                            </button>
                                        </div>
                                        {errors.password && touched.password && (
                                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
                                                value={initialValues.confirmPassword}
                                                onChange={(e) => setInitialValues({ ...initialValues, confirmPassword: e.target.value })}
                                                placeholder="Confirm Your Password"
                                                className="w-full py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEye className="text-gray-400" /> : <FaEyeSlash className="text-gray-400" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-4 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg"
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
                        <Link to="/admin-login" className="text-sm text-blue-500 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminForgotPassword;
