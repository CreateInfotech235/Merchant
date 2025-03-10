import React, { useState, useEffect, useMemo } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { updateDeliveryBoy } from "../../Components_merchant/Api/DeliveryMan";
import countryList from "react-select-country-list";
import { changePassword } from "../../Components_admin/Api/deliveryManForgotpassword";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const UpdateDeliveryBoyModal = ({ onHide, deliveryBoy, onUpdate }) => {
  const navigate = useNavigate();
  const [isforgotPassword, setIsforgotPassword] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordValues, setForgotPasswordValues] = useState({
    email: deliveryBoy?.email || "",
    password: "",
    confirmPassword: ""
  });
  console.log(deliveryBoy);

  const initialValues = {
    firstName: deliveryBoy ? deliveryBoy.firstName : "",
    lastName: deliveryBoy ? deliveryBoy.lastName : "",
    email: deliveryBoy ? deliveryBoy.email : "",
    contactNumber: deliveryBoy ? deliveryBoy.contactNumber : "",
    isVerified: deliveryBoy ? deliveryBoy.isVerified : false,
    address: deliveryBoy ? deliveryBoy.address : "",
    postCode: deliveryBoy ? deliveryBoy.postCode : "",
    chargeMethod: deliveryBoy ? deliveryBoy.chargeMethod : "",
    charge: deliveryBoy ? deliveryBoy.charge : "",
    defaultLocation: {
      latitude: deliveryBoy.location.coordinates[1],
      longitude: deliveryBoy.location.coordinates[0],
    },
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"), 
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNumber: Yup.string().required("Contact number is required"),
    isVerified: Yup.boolean().required("Verification status is required"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post code is required"),
    chargeMethod: Yup.string().required("Charge Method is required"),
    charge: Yup.string().required("Charge is required"),
  });

  const onSubmit = async (values, { setFieldValue }) => {
    setisUpdate(true);
    console.log(values);

    let defaultLocationData = null;
    console.log(deliveryBoy.location.coordinates[1], deliveryBoy.location.coordinates[0]);

    if (deliveryBoy.location.coordinates[1] && deliveryBoy.location.coordinates[0] || !deliveryBoy.location.coordinates[1] && !deliveryBoy.location.coordinates[0]) {
      if (deliveryBoy.address) {
        try {
          const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              values.address
            )}&key=${apiKey}`
          );
          console.log(response, "sdsd");

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            const postalCodeComponent = data.results[0].address_components.find(
              (component) => component.types.includes("postal_code")
            );

            defaultLocationData = {
              latitude: lat,
              longitude: lng,
            };

            console.log(lat, lng);

            setFieldValue("defaultLocation.latitude", lat);
            setFieldValue("defaultLocation.longitude", lng);
          } else {
            alert("Address not found. Please try again.");
          }
        } catch (error) {
          console.error("Error fetching geocode data:", error);
          alert("An error occurred while processing the address. Please try again.");
        }
      } else {
        alert("Please enter an address.");
      }
    }
    console.log(defaultLocationData);

    const payload = {
      ...values,
      defaultLocation: {
        latitude: defaultLocationData?.latitude || values.defaultLocation.latitude,
        longitude: defaultLocationData?.longitude || values.defaultLocation.longitude,
      },
    };

    console.log(payload);

    try {
      const res = await updateDeliveryBoy(deliveryBoy._id, payload);
      if (res.status) {
        onHide();
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating delivery man:", error);
      alert("An error occurred while updating the delivery man. Please try again.");
    }


    setisUpdate(false);
  };

  const handleForgotPassword = () => {
    if (!window.confirm("Are you sure you want to reset password?")) {
      return;
    }
    setIsforgotPassword(true);
  }

  const handleChangePassword = async () => {
    if (forgotPasswordValues.password !== forgotPasswordValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await changePassword(forgotPasswordValues.email, forgotPasswordValues.password);
      if (res.status) {
        alert("Password changed successfully!");
        setIsforgotPassword(false);
        onHide();
        onUpdate();
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing password.");
    }
  }

  return (
    <Modal show={true} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{isforgotPassword ? "Reset Password" : "Update Delivery Man"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {!isforgotPassword && (
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className="create-order">
                <div className="row input-box">
                  <div className="input-error col-md-6">
                    <label>First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  <div className="input-error col-md-6">
                    <label>Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error text-danger"
                    />
                  </div>

                  <div className="input-error col-md-6">
                    <label>Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  <div className="input-error col-md-6">
                    <label>Contact No</label>
                    <Field
                      type="text"
                      name="contactNumber"
                      className="form-control"
                      placeholder="Contact No"
                    />
                    <ErrorMessage
                      name="contactNumber"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                </div>

                <div className="row input-box">
                  <div className="col-md-6">
                    <label>Post Code</label>
                    <Field
                      type="text"
                      name="postCode"
                      className="form-control"
                      placeholder="Post Code"
                    />
                    <ErrorMessage
                      name="postCode"
                      component="div"
                      className="error text-danger"
                    />
                  </div>

                  <div className="input-error col-md-6">
                    <label className="fw-bold mb-2">Verified</label>
                    <div className="d-flex align-items-center">
                      <div>
                        <Field
                          type="radio"
                          name="isVerified"
                          value="true"
                          className="form-check-input"
                          id="isVerified-yes"
                          checked={formik.values.isVerified.toString() === "true"}
                          style={{
                            marginRight: "0.5em",
                            height: "1.2em",
                            width: "1.2em",
                          }}
                        />
                        <label
                          htmlFor="isVerified-yes"
                          className="form-check-label"
                        >
                          Active
                        </label>
                      </div>
                      <div>
                        <Field
                          type="radio"
                          name="isVerified"
                          value="false"
                          className="form-check-input"
                          style={{
                            marginRight: "0.5em",
                            height: "1.2em",
                            width: "1.2em",
                          }}
                          id="isVerified-no"
                          checked={formik.values.isVerified.toString() === "false"}
                        />
                        <label
                          htmlFor="isVerified-no"
                          className="form-check-label"
                        >
                          Deactivate
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="isVerified"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                </div>

                <div className="row input-box">
                  <div className="input-error col-xxl-6 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Charge
                    </label>
                    <Field
                      type="text"
                      name="charge"
                      className="form-control"
                      placeholder="Charge per mile"
                    />
                    <ErrorMessage
                      name="charge"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>

                  <div className="input-error col-xxl-6 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                    <label className="w-100" style={{ color: "#999696" }}>
                      Charge Method
                    </label>
                    <Field
                      as="select"
                      name="chargeMethod"
                      className="form-control"
                    >
                      <option value="" disabled>
                        Select Charge Method
                      </option>
                      <option value="DISTANCE">per 1 mile</option>
                      <option value="TIME">per 1 hour</option>
                    </Field>
                    <ErrorMessage

                      name="chargeMethod"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>
                </div>

                <div className="row input-box">
                  <div className="input-error col-md-12">
                    <label>Address</label>
                    <Field
                      as="textarea"
                      name="address"
                      className="form-control"
                      placeholder="Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <button 
                      onClick={handleForgotPassword} 
                      style={{ backgroundColor: "#D65246", color: "white", padding: "10px 20px", borderRadius: "5px" }} 
                      type="button"
                    >
                      Reset Password
                    </button>
                  </div>
                  <div>
                    <Button variant="secondary" onClick={onHide}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn btn-primary ms-3">
                      {isUpdate ? "Delivery Man Updating..." : "Update Delivery Man"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {isforgotPassword && (
          <div className="p-4">
            <div>
              <div className="mb-3">
                <label className="mb-2">New Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={forgotPasswordValues.password}
                    onChange={(e) => setForgotPasswordValues({...forgotPasswordValues, password: e.target.value})}
                    className="form-control"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn position-absolute end-0 top-50 translate-middle-y"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={forgotPasswordValues.confirmPassword}
                  onChange={(e) => setForgotPasswordValues({...forgotPasswordValues, confirmPassword: e.target.value})}
                  className="form-control"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  onClick={handleChangePassword}
                  className="btn"
                  style={{ backgroundColor: "#D65246", color: "white" }}
                  disabled={!forgotPasswordValues.password || !forgotPasswordValues.confirmPassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDeliveryBoyModal;
