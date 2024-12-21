import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Image from "../../assets_web/illustration-dashboard.webp";
import Logo from "../../assets_web/logoCreateBlack.png";
import GoogleSvg from "../../assets_web/tracking.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../../Components_merchant/Api/Auth";

// Validation Schema with Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("firstName is required"),
  lastName : Yup.string().required("lastName is required"), 
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, and one number"
    )
    .required("Password is required"),
  contactNumber: Yup.number()
    .required("Contact number is required")
    .typeError("Must be a valid number"),
  otp: Yup.number()
    .required("OTP is required")
    .typeError("Must be a valid number"),
  medicalCertificateNumber: Yup.number()
    .required("Medical certificate number is required")
    .typeError("Must be a valid number"),
  address: Yup.object({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
  }).required("Address is required"),
  medicalCertificate: Yup.mixed().required("Medical Certificate is required"),
});

// Initial Values for Formik
const initialValues = {
  firstName: "",
  lastName : "",
  email: "",
  password: "",
  contactNumber: "",
  otp: "",
  medicalCertificateNumber: "",
  address: {
    street: "",
    city: "",
    postalCode: "",
    country: "",
  },
  medicalCertificate: "",
};

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [certificateImage, setCertificateImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate()

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFieldValue("medicalCertificate", file);
      setCertificateImage(fileURL);
    }
  };

  const handleSendOtp = async (values, setErrors) => {
    setOtpLoading(true);
    const otpPayload = {
      email: values.email,
      contactNumber: values.contactNumber,
      personType: "CUSTOMER",
      // countryCode: values.address.country
    };

    const response = await sendOtp(otpPayload);
    // console.log(response);

    if (response.status) {
      setOtpSent(true);
    } else {
      setErrors({ apiError: response.message });
    }
    setOtpLoading(false);
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);

    const formattedValue = { ...values, countryCode: values.address.country }
    const response = await signup(formattedValue);
    // console.log(response);

    if (response.status) {
      navigate("/login");
    } else {
      setErrors({ apiError: response.message });
    }

    setSubmitting(false);
  };

  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-[#221F92] to-purple-700 justify-center items-center">
        <div className="max-w-2xl">
          <img src={Image} alt="Illustration" className="object-cover w-full h-full rounded-lg shadow-2xl" />
          <div className="text-[#fff] text-center mt-8">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
            <p className="text-lg">Join us and experience seamless delivery services</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src={Logo} alt="Logo" className="mx-auto h-24 w-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Please fill in your details to get started</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, setErrors, values, errors, touched }) => (
              <Form className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      {errors.firstName && touched.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      {errors.lastName && touched.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      {errors.contactNumber && touched.contactNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
                      )}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleSendOtp(values, setErrors)}
                        disabled={otpLoading || otpSent}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#fff] ${
                          otpLoading || otpSent
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#221F92] hover:bg-[#1a1873]"
                        }`}
                      >
                        {otpLoading ? "Sending..." : otpSent ? "OTP Sent" : "Send OTP"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      disabled={!otpSent}
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                    />
                    {errors.otp && touched.otp && (
                      <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                    )}
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="medicalCertificateNumber"
                      placeholder="Company Register Number"
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                    />
                    {errors.medicalCertificateNumber && touched.medicalCertificateNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.medicalCertificateNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="text"
                        name="address.street"
                        placeholder="Street Address"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      {errors.address?.street && touched.address?.street && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.street}</p>
                      )}
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="address.city"
                        placeholder="City"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      {errors.address?.city && touched.address?.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.city}</p>
                      )}
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="address.postalCode"
                        placeholder="Postal Code"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      {errors.address?.postalCode && touched.address?.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.postalCode}</p>
                      )}
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="address.country"
                        placeholder="Country"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                      />
                      {errors.address?.country && touched.address?.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.country}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="medicalCertificate">
                      Company Register Document
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="medicalCertificate"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        if (file) {
                          const previewUrl = URL.createObjectURL(file);
                          setImagePreviewUrl(previewUrl);
                          fileToBase64(file, (base64String) => {
                            setFieldValue("medicalCertificate", base64String);
                          });
                        }
                      }}
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-[#221F92] focus:border-[#221F92]"
                    />
                    {imagePreviewUrl && (
                      <div className="mt-4">
                        <img
                          src={imagePreviewUrl}
                          alt="Medical Certificate Preview"
                          className="max-w-full h-auto rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-[#fff] bg-[#221F92] hover:bg-[#1a1873] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#221F92]"
                  >
                    Create Account
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-[#221F92] hover:text-[#1a1873]">
                      Sign in
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Signup;
