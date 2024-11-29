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
  console.log("Order", Order);
  const naviagte = useNavigate();
  const merchant = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [deliveryMan, setDeliveryMen] = useState([]);
  const [deliveryManId, setDeliveryMenId] = useState(null);
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const deliveryManRes = await getDeliveryMan(1, 10);
      const customerRes = await getAllCustomers();

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
        >
          {(formik) => {
            return (
              <Form className="create-order">
                {/* Parcel Types */}
                <div className="input-box row mb-2">
                  <div
                    key={"parcelsCount"}
                    className="input-error col-12 col-sm-6 mb-3"
                  >
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
                    <Field
                      as="select"
                      name="deliveryManId"
                      className="form-control"
                      style={{ height: "4.5em" }}
                    >
                      <option value="">Select Delivery Man</option>
                      {deliveryMan.map((data) => (
                        <option key={data._id} value={data._id}>
                          {data.name}
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
                      <Field
                        type="datetime-local"
                        name="pickupDetails.dateTime"
                        className="form-control w-25% h-100%"
                        placeholder="Date and Time"
                        style={{ height: "4.5em" }}
                      />
                      <ErrorMessage
                        name="pickupDetails.dateTime"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>

                    <div className="input-error mb-3">
                      <Field
                        type="text"
                        as="textarea"
                        name="pickupDetails.address"
                        className="form-control w-25% h-100%"
                        placeholder="Address"
                        style={{ height: "4.5em" }}
                      />
                      <ErrorMessage
                        name="pickupDetails.address"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <Field
                        type="text"
                        name="pickupDetails.postCode"
                        className="form-control w-25% h-100%"
                        placeholder="PostCode"
                        style={{ height: "4.5em" }}
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
                    <div className="input-error mb-3">
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
                    <Select
                      className="form-control mb-3 p-0"
                      styles={{
                        control: (base) => ({ ...base, padding: "15px" }),
                      }}
                      options={customer.map((cust) => ({
                        value: cust._id,
                        label: cust.name,
                        label: `${cust.name}  -  ${cust.email}  -  ${cust.mobileNumber}`,
                        ...cust,
                      }))}
                      placeholder="Select Customer"
                      isClearable
                      filterOption={(option, inputValue) => {
                        const data = option.data; // Access the original object from options
                        const searchValue = inputValue.toLowerCase();

                        // Match by name, email, or mobileNumber
                        return (
                          data.name.toLowerCase().includes(searchValue) ||
                          data.email.toLowerCase().includes(searchValue) ||
                          data.mobileNumber.toLowerCase().includes(searchValue)
                        );
                      }}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          formik.setFieldValue(
                            "deliveryDetails.address",
                            selectedOption.address
                          );
                          // formik.setFieldValue(
                          //   "deliveryDetails.countryCode",
                          //   selectedOption.countryCode || ""
                          // );
                          formik.setFieldValue(
                            "deliveryDetails.mobileNumber",
                            selectedOption.mobileNumber
                          );
                          formik.setFieldValue(
                            "deliveryDetails.email",
                            selectedOption.email
                          );
                          formik.setFieldValue(
                            "deliveryDetails.description",
                            selectedOption.description
                          );
                          formik.setFieldValue(
                            "deliveryDetails.postCode",
                            selectedOption.postCode
                          );
                          formik.setFieldValue(
                            "deliveryDetails.name",
                            selectedOption.name
                          );
                        } else {
                          // Clear delivery details if no customer is selected
                          formik.setFieldValue("deliveryDetails", {
                            address: "",
                            // countryCode: "",
                            mobileNumber: "",
                            email: "",
                            description: "",
                            postCode: "",
                            name: "",
                          });
                        }
                      }}
                    />
                    {/* </div> */}

                    <div className="input-error mb-3">
                      <Field
                        type="text"
                        as="textarea"
                        name="deliveryDetails.address"
                        className="form-control w-25% h-100%"
                        placeholder="Address"
                        style={{ height: "4.5em" }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.address"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <Field
                        type="number"
                        name="deliveryDetails.postCode"
                        className="form-control w-25% h-100%"
                        placeholder="PostCode"
                        style={{ height: "4.5em" }}
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
                    Create Order
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
