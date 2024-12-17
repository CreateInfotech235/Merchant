import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import "./EditUser.css";

import { Link } from "react-router-dom";

const EditUser = () => {
  const [phone, setPhone] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
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
      <div className="edit-user fluid-container W-100%">
        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
          <div className="input-error col-xxl-4 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label
              htmlFor="name"
              class="form-label w-100"
              style={{ color: "#999696" }}
            >
              Name
              <input
                type="text"
                id="name"
                className="form-control mt-3 w-25% h-100%"
                placeholder="Name"
                style={{ height: "4.5em" }}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error text-danger">
                  {formik.errors.name}
                </div>
              ) : null}
            </label>
          </div>

          <div className="input-error col-xxl-4 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
            <label
              htmlFor="email"
              class="form-label w-100"
              style={{ color: "#999696" }}
            >
              Email
              <input
                type="email"
                id="email"
                className="form-control mt-3"
                placeholder="Email"
                style={{ height: "4.5em" }}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error text-danger ">
                  {formik.errors.email}
                </div>
              ) : null}
            </label>
          </div>
        </div>

        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-sm-flex">
          <div className="input-error col-xxl-4  col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
            <label
              htmlFor="username"
              class="form-label w-100"
              style={{ color: "#999696" }}
            >
              Username
              <input
                type="text"
                id="username"
                className="form-control mt-3"
                placeholder="Username"
                style={{ height: "4.5em" }}
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error text-danger">
                  {formik.errors.username}
                </div>
              ) : null}
            </label>
          </div>

          <div className="input-error col-xxl-4 col-xl-4 w-xxl-100  col-lg-5 col-md-6 col-sm-5 w-lg-50 m-2 w-md-50 col-12">
            <label
              htmlFor="contactNumber"
              class="form-label ps-0 mb-0 w-100 "
              style={{ color: "#999696" }}
            >
              {" "}
              Contact Number
            </label>
          
              <PhoneInput
                country={"eg"}
                enableSearch={true}
                className="phoneInput"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                containerStyle={{
                  border: "0px"
      
                }}
                inputStyle={{
                  background: "white",
                  width:"100%",
                       height: "4.5em"
                }}
                required
            
              />
       
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <div className="error text-danger ps-3">
                {formik.errors.contactNumber}
              </div>
            ) : null}
          </div>
        </div>
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
    </>
  );
};

export default EditUser;
