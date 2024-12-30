import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Modal, Button, Form } from "react-bootstrap";
import { updateProfileOfMerchant } from "../../Components_admin/Api/User";
import { updateCustomer } from "../../Components_admin/Api/Admincustomer";

const EditCustomer = ({ customer, onHide }) => {
  console.log('customer',customer)
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");

  const handleClose = () => {
    setShow(false);
    onHide();
  };
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      email: customer?.email,
      mobileNumber: customer?.mobileNumber,
      address: customer?.address,
        city: customer?.city,
        country: customer?.country,
        postCode: customer?.postCode,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobileNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Contact number is required"),
        address: Yup.string().required("address is required"),
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
        postCode: Yup.string().required("Postal Code is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      console.log("Form data:", values);

      const response = await updateCustomer(customer?._id, values);
      if (response.status) {
        handleClose();
      }

    },
  });

  return (
    <>
      <Modal show={true} onHide={onHide} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    {...formik.getFieldProps("firstName")}
                    isInvalid={
                      formik.touched.firstName && !!formik.errors.firstName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    {...formik.getFieldProps("lastName")}
                    isInvalid={
                      formik.touched.lastName && !!formik.errors.lastName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="mobileNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Contact Number"
                    {...formik.getFieldProps("mobileNumber")}
                    isInvalid={
                      formik.touched.mobileNumber &&
                      !!formik.errors.mobileNumber
                    }
                  />
                    <Form.Control.Feedback type="invalid">
                    {formik.errors.mobileNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="street">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    {...formik.getFieldProps("address")}
                    isInvalid={
                      formik.touched.address &&
                      !!formik.errors.address
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    {...formik.getFieldProps("city")}
                    isInvalid={
                      formik.touched?.city &&
                      !!formik.errors?.city
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors?.city}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    {...formik.getFieldProps("country")}
                    isInvalid={
                      formik.touched?.country &&
                      !!formik.errors?.country
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors?.country}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="postCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Postal Code"
                    {...formik.getFieldProps("postCode")}
                    isInvalid={
                      formik.touched?.postCode &&
                      !!formik.errors?.postCode
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors?.postCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="me-2 w-50">
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="w-50"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditCustomer;