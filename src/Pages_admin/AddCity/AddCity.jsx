import React, { useMemo, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import countryList from 'react-select-country-list'
import { getAllCountry } from "../../Components_admin/Api/Country";
import { createCity } from "../../Components_admin/Api/City";

const AddCity = () => {

  const [countries, setCountries] = useState([])
  const navigate = useNavigate()

  const initialValues = {
    cityName: "",
    countryID: "",
    cancelCharge: "",
    minimumDistance: "",
    minimumWeight: "",
    perDistanceCharge: "",
    perWeightCharge: "",
    commissionType: "",
    adminCommission: "",
    pickupRequest: "",
  };

  const validationSchema = Yup.object({
    cityName: Yup.string().required("City name is required"),
    countryID: Yup.string().required("Country is required"),
    cancelCharge: Yup.number().required("Cancel charge is required"),
    minimumDistance: Yup.number().required("Minimum distance is required"),
    minimumWeight: Yup.number().required("Minimum weight is required"),
    perDistanceCharge: Yup.number().required("Per distance charge is required"),
    perWeightCharge: Yup.number().required("Per weight charge is required"),
    commissionType: Yup.string().required("Commission type is required"),
    adminCommission: Yup.number().required("Admin commission is required"),
    pickupRequest: Yup.string().required("Pick up request is required"),
  });

  const onSubmit = async (values) => {
    // console.log('values', values);

    const res = await createCity(values);
    if (res.status) {
      navigate('/city')
    }
  };

  const fetchCountries = async () => {
    const response = await getAllCountry(1, 10)
    if (response.status) {
      setCountries(response.data.data)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  return (
    <div className="edit-user fluid-container W-100%">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          return <Form>
            <div className="row input-box">
              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  City name
                </label>
                <Field
                  type="text"
                  name="cityName"
                  className="form-control w-25% h-100%"
                  placeholder="City name"
                  style={{ height: "4.5em" }}
                />
                <ErrorMessage name="cityName" component="div" className="error text-danger ps-2" />

              </div>

              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Country Name
                </label>
                <select
                  className="form-select w-25% h-100%"
                  name="countryID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.countryID}
                  style={{ height: "4.5em" }}
                >
                  <option value="" label="Select country" />
                  {countries.map((option) => (
                    <option value={option.countryId}>
                      {option.countryName}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="countryID" component="div" className="error text-danger ps-2" />
              </div>
            </div>

            <div className="row input-box">
              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Pickup Request
                </label>
                <Field as="select" name="pickupRequest" className="form-control w-25% h-100%" style={{ height: "4.5em" }}>
                  <option value="" label="Select commission type" />
                  <option value="REGULAR">Regular</option>
                  <option value="EXPRESS">Express</option>
                </Field>
                <ErrorMessage name="pickupRequest" component="div" className="error text-danger ps-2" />

              </div>

              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Cancel charge
                </label>
                <Field
                  type="text"
                  name="cancelCharge"
                  className="form-control w-25% h-100%"
                  placeholder="Cancel charge"
                  style={{ height: "4.5em" }}
                />
                <ErrorMessage name="cancelCharge" component="div" className="error text-danger ps-2" />

              </div>
            </div>

            <div className="row input-box">
              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Minimum distance
                </label>
                <Field
                  type="text"
                  name="minimumDistance"
                  placeholder="Minimum distance"
                  className="form-control w-25% h-100%"
                  style={{ height: "4.5em" }}
                />
                <ErrorMessage name="minimumDistance" component="div" className="error text-danger ps-2" />

              </div>

              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Minimum weight
                </label>
                <Field
                  type="text"
                  name="minimumWeight"
                  className="form-control w-25% h-100%"
                  placeholder="Minimum weight"
                  style={{ height: "4.5em" }}
                />
                <ErrorMessage name="minimumWeight" component="div" className="error text-danger ps-2" />

              </div>
            </div>

            <div className="row input-box">
              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Per distance charge
                </label>
                <Field
                  type="text"
                  name="perDistanceCharge"
                  className="form-control w-25% h-100%"
                  placeholder="Per distance charge"
                  style={{ height: "4.5em" }}
                />
                <ErrorMessage name="perDistanceCharge" component="div" className="error text-danger ps-2" />

              </div>

              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Per weight
                </label>
                <Field
                  type="text"
                  name="perWeightCharge"
                  className="form-control w-25% h-100%"
                  placeholder="Per weight charge"
                  style={{ height: "4.5em" }}
                />
                <ErrorMessage name="perWeightCharge" component="div" className="error text-danger ps-2" />

              </div>
            </div>

            <div className="row input-box">
              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Commission type
                </label>
                <Field as="select" name="commissionType" className="form-control w-25% h-100%" style={{ height: "4.5em" }}>
                  <option value="" label="Select commission type" />
                  <option value="FIXED">Fixed</option>
                  <option value="PERCENTAGE">Percentage</option>
                </Field>
                <ErrorMessage name="commissionType" component="div" className="error text-danger ps-2" />

              </div>

              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Admin commission

                </label>
                <Field
                  type="text"
                  name="adminCommission"
                  className="form-control w-25% h-100%"
                  placeholder="Admin commission"
                  style={{ height: "4.5em" }}
                />
                <ErrorMessage name="adminCommission" component="div" className="error text-danger ps-2" />

              </div>
            </div>

            <div className="d-flex">
              <div>
                <button type="submit" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#d65246", color: "#fff" }}>
                  Add City
                </button>
                <Link to="/city" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#ccc", color: "#000" }}>
                  Back
                </Link>
              </div>
            </div>
          </Form>
        }}
      </Formik>

    </div>
  );
};

export default AddCity;
