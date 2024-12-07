import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateCity } from "../../Components_admin/Api/City";
import { getAllCountry } from "../../Components_admin/Api/Country";

const UpdateCityModal = ({ onHide, city }) => {

    const [countries, setCountries] = useState([])
    const initialValues = {
        cityName: city.cityName || "",
        countryID: city.countryID || "",
        cancelCharge: city.cancelCharge || "",
        minimumDistance: city.minimumDistance || "",
        minimumWeight: city.minimumWeight || "",
        perDistanceCharge: city.perDistanceCharge || "",
        perWeightCharge: city.perWeightCharge || "",
        commissionType: city.commissionType || "",
        adminCommission: city.adminCommission || "",
        pickupRequest: city.pickupRequest || "",
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
        const res = await updateCity(city.cityId, values);
        if (res.status) {
            onHide();
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
        
        <Modal show={true} onHide={onHide} style={{width : '100%'}} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Update City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <Form>
                            <div className="row input-box">
                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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

                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
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
                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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

                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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
                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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

                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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
                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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

                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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
                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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

                                <div className="input-error col-xxl-6 col-xl-6 col-lg-6 w-xxl-50 col-md-6 col-sm-5 col-12">
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
                                        Update City
                                    </button>
                                    <button to="/cities" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#ccc", color: "#000" }} onClick={onHide}>
                                        Cancle
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateCityModal;
