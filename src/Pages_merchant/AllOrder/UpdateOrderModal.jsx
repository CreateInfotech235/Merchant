import React, { useState, useEffect, useMemo } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
  getDeliveryMan,
  updateDeliveryBoy,
} from "../../Components_merchant/Api/DeliveryMan";
import countryList from "react-select-country-list";
import Select from "react-select";
import { getAllCustomers } from "../../Components_merchant/Api/Customer";
import { updateOrder } from "../../Components_merchant/Api/Order";

const UpdateOrderModal = ({ onHide, Order }) => {
  const naviagte = useNavigate();
  const merchant = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [deliveryMan, setDeliveryMen] = useState([]);
  const [deliveryManId, setDeliveryMenId] = useState(Order?.deliveryManId || null);
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  useEffect(() => {
    const selectedCustomer = customer.find((c) => c.email === Order.cutomerEmail)
    // console.log("selectedCustomer", selectedCustomer);
    if (selectedCustomer?._id) {
      setCustomerId(selectedCustomer?._id);
    }
  }, [customer]);

  useEffect(() => {
    const fetchData = async () => {
      const deliveryManRes = await getDeliveryMan(1, 10);
      const customerRes = await getAllCustomers();
      console.log(customerRes.data,"Get all customer");
      

      if (deliveryManRes.status) setDeliveryMen(deliveryManRes.data);
      if (customerRes.status) setCustomer(customerRes.data);
      setIsLoading(false);
      const selectedDeliveryMan = await deliveryMan.find(man => man.name == "John Doe" );
      if (selectedDeliveryMan) {
        setDeliveryMenId(selectedDeliveryMan._id)
      }
      
    };

    fetchData();
  }, []);
  const formatDateTime = (isoString) => {
    if (!isoString) return ""; // Handle empty or undefined values
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  

  
  const initialValues = {
    parcelsCount: Order.parcelsCount || 1,
    paymentCollectionRupees: Order.paymentCollectionRupees || "",
    dateTime: Order.dateTime || new Date(),
    deliveryManId: deliveryManId || "",
    pickupDetails: {
      location: {
        latitude: Order.pickupAddress.location.latitude || null, // Initialize with null or undefined
        longitude: Order.pickupAddress.location.longitude || null, // Empty array or [longitude, latitude]
      },
      dateTime: formatDateTime(Order.pickupAddress.dateTime) || "",
      address: Order.pickupAddress.address || "",
      // countryCode: Order.pickupAddress.countryCode || "",
      merchantId: merchant._id || "",
      mobileNumber: merchant.contactNumber || "",
      email: merchant.email || "",
      name: merchant.name || "",
      //   description: "",
      postCode: Order.pickupAddress.postCode || "",
    },
    deliveryDetails: {
      location: {
        latitude: Order.deliveryAddress.location.latitude || null, // Initialize with null or undefined
        longitude: Order.deliveryAddress.location.longitude || null, // Empty array or [longitude, latitude]
      },
      address: Order.deliveryAddress.address || "",
      // countryCode: Order.deliveryAddress.countryCode || "",
      mobileNumber: Order.deliveryAddress.mobileNumber || "",
      name: Order.deliveryAddress.name || "",
      email: Order.deliveryAddress.email || "",
      description: Order.deliveryAddress.description || "",
      postCode: Order.deliveryAddress.postCode || "",
    },
    cashOnDelivery: Order.cashOnDelivery || false,
  };

  const options = useMemo(() => countryList().getData(), []);

  const validationSchema = Yup.object().shape({
    parcelsCount: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .min(1),
    dateTime: Yup.string().required("Required"),
    paymentCollectionRupees: Yup.string().test(
      "paymentCollectionRequired",
      "Payment collection is required when cash on delivery is Yes",
      function (value) {
        const { cashOnDelivery } = this.parent;
        if (cashOnDelivery === true && !value) {
          return false;
        }
        return true;
      }
    ),
    pickupDetails: Yup.object().shape({
      dateTime: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      // countryCode: Yup.string().required("Required"),
      mobileNumber: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      description: Yup.string(),
      postCode: Yup.string().required("Required"),
    }),
    deliveryDetails: Yup.object().shape({
      address: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      // countryCode: Yup.string().required("Required"),
      mobileNumber: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      description: Yup.string(),
      postCode: Yup.string().required("Required"),
    }),
  });
  const onSubmit = async (values) => {
    const timestamp = new Date(values.dateTime).getTime();
    const pictimestamp = new Date(values.pickupDetails.dateTime).getTime();

    // Create a copy of values and conditionally include paymentCollectionRupees
    const payload = {
      ...values,
      dateTime: timestamp,
      pickupDetails: {
        ...values.pickupDetails,
        dateTime: pictimestamp,
      },
    };

    // Remove paymentCollectionRupees if cashOnDelivery is false
    if (values.cashOnDelivery === false) {
      delete payload.paymentCollectionRupees;
    }

    const res = await updateOrder( Order._id, payload);

    
    if (res.status) {
      onHide()
      naviagte("/all-order");
    }
    console.log(payload); // Log final payload for debugging
  };

  return (
    <Modal show={true} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Update Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik , form) => {
            return (
              <Form className="create-order">
                {/* Parcel Types */}
                <div className="input-box row mb-2">
                  <div
                    key={"parcelsCount"}
                    className="input-error col-12 col-sm-6 mb-3"
                  >
                    <label className="fw-thin p-0 pb-1">Parcels Count :</label>
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

                  <div className="input-error col-12 col-sm-6 mb-3">
                    <label className="fw-thin p-0 pb-1">Select Delivery Man :</label>
                    <Field
                      as="select"
                      name="deliveryManId"
                      className="form-control"
                      style={{ height: "4.5em" }}
                      value={formik.values.deliveryManId}
                      onChange={(e) => {
                        formik.setFieldValue("deliveryManId", e.target.value);
                        setDeliveryMenId(e.target.value);
                      }}
                    >
                      <option value="">Select Delivery Man</option>
                      {deliveryMan.map((data) => (
                        <option key={data._id} value={data._id}>
                          {data.firstName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="deliveryManId"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>

                  {formik.values.cashOnDelivery === true && (
                    <div
                      key={"paymentCollectionRupees"}
                      className="input-error col-12 col-sm-6 mb-3"
                    >
                      <label className="fw-thin p-0 pb-1">Payment Collection (Rupees) :</label>
                      <Field
                        as="input"
                        name="paymentCollectionRupees"
                        type="number"
                        className="form-control mt-3"
                        style={{ height: "4.5em" }}
                        placeholder="Enter Payment Collection rupees  "
                      />
                      <ErrorMessage
                        name={"paymentCollectionRupees"}
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                  )}

                  <div
                    key="cashOnDelivery"
                    className="input-error col-12 col-sm-6 mb-3"
                  >
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
                          checked={formik.values.cashOnDelivery === true}
                        />
                        Yes
                      </label>

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
                          checked={formik.values.cashOnDelivery === false}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Pickup Information */}
                <div className="pick-up mt-5 row">
                  <div className="col-12 col-lg-6">
                    <h3 className="fw-bold">Pickup Information</h3>

                    {/* Pickup Details Fields */}
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Pickup Date & Time :</label>
                      <Field
                        type="datetime-local"
                        name="pickupDetails.dateTime"
                        className="form-control w-25% h-100%"
                        placeholder="Date and Time"
                        style={{ height: "4.5em" ,border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="pickupDetails.dateTime"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Pickup Address :</label>
                      <Field
                        type="text"
                        as="textarea"
                        name="pickupDetails.address"
                        className="form-control w-25% h-100%"
                        placeholder="Address"
                        style={{ height: "4.5em" , border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="pickupDetails.address"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Pickup Postcode :</label>
                      <Field
                        type="text"
                        name="pickupDetails.postCode"
                        className="form-control w-25% h-100%"
                        placeholder="PostCode"
                        style={{ height: "4.5em" ,border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="pickupDetails.postCode"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    {/* <div className="input-error mb-3">
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
                    </div> */}

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Pickup Contact Number :</label>
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
                      <label className="fw-thin p-0 pb-1">Pickup Email :</label>
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
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Merchant Name :</label>
                      <Field
                        type="text"
                        name="pickupDetails.name"
                        className="form-control"
                        placeholder="Merchant name"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="pickupDetails.name"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Pickup Description :</label>
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
                    {/* <div className="input-error mb-3"> */}
                    <label className="fw-thin p-0 pb-1">Select Customer :</label>
                    <Field name="customer">
                        {({ field, form }) => (
                          <div>
                            <select
                              className="form-control"
                              style={{
                                height: "4.5em",
                                border: "1px solid #E6E6E6",
                                borderRadius: "5px"
                              }}
                              value={customerId || ""}
                              onChange={(e) => {
                                const selectedCustomer = customer.find(
                                  (c) => c._id === e.target.value
                                );
                                setCustomerId(e.target.value);
                                if (selectedCustomer) {
                                  form.setFieldValue(
                                    "deliveryDetails.address",
                                    selectedCustomer.address
                                  );
                                  form.setFieldValue(
                                    "deliveryDetails.mobileNumber",
                                    selectedCustomer.mobileNumber
                                  );
                                  form.setFieldValue(
                                    "deliveryDetails.email",
                                    selectedCustomer.email
                                  );
                                  form.setFieldValue(
                                    "deliveryDetails.description",
                                    selectedCustomer.description
                                  );
                                  form.setFieldValue(
                                    "deliveryDetails.postCode",
                                    selectedCustomer.postCode
                                  );
                                  form.setFieldValue(
                                    "deliveryDetails.name",
                                    selectedCustomer.firstName
                                  );
                                }
                              }}
                            >
                              <option value="" disabled selected>Select Customer</option>
                              {customer.map((cust) => (
                                <option key={cust._id} value={cust._id}>
                                  {`${cust.firstName} - ${cust.email} - ${cust.mobileNumber}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </Field>
                    {/* </div> */}

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Delivery Address :</label>
                      <Field
                        type="text"
                        as="textarea"
                        name="deliveryDetails.address"
                        className="form-control w-25% h-100%"
                        placeholder="Address"
                        style={{ height: "4.5em" , border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.address"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Delivery Postcode :</label>
                      <Field
                        type="number"
                        name="deliveryDetails.postCode"
                        className="form-control w-25% h-100%"
                        placeholder="PostCode"
                        style={{ height: "4.5em" , border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.postCode"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    {/* <div className="input-error mb-3">
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
                    </div> */}
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Delivery Contact Number :</label>
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
                      <label className="fw-thin p-0 pb-1">Delivery Email :</label>
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
                      <label className="fw-thin p-0 pb-1">Delivery Name :</label>
                      <Field
                        type="text"
                        name="deliveryDetails.name"
                        className="form-control"
                        placeholder="Delivery email"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.name"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1">Delivery Description :</label>
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
                    onClick={() => onHide()}
                    style={{ height: "4.5em" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    style={{ height: "4.5em" }}
                  >
                    Update Order
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderModal;
