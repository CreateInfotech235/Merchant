import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import countryList from 'react-select-country-list';
import "./CreateOrder.css";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../Components_admin/Api/Order";
import { getAllDeliveryMan } from "../../../Components_admin/Api/DeliveryMan";
import { getAllCustomers } from "../../../Components_admin/Api/Customer";
import { getAllUsers } from "../../../Components_admin/Api/User";
import { Spinner } from 'react-bootstrap';

const CreateOrder = () => {

  const naviagte = useNavigate()

  const [customer, setCustomer] = useState([]);
  const [merchant, setMerchnat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deliveryMan, setDeliveryMen] = useState([])

  useEffect(() => {
    const fetchData = async () => {

      const customerRes = await getAllCustomers();
      const mearchantRes = await getAllUsers(1, 10)
      const deliveryManRes = await getAllDeliveryMan(1, 10, "")
      if (mearchantRes.status) setMerchnat(mearchantRes.data)
      if (customerRes.status) setCustomer(customerRes.data)
      if (deliveryManRes.status) setDeliveryMen(deliveryManRes.data.data)
      setIsLoading(false)
    };

    fetchData();
  }, []);


  const initialValues = {
    parcelsCount: 1,
    paymentCollection: "",
    dateTime: "",
    deliveryManId: "",
    pickupDetails: {
      address: "",
      countryCode: "",
      mobileNumber: "",
      email: "",
      description: "",
      postCode: "",
      pickupRequest: ""
    },
    deliveryDetails: {
      address: "",
      countryCode: "",
      mobileNumber: "",
      email: "",
      description: "",
      postCode: ""
    },
    cashOnDelivery: "false",

  };

  const validationSchema = Yup.object().shape({
    parcelsCount: Yup.number().required("Required").positive("Must be positive").min(1),
    dateTime: Yup.string().required("Required"),
   paymentCollection: Yup.string().test(
    "paymentCollectionRequired",
    "Payment collection is required when cash on delivery is no",
    function (value) {
      const { cashOnDelivery } = this.parent;
      if (cashOnDelivery === "false" && !value) {
        return false;
      }
      return true;
    }
  ),
     pickupDetails: Yup.object().shape({
      address: Yup.string().required("Required"),
      countryCode: Yup.string().required("Required"),
      mobileNumber: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      description: Yup.string().required("Required"),
      postCode: Yup.number().required("Required"),
      pickupRequest: Yup.string().required("Required"),
    }),
    deliveryDetails: Yup.object().shape({
      address: Yup.string().required("Required"),
      countryCode: Yup.string().required("Required"),
      mobileNumber: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      description: Yup.string().required("Required"),
      postCode: Yup.number().required("Required")
    }),
  });

  const options = useMemo(() => countryList().getData(), []);

  const onSubmit = async (values) => {
    const timestamp = new Date(values.dateTime).getTime();
    values.paymentCollection = values.cashOnDelivery === "true" ? "CASH" : values.paymentCollection
    const res = await createOrder({ ...values, dateTime: timestamp });
    if (res.status) {
      naviagte('/all-order-admin');
    }
  };

  return (
    <>
      {isLoading ? <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div> : <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return <Form className="create-order">
            {/* Parcel Types */}
            <div className="input-box row mb-2">
              <div key={"parcelsCount"} className="input-error col-12 col-sm-6 mb-3">
                <Field
                  type="number"
                  name={"parcelsCount"}
                  className="form-control"
                  placeholder={`ParcelsCount`}
                  style={{
                    height: "4.5em",
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
                <ErrorMessage
                  name={"parcelsCount"}
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>
              <div key={"dateTime"} className="input-error col-12 col-sm-6 mb-3">
                <Field
                  type="date"
                  name={"dateTime"}
                  className="form-control"
                  placeholder={`Date Time`}
                  style={{
                    height: "4.5em",
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
                <ErrorMessage
                  name={"dateTime"}
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>

              <div className="input-error col-12 col-sm-6 mb-3">
                <Field as="select" name="deliveryManId" className="form-control mt-3"
                  style={{ height: "4.5em" }}>
                  <option value="">Select Delivery Man</option>
                  {deliveryMan.map((data) => {
                    return <option value={data._id}>{data.name}</option>
                  })}
                </Field>
                <ErrorMessage
                  name={"deliveryManId"}
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>
              {formik.values.cashOnDelivery === "false" &&
                <div key={"paymentCollection"} className="input-error col-12 col-sm-6 mb-3">
                  <Field as="select" name="paymentCollection" className="form-control mt-3"
                    style={{ height: "4.5em" }}>
                    <option value="">Select Payment Collection</option>
                    <option value="CASH">CASH</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="WALLET">WALLET</option>
                  </Field>
                  <ErrorMessage
                    name={"paymentCollection"}
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>}
              <div key="cashOnDelivery" className="input-error col-12 col-sm-6 mb-3">
                <label className="fw-bold mb-2">Cash on Delivery</label>

                <div className="d-flex align-items-center">
                  {/* True Option */}
                  <label className="me-3">
                    <Field
                      type="radio"
                      name="cashOnDelivery"
                      value="true"
                      className="form-check-input"
                      style={{
                        marginRight: "0.5em",
                        height: "1.2em",
                        width: "1.2em",
                      }}
                    />
                    Yes
                  </label>

                  {/* False Option */}
                  <label>
                    <Field
                      type="radio"
                      name="cashOnDelivery"
                      value="false"
                      className="form-check-input"
                      style={{
                        marginRight: "0.5em",
                        height: "1.2em",
                        width: "1.2em",
                      }}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="input-error col-12 col-sm-6 mb-3">
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  rows="4"
                  style={{
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>
            </div>


            {/* Pickup Information */}
            <div className="pick-up mt-5 row">
              <div className="col-12 col-lg-6">
                <h3 className="fw-bold">Pickup Information</h3>

                {/* Pickup Details Fields */}
                <div className="input-error mb-3">
                  <select
                    className="form-control mt-3"
                    style={{ height: "4.5em" }}
                    onChange={(e) => {
                      const selectedMerchantId = e.target.value;
                      const selectedMerchant = merchant.find(c => c._id === selectedMerchantId);
                      if (selectedMerchant) {
                        formik.setFieldValue("pickupDetails.address", selectedMerchant.address.street);
                        formik.setFieldValue("pickupDetails.countryCode", selectedMerchant.countryCode);
                        formik.setFieldValue("pickupDetails.mobileNumber", selectedMerchant.contactNumber);
                        formik.setFieldValue("pickupDetails.email", selectedMerchant.email);
                        formik.setFieldValue("pickupDetails.description", selectedMerchant.description);
                        formik.setFieldValue("pickupDetails.postCode", selectedMerchant.address.postalCode);
                      } else {
                        // Clear delivery details if no customer is selected
                        formik.setFieldValue("pickupDetails", {
                          address: "",
                          countryCode: "",
                          mobileNumber: "",
                          email: "",
                          description: "",
                          postCode: ""
                        });
                      }
                    }}
                  >
                    <option value="">Select Merchant</option>
                    {merchant.map((cust) => (
                      <option key={cust._id} value={cust._id}>
                        {cust.userName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-error mb-3">
                  <Field
                    type="text"
                    as='textarea'
                    name="pickupDetails.address"
                    className="form-control w-25% h-100%"
                    placeholder="Address"
                    style={{ height: "4.5em" }}
                  />
                  <ErrorMessage name="pickupDetails.address" component="div" className="error text-danger ps-2" />
                </div>
                <div className="input-error mb-3">
                  <Field
                    type="text"
                    name="pickupDetails.postCode"
                    className="form-control w-25% h-100%"
                    placeholder="PostCode"
                    style={{ height: "4.5em" }}
                  />
                  <ErrorMessage name="pickupDetails.postCode" component="div" className="error text-danger ps-2" />
                </div>
                <div className="input-error mb-3">
                  <Field
                    as="select"
                    name="pickupDetails.countryCode"
                    className="form-control"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="" label="Select country code" />
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="pickupDetails.countryCode"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>

                <div className="input-error mb-3">
                  <Field
                    type="number"
                    name="pickupDetails.mobileNumber"
                    className="form-control"
                    placeholder="Pickup contact number"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <ErrorMessage
                    name="pickupDetails.mobileNumber"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>

                <div className="input-error mb-3">
                  <Field
                    type="email"
                    name="pickupDetails.email"
                    className="form-control"
                    placeholder="Pickup email"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <ErrorMessage
                    name="pickupDetails.email"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>
                <div key={"paymentCollection"} className="input-error mb-3">
                  <Field as="select" name="pickupDetails.pickupRequest" className="form-control mt-3"
                    style={{ height: "4.5em" }}>
                    <option value="">Select Pickup Request</option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="EXPRESS">EXPRESS</option>
                  </Field>
                  <ErrorMessage
                    name={"pickupDetails.pickupRequest"}
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>
                <div className="input-error mb-3">
                  <Field
                    as="textarea"
                    name="pickupDetails.description"
                    className="form-control"
                    placeholder="Pickup description"
                    rows="4"
                    style={{
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <ErrorMessage
                    name="pickupDetails.description"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>

              </div>

              <div className="col-12 col-lg-6">
                <h3 className="fw-bold">Delivery Information</h3>

                {/* Delivery Details Fields */}
                <div className="input-error mb-3">
                  <select
                    className="form-control mt-3"
                    style={{ height: "4.5em" }}
                    onChange={(e) => {
                      const selectedCustomerId = e.target.value;

                      const selectedCustomer = customer.find(c => c._id == selectedCustomerId);
                      if (selectedCustomer) {
                        formik.setFieldValue("deliveryDetails.address", selectedCustomer.address);
                        formik.setFieldValue("deliveryDetails.countryCode", selectedCustomer.countryCode || "");
                        formik.setFieldValue("deliveryDetails.mobileNumber", selectedCustomer.mobileNumber);
                        formik.setFieldValue("deliveryDetails.email", selectedCustomer.email);
                        formik.setFieldValue("deliveryDetails.description", selectedCustomer.description);
                        formik.setFieldValue("deliveryDetails.postCode", selectedCustomer.postCode);
                      } else {
                        // Clear delivery details if no customer is selected
                        formik.setFieldValue("deliveryDetails", {
                          address: "",
                          countryCode: "",
                          mobileNumber: "",
                          email: "",
                          description: "",
                          postCode: ""
                        });
                      }
                    }}
                  >
                    <option value="">Select Customer</option>
                    {customer.map((cust) => (
                      <option key={cust._id} value={cust._id}>
                        {cust.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-error mb-3">
                  <Field
                    type="text"
                    as='textarea'
                    name="deliveryDetails.address"
                    className="form-control w-25% h-100%"
                    placeholder="Address"
                    style={{ height: "4.5em" }}
                  />
                  <ErrorMessage name="deliveryDetails.address" component="div" className="error text-danger ps-2" />
                </div>
                <div className="input-error mb-3">
                  <Field
                    type="number"
                    name="deliveryDetails.postCode"
                    className="form-control w-25% h-100%"
                    placeholder="PostCode"
                    style={{ height: "4.5em" }}
                  />
                  <ErrorMessage name="deliveryDetails.postCode" component="div" className="error text-danger ps-2" />
                </div>

                <div className="input-error mb-3">
                  <Field
                    as="select"
                    name="deliveryDetails.countryCode"
                    className="form-control"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="" label="Select country code" />
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="deliveryDetails.countryCode"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>

                <div className="input-error mb-3">
                  <Field
                    type="number"
                    name="deliveryDetails.mobileNumber"
                    className="form-control"
                    placeholder="Delivery contact number"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <ErrorMessage
                    name="deliveryDetails.mobileNumber"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>

                <div className="input-error mb-3">
                  <Field
                    type="email"
                    name="deliveryDetails.email"
                    className="form-control"
                    placeholder="Delivery email"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <ErrorMessage
                    name="deliveryDetails.email"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>

                <div className="input-error mb-3">
                  <Field
                    as="textarea"
                    name="deliveryDetails.description"
                    className="form-control"
                    placeholder="Delivery description"
                    rows="4"
                    style={{
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <ErrorMessage
                    name="deliveryDetails.description"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>
              </div>
            </div>


            {/* Submit Button */}
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-secondary mt-3 me-4"
                onClick={() => naviagte('/all-order-admin')}
                style={{ height: "4.5em" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                style={{ height: "4.5em" }}
              >
                Create Order
              </button>
            </div>
          </Form>
        }}
      </Formik>}
    </>
  );
};

export default CreateOrder;