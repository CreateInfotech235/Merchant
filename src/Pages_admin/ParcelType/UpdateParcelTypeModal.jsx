import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { updateParcelType } from "../../Components_admin/Api/ParcelType";

const UpdateParcelTypeModal = ({ handleClose, parcelData, onUpdate }) => {
    // Validation schema
    const validationSchema = Yup.object({
        label: Yup.string().required("Label is required"),
    });

    const onSubmit = async (values) => {
        const res = await updateParcelType(parcelData.parcelTypeId, values);;
        if (res.status) {
            onUpdate();
            handleClose();
        }
    };

    return (
        <Modal show={true} onHide={handleClose} size="md">
            <Modal.Header closeButton>
                <Modal.Title>Update Parcel Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        label: parcelData?.label || ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form>
                            <div className="mb-3">
                                <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
                                    <div className="input-error  col-12">
                                        <label class="form-label w-100" style={{ color: "#999696" }}>lable
                                            <Field name="label" className="form-control" style={{ height: "4.5em" }} />
                                            <ErrorMessage name="label" component="div" className="text-danger" />
                                        </label>
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
                                        style={{ width: "150px", background: "#FFF", color: "#000", border: '1px solid black' }}
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

export default UpdateParcelTypeModal;
