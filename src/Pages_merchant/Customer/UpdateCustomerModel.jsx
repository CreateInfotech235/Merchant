import React, { useState, useEffect, useMemo } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { updateDeliveryBoy } from "../../Components_merchant/Api/DeliveryMan";
import countryList from "react-select-country-list";
import { updateCustomer } from "../../Components_merchant/Api/Customer";

const UpdateCustomerModel = ({ onHide, customer }) => {
  // console.log("customer", customer);

  const navigate = useNavigate();

  const initialValues = {
    firstName: customer ? customer.firstName : "",
    lastName: customer ? customer.lastName : "",
    email: customer ? customer.email : "",
    country: customer ? customer.country :"",
    city:customer ? customer.city : "",
    mobileNumber: customer ? customer.mobileNumber : "",
    postCode: customer ? customer.postCode : "",
    address: customer ? customer.address : "",
  };

  const options = useMemo(() => countryList().getData(), []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
    mobileNumber: Yup.string().required("Contact number is required"),
    postCode: Yup.string().required("postCode code is required"),
    address: Yup.string().required("Address is required"),
  });

  const onSubmit = async (values) => {
    // console.log(values);
    
    const res = await updateCustomer(customer._id, values);
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
                  <label>Mobile No</label>
                  <Field
                    type="number"
                    name="mobileNumber"
                    className="form-control"
                    placeholder="Contact No"
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="error text-danger"
                  />
                </div>
              </div>

              <div className="row input-box">
             

                <div className="input-error col-md-6">
                  <label>City</label>
                  <Field
                    type="text"
                    name="city"
                    className="form-control"
                  />
                   
          
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="error text-danger"
                  />
                </div>
                <div className="input-error col-md-6">
                  <label>Country</label>
                  <Field
                    type="text"
                    name="country"
                    className="form-control"
                  />
                   
          
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error text-danger"
                  />
                </div>
                <div className="input-error col-md-6">
                  <label>Post Code</label>
                  <Field
                    type="text"
                    name="postCode"
                    className="form-control"
                  />
                   
          
                  <ErrorMessage
                    name="postCode"
                    component="div"
                    className="error text-danger"
                  />
                </div>
          

     
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
              

              <div className="d-flex justify-content-end mt-3">
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

export default UpdateCustomerModel;
