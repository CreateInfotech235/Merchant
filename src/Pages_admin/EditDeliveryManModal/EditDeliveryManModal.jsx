import React, { useState } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import countryList from "react-select-country-list";
import { updateDeliveryBoy } from "../../Components_admin/Api/DeliveryMan";
import { changePassword } from "../../Components_admin/Api/deliveryManForgotpassword";

const EditDeliveryManModal = ({ onHide, deliveryBoy }) => {
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordValues, setForgotPasswordValues] = useState({
    email: deliveryBoy?.email || "",
    password: "",
    confirmPassword: ""
  });

  const initialValues = {
    firstName: deliveryBoy ? deliveryBoy.firstName : "",
    lastName: deliveryBoy ? deliveryBoy.lastName : "",
    email: deliveryBoy ? deliveryBoy.email : "",
    contactNumber: deliveryBoy ? deliveryBoy.contactNumber : "",
    isVerified: deliveryBoy ? deliveryBoy.isVerified : false,
    address: deliveryBoy ? deliveryBoy.address : "",
    postCode: deliveryBoy ? deliveryBoy.postCode : "",
    createdByMerchant: deliveryBoy ? deliveryBoy.createdByMerchant : "",
    createdByAdmin: deliveryBoy ? deliveryBoy.createdByAdmin : "",
    showDeliveryManNumber: deliveryBoy ? deliveryBoy.showDeliveryManNumber : "",
    balance: deliveryBoy ? deliveryBoy.balance : "",
    earning: deliveryBoy ? deliveryBoy.earning : "",
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
  });

  const onSubmit = async (values) => {
    const res = await updateDeliveryBoy(deliveryBoy._id, values);
    if (res.status) {
      onHide();
    }
  };

  const handleForgotPassword = () => {
    if (!window.confirm("Are you sure you want to reset password?")) {
      return;
    }
    setIsForgotPassword(true);
  };

  const handleChangePassword = async () => {
    if (forgotPasswordValues.password !== forgotPasswordValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await changePassword(forgotPasswordValues.email, forgotPasswordValues.password);
      if (res.status) {
        alert("Password changed successfully!");
        setIsForgotPassword(false);
        onHide();
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing password.");
    }
  };

  return (
    <Modal show={true} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{isForgotPassword ? "Reset Password" : "Update Delivery Boy"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isForgotPassword ? (
          <div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={forgotPasswordValues.password}
                onChange={(e) => setForgotPasswordValues({ ...forgotPasswordValues, password: e.target.value })}
                className="form-control"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                value={forgotPasswordValues.confirmPassword}
                onChange={(e) => setForgotPasswordValues({ ...forgotPasswordValues, confirmPassword: e.target.value })}
                className="form-control"
                placeholder="Confirm new password"
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button
                onClick={handleChangePassword}
                className="btn"
                disabled={!forgotPasswordValues.password || !forgotPasswordValues.confirmPassword}
              >
                Change Password
              </Button>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className="create-order gap-0">
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
                      type="number"
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

                <div className="row input-box">
                  <div className="input-error col-md-4">
                    <label className="fw-bold mb-2">Verified</label>
                    <div className="d-flex align-items-center">
                      <div>
                        <Field
                          type="radio"
                          name="isVerified"
                          value="true"
                          className="form-check-input"
                          id="isVerified-yes"
                          checked={formik.values.isVerified === true}
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
                          checked={formik.values.isVerified === false}
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

                  <div className="input-error col-md-4">
                    <label className="fw-bold ">Created By Admin</label>
                    <div className="d-flex align-items-center">
                      <div>
                        <Field
                          type="radio"
                          name="createdByAdmin"
                          value="true"
                          className="form-check-input"
                          id="createdByAdmin-yes"
                          checked={formik.values.createdByAdmin === true}
                          style={{
                            marginRight: "0.5em",
                            height: "1.2em",
                            width: "1.2em",
                          }}
                        />
                        <label
                          htmlFor="createdByAdmin-yes"
                          className="form-check-label"
                        >
                          Yes
                        </label>
                      </div>
                      <div>
                        <Field
                          type="radio"
                          name="createdByAdmin"
                          value="false"
                          className="form-check-input"
                          style={{
                            marginRight: "0.5em",
                            height: "1.2em",
                            width: "1.2em",
                          }}
                          id="createdByAdmin-no"
                          checked={formik.values.createdByAdmin === false}
                        />
                        <label
                          htmlFor="createdByAdmin-no"
                          className="form-check-label"
                        >
                          No
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="createdByAdmin"
                      component="div"
                      className="error text-danger"
                    />
                  </div>

                  <div className="input-error col-md-4">
                    <label className="fw-bold">Created By Merchant</label>
                    <div className="d-flex align-items-center">
                      <div>
                        <Field
                          type="radio"
                          name="createdByMerchant"
                          value="true"
                          className="form-check-input"
                          id="createdByMerchant-yes"
                          checked={formik.values.createdByMerchant === true}
                          style={{
                            marginRight: "0.5em",
                            height: "1.2em",
                            width: "1.2em",
                          }}
                        />
                        <label
                          htmlFor="createdByMerchant-yes"
                          className="form-check-label"
                        >
                          Yes
                        </label>
                      </div>
                      <div>
                        <Field
                          type="radio"
                          name="createdByMerchant"
                          value="false"
                          className="form-check-input"
                          style={{
                            marginRight: "0.5em",
                            height: "1.2em",
                            width: "1.2em",
                          }}
                          id="createdByMerchant-no"
                          checked={formik.values.createdByMerchant === false}
                        />
                        <label
                          htmlFor="createdByMerchant-no"
                          className="form-check-label"
                        >
                          No
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="createdByMerchant"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Button variant="secondary" onClick={onHide}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn btn-primary ms-3">
                    Save Changes
                  </Button>
                  <Button 
                    onClick={handleForgotPassword} 
                    style={{ backgroundColor: "#D65246", color: "white", padding: "10px 20px", borderRadius: "5px", marginLeft: "10px" }} 
                    type="button"
                  >
                    Reset Password
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditDeliveryManModal;
