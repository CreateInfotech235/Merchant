import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets_admin/logo.png'

const CurrencySetting = () => {
  const formik = useFormik({
    initialValues: {
        currencyPosition: '',
        currencySymbol: '',
     
    },
    validationSchema: Yup.object({
      country: Yup.string().required('Country name is required'),
      distanceType: Yup.string().required('currency symbol is required'),

    }),
    onSubmit: values => {
      // Handle form submission
      console.log('Form data:', values);
    }
  });

  return (
    <div className="add-country">
<div className="save-btn d-flex justify-content-end">
<button type="button" class="btn rounded-2 m-3 p-2 fw-bold"
          style={{
            width: "150px",
            background: "#d65246",
            color: "white",
          
          }}
        >save</button></div>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group row ">
          <div className="input-error col-xxl-5 col-xl-5 col-lg-5 col-md-5  col-sm-12 col-12">
            <label className="form-label ps-0">currency position</label>
            <select
              className="form-select"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value=""  />
              <option value="right" label="Afghanistan" />
              <option value="One" label="One" />
              <option value="Two" label="Two" />
              <option value="Three" label="Three" />
            </select>
            {formik.touched.country && formik.errors.country ? (
              <div className="error">{formik.errors.country}</div>
            ) : null}
          </div>

          

          <div className="input-error col-xxl-5 col-xl-5 col-lg-5 col-md-5  col-sm-12 col-12">
            <label className="form-label ps-0">currency symbol</label>
            <select
              className="form-select"
              name="weightType"
              value={formik.values.weightType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value=""  />
              <option value="Kg" label="Kg" />
              <option value="One" label="One" />
              <option value="Two" label="Two" />
              <option value="Three" label="Three" />
            </select>
            {formik.touched.weightType && formik.errors.weightType ? (
              <div className="error">{formik.errors.weightType}</div>
            ) : null}
          </div>
        </div>


      
      </form>
    </div>
  );
}

export default CurrencySetting;
