import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./InvoiceSetting.css";

import invoices from "../../assets_admin/invoices.png";

const InvoiceSetting = () => {
  const formik = useFormik({
    initialValues: {
      companyName: "",
      number: "",
      username: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("company name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      username: Yup.string().required("Username is required"),
      contactNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Contact number is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      // console.log("Form data:", values);
    },
  });

  return (
    <>
      <div className="buttons d-flex justify-content-end">
        <div className="save">
          {" "}
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
      </div>
      <div className="edit-user fluid-container W-100%">
        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label class="form-label w-100" style={{ color: "#999696" }}>
              company name
              <input
                type="text"
                id="name"
                class="form-control mt-3 w-25% h-100%"
                placeholder="Name"
                style={{ height: "4.5em" }}
                {...formik.getFieldProps("name")}
              />
            </label>
            {formik.touched.name && formik.errors.name ? (
              <div className="error text-danger ps-2">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label className="form-label w-100" style={{ color: "#999696" }}>
              company contact number
              <input
                type="number"
                id="number"
                class="form-control mt-3 w-25% h-100%"
                placeholder="number"
                style={{ height: "4.5em" }}
                {...formik.getFieldProps("number")}
              />
            </label>
            {formik.touched.number && formik.errors.number ? (
              <div className="error text-danger ps-2">
                {formik.errors.number}
              </div>
            ) : null}
          </div>
        </div>

        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
          <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label className="form-label w-100" style={{ color: "#999696" }}>
              company address
              <input
                type="text"
                id="username"
                class="form-control mt-3 w-25% h-100%"
                placeholder="Username"
                style={{ height: "4.5em" }}
                {...formik.getFieldProps("username")}
              />
            </label>
            {formik.touched.username && formik.errors.username ? (
              <div className="error text-danger ps-2">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <label>select images</label>

      <div className="row">
        <div
          className="img d-flex flex-column-reverse  bg-white p-2 justify-content-center align-items-center rounded-3 col-xxl-2  col-xl-2 col-lg-2 ms-3 col-md-4 col-sm-4 col-6 "
          style={{ cursor: "pointer" }}
        >
          <div className="label">
            <label For="formFile" className="form-labels">
              select file{" "}
            </label>
          </div>
          <div className="image">
            <img src={invoices} className="car12 p-3" />
            <input className="form-control" type="file" id="formFile" />
          </div>
        </div>
        <div>
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
   
      </div>
      </div>
    </>
  );
};

export default InvoiceSetting;
