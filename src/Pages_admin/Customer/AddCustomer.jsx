// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import phone from "../../assets_admin/phone.png";
// import { useNavigate } from "react-router-dom";
// import { getAllCity } from "../../Components_admin/Api/City";
// import { getAllCountry } from "../../Components_admin/Api/Country";
// import { addCustomer } from "../../Components_admin/Api/Customer";

// const AddUser = () => {
//     const [countries, setCountries] = useState([]);
//     const [cities, setCities] = useState([]);

//     const initialValues = {
//         name: "",
//         country: "",
//         city: "",
//         address: "",
//         postCode: "",
//         mobileNumber: "",
//         email: ""
//     };

//     useEffect(() => {
//         const fetchCountriesAndCities = async () => {
//             const countriesResponse = await getAllCountry(1, 10);
//             const citiesResponse = await getAllCity(1, 10);

//             if (countriesResponse.status) setCountries(countriesResponse.data.data);
//             if (citiesResponse.status) setCities(citiesResponse.data.data);
//         };
//         fetchCountriesAndCities();
//     }, []);

//     const validationSchema = Yup.object().shape({
//         name: Yup.string().required("Name is required"),
//         mobileNumber: Yup.string().required("Contact is required"),
//         email: Yup.string().email("Invalid email format").required("Email is required"),
//         country: Yup.string().required("Country is required"),
//         city: Yup.string().required("City is required"),
//         address: Yup.string().required("Address is required"),
//         postCode: Yup.string().matches(/^\d{5}(-\d{4})?$/, "Invalid postal code"),
//     });

//     const navigate = useNavigate();

//     const onSubmit = async (values) => {
//         console.log(values);
//         const res = await addCustomer(values);
//         if (res.status) {
//           navigate('/all-customer-admin')
//         }
//       };

//     return (
//         <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}
//         >
//             {(formik) => (
//                 <Form className="user-form">
//                     {/* Form fields for Name, Contact, Email */}
//                     <div className="row input-box">
//                         {/* Name Field */}
//                         <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
//                             <Field
//                                 type="text"
//                                 name="name"
//                                 className="form-control"
//                                 placeholder="Name"
//                                 style={{
//                                     height: "4.5em",
//                                     border: "1px solid #E6E6E6",
//                                     borderRadius: "5px",
//                                 }}
//                             />
//                             <ErrorMessage
//                                 name="name"
//                                 component="div"
//                                 className="error text-danger ps-2"
//                             />
//                         </div>

//                         {/* Contact Field */}
//                         <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
//                             <div className="location">
//                                 <Field
//                                     type="text"
//                                     name="mobileNumber"
//                                     className="form-control"
//                                     placeholder="Contact Number"
//                                     style={{
//                                         height: "4.5em",
//                                         border: "1px solid #E6E6E6",
//                                         borderRadius: "5px",
//                                     }}
//                                 />
//                                 <div className="imgs">
//                                     <img src={phone} className="location-img" alt="Phone" />
//                                 </div>
//                             </div>
//                             <ErrorMessage
//                                 name="mobileNumber"
//                                 component="div"
//                                 className="error text-danger ps-2"
//                             />
//                         </div>
//                     </div>

//                     {/* Additional Fields with Icon Styling */}
//                     <div className="row input-box">
//                         {/* Email Field */}
//                         <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
//                             <div className="location">
//                                 <Field
//                                     type="email"
//                                     name="email"
//                                     className="form-control"
//                                     placeholder="Email"
//                                     style={{
//                                     height: "4.5em",
//                                     border: "1px solid #E6E6E6",
//                                     borderRadius: "5px",
//                                 }}
//                                 />
//                             </div>
//                             <ErrorMessage name="email" component="div" className="error text-danger ps-2" />
//                         </div>
// <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
//                             <Field
//                                 type="text"
//                                 name="postCode"
//                                 className="form-control"
//                                 placeholder="Post Code"
//                                 style={{
//                                     height: "4.5em",
//                                     border: "1px solid #E6E6E6",
//                                     borderRadius: "5px",
//                                 }}
//                             />
//                             <ErrorMessage name="postCode" component="div" className="error text-danger ps-2" />
//                         </div>
//                         {/* Address Field */}
//                         <div className="input-error col-10 mb-3">
//                             <div className="location">
//                                 <Field
//                                     type="text"
//                                     name="address"
//                                     className="form-control"
//                                     placeholder="Address"
//                                     style={{
//                                     height: "4.5em",
//                                     border: "1px solid #E6E6E6",
//                                     borderRadius: "5px",
//                                 }}
//                                 />
//                             </div>
//                             <ErrorMessage name="address" component="div" className="error text-danger ps-2" />
//                         </div>
//                     </div>

//                     <div className="row input-box">
//                         {/* Post Code Field */}
                        
// </div>

//                     {/* Country and City Dropdown */}
//                     <div className="row input-box">
//                         <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
//                             <Field as="select" name="country" className="form-select" style={{
//                                     height: "4.5em",
//                                     border: "1px solid #E6E6E6",
//                                     borderRadius: "5px",
//                                 }}>
//                                 <option value="" label="Select Country" />
//                                 {countries.map((country) => (
//                                     <option key={country.countryId} value={country.countryId}>
//                                         {country.countryName}
//                                     </option>
//                                 ))}
//                             </Field>
//                             <ErrorMessage name="country" component="div" className="error text-danger ps-2" />
//                         </div>

//                         <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
//                             <Field as="select" name="city" className="form-select" style={{
//                                     height: "4.5em",
//                                     border: "1px solid #E6E6E6",
//                                     borderRadius: "5px",
//                                 }}>
//                                 <option value="" label="Select City" />
//                                 {cities.map((city) => (
//                                     <option key={city.cityId} value={city.cityId}>
//                                         {city.cityName}
//                                     </option>
//                                 ))}
//                             </Field>
//                             <ErrorMessage name="city" component="div" className="error text-danger ps-2" />
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="d-flex justify-content-end">
//                         <button type="submit" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#d65246", color: "white" }}>
//                             Save
//                         </button>
//                         <button type="button" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#FFF", color: "#000" }} onClick={() => navigate('/all-customer-admin')}>
//                             Cancel
//                         </button>
//                     </div>
//                 </Form>
//             )}
//         </Formik>
//     );
// };

// export default AddUser;
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import phone from "../../assets_mercchant/phone.png";
import { useNavigate } from "react-router-dom";
import { getAllCity } from "../../Components_admin/Api/City";
import { getAllCountry } from "../../Components_admin/Api/Country";
import { addCustomer } from "../../Components_admin/Api/Customer";;

const AddUser = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const initialValues = {
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    postCode: "",
    mobileNumber: "",
    email: "",
  };

  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      const countriesResponse = await getAllCountry(1, 10);
      const citiesResponse = await getAllCity(1, 10);

      if (countriesResponse.status) setCountries(countriesResponse.data);
      if (citiesResponse.status) setCities(citiesResponse.data);
    };
    fetchCountriesAndCities();
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("first name is required"),
    lastName: Yup.string().required("last is required"),
    mobileNumber: Yup.string().required("Contact is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("PostCode is required"),
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const res = await addCustomer(values);
    if (res.status) {
      navigate("/all-customer-admin");
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
          {/* Form fields for Name, Contact, Email */}
          <div className="row input-box">
            {/* Name Field */}
            <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
              <Field
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                style={{
                  height: "4.5em",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error text-danger ps-2"
              />
            </div>
            <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
              <Field
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                style={{
                  height: "4.5em",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error text-danger ps-2"
              />
            </div>

            {/* Contact Field */}
            <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
              <div className="location">
                <Field
                  type="text"
                  name="mobileNumber"
                  className="form-control"
                  placeholder="Contact Number"
                  style={{
                    height: "4.5em",
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
                <div className="imgs">
                  <img src={phone} className="location-img" alt="Phone" />
                </div>
              </div>
              <ErrorMessage
                name="mobileNumber"
                component="div"
                className="error text-danger ps-2"
              />
            </div>

            <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
              <div className="location">
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  style={{
                    height: "4.5em",
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="error text-danger ps-2"
              />

            </div>
<div className="input-error col-10 mb-3">
              <div className="location">
                <Field
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  style={{
                    height: "4.5em",
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <ErrorMessage
                name="address"
                component="div"
                className="error text-danger ps-2"
              />
            </div>
             
            <div className="input-error col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
              <div className="location">
                <Field
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="City name"
                  style={{
                    height: "4.5em",
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <ErrorMessage
                name="city"
                component="div"
                className="error text-danger ps-2"
              />
            </div>
            <div className="input-error col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
              <Field
                type="text"
                name="postCode"
                className="form-control"
                placeholder="Post Code"
                style={{
                  height: "4.5em",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              />
              <ErrorMessage
                name="postCode"
                component="div"
                className="error text-danger ps-2"
              />
            </div>
            <div className="input-error col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
              <div className="location">
                <Field
                  type="text"
                  name="country"
                  className="form-control"
                  placeholder="Country name"
                  style={{
                    height: "4.5em",
                    border: "1px solid #E6E6E6",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <ErrorMessage
                name="country"
                component="div"
                className="error text-danger ps-2"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn rounded-2 m-3 p-2 fw-bold"
              style={{ width: "150px", background: "#d65246", color: "white" }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn rounded-2 m-3 p-2 fw-bold"
              style={{ width: "150px", background: "#FFF", color: "#000" }}
              onClick={() => navigate("/all-customer")}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddUser;
