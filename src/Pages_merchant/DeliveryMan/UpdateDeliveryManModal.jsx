import React, { useState, useEffect, useMemo } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { updateDeliveryBoy } from "../../Components_merchant/Api/DeliveryMan";
import countryList from "react-select-country-list";

const UpdateDeliveryBoyModal = ({ onHide, deliveryBoy }) => {
  const navigate = useNavigate();
  // console.log(deliveryBoy);

  const initialValues = {
    firstName: deliveryBoy ? deliveryBoy.firstName : "",
    lastName: deliveryBoy ? deliveryBoy.lastName : "",
    email: deliveryBoy ? deliveryBoy.email : "",
    contactNumber: deliveryBoy ? deliveryBoy.contactNumber : "",
    isVerified: deliveryBoy ? deliveryBoy.isVerified : false, // Added "isVerified"
    address: deliveryBoy ? deliveryBoy.address : "",
    postCode: deliveryBoy ? deliveryBoy.postCode : "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNumber: Yup.string().required("Contact number is required"),
    isVerified: Yup.boolean().required("Verification status is required"), // Validate isVerified field
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post code is required"),
    });

  const onSubmit = async (values) => {
    const res = await updateDeliveryBoy(deliveryBoy._id, values);
    if (res.status) {
      onHide();
    }
  };

  return (
    <Modal show={true} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Update Delivery Boy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                    <label htmlFor="isVerified-no" className="form-check-label">
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
                <div className="input-error col-md-6">
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

              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={onHide}>
                  Cancel
                </Button>
                <Button type="submit" className="btn btn-primary ms-3">
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDeliveryBoyModal;
