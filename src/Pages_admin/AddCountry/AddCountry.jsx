import React, { useMemo } from "react";
import { ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import ReactFlagsSelect from 'react-flags-select'
import "./AddCountry.css";
import countryList from 'react-select-country-list'
import { createCountry } from "../../Components_admin/Api/Country";

const AddCountry = () => {
 const navigate = useNavigate()

  const initialValues = {
    countryName: "",
    distanceType: "",
    weightType: "",
  };

  const validationSchema = Yup.object({
    countryName: Yup.string().required("Country name is required"),
    distanceType: Yup.string().required("Distance type is required"),
    weightType: Yup.string().required("Weight type is required"),
  });

  const onSubmit = async(values) => {
    const res = await createCountry(values);
    if(res.status){
      navigate('/country')
    }
  };

  const options = useMemo(() => countryList().getData(), [])

  

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return <div className="edit-user fluid-container W-100%">
            <Form className="create-order">
              <div className="row input-box d-flex">
                <div className="input-error col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                  <label className="w-100" style={{ color: "#999696" }}>
                    Country Name
                  </label>
                  <select
                    className="form-select w-25% h-100%"
                    name="countryName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.countryName}
                    style={{ height: "4.5em" }}
                  >
                    <option value="" label="Select country" />
                    {options.map((option) => (
                      <option key={option.label} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage name="countryName" component="div" className="error text-danger ps-2" />
                </div>
                <div className="input-error col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                  <label className="w-100" style={{ color: "#999696" }}>
                    Distance type
                  </label>
                  <select
                    className="form-select w-25% h-100%"
                    name="distanceType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.distanceType}
                    style={{ height: "4.5em" }}
                  >
                    <option value="" label="Select distance type" />
                    <option value="MILES" label="Miles" />
                    <option value="KM" label="Km" />
                  </select>
                  <ErrorMessage name="distanceType" component="div" className="error text-danger ps-2" />
                </div>
              </div>

              <div className="row input-box d-flex">
                <div className="input-error col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                  <label className="w-100" style={{ color: "#999696" }}>
                    Weight type
                  </label>
                  <select
                    className="form-select w-25% h-100%"
                    name="weightType"
                    value={formik.values.weightType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ height: "4.5em" }}
                  >
                    <option value="" label="Select weight type" />
                    <option value="KG" label="Kg" />
                    <option value="POUND" label="Pound" />
                  </select>
                  <ErrorMessage name="weightType" component="div" className="error text-danger ps-2" />
                </div>
              </div>

              <br />
              <div className="d-flex">
                <div>
                  <button
                    type="submit"
                    className="btn rounded-2 m-3 p-2 fw-bold"
                    style={{
                      width: "150px",
                      background: "#d65246",
                      color: "white",
                    }}
                  >
                    Save
                  </button>
                </div>
                <div>
                  <Link to="/country">
                    <button
                      type="button"
                      className="btn rounded-2 m-3 p-2 fw-bold"
                      style={{
                        width: "150px",
                        background: "#FFF",
                        color: "#000",
                      }}
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        }}
      </Formik>
    </>
  );
};

export default AddCountry;
