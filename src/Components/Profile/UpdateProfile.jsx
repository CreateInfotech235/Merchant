import React, { useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMerchantProfile } from "../Api/Profile";
import countryList from "react-select-country-list";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { merchant } = location.state || {};
  console.log(merchant);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    merchant?.medicalCertificate || ""
  );
  const [profilePreviewUrl, setProfilePreviewUrl] = useState(
    merchant?.image || ""
  );

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNumber: Yup.number()
      .required("Contact number is required")
      .typeError("Must be a valid number"),
    medicalCertificateNumber: Yup.number()
      .required("Medical certificate number is required")
      .typeError("Must be a valid number"),
    address: Yup.string().required("Address is required"),
    medicalCertificate: Yup.string().required(
      "Medical Certificate is required"
    ),
    image: Yup.string().required("image is required"),
  });

  // Initial form values
  const initialValues = {
    name: merchant?.name || "",
    email: merchant?.email || "",
    contactNumber: merchant?.contactNumber || "",
    medicalCertificateNumber: merchant?.medicalCertificateNumber || "",
    address: merchant?.address || "",
    medicalCertificate: merchant?.medicalCertificate || "",
    image: merchant?.image || "",
  };

  // Get the country list from react-select-country-list
  const countryOptions = useMemo(() => countryList().getData(), []);

  // Submit handler
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    console.log(values);

    const response = await updateMerchantProfile(values);

    if (response.status) {
      navigate("/profile"); // Redirect to profile page on success
    } else {
      setErrors({ apiError: response.message }); // Handle API error
    }

    setSubmitting(false);
  };

  // Helper function to convert file to base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // This will be the Base64 string
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card p-5 shadow-lg register-card">
        <h2 className="text-center mb-4">Update Profile</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, values, setFieldValue }) => (
            <Form>
              <div className="row mb-3">
                {/* Name Field */}

                <div className="col-md-12">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="image">Profile Image</label>
                      {profilePreviewUrl && (
                        <img
                          src={profilePreviewUrl}
                          alt="Profile Image Preview"
                          className="profile-image"
                        />
                      )}
                      <input
                        type="file"
                        id="image"
                        className="form-control"
                        accept="image/*"
                        onChange={async (event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            const previewUrl = URL.createObjectURL(file);
                            setProfilePreviewUrl(previewUrl);

                            try {
                              const base64String = await fileToBase64(file);
                              setFieldValue("image", base64String);
                            } catch (error) {
                              console.error(
                                "Error converting file to Base64:",
                                error
                              );
                            }
                          }
                        }}
                      />
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </div>

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
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
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
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="row mb-3">
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
                  <ErrorMessage
                    name="contactNumber"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Medical Certificate Number Field */}
                <div className="col-md-6">
                  <label
                    className="label-large-bold"
                    htmlFor="medicalCertificateNumber"
                  >
                    Medical Certificate Number{" "}
                    <span className="text-danger">*</span>
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
              </div>

              {/* Address Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="address">Address</label>
                  <Field
                    name="address"
                    className="form-control"
                    placeholder="Enter Address"
                  />
                  <ErrorMessage
                    name="address."
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>


              {/* Medical Certificate Upload */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="medicalCertificate">
                    Medical Certificate
                  </label>
                  <input
                    type="file"
                    id="medicalCertificate"
                    className="form-control"
                    accept="image/*"
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
                  />
                  <ErrorMessage
                    name="medicalCertificate"
                    component="div"
                    className="text-danger"
                  />
                  {imagePreviewUrl && (
                    <img
                      src={imagePreviewUrl}
                      alt="Medical Certificate Preview"
                      className="img-fluid mt-3"
                    />
                  )}
                </div>
              </div>

              <div className="row mb-3">
                {/* API Error */}
                {errors.apiError && (
                  <div className="text-danger">{errors.apiError}</div>
                )}
              </div>

              <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;
