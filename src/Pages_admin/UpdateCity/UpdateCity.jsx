import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const UpdateCity = () => {
  const formik = useFormik({
    initialValues: {
      cityName: "",
      country: "",
      fixedCharges: "",
      cancelCharge: "",
      minDistance: "",
      minWeight: "",
      perDistanceCharge: "",
      perWeightCharge: "",
      commissionType: "",
      adminCommission: "",
    },
    validationSchema: Yup.object({
      cityName: Yup.string().required("City name is required"),
      country: Yup.string().required("Country is required"),
      fixedCharges: Yup.number().required("Fixed charges is required"),
      cancelCharge: Yup.number().required("Cancel charge is required"),
      minDistance: Yup.number().required("Minimum distance is required"),
      minWeight: Yup.number().required("Minimum weight is required"),
      perDistanceCharge: Yup.number().required(
        "Per distance charge is required"
      ),
      perWeightCharge: Yup.number().required("Per weight charge is required"),
      commissionType: Yup.string().required("Commission type is required"),
      adminCommission: Yup.number().required("Admin commission is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      // console.log("Form data:", values);
    },
  });

  return (
    <div className="edit-user fluid-container W-100%">
      <form onSubmit={formik.handleSubmit}>
        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              City name
              <input
                type="text"
                name="cityName"
                className="form-control mt-3 w-25% h-100%"
                placeholder="City name"
                value={formik.values.cityName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.cityName && formik.errors.cityName ? (
                <div className="error text-danger ps-2">
                  {formik.errors.cityName}
                </div>
              ) : null}
            </label>
          </div>

          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Country
              <select
                name="country"
                class=" form-control mt-3 w-25% h-100%"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              >
                <option value="" label="Select country" />
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.country && formik.errors.country ? (
                <div className="error text-danger ps-2">
                  {formik.errors.country}
                </div>
              ) : null}
            </label>
          </div>
        </div>

        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Fixed charges
              <input
                type="text"
                name="fixedCharges"
                className="form-control mt-3 w-25% h-100%"
                placeholder="Fixed charges"
                value={formik.values.fixedCharges}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.fixedCharges && formik.errors.fixedCharges ? (
                <div className="error text-danger ps-2">
                  {formik.errors.fixedCharges}
                </div>
              ) : null}
            </label>
          </div>

          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Cancel charge
              <input
                type="text"
                name="cancelCharge"
                className="form-control mt-3 w-25% h-100%"
                placeholder="Cancel charge"
                value={formik.values.cancelCharge}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.cancelCharge && formik.errors.cancelCharge ? (
                <div className="error text-danger ps-2">
                  {formik.errors.cancelCharge}
                </div>
              ) : null}
            </label>
          </div>
        </div>

        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Minimum distance
              <input
                type="text"
                name="minDistance"
                placeholder="Minimum distance"
                className="form-control mt-3 w-25% h-100%"
                value={formik.values.minDistance}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.minDistance && formik.errors.minDistance ? (
                <div className="error text-danger ps-2">
                  {formik.errors.minDistance}
                </div>
              ) : null}
            </label>
          </div>

          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Minimum weight
              <input
                type="text"
                name="minWeight"
                className="form-control mt-3 h-100%"
                placeholder="Minimum weight"
                value={formik.values.minWeight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.minWeight && formik.errors.minWeight ? (
                <div className="error text-danger ps-2">
                  {formik.errors.minWeight}
                </div>
              ) : null}
            </label>
          </div>
        </div>

        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Per distance charge
              <input
                type="text"
                name="perDistanceCharge"
                className="form-control mt-3 w-20 h-100%"
                placeholder="Per distance charge"
                value={formik.values.perDistanceCharge}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.perDistanceCharge &&
              formik.errors.perDistanceCharge ? (
                <div className="error text-danger ps-2">
                  {formik.errors.perDistanceCharge}
                </div>
              ) : null}
            </label>
          </div>

          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Per weight charge
              <input
                type="text"
                name="perWeightCharge"
                className="form-control mt-3 w-25% h-100%"
                placeholder="Per weight charge"
                value={formik.values.perWeightCharge}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.perWeightCharge &&
              formik.errors.perWeightCharge ? (
                <div className="error text-danger ps-2">{formik.errors.perWeightCharge}</div>
              ) : null}
            </label>
          </div>
        </div>

        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Commission type
              <select
                name="commissionType"
                className="form-control mt-3 w-25% h-100%"
                value={formik.values.commissionType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              >
                <option value="" label="Select commission type" />
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.commissionType && formik.errors.commissionType ? (
                <div className="error text-danger ps-2">
                  {formik.errors.commissionType}
                </div>
              ) : null}
            </label>
          </div>

          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              Admin commission
              <input
                type="text"
                name="adminCommission"
                className="form-control mt-3 w-25% h-100%"
                placeholder="Admin commission"
                value={formik.values.adminCommission}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.adminCommission &&
              formik.errors.adminCommission ? (
                <div className="error text-danger ps-2">
                  {formik.errors.adminCommission}
                </div>
              ) : null}
            </label>
          </div>
        </div>
<div className="buttons d-flex justify-content-end">
  <div className="save">
        <button
          style={{
            outline: "none",
            border: "none",
            padding: "10px",
            margin: "20px",
            width: "150px",
            borderRadius: "5px",
            background: "#d65246",
            color: "white",
            margin: "30px 0px 0px 10px",
          }}
        >
          Save
        </button>
        </div>
        <div className="cancel">
        <Link to="/city">
          <button
            style={{
              outline: "none",
              border: "none",
              padding: "10px",
              margin: "20px",
              width: "150px",
              borderRadius: "5px",
              background: "#FFF",
              color: "#000",
              margin: "30px 0px 0px 10px",
            }}
          >
            Cancel
          </button>
        </Link>
        </div>
        </div>

      </form>
    </div>
  );
};

export default UpdateCity;
