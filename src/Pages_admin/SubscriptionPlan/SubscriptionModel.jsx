import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import * as Yup from "yup";
import { manageSubscription } from "../../Components_admin/Api/Subscription";

const SubscriptionModel = ({ onHide, types, subscription }) => {
  // console.log(subscription);

  const initialValues = {
    ...(types === "Add"
      ? {}
      : { subscriptionId: subscription ? subscription._id : "" }),
    type: subscription ? subscription.type : "",
    amount: subscription ? subscription.amount : "",
    discount: subscription ? subscription.discount : "",
    features: subscription ? subscription.features : [""],
    ...(types === "Add"
      ? { days: subscription ? subscription.seconds : "" }
      : {}),
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Subscription type is required"),
    amount: Yup.string()
      .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
      .required("Amount is required"),
    discount: Yup.number()
      .typeError("Discount must be a number")
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%"),
    features: Yup.array()
      .of(Yup.string().required("Feature cannot be empty"))
      .required("At least one feature is required"),
    ...(types === "Add" && {
      days: Yup.number()
        .typeError("Days must be a number")
        .min(1, "Days must be at least 1")
        .required("Days are required"),
    }),
  });
  

  const onSubmit = async (values) => {
    // console.log("Form Data:", values);
    const response = await manageSubscription(values);

    if (response) {
      onHide();  // Close the modal after successful submission
    }
  };

  return (
    <Modal show={true} onHide={() => { 
      onHide(); 
      formik.resetForm();  // Reset form when modal is closed
    }}>
      <ModalHeader closeButton>
        <h5>Subscription Details</h5>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <div className="row input-box">
                <div className="input-error col-12">
                  <label style={{ color: "#999696" }}>Subscription Type</label>
                  <Field
                    type="text"
                    name="type"
                    className="form-control"
                    placeholder="Subscription Type"
                  />
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="input-error col-6">
                  <label style={{ color: "#999696" }}>Amount</label>
                  <Field
                    type="text"
                    name="amount"
                    className="form-control"
                    inputMode="numeric"
                    placeholder="Amount"
                    pattern="^\d+(\.\d{1,2})?$"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="input-error col-6">
                  <label style={{ color: "#999696" }}>Discount (%)</label>
                  <Field
                    type="text"
                    name="discount"
                    className="form-control"
                    placeholder="Discount"
                  />
                  <ErrorMessage
                    name="discount"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {types === "Add" ? <div className="input-error col-12">
                  <label style={{ color: "#999696" }}>
                   Days
                  </label>
                  <Field
                    type="text"
                    name="days"
                    className="form-control"
                    placeholder="days"
                  />
                  <ErrorMessage
                    name="days"
                    component="div"
                    className="text-danger"
                  />
                </div> : null}

                <div className="input-error col-12">
                  <div className="row my-2">
                    <label className="col-6" style={{ color: "#999696" }}>
                      Features
                    </label>
                    <div className="col-6 text-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          formik.setFieldValue("features", [
                            ...formik.values.features,
                            "",
                          ])
                        }
                      >
                        Add Feature
                      </button>
                    </div>
                  </div>
                  <FieldArray
                    name="features"
                    render={(arrayHelpers) => (
                      <>
                        {formik.values.features.map((feature, index) => (
                          <div key={index} className="input-group mb-2">
                            <Field
                              name={`features.${index}`}
                              type="text"
                              className="form-control"
                              placeholder="Enter feature"
                            />
                            <button
                              type="button"
                              className="btn btn-danger ms-2"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remove
                            </button>
                            <ErrorMessage
                              name={`features.${index}`}
                              component="div"
                              className="text-danger ps-2"
                            />
                          </div>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary m-3"
                  style={{ width: "150px" }}
                >
                  {types === "Add" ? "Add" : "Update"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary m-3"
                  onClick={() => { 
                    onHide(); 
                    formik.resetForm();  // Reset form on cancel
                  }}
                  style={{ width: "150px" }}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default SubscriptionModel;
