import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getAllCity } from "../../Components_admin/Api/City";
import { getAllCountry } from "../../Components_admin/Api/Country";
import { addUser } from '../../Components_admin/Api/User'

const AddUser = () => {
    const [cities, setCities] = useState([]);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        contactNumber: "",
        countryCode: "",
        createdByAdmin: true, // Default value
        address: {
            street: "",
            city: "",
            postalCode: "",
            country: ""
        }
    };

    useEffect(() => {
        const fetchCountriesAndCities = async () => {
            const countriesResponse = await getAllCountry(1, 10);
            const citiesResponse = await getAllCity(1, 10);

            if (citiesResponse.status) setCities(citiesResponse.data.data);
        };
        fetchCountriesAndCities();
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string()
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number"
            )
            .required("Password is required"),
        contactNumber: Yup.string().required("Contact is required"),
        countryCode: Yup.string().required("Country code is required"),
        address: Yup.object().shape({
            street: Yup.string().required("Street address is required"),
            city: Yup.string().required("City is required"),
            postalCode: Yup.string()
                .matches(/^\d{6}$/, "Postal code must be exactly 6 digits")
                .required("Postal code is required"),
            country: Yup.string().required("Country is required"),
        }),
    });
    

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const res = await addUser(values);
        if (res.status) {
            navigate('/merchant');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => (
                <Form className="user-form">
                    {/* Name Field */}
                    <div className="row input-box">
                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">

                            <Field
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="name" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Email Field */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="email" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Password Field */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="password" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Contact Number and Country Code */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="contactNumber"
                                className="form-control"
                                placeholder="Contact Number"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="contactNumber" component="div" className="error text-danger ps-2" />
                        </div>


                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="countryCode"
                                className="form-control"
                                placeholder="Country Code"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="countryCode" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Address Fields */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="address.street"
                                className="form-control"
                                placeholder="Street Address"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="address.street" component="div" className="error text-danger ps-2" />
                        </div>


                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field as="select" name="address.city" className="form-select" style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}>
                                <option value="" label="Select City" />
                                {cities.map((city) => (
                                    <option key={city.cityId} value={city.cityName}>
                                        {city.cityName}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="address.city" component="div" className="error text-danger ps-2" />
                        </div>


                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="address.postalCode"
                                className="form-control"
                                placeholder="Postal Code"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="address.postalCode" component="div" className="error text-danger ps-2" />
                        </div>


                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="address.country"
                                className="form-control"
                                placeholder="Country"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="address.country" component="div" className="error text-danger ps-2" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#d65246", color: "white" }}>
                            Save
                        </button>
                        <button type="button" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#FFF", color: "#000" }} onClick={() => navigate('/merchant')}>
                            Cancel
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddUser;
