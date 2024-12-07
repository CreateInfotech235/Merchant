import React from 'react'
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { createParcelType } from '../../Components_admin/Api/ParcelType';

const AddParcelType = () => {

  const navigate = useNavigate()
  const validationSchema = Yup.object({
    label: Yup.string().required("Label is required"),
});

const onSubmit = async (values) => {
  const res = await createParcelType(values);
  if (res.status) {
    navigate('/parcel-type')
  }
};

  return (

    <div className="edit-user fluid-container W-100%">
      <Formik
        initialValues={{
          label: ""
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
                <div className="input-error  col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
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
                  Save
                </button>
                <button
                  type="button"
                  className="btn rounded-2 m-3 p-2 fw-bold"
                  style={{ width: "150px", background: "#FFF", color: "#000", border: '1px solid black' }}
                  onClick={() => navigate('/parcel-type')}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>

  );
}

export default AddParcelType;
