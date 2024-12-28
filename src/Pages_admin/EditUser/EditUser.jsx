import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Modal, Button, Form } from "react-bootstrap";
import { updateProfileOfMerchant } from "../../Components_admin/Api/User";

const EditUser = ({ user, onHide }) => {
  console.log('user',user)
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");

  const handleClose = () => {
    setShow(false);
    onHide();
  };
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      contactNumber: user?.contactNumber,
      status: user?.status,
      isVerified: user?.isVerified,
      address: {
        street: user?.address?.street,
        city: user?.address?.city,
        country: user?.address?.country,
        postalCode: user?.address?.postalCode,
      },
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contactNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Contact number is required"),
      status: Yup.string().required("Status is required"),
      isVerified: Yup.boolean().required("Verification status is required"),
      address: Yup.object().shape({
        street: Yup.string().required("Street is required"),
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
        postalCode: Yup.string().required("Postal Code is required"),
      }),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      console.log("Form data:", values);

      const response = await updateProfileOfMerchant(user?._id, values);
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
                <Form.Group className="mb-3" controlId="contactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Contact Number"
                    {...formik.getFieldProps("contactNumber")}
                    isInvalid={
                      formik.touched.contactNumber &&
                      !!formik.errors.contactNumber
                    }
                  />
                    <Form.Control.Feedback type="invalid">
                    {formik.errors.contactNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    {...formik.getFieldProps("status")}
                    isInvalid={formik.touched.status && !!formik.errors.status}
                  >
                    <option value="" label="Select status" />
                    <option value="ENABLE" label="Enabled" />
                    <option value="DISABLE" label="Disabled" />
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="isVerified">
                  <Form.Check
                    type="checkbox"
                    label="Verified"
                    {...formik.getFieldProps("isVerified")}
                    checked={formik.values.isVerified}
                    isInvalid={
                      formik.touched.isVerified && !!formik.errors.isVerified
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.isVerified}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    {...formik.getFieldProps("address.street")}
                    isInvalid={
                      formik.touched.address?.street &&
                      !!formik.errors.address?.street
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.address?.street}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    {...formik.getFieldProps("address.city")}
                    isInvalid={
                      formik.touched.address?.city &&
                      !!formik.errors.address?.city
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.address?.city}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    {...formik.getFieldProps("address.country")}
                    isInvalid={
                      formik.touched.address?.country &&
                      !!formik.errors.address?.country
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.address?.country}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Postal Code"
                    {...formik.getFieldProps("address.postalCode")}
                    isInvalid={
                      formik.touched.address?.postalCode &&
                      !!formik.errors.address?.postalCode
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.address?.postalCode}
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

export default EditUser;