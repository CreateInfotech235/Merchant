import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import select from "../../assets_mercchant/select.png";
import { updateVehicle } from "../../Components_merchant/Api/Vehicle";
import { getAllCity } from "../../Components_merchant/Api/City";

const UpdateVehicleModal = ({ handleClose, vehicleData, onUpdate }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(vehicleData?.image || "");
  const [city, setCity] = useState([]);

  const initialValues = {
    capacity: vehicleData?.vehicleCapacity || "",
    name: vehicleData?.vehicleName || "",
    size: vehicleData?.vehicleSize || "",
    description: vehicleData?.description || "",
    cityWise: vehicleData?.cityWise || "",
    city: vehicleData?.city || "",
    image: vehicleData?.vehicleImage || ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vehicle name is required"),
    capacity: Yup.number().required("Vehicle capacity is required"),
    size: Yup.number().required("Vehicle size is required"),
    description: Yup.string().required("Description is required"),
    cityWise: Yup.string().required("Type is required"),
    city: Yup.string().required("City is required"),
    image: Yup.string().required("Image is required")
  });

  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values) => { 
    const res = await updateVehicle(vehicleData.vehicleId,{ ...values, city: [values.city] }); // Updating vehicle by ID
    if (res.status) {
      onUpdate();
      handleClose(); // Close modal
    }
  };

  const fetchCities = async () => {
    const response = await getAllCity(1, 10);
    if (response.status) {
      setCity(response.data.data);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <Modal show={true} onHide={handleClose} style={{width : '100%'}} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Update Vehicle</Modal.Title>
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
              <div className="input-error col-xxl-5 col-xl-5 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Vehicle Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  style={{ height: "4.5em" }}
                  placeholder="Vehicle Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>

              <div className="input-error col-xxl-5 col-xl-5 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Vehicle Capacity
                </label>
                <Field
                  type="text"
                  name="capacity"
                  className="form-control"
                  style={{ height: "4.5em" }}
                  placeholder="Vehicle Capacity"
                />
                <ErrorMessage
                  name="capacity"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>
            </div>

            <div className="row input-box">
              <div className="input-error col-xxl-5 col-xl-5 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Vehicle Size
                </label>
                <Field
                  type="text"
                  name="size"
                  className="form-control"
                  style={{ height: "4.5em" }}
                  placeholder="Vehicle Size"
                />
                <ErrorMessage
                  name="size"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>

              <div className="input-error col-xxl-5 col-xl-5 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  className="form-control"
                  style={{ height: "4.5em" }}
                  placeholder="Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>
            </div>

            <div className="row input-box">


              <div className="input-error col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  City
                </label>
                <select
                  className="form-select w-25% h-100%"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  style={{ height: "4.5em" }}
                >
                  <option value="" label="Select city" />
                  {city.map((option) => (
                    <option value={option.cityId}>
                      {option.cityName}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="countryID" component="div" className="error text-danger ps-2" />
              </div>
              <div className="input-error col-xxl-5 col-xl-5 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label className="w-100" style={{ color: "#999696" }}>
                  City Wise
                </label>
                <Field as="select" name="cityWise" className="form-control w-25% h-100%" style={{ height: "4.5em" }}>
                  <option value="" label="Select City Wise" />
                  <option value="ALL">All</option>
                  <option value="CITY_WISE">City Wise</option>
                </Field>
                <ErrorMessage name="cityWise" component="div" className="error text-danger ps-2" />
              </div>
            </div>
            <div className="row input-box">

              <div className="input-error col-xxl-5 col-xl-5 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                <label
                  htmlFor="image"
                  className="form-label w-100"
                  style={{ color: "#999696" }}
                >
                  Vehicle Images
                </label>
                <div
                  className="img d-flex flex-column-reverse bg-white p-2 justify-content-center align-items-center rounded-3"
                  style={{ width: "40%" }}
                >
                  <div className="label">
                    <label htmlFor="image" className="form-labels">
                      Select File
                    </label>
                  </div>
                  <div className="image">
                    {/* Display the image preview or the placeholder */}
                    <img
                      src={imagePreviewUrl || select} // Local state for previewing the image
                      className="car12 p-3"
                      alt="Select"
                      width={150}
                      height={150}
                    />
                    <input
                      className="form-control"
                      type="file"
                      id="image"
                      accept="image/*" // Only allow image files
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        if (file) {
                          // Set the image preview in local state
                          const previewUrl = URL.createObjectURL(file);
                          setImagePreviewUrl(previewUrl); // Update the image preview URL in local state

                          // Convert file to base64 and store in Formik values
                          fileToBase64(file, (base64String) => {
                            formik.setFieldValue("image", base64String); // Store base64 string in Formik's values
                          });
                        }
                      }}
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-danger ps-2"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn rounded-2 m-3 p-2 fw-bold"
                style={{ width: "150px", background: "#d65246", color: "white" }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn rounded-2 m-3 p-2 fw-bold"
                style={{ width: "150px", background: "#FFF", color: "#000" }}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateVehicleModal;
