import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import select from "../../assets_mercchant/select.png";
import { freeSubscription } from "../../Components_merchant/Api/Subscription";
import { useNavigate } from "react-router-dom";
import { getMerchantProfile } from "../../Components_merchant/Api/Profile";

const SubscriptionPlanModel = ({
  onHide,
  vehicleData,
  showmodel,
  onUpdate,
}) => {

  
  const [Error, setError] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    vehicleData?.medicalCertificate || ""
  );
  const navigate = useNavigate();
  const [marchantId, setMarchantId] = useState(null);
  useEffect(() => {
    var marchantId = localStorage.getItem("merchnatId");
    setMarchantId(marchantId);
  }, []);

  const initialValues = {
    medicalCertificateNumber: vehicleData?.vehicleName || "",
    medicalCertificate: vehicleData?.vehicleImage || "",
  };

  const validationSchema = Yup.object({
    medicalCertificateNumber: Yup.string().required("Vehicle name is required"),
    medicalCertificate: Yup.string().required("Image is required"),
  });

  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values) => {
    const Fvalues = { ...values, userId: marchantId };
    // console.log(Fvalues);

    const subscriptionResponse = await freeSubscription(Fvalues);
    
    if (subscriptionResponse.status) {
      const profileResponse = await getMerchantProfile();
      // console.log(profileResponse.data[0], "Profile");
      
      if (profileResponse.status) {
        localStorage.setItem('userData', JSON.stringify(profileResponse.data[0]));
      }
      navigate("/subscription-active");
      onHide();
    }
    // console.log(subscriptionResponse, "Data");
  };

  const handleClose = () => {
    if (showmodel) {
      setError("You are not able without subscription");
    } else {
      onHide();
    }
  };

  return (
    <Modal
      show={true}
      onHide={showmodel ? null : onHide}
      style={{ width: "100%" }}
      size="xl"
    >
      <Modal.Header>
        <Modal.Title>Free Subscription</Modal.Title>
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
                <div className="input-error col-12">
                  <label className="w-100" style={{ color: "#999696" }}>
                    Company Register Number
                  </label>
                  <Field
                    type="text"
                    name="medicalCertificateNumber"
                    className="form-control"
                    style={{ height: "4.5em" }}
                    placeholder="Company Register Number"
                  />
                  <ErrorMessage
                    name="medicalCertificateNumber"
                    component="div"
                    className="error text-danger ps-2"
                  />
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <div className="input-error col-xxl-5 col-xl-5 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
                    <div className="text-center">
                      <label
                        htmlFor="medicalCertificate"
                        className="form-label w-100"
                        style={{ color: "#999696" }}
                      >
                        Company Register Document
                      </label>
                      <div
                        className="img d-flex flex-column-reverse bg-white p-2 justify-content-center align-items-center rounded-3"
                        style={{ width: "100%" }}
                      >
                        <div className="label">
                          <label
                            htmlFor="medicalCertificate"
                            className="form-labels"
                          >
                            Select File
                          </label>
                        </div>
                        <div className="medicalCertificate">
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
                            id="medicalCertificate"
                            accept="image/*" // Only allow image files
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setImagePreviewUrl(previewUrl); // Update the image preview URL in local state

                                fileToBase64(file, (base64String) => {
                                  formik.setFieldValue(
                                    "medicalCertificate",
                                    base64String
                                  ); // Store base64 string in Formik's values
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="medicalCertificate"
                      component="div"
                      className="text-danger ps-2"
                    />
                  </div>
                </div>
              </div>

              <p className="text-center"> {Error}</p>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn rounded-2 m-3 p-2 fw-bold"
                  style={{
                    width: "150px",
                    background: "#d65246",
                    color: "white",
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn rounded-2 m-3 p-2 fw-bold"
                  style={{ width: "150px", background: "#FFF", color: "#000" }}
                  //   onClick={showmodel ? null : onHide}
                  onClick={() => handleClose()}
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

export default SubscriptionPlanModel;
