import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllCountry } from "../../Components_admin/Api/Country";
import { getAllCity } from "../../Components_admin/Api/City";
import { createExtraCharge } from "../../Components_admin/Api/ExtraCharge";
import { useNavigate } from "react-router-dom";

const AddExtraCharges = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate()
  // Fetch countries and cities on component mount
  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      const countriesResponse = await getAllCountry(1, 10); // Fetch countries from API
      const citiesResponse = await getAllCity(1, 10); // Fetch cities from API
      
      if (countriesResponse.status) setCountries(countriesResponse.data.data);
      if (citiesResponse.status) setCities(citiesResponse.data.data);
    };

    fetchCountriesAndCities();
  }, []);

  // Validation schema for the form
  const validationSchema = Yup.object({
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    title: Yup.string().required("Title is required"),
    charge: Yup.number().required("Charge are required"),
    chargeType: Yup.string().required("Charge type is required"),
  });

  const onSubmit = async(value) =>{
    const res = await createExtraCharge(value);
    if (res.status) {
      navigate('/extra-charge ')
    }

  }
  return (
    <div className="update-vehicle">
      <div className="edit-user fluid-container W-100%">
        <Formik
          initialValues={{
            country: "",
            city: "",
            title: "",
            charge: "",
            chargeType: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values,errors , handleChange }) => {
            console.log('error', errors , values)
            return <Form>
              {/* Country Dropdown */}
              <div className="row input-box">
                <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                  <label className="form-label w-100" style={{ color: "#999696" }}>
                    Country
                    <Field
                      as="select"
                      name="country"
                      className="form-control mt-3"
                      style={{ height: "4.5em" }}
                      onChange={handleChange}
                      value={values.country}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.countryId} value={country.countryId}>
                          {country.countryName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="error text-danger ps-2" />
                  </label>
                </div>

                {/* City Dropdown */}
                <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                  <label className="form-label w-100" style={{ color: "#999696" }}>
                    City
                    <Field
                      as="select"
                      name="city"
                      className="form-control mt-3"
                      style={{ height: "4.5em" }}
                      onChange={handleChange}
                      value={values.city}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.cityId} value={city.cityId}>
                          {city.cityName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="city" component="div" className="error text-danger ps-2" />
                  </label>
                </div>
              </div>

              {/* Other Input Fields */}
              <div className="row input-box">
                <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                  <label className="form-label w-100" style={{ color: "#999696" }}>
                    Title
                    <Field
                      type="text"
                      name="title"
                      className="form-control mt-3"
                      style={{ height: "4.5em" }}
                    />
                    <ErrorMessage name="title" component="div" className="error text-danger ps-2" />
                  </label>
                </div>

                <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                  <label className="form-label w-100" style={{ color: "#999696" }}>
                    Charge
                    <Field
                      type="number"
                      name="charge"
                      className="form-control mt-3"
                      style={{ height: "4.5em" }}
                    />
                    <ErrorMessage name="charges" component="div" className="error text-danger ps-2" />
                  </label>
                </div>
              </div>

              {/* Charge Type */}
              <div className="row input-box">
                <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                  <label className="form-label w-100" style={{ color: "#999696" }}>
                    Charge Type
                    <Field
                      as="select"
                      name="chargeType"
                      className="form-control mt-3"
                      style={{ height: "4.5em" }}
                    >
                      <option value="">Select Charge Type</option>
                      <option value="FIXED">Fixed</option>
                      <option value="PERCENTAGE">Percentage</option>
                    </Field>
                    <ErrorMessage name="chargeType" component="div" className="error text-danger ps-2" />
                  </label>
                </div>
              </div>

              {/* Save and Cancel Buttons */}
              <div className="d-flex">
                <button type="submit" className="btn rounded-2 m-3 p-2 fw-bold" style={{ background: "#d65246", color: "white" }}>
                  Save
                </button>
                <button type="button" className="btn rounded-2 m-3 p-2 fw-bold" style={{ background: "#FFF", color: "#000" }} onClick={() => navigate('/extra-charge')}>
                  Cancel
                </button>
              </div>
            </Form>
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddExtraCharges;
