import React from 'react'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const AddParcelType = () => {
  const formik = useFormik({
    initialValues: {
   document: '',
     
    },
    validationSchema: Yup.object({
      country: Yup.string()
        .required('Country is required'),
    
    }),
    onSubmit: values => {
      // Handle form submission
      // console.log(values);
    },
  });

  return (
  
          <div className="edit-user  W-100%">
        <form onSubmit={formik.handleSubmit}>
        <div className="row input-box .d-xxl-flex .flex-xxl-row .d-xl-flex .d-lg-flex .d-md-flex .d-sm-flex .d-flex .flex-column">
        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 w-xxl-50 col-md-6 col-sm-5 col-12">
        <label class="form-label w-100" style={{ color: "#999696" }}>lable
              <input
                type="text"
                name="fixedCharges"
                class="form-control mt-3 w-25% h-100%"
                placeholder="Document"
                value={formik.values.fixedCharges}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "4.5em" }}
              />
              {formik.touched.fixedCharges && formik.errors.fixedCharges ? (
                <div className="error text-danger ps-2">{formik.errors.fixedCharges}</div>
              ) : null}
              </label>
            </div>
        
            <div class="d-flex">
            <div>
              <button
                type="button"
                class="btn rounded-2 m-3 p-2 fw-bold"
                style={{
                  width: "150px",
                  background: "#d65246",
                  color: "white",
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button
                type="button"
                class="btn rounded-2 m-3 p-2 fw-bold"
                style={{
                  width: "150px",
                  background: "#FFF",
                  color: "#000",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          </div>
        </form>
      </div>
 
  );
}

export default AddParcelType;
