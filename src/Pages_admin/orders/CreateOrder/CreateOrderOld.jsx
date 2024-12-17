import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import phone from "./../../../assets/phone.png";
import location from "./../../../assets/location.png";
import "./CreateOrder.css";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../Components/Api/Order";

const CreateOrder = () => {

  const naviagte = useNavigate()
  const initialValues = {
    parcelType1: "",
    parcelType2: "",
    parcelType3: "",
    parcelDescription: "",
    country: "",
    city: "",
    pickupLocation: "",
    pickupContact: "",
    pickupDescription: "",
    pickupInstruction: "",
    deliveryLocation: "",
    deliveryContact: "",
    deliveryDescription: "",
    deliveryInstruction: "",
    pickupLocationSelect: "",
    vehicleSelect: "",
  };

  const validationSchema = Yup.object().shape({
    parcelType1: Yup.string().required("Required"),
    parcelType2: Yup.string().required("Required"),
    parcelType3: Yup.string().required("Required"),
    parcelDescription: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    pickupLocation: Yup.string().required("Required"),
    pickupContact: Yup.string().required("Required"),
    pickupDescription: Yup.string().required("Required"),
    pickupInstruction: Yup.string().required("Required"),
    deliveryLocation: Yup.string().required("Required"),
    deliveryContact: Yup.string().required("Required"),
    deliveryDescription: Yup.string().required("Required"),
    deliveryInstruction: Yup.string().required("Required"),
    pickupLocationSelect: Yup.string().required("Required"),
    vehicleSelect: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    // console.log('values', values);

    const res = await createOrder(values);
    if (res.status) {
      navigate('/all-order-admin')
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="create-order">
          {/* Parcel Types */}
          <div className="input-box row mb-2">
            {["parcelType1", "parcelType2", "parcelType3"].map((type, index) => (
              <div key={type} className="input-error col-12 col-sm-4 mb-3">
                <Field
                  type="text"
                  name={type}
                  className="form-control"
                  placeholder={`Parcel Type ${index + 1}`}
                  style={{
                    height: "4.5em",
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
                <ErrorMessage
                  name={type}
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>
            ))}
          </div>

          {/* Parcel Description */}
          <div className="input-error mb-3">
            <Field
              as="textarea"
              name="parcelDescription"
              className="parcel-description form-control p-3"
              placeholder="Parcel description"
              rows="4"
              style={{
                border: "1px solid #E6E6E6",
                borderRadius: "5px",
              }}
            />
            <ErrorMessage
              name="parcelDescription"
              component="div"
              className="error text-danger ps-2"
            />
          </div>

          {/* Country and City */}
          <div className="input-box row">
            <div className="input-error col-12 col-sm-6 mb-3">
              <Field
                as="select"
                name="country"
                className="form-select"
                style={{
                  height: "4.5em",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              >
                <option value="" label="Country" />
                <option value="1" label="One" />
                <option value="2" label="Two" />
                <option value="3" label="Three" />
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="error text-danger ps-2"
              />
            </div>

            <div className="input-error col-12 col-sm-6 mb-3">
              <Field
                as="select"
                name="city"
                className="form-select"
                style={{
                  height: "4.5em",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              >
                <option value="" label="City" />
                <option value="1" label="One" />
                <option value="2" label="Two" />
                <option value="3" label="Three" />
              </Field>
              <ErrorMessage
                name="city"
                component="div"
                className="error text-danger ps-2"
              />
            </div>
          </div>

          {/* Pickup Information */}
          <div className="pick-up mt-5 row">
            <div className="col-12 col-lg-6">
              <h3 className="fw-bold">Pickup Information</h3>

              {/* Pickup Location */}
              <div className="input-error mb-3">
                <div className="location">
                  <Field
                    type="text"
                    name="pickupLocation"
                    className="form-control"
                    placeholder="Pickup location"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="imgs">
                    <img src={location} className="location-img" alt="Location" />
                  </div>
                </div>
                <ErrorMessage
                  name="pickupLocation"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>

              {/* Pickup Contact */}
              <div className="input-error mb-3">
                <div className="location">
                  <Field
                    type="text"
                    name="pickupContact"
                    className="form-control"
                    placeholder="Pickup contact number"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="imgs">
                    <img src={phone} className="location-img" alt="Phone" />
                  </div>
                </div>
                <ErrorMessage
                  name="pickupContact"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>

              {/* Pickup Description and Instruction */}
              {["pickupDescription", "pickupInstruction"].map((field) => (
                <div key={field} className="input-error mb-3">
                  <Field
                    as="textarea"
                    name={field}
                    className="form-control"
                    placeholder={field.replace(/pickup/, "").toLowerCase()}
                    rows="4"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>
              ))}
            </div>

            {/* Delivery Information */}
            <div className="col-12 col-lg-6">
              <h3 className="fw-bold">Delivery Information</h3>

              {/* Delivery Location */}
              <div className="input-error mb-3">
                <div className="location">
                  <Field
                    type="text"
                    name="deliveryLocation"
                    className="form-control"
                    placeholder="Delivery location"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="imgs">
                    <img src={location} className="location-img" alt="Location" />
                  </div>
                </div>
                <ErrorMessage
                  name="deliveryLocation"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>

              {/* Delivery Contact */}
              <div className="input-error mb-3">
                <div className="location">
                  <Field
                    type="text"
                    name="deliveryContact"
                    className="form-control"
                    placeholder="Delivery contact number"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="imgs">
                    <img src={phone} className="location-img" alt="Phone" />
                  </div>
                </div>
                <ErrorMessage
                  name="deliveryContact"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>

              {/* Delivery Description and Instruction */}
              {["deliveryDescription", "deliveryInstruction"].map((field) => (
                <div key={field} className="input-error mb-3">
                  <Field
                    as="textarea"
                    name={field}
                    className="form-control"
                    placeholder={field.replace(/delivery/, "").toLowerCase()}
                    rows="4"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pickup and Vehicle Selection */}
          <div className="pick-up mt-4 row">
            <div className="input-error col-12 col-md-6 mb-3">
              <Field
                as="select"
                name="pickupLocationSelect"
                className="form-select"
                style={{
                  height: "4.5em",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              >
                <option value="" label="Pickup Location" />
                <option value="1" label="One" />
                <option value="2" label="Two" />
                <option value="3" label="Three" />
              </Field>
              <ErrorMessage
                name="pickupLocationSelect"
                component="div"
                className="error text-danger ps-2"
              />
            </div>

            <div className="input-error col-12 col-md-6 mb-3">
              <Field
                as="select"
                name="vehicleSelect"
                className="form-select"
                style={{
                  height: "4.5em",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              >
                <option value="" label="Vehicle Select" />
                <option value="1" label="One" />
                <option value="2" label="Two" />
                <option value="3" label="Three" />
              </Field>
              <ErrorMessage
                name="vehicleSelect"
                component="div"
                className="error text-danger ps-2"
              />
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
      )}
    </Formik>
  );
};

export default CreateOrder;
