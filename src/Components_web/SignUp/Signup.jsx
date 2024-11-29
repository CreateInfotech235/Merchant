import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Image from "../../assets_web/illustration-dashboard.webp";
import Logo from "../../assets_web/tracking.png";
import GoogleSvg from "../../assets_web/tracking.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../../Components_merchant/Api/Auth";

// Validation Schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
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
  name: "",
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
      setFieldValue("medicalCertificate", file); // Set the file in Formik's state
      setCertificateImage(fileURL);
    }
  };

  const handleSendOtp = async (values, setErrors) => {
    setOtpLoading(true);
    const otpPayload = {
      email: values.email,
      contactNumber: values.contactNumber,
      personType: "CUSTOMER",
      countryCode: values.address.country // You can change this based on the user type
    };

    const response = await sendOtp(otpPayload); // Call send OTP API
    console.log(response);
    

    if (response.status) {
      setOtpSent(true); // OTP sent successfully
    } else {
      setErrors({ apiError: response.message }); // Handle error
    }
    setOtpLoading(false);
  };
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);

    const formattedValue = { ...values, countryCode: values.address.country }
    const response = await signup(formattedValue);
    console.log(response);
    

    if (response.status) {

      navigate("/login");
    } else {
      // Handle API error
      setErrors({ apiError: response.message });
    }

    setSubmitting(false);
  };


  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result); // This will be the base64 string
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex">
      {/* Right Side */}
      <div className="flex flex-1 justify-center items-center">
        <div className="w-4/5 max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src={Logo} alt="Logo" className="w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Create your account</h2>
            <p className="text-gray-600">Please fill in your details</p>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, setErrors,values, errors, touched }) => (
              <Form>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4 mt-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>

                <div className="relative mb-4">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                  <div
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Field
                      type="text"
                      name="contactNumber"
                      placeholder="Contact Number"
                      className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                    />
                    {errors.contactNumber && touched.contactNumber && (
                      <div className="text-red-500">{errors.contactNumber}</div>
                    )}
                  </div>
                  <div>
                  <button
                  type="button"
                  className="btn btn-secondary me-2" // Add margin-end to separate the buttons
                  disabled={otpLoading || otpSent}
                  onClick={() => handleSendOtp(values, setErrors)} // Trigger OTP send on click
                >
                  {otpLoading ? "Sending OTP..." : otpSent ? "OTP Sent" : "Send OTP"}
                </button>
                  </div>
                </div>

                <div className="mb-4 mt-4">
                  <Field
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                    disabled={!otpSent}
                  />
                  {errors.otp && touched.otp && (
                    <div className="text-red-500">{errors.otp}</div>
                  )}
                </div>

                <div className="mb-4 mt-4">
                  <Field
                    type="text"
                    name="medicalCertificateNumber"
                    placeholder="Medical Certificate Number"
                    className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                  />
                  {errors.medicalCertificateNumber &&
                    touched.medicalCertificateNumber && (
                      <div className="text-red-500">
                        {errors.medicalCertificateNumber}
                      </div>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Field
                      type="text"
                      name="address.street"
                      placeholder="Street Address"
                      className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                    />
                    {errors.address?.street && touched.address?.street && (
                      <div className="text-red-500">
                        {errors.address.street}
                      </div>
                    )}
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="address.city"
                      placeholder="City"
                      className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                    />
                    {errors.address?.city && touched.address?.city && (
                      <div className="text-red-500">{errors.address.city}</div>
                    )}
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="address.postalCode"
                      placeholder="Postal Code"
                      className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                    />
                    {errors.address?.postalCode &&
                      touched.address?.postalCode && (
                        <div className="text-red-500">
                          {errors.address.postalCode}
                        </div>
                      )}
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="address.country"
                      placeholder="Country"
                      className="w-full border-b border-gray-400 p-3 focus:outline-none focus:border-black"
                    />
                    {errors.address?.country && touched.address?.country && (
                      <div className="text-red-500">
                        {errors.address.country}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4 mt-4">
                  <label className="block mb-2 text-gray-600">
                    Medical Certificate
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="image"
                    accept="image/*" // Only allow image files
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        // Set the image preview in local state
                        const previewUrl = URL.createObjectURL(file);
                        setImagePreviewUrl(previewUrl); // Update the image preview URL in local state

                        // Convert file to base64 and store in Formik values
                        fileToBase64(file, (base64String) => {
                          setFieldValue("medicalCertificate", base64String); // Store base64 string in Formik's values
                        });
                      }
                    }}
                  />
                  {imagePreviewUrl && (
                    <div className="mt-4">
                      <label className="block text-gray-600">Preview:</label>
                      <img
                        src={imagePreviewUrl}
                        alt="Medical Certificate"
                        className="w-full h-auto border rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Log In
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex-1 bg-gray-100 hidden md:block">
        <img
          src={Image}
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Signup;
