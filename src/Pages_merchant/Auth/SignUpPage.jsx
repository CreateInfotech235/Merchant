import React, { useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signup, sendOtp } from "../../Components_merchant/Api/Auth"; // Ensure sendOtp is imported
import countryList from "react-select-country-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import select from "../../assets_mercchant/select.png";

const Signup = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // Validation schema using Yup
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
      // state: Yup.string().required("State is required"),
      postalCode: Yup.string()
        // .matches(/^\d{5}?$/, 'Postal code must be in the format: 12345 or 12345-6789')
        .required('Postal code is required'),
      country: Yup.string().required("Country is required"),
    }).required("Address is required"),
    medicalCertificate: Yup.string().required("Medical Certificate is required"),

  });

  // Initial form values
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
      // state: "",
      postalCode: "",
      country: "",
    },
    medicalCertificate: "",
  };


  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Get the country list from react-select-country-list
  const countryOptions = useMemo(() => countryList().getData(), []);

  // OTP sending handler
  const handleSendOtp = async (values, setErrors) => {
    setOtpLoading(true);
    const otpPayload = {
      email: values.email,
      contactNumber: values.contactNumber,
      personType: "CUSTOMER",
      // countryCode: values.address.country // You can change this based on the user type
    };

    const response = await sendOtp(otpPayload); // Call send OTP API

    if (response.status) {
      setOtpSent(true); // OTP sent successfully
    } else {
      setErrors({ apiError: response.message }); // Handle error
    }
    setOtpLoading(false);
  };

  // Submit handler
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);

    const formattedValue = { ...values, countryCode: values.address.country }
    const response = await signup(formattedValue);

    if (response.status) {

      navigate("/merchant/login");
    } else {
      // Handle API error
      setErrors({ apiError: response.message });
    }

    setSubmitting(false);
  };

  // Helper function to convert file to base64 string
  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result); // This will be the base64 string
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card p-5 shadow-lg register-card">
        <h2 className="text-center mb-4">Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, values, setErrors, setFieldValue }) => {
            // console.log('formik', errors, values)
            return <Form>
              <div className="row mb-3">
                {/* Name Field */}
                <div className="col-md-6">
                  <label className="label-large-bold" htmlFor="name">
                    Name <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>

                {/* Email Field */}
                <div className="col-md-6">
                  <label className="label-large-bold" htmlFor="email">
                    Email <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row mb-3">
                {/* Password Field */}
                <div className="col-md-6">
                  <label className="label-large-bold" htmlFor="password">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>


                {/* Contact Number Field */}
                <div className="col-md-6">
                  <label className="label-large-bold" htmlFor="contactNumber">
                    Contact Number <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    className="form-control"
                    placeholder="Enter your contact number"
                  />
                  <ErrorMessage name="contactNumber" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row mb-3">
                {/* Country Code Field */}
                <div className="col-md-6">
                  <label className="label-large-bold" htmlFor="countryCode">
                    Country <span className="text-danger">*</span>
                  </label>
                  <Field as="select" name="address.country" className="form-control">
                    <option value="" label="Select your country" />
                    {countryOptions.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="address.country" component="div" className="text-danger" />
                </div>
                <div className="col-md-6">
                  <label className="label-large-bold" htmlFor="otp">
                    OTP <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="otp"
                    id="otp"
                    className="form-control"
                    placeholder="Enter your OTP"
                    disabled={!otpSent} // Disable OTP field until OTP is sent
                  />
                  <ErrorMessage name="otp" component="div" className="text-danger" />
                </div>

              </div>

              <div className="row mb-3">
                {/* OTP Field */}

                {/* Medical Certificate Number Field */}
                <div className="col-md-6">
                  <label className="label-large-bold" htmlFor="medicalCertificateNumber">
                    Medical Certificate Number <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="medicalCertificateNumber"
                    id="medicalCertificateNumber"
                    className="form-control"
                    placeholder="Enter your medical certificate number"
                  />
                  <ErrorMessage
                    name="medicalCertificateNumber"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label className="label-large-bold" htmlFor="street">
                    Street <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="address.street"
                    className="form-control"
                    placeholder="Enter your street"
                  />
                  <ErrorMessage name="address.street" component="div" className="text-danger" />
                </div>
              </div>


              <div className="row mb-3">
                <div className="form-group col-md-6 mb-3">
                  <label className="label-large-bold" htmlFor="city">
                    City <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="address.city"
                    className="form-control"
                    placeholder="Enter your city"
                  />
                  <ErrorMessage name="address.city" component="div" className="text-danger" />
                </div>

                {/* <div className="form-group col-md-6 mb-3">
                  <label className="label-large-bold" htmlFor="state">
                    State <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="address.state"
                    className="form-control"
                    placeholder="Enter your state"
                  />
                  <ErrorMessage name="address.state" component="div" className="text-danger" />
                </div> */}
              </div>
              <div className="row mb-3">
                <div className="form-group col-md-6 mb-3">
                  <label className="label-large-bold" htmlFor="postalCode">
                    Postal Code <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="address.postalCode"
                    className="form-control"
                    placeholder="Enter your postal code"
                  />
                  <ErrorMessage name="address.postalCode" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row input-box">

                <div className="input-error col-xxl-4 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                  <label
                    htmlFor="image"
                    className="form-label w-100"
                    style={{ color: "#999696" }}
                  >
                    Medical Certificate
                  </label>
                  <div
                    className="img d-flex flex-column-reverse bg-white p-2 justify-content-center align-items-center rounded-3"
                    style={{ width: "40%" }}
                  >
                    <div className="label">
                      <label htmlFor="image" className="form-labels">
                        Select File
                      </label>
                    </div>
                    <div className="image">
                      {/* Display the image preview or the placeholder */}
                      <img
                        src={imagePreviewUrl || select} // Local state for previewing the image
                        className="car12 p-3"
                        alt="Select"
                        width={150}
                        height={150}
                      />
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
                    </div>
                  </div>
                  <ErrorMessage
                    name="medicalCertificate"
                    component="div"
                    className="text-danger ps-2"
                  />
                </div>
              </div>

              {errors.apiError && <div className="text-danger mb-3">{errors.apiError}</div>}


              <div className="d-flex justify-content-center mb-3">
                {/* Send OTP Button */}
                <button
                  type="button"
                  className="btn btn-secondary me-2" // Add margin-end to separate the buttons
                  disabled={otpLoading || otpSent}
                  onClick={() => handleSendOtp(values, setErrors)} // Trigger OTP send on click
                >
                  {otpLoading ? "Sending OTP..." : otpSent ? "OTP Sent" : "Send OTP"}
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting || !otpSent} // Disable submit until OTP is sent
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
              </div>


              {/* Login Link */}
              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/merchant/login">Login here</Link>
                </p>
              </div>
            </Form>
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
