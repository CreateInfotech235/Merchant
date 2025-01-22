import React, { useState, useMemo } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For the eye icon
import { addDeliveryBoy } from "../../Components_merchant/Api/DeliveryMan";

const AddDeliveryBoy = () => {
  const navigate = useNavigate();
  const merchnatId = localStorage.getItem("merchnatId");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
    // countryCode: "",
    merchantId: merchnatId,
    postCode: "",
    address: "",
    chargeMethod: "",
    charge: "",
    location: {
      latitude: "",
      longitude: "",
    },
    defaultLocation: {
      latitude: "",
      longitude: "",
    },
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    contactNumber: Yup.string().required("Contact number is required"),
    // countryCode: Yup.string().required("Country code is required"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("postCode is required"),
    chargeMethod: Yup.string().required("Charge Method is required"),
    charge: Yup.string().required("Charge is required"),
  });

  const onSubmit = async (values, { setFieldValue, resetForm }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let locationData = values.location;
      let defaultLocationData = values.defaultLocation;

      if (!values.location.latitude && !values.location.longitude) {
        if (values.address) {
          const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
          console.log(values.address, "Delivery add");

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              values.address
            )}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;

            locationData = {
              latitude: lat,
              longitude: lng,
            };
            defaultLocationData = {
              latitude: lat,
              longitude: lng,
            };

            setFieldValue("location.latitude", lat);
            setFieldValue("location.longitude", lng);
          } else {
            alert("Address not found. Please try again.");
            setIsSubmitting(false);
            return;
          }
        } else {
          alert("Please enter an address.");
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        ...values,
        location: locationData,
        defaultLocation: {
          latitude: Number(defaultLocationData.latitude),
          longitude: Number(defaultLocationData.longitude),
        },
      };

      const res = await addDeliveryBoy(payload);
      if (res.status) {
        resetForm();
        navigate("/delivery-man");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const options = useMemo(() => countryList().getData(), []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <div className="edit-user w-100%">
              <Form className="create-order">
                <div className="row input-box">
                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      className="form-control w-25% h-100%"
                      placeholder="First Name"
                      style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>
                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      className="form-control w-25% h-100%"
                      placeholder="Last Name"
                      style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>

                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control w-25% h-100%"
                      placeholder="Email"
                      style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>
                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Password
                    </label>
                    <div>
                      <div className="position-relative">
                        <Field
                          type={showPassword ? "text" : "password"} // Conditionally show/hide password
                          name="password"
                          className="form-control w-25% h-100%"
                          placeholder="Password"
                          style={{
                            height: "4.5em",
                            border: "1px solid #E6E6E6",
                          }}
                        />
                        <span
                          className="password-toggle-icon"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "30%",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="row input-box">
                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Contact No
                    </label>
                    <Field
                      type="text"
                      name="contactNumber"
                      className="form-control w-25% h-100%"
                      placeholder="Contact No"
                      style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                    />
                    <ErrorMessage
                      name="contactNumber"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>
                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Post Code
                    </label>
                    <Field
                      type="text"
                      name="postCode"
                      className="form-control w-25% h-100%"
                      placeholder="Post Code"
                      style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                    />
                    <ErrorMessage
                      name="postCode"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>
                </div>

                <div className="row input-box d-flex">
                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Address
                    </label>
                    <Field
                      type="text"
                      as="textarea"
                      name="address"
                      className="form-control w-25% h-100%"
                      placeholder="Address"
                      style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>

                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Charge Method
                    </label>
                    <Field
                      as="select"
                      name="chargeMethod"
                      className="form-control w-25% h-100%"
                      style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                    >
                      <option value="" disabled>
                        Select Charge Method
                      </option>
                      <option value="DISTANCE">Distance</option>
                      <option value="TIME">Time</option>
                    </Field>
                    <ErrorMessage
                      name="chargeMethod"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>

                  <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Charge
                    </label>
                    <Field
                      type="text"
                      name="charge"
                      className="form-control w-25% h-100%"
                      placeholder="Charge per mile"
                      style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                    />
                    <ErrorMessage
                      name="charge"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>
                </div>

                <br />
                <div className="d-flex ">
                  <div>
                    <button
                      type="submit"
                      className="btn rounded-2 m-3 p-2 fw-bold"
                      style={{
                        width: "150px",
                        background: "#d65246",
                        color: "white",
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                  </div>
                  <div>
                    <Link to="/delivery-man">
                      <button
                        type="button"
                        className="btn rounded-2 m-3 p-2 fw-bold"
                        style={{
                          width: "150px",
                          background: "#FFF",
                          color: "#000",
                        }}
                      >
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default AddDeliveryBoy;
