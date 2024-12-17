import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import phone from "../../assets_admin/phone.png";
import location from "../../assets_admin/location.png";


const ScheduleOrder = () => {
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
      // console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="create-order">
      <div className="input-box d-xxl-flex  d-xl-flex  d-lg-flex d-md-flex  d-sm-flex  row mb-2 col-12">
        <div className="input-error col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 mb-3">
          <input
            type="text"
            id="parcelType1"
            name="parcelType1"
            className="form-control"
            placeholder="Parcel type"
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
            value={formik.values.parcelType1}
          />
          {formik.touched.parcelType1 && formik.errors.parcelType1 ? (
            <div className="error text-danger ps-2">
              {formik.errors.parcelType1}
            </div>
          ) : null}
        </div>

        <div className="input-error col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 mb-3">
          <input
            type="text"
            id="parcelType2"
            name="parcelType2"
            className="form-control "
            placeholder="Parcel type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
            value={formik.values.parcelType2}
          />
          {formik.touched.parcelType2 && formik.errors.parcelType2 ? (
            <div className="error text-danger ps-2">
              {formik.errors.parcelType2}
            </div>
          ) : null}
        </div>

        <div className="input-error col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 mb-3">
          <input
            type="text"
            id="parcelType3"
            name="parcelType3"
            className="form-control "
            placeholder="Parcel type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
            value={formik.values.parcelType3}
          />
          {formik.touched.parcelType3 && formik.errors.parcelType3 ? (
            <div className="error text-danger ps-2">
              {formik.errors.parcelType3}
            </div>
          ) : null}
          <br />
        </div>
      </div>

      <div className="input-error col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
        <textarea
          id="parcelDescription"
          name="parcelDescription"
          className="parcel-description col-xxl-12 col-xl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-3 mb-3"
          placeholder="Parcel description"
          rows="4"
          cols="50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            height: "10.5em",
            border: "1px solid #E6E6E6",
            borderRadius: "5px",
          }}
          value={formik.values.parcelDescription}
        />
        {formik.touched.parcelDescription && formik.errors.parcelDescription ? (
          <div className="error text-danger ps-2">
            {formik.errors.parcelDescription}
          </div>
        ) : null}
      </div>

      <div className="input-box row d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-sm-flex col-12">
        <div className="input-error col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <select
            className="forms-select w-xxl-100 w-100 p-2 "
            id="country"
            name="country"
            aria-label="Default select example"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
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
          </select>
          {formik.touched.country && formik.errors.country ? (
            <div className="error text-danger ps-2">
              {formik.errors.country}
            </div>
          ) : null}
        </div>

        <div className="input-error col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <select
            className="forms-select w-100 p-2"
            id="city"
            name="city"
            aria-label="Default select example"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
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
          </select>
          {formik.touched.city && formik.errors.city ? (
            <div className="error text-danger ps-2">{formik.errors.city}</div>
          ) : null}
        </div>
      </div>

      <div className="pick-up mt-5 d-xxl-flex d-xl-flex d-lg-flex  d-md-flex d-sm-flex col-12 ">
        <div className="input-box col-xxl-6 col-xl-6 col-lg-6  col-md-6  col-sm-6 col-12 me-3 ">
          <h3 className="pick-up-p fw-bold">Pickup information</h3>
          <br />
          <div className="location">
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              className="form-control mb-3"
              placeholder="pickup location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pickupLocation}
              style={{
                height: "4.5em",
                border: "1px solid #E6E6E6",
                borderRadius: "5px",
              }}
            />
            <div className="imgs">
              <img src={location} className="location-img " alt="Phone" />
            </div>
          </div>
          {formik.touched.pickupLocation && formik.errors.pickupLocation ? (
            <div className="error text-danger ps-2">
              {formik.errors.pickupLocation}
            </div>
          ) : null}

          <div className="location">
            <input
              type="text"
              id="pickupContact"
              name="pickupContact"
              className="form-control w-100 p-2 mb-3"
              placeholder="Pickup contact number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pickupContact}
              style={{
                height: "4.5em",
                border: "1px solid #E6E6E6",
                borderRadius: "5px",
              }}
            />
            <div className="imgs">
              <img src={phone} className="location-img " alt="Phone" />
            </div>
          </div>
          {formik.touched.pickupContact && formik.errors.pickupContact ? (
            <div className="error text-danger ps-2">
              {formik.errors.pickupContact}
            </div>
          ) : null}

          <textarea
            id="pickupDescription"
            name="pickupDescription"
            className="description w-100 p-2 mb-3"
            placeholder="pickup description"
            rows="4"
            cols="50"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickupDescription}
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
          />
          {formik.touched.pickupDescription &&
          formik.errors.pickupDescription ? (
            <div className="error text-danger ps-2">
              {formik.errors.pickupDescription}
            </div>
          ) : null}

          <textarea
            id="pickupInstruction"
            name="pickupInstruction"
            className="description w-100 p-2"
            placeholder="pickup instruction mb-3"
            rows="4"
            cols="50"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickupInstruction}
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
          />
          {formik.touched.pickupInstruction &&
          formik.errors.pickupInstruction ? (
            <div className="error text-danger ps-2">
              {formik.errors.pickupInstruction}
            </div>
          ) : null}
        </div>

        <div className="input-box col-xxl-6 col-xl-6 col-lg-6  col-md-6  col-sm-6 col-12 me-3 ">
          <h3 className="pick-up-p fw-bold">Delivery information</h3>
          <br />
          <div className="location">
            <input
              type="text"
              id="deliveryLocation"
              name="deliveryLocation"
              className="form-control mb-3"
              placeholder="Delivery location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deliveryLocation}
              style={{
                border: "1px solid #E6E6E6",
                height: "4.5em",

                borderRadius: "5px",
              }}
            />
            <div className="imgs">
              <img src={location} className="location-img " alt="Phone" />
            </div>
          </div>
          {formik.touched.deliveryLocation && formik.errors.deliveryLocation ? (
            <div className="error text-danger ps-2">
              {formik.errors.deliveryLocation}
            </div>
          ) : null}

          <div className="location">
            <input
              type="text"
              id="deliveryContact"
              name="deliveryContact"
              className="form-control w-100 p-2 mb-3"
              placeholder="Delivery contact number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deliveryContact}
              style={{
                height: "4.5em",
                border: "1px solid #E6E6E6",
                borderRadius: "5px",
              }}
            />
            <div className="imgs">
              <img src={phone} className="location-img " alt="Phone" />
            </div>
          </div>
          {formik.touched.deliveryContact && formik.errors.deliveryContact ? (
            <div className="error text-danger ps-2">
              {formik.errors.deliveryContact}
            </div>
          ) : null}

          <textarea
            id="deliveryDescription"
            name="deliveryDescription"
            className="description w-100 p-2 mb-3"
            placeholder="delivery description"
            rows="4"
            cols="50"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deliveryDescription}
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
          />
          {formik.touched.deliveryDescription &&
          formik.errors.deliveryDescription ? (
            <div className="error text-danger ps-2">
              {formik.errors.deliveryDescription}
            </div>
          ) : null}

          <textarea
            id="deliveryInstruction"
            name="deliveryInstruction"
            className="description w-100 p-2"
            placeholder="delivery instruction"
            rows="4"
            cols="50"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deliveryInstruction}
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
          />
          {formik.touched.deliveryInstruction &&
          formik.errors.deliveryInstruction ? (
            <div className="error text-danger ps-2">
              {formik.errors.deliveryInstruction}
            </div>
          ) : null}
        </div>
      </div>

      <h3 className="pick-up-p fw-bold text-capitalize mt-5 mb-3">
        payment collect form
      </h3>
      <div className="payment-form d-xxl-flex d-xl-flex d-lg-flex d-md-flex  d-sm-flex col-12 ">
        <div className="input-error col-xxl-6   col-xl-6   col-lg-6   col-md-6  col-sm-6  col-12 me-3 mb-3">
          <select
            className="forms-select w-100 p-2 "
            id="pickupLocationSelect"
            name="pickupLocationSelect"
            aria-label="Default select example"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickupLocationSelect}
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
          >
            <option value="" label="Pickup location" />
            <option value="1" label="One" />
            <option value="2" label="Two" />
            <option value="3" label="Three" />
          </select>
          {formik.touched.pickupLocationSelect &&
          formik.errors.pickupLocationSelect ? (
            <div className="error text-danger ps-2">
              {formik.errors.pickupLocationSelect}
            </div>
          ) : null}
        </div>
        <div className="input-error col-xxl-6   col-xl-6   col-lg-6   col-md-6  col-sm-6  col-12 me-3 mb-3">
          <select
            className="forms-select w-100 p-2 "
            id="vehicleSelect"
            name="vehicleSelect"
            aria-label="Default select example"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vehicleSelect}
            style={{
              height: "4.5em",
              border: "1px solid #E6E6E6",
              borderRadius: "5px",
            }}
          >
            <option value="" label="Select vehicle" />
            <option value="1" label="One" />
            <option value="2" label="Two" />
            <option value="3" label="Three" />
          </select>
          {formik.touched.vehicleSelect && formik.errors.vehicleSelect ? (
            <div className="error text-danger ps-2 ">
              {formik.errors.vehicleSelect}
            </div>
          ) : null}
        </div>
      </div>

    
    </form>
  );
};

export default ScheduleOrder;
