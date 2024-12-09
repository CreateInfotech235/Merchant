import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../Components_merchant/Api/Auth";

const Login = () => {
    const navigate = useNavigate();

    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Password must contain at least 8 characters, one uppercase, one lowercase, and one number"
            )
            .required("Password is required"),
        // personType: Yup.string().required("Person type is required")
    });

    // Initial form values
    const initialValues = {
        email: "demo@gmail.com",
        password: "demoDEMO@1121",
        personType: "CUSTOMER",
    };

    // Submit handler
    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);

        const response = await login(values);

        if (response.status) {
            localStorage.setItem('merchnatId',response.data.userData._id)
            localStorage.setItem("accessToken", response.data.userAuthData.accessToken);
            localStorage.setItem('userData', JSON.stringify(response.data.userData))
            navigate("/");
        } else {
            // Handle API error
            setErrors({ apiError: response.message });
        }

        setSubmitting(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5 shadow-lg login-card">
                <h2 className="text-center mb-4">Login</h2>

                {/* Formik form */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            {/* Email Field */}
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="label-large-bold">
                                    Email <span className="text-danger">*</span>
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>

                            {/* Password Field with Toggle */}
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="label-large-bold">
                                    Password <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>

                            {/* Person Type Field */}
                            {/* <div className="form-group mb-3">
                                <label htmlFor="personType" className="label-large-bold">
                                    Person Type <span className="text-danger">*</span>
                                </label>
                                <Field
                                    as="select"
                                    name="personType"
                                    className="form-select"
                                >
                                    <option value="" label="Select person type" />
                                    <option value="CUSTOMER" label="Customer" />
                                    <option value="DELIVERY_BOY" label="Delivery Boy" />
                                    <option value="ADMIN" label="Admin" />
                                </Field>
                                <ErrorMessage name="personType" component="div" className="text-danger" />
                            </div> */}

                            {/* API Error Message */}
                            {errors.apiError && <div className="text-danger mb-3">{errors.apiError}</div>}

                            {/* Submit Button */}
                            <div className="d-grid mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>
                            </div>

                            {/* Signup Link */}
                            <div className="text-center">
                                <p>
                                    Don't have an account?{" "}
                                    <Link to="/sign-up" className="text-primary">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
