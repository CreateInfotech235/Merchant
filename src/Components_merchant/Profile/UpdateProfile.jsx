import React, { useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMerchantProfile } from "../Api/Profile";
import countryList from "react-select-country-list";
import { FaUser ,FaCamera , FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaCity, FaGlobe, FaRoad } from "react-icons/fa";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { merchant } = location.state || {};

  const [imagePreviewUrl, setImagePreviewUrl] = useState(merchant?.medicalCertificate || "");
  const [profilePreviewUrl, setProfilePreviewUrl] = useState(merchant?.image || "");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    contactNumber: Yup.number().required("Contact number is required").typeError("Must be a valid number"),
    medicalCertificateNumber: Yup.number().required("Medical certificate number is required").typeError("Must be a valid number"),
    address: Yup.object({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      postalCode: Yup.string().required('Postal code is required'),
      country: Yup.string().required("Country is required"),
    }).required("Address is required"),
    medicalCertificate: Yup.string().required("Medical Certificate is required"),
    image: Yup.string().required("Profile image is required"),
  });

  const initialValues = {
    firstName: merchant?.firstName || "",
    lastName: merchant?.lastName || "",
    email: merchant?.email || "",
    contactNumber: merchant?.contactNumber || "",
    medicalCertificateNumber: merchant?.medicalCertificateNumber || "",
    address: {
      street: merchant.address.street || "",
      city: merchant.address.city || "",
      postalCode: merchant.address.postalCode || "",
      country: merchant.address.country || "",
    },
    medicalCertificate: merchant?.medicalCertificate || "",
    image: merchant?.image || "",
  };

  const countryOptions = useMemo(() => countryList().getData(), []);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    
    const response = await updateMerchantProfile(values);

    if (response.status) {
      localStorage.setItem("userData", JSON.stringify(response.data));  
      navigate("/profile");
    } else {
      setErrors({ apiError: response.message });
    }
    setSubmitting(false);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="min-h-screen w-full py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto bg-white rounded-xl wid overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Update Your Profile</h2>
        </div>

        <div className="p-4 sm:p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, setFieldValue }) => (
              <Form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Profile Image Section */}
                  <div className="w-full">
                    <div className="text-center">
                      <div className="relative w-24 sm:w-32 h-24 sm:h-32 mx-auto mb-4">
                        {profilePreviewUrl ? (
                          <img
                            src={profilePreviewUrl}
                            alt="Profile"
                            className="rounded-full object-cover w-full h-full border-4 border-blue-500"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                            <FaUser className="text-3xl sm:text-4xl text-gray-400" />
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 sm:p-2 cursor-pointer hover:bg-blue-600 transition">
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={async (event) => {
                              const file = event.currentTarget.files[0];
                              if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setProfilePreviewUrl(previewUrl);
                                const base64String = await fileToBase64(file);
                                setFieldValue("image", base64String);
                              }
                            }}
                          />
                          <FaCamera className="text-white text-sm sm:text-base" />
                        </label>
                      </div>
                      <ErrorMessage name="image" component="div" className="text-red-500 text-xs sm:text-sm" />
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="w-full">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                            <FaUser className="mr-2" />
                            First Name
                          </label>
                          <Field
                            type="text"
                            name="firstName"
                            className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                            placeholder="Enter first name"
                          />
                          <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                        </div>

                        <div className="form-group">
                          <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                            <FaUser className="mr-2" />
                            Last Name
                          </label>
                          <Field
                            type="text"
                            name="lastName"
                            className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                            placeholder="Enter last name"
                          />
                          <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                          <FaEnvelope className="mr-2" />
                          Email Address
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                          placeholder="Enter your email"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="form-group">
                    <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      <FaPhone className="mr-2" />
                      Contact Number
                    </label>
                    <Field
                      type="text"
                      name="contactNumber"
                      className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                      placeholder="Enter your contact number"
                    />
                    <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                  </div>

                  <div className="form-group">
                    <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      <FaIdCard className="mr-2" />
                      Company Register Number
                    </label>
                    <Field
                      type="text"
                      name="medicalCertificateNumber"
                      className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                      placeholder="Enter company register number"
                    />
                    <ErrorMessage name="medicalCertificateNumber" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Address Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="form-group">
                      <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                        <FaRoad className="mr-2" />
                        Street Address
                      </label>
                      <Field
                        type="text"
                        name="address.street"
                        className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter street address"
                      />
                      <ErrorMessage name="address.street" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                    </div>

                    <div className="form-group">
                      <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                        <FaCity className="mr-2" />
                        City
                      </label>
                      <Field
                        type="text"
                        name="address.city"
                        className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter city"
                      />
                      <ErrorMessage name="address.city" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                    </div>

                    <div className="form-group">
                      <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                        <FaMapMarkerAlt className="mr-2" />
                        Postal Code
                      </label>
                      <Field
                        type="text"
                        name="address.postalCode"
                        className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter postal code"
                      />
                      <ErrorMessage name="address.postalCode" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                    </div>

                    <div className="form-group">
                      <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                        <FaGlobe className="mr-2" />
                        Country
                      </label>
                      <Field
                        type="text" 
                        name="address.country"
                        className="form-input w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter country"
                      />
                        
                      <ErrorMessage name="address.country" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                    </div>
                  </div>
                </div>

                {/* Medical Certificate Upload */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Company Register Document</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-24 sm:h-32 border-4 border-dashed hover:bg-gray-100 hover:border-blue-300 group">
                        <div className="flex flex-col items-center justify-center pt-4 sm:pt-7">
                          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <p className="pt-1 text-xs sm:text-sm tracking-wider text-gray-400 group-hover:text-blue-600">Upload Company Register Document</p>
                        </div>
                        <input
                          type="file"
                          className="opacity-0"
                          accept="image/*"
                          onChange={async (event) => {
                            const file = event.currentTarget.files[0];
                            if (file) {
                              const previewUrl = URL.createObjectURL(file);
                              setImagePreviewUrl(previewUrl);
                              const base64String = await fileToBase64(file);
                              setFieldValue("medicalCertificate", base64String);
                            }
                          }}
                        />
                      </label>
                    </div>
                    {imagePreviewUrl && (
                      <div className="mt-4">
                        <img 
                          src={imagePreviewUrl} 
                          alt="Medical Certificate Preview" 
                          className="w-full max-w-[300px] sm:max-w-[400px] h-[200px] sm:h-[300px] object-contain rounded-lg shadow-lg mx-auto" 
                        />
                      </div>
                    )}
                    <ErrorMessage name="medicalCertificate" component="div" className="text-red-500 text-xs sm:text-sm" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating Profile...
                      </div>
                    ) : (
                      'Update Profile'
                    )}
                  </button>
                </div>

                {errors.apiError && (
                  <div className="mt-4 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p className="font-medium text-sm sm:text-base">Error</p>
                    <p className="text-xs sm:text-sm">{errors.apiError}</p>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
