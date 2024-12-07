import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllCountry } from "../../Components_admin/Api/Country";
import { getAllCity } from "../../Components_admin/Api/City";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { updateExtraCharge } from "../../Components_admin/Api/ExtraCharge";

const UpdateExtraChargeModal = ({ handleClose, chargeData, onUpdate }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

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
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    title: Yup.string().required("Title is required"),
    charge: Yup.number().required("Charge is required"),
    chargeType: Yup.string().required("Charge type is required"),
  });

  const onSubmit = async (values) => { 
    const res = await updateExtraCharge(chargeData.extraChargeId, values); // Updating vehicle by ID
    if (res.status) {
      onUpdate();
      handleClose(); // Close modal
    }
  };

  const getCountryIdFromName = (countryName) => {
    const country = countries.find(c => c.countryName === countryName);
    return country ? country.countryId : "";
  };

  const getCityIdFromName = (cityName) => {
    const city = cities.find(c => c.cityName === cityName);
    return city ? city.cityId : "";
  };

  return (
    <Modal show={true} onHide={handleClose} style={{width : '100%'}} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Update Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            country: getCountryIdFromName(chargeData?.country) || "",
            title: chargeData?.title || "",
            charge: chargeData.charge || "",
            chargeType: chargeData.chargeType || "",
            city: getCityIdFromName(chargeData?.city) || ""
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleChange }) => {
            return (
              <Form>
                {/* Country Dropdown */}
                <div className="row input-box">
                  <div className="input-error col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
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
                  <div className="input-error col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
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
                  <div className="input-error col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
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

                  <div className="input-error col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
                    <label className="form-label w-100" style={{ color: "#999696" }}>
                      Charge
                      <Field
                        type="number"
                        name="charge"
                        className="form-control mt-3"
                        style={{ height: "4.5em" }}
                      />
                      <ErrorMessage name="charge" component="div" className="error text-danger ps-2" />
                    </label>
                  </div>
                </div>

                {/* Charge Type */}
                <div className="row input-box">
                  <div className="input-error col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
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
                    Update
                  </button>
                  <button type="button" className="btn rounded-2 m-3 p-2 fw-bold" style={{ background: "#FFF", color: "#000" }} onClick={handleClose}>
                    Cancel
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

export default UpdateExtraChargeModal;
