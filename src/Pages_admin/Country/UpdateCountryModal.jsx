// UpdateCountryModal.js

import React, { useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import countryList from 'react-select-country-list';
import { updateCountry } from "../../Components_admin/Api/Country"; // Assume you have an update API function

const UpdateCountryModal = ({ country, onHide }) => {

    const options = useMemo(() => countryList().getData(), []);

    const initialValues = {
        countryName: country.countryName || "",
        distanceType: country.distanceType || "",
        weightType: country.weightType || "",
    };

    const validationSchema = Yup.object({
        countryName: Yup.string().required("Country name is required"),
        distanceType: Yup.string().required("Distance type is required"),
        weightType: Yup.string().required("Weight type is required"),
    });

    const onSubmit = async (values) => {
        const res = await updateCountry(country.countryId, values);
        if (res.status) {
            onHide();
        }
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Country</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <Form className="update-country-form">
                            <div>
                                <label>Country Name</label>
                                <select
                                    name="countryName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.countryName}
                                    className="form-select"
                                    style={{ height: "3.5em" }}
                                >
                                    <option value="" label="Select country" />
                                    {options.map((option) => (
                                        <option key={option.label} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage name="countryName" component="div" className="error text-danger" />
                            </div>

                            <div>
                                <label>Distance Type</label>
                                <select
                                    name="distanceType"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.distanceType}
                                    className="form-select"
                                    style={{ height: "3.5em" }}
                                >
                                    <option value="" label="Select distance type" />
                                    <option value="MILES" label="Miles" />
                                    <option value="KM" label="Km" />
                                </select>
                                <ErrorMessage name="distanceType" component="div" className="error text-danger" />
                            </div>

                            <div>
                                <label>Weight Type</label>
                                <select
                                    name="weightType"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.weightType}
                                    className="form-select"
                                    style={{ height: "3.5em" }}
                                >
                                    <option value="" label="Select weight type" />
                                    <option value="KG" label="Kg" />
                                    <option value="POUND" label="Pound" />
                                </select>
                                <ErrorMessage name="weightType" component="div" className="error text-danger" />
                            </div>
                            <div class="d-flex justify-content-center">
                                <div>
                                    <button type="submit" class="btn rounded-2 m-3 p-2 fw-bold"
                                        style={{
                                            width: "150px",
                                            background: "#d65246",
                                            color: "white",
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                                <div>
                                    <button type="button" class="btn rounded-2 m-3 p-2 fw-bold"
                                        style={{
                                            width: "150px",
                                            background: "gray",
                                            color: "white",
                                        }}
                                        onClick={onHide}
                                    >
                                        Cancel
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

export default UpdateCountryModal;
