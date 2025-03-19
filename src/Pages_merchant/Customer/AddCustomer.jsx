import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import phone from "../../assets_mercchant/phone.png";
import { useNavigate } from "react-router-dom";
import { getAllCity } from "../../Components_merchant/Api/City";
import { getAllCountry } from "../../Components_merchant/Api/Country";
import { addCustomer, addCustomerExal } from "../../Components_merchant/Api/Customer";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";

const AddUser = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [failedCustomers, setFailedCustomers] = useState([]);
  // const[formetdata,setFormetdata]=useState([{firstName:"1",lastName:"",country:"",city:"",address:"",postCode:"",mobileNumber:"",email:"",NHS_Number:""}])


  const initialValues = {
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    postCode: "",
    mobileNumber: "",
    email: "",
    NHS_Number: ""
  };

  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      const countriesResponse = await getAllCountry(1, 10);
      const citiesResponse = await getAllCity(1, 10);

      if (countriesResponse.status) setCountries(countriesResponse.data);
      if (citiesResponse.status) setCities(citiesResponse.data);
    };
    fetchCountriesAndCities();

    // Get failed customer data from localStorage if exists
    const merchantId = localStorage.getItem("merchnatId");
    const failedData = localStorage.getItem(`failedCustomers-${merchantId}`);
    if (failedData) {
      setFailedCustomers(JSON.parse(failedData));
    }

  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("first name is required"),
    lastName: Yup.string().required("last is required"),
    mobileNumber: Yup.string(),
    email: Yup.string().optional(),
    // .email("Invalid email format"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("PostCode is required"),
    NHS_Number: Yup.string().optional()
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (values.email === '' || values.email === "-") {
      values.email = '-'
    }

    if (values.mobileNumber === '' || values.mobileNumber === "-") {
      values.mobileNumber = '-'
    }
    const res = await addCustomer(values);
    if (res.status) {
      navigate("/all-customer");
    }
  };



  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const downloadFailedData = () => {
    if (!failedCustomers || failedCustomers.length === 0) {
      toast.info("No failed customer data to download");
      return;
    }

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();

    // Map failed customers to only include relevant fields
    const cleanedData = failedCustomers.map(({ data, error }) => ({
      ...data,
      error
    }));

    const ws = XLSX.utils.json_to_sheet(cleanedData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Failed Customers");

    // Save workbook
    XLSX.writeFile(wb, "failed_customers.xlsx");
  };
  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();

    // Define the sheet data
    const sheetData = [
      {
        firstName: "",
        lastName: "",
        country: "",
        city: "",
        address: "",
        postCode: "",
        mobileNumber: "",
        email: "",
        NHS_Number: ""
      }
    ];

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(sheetData);

    // Ensure mobileNumber is set as text
    const mobileNumberCell = ws["H2"]; // H2 corresponds to the "mobileNumber" column (assuming it's the 8th column)
    if (mobileNumberCell) {
      mobileNumberCell.t = "s"; // Set the type to 's' for string
    }

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    // Write the workbook to a file
    XLSX.writeFile(wb, "template.xlsx");
  };


  const handleExcelUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    const merchantId = localStorage.getItem("merchnatId");
    const reader = new FileReader();
    setIsUploading(true);
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);

        const updatedData = jsonData.map(customer => ({
          ...customer,
          merchantId: merchantId,
          firstName: String(customer.firstName || '-'),
          lastName: String(customer.lastName || '-'),
          country: String(customer.country || '-'),
          city: String(customer.city || '-'),
          address: String(customer.address || '-'),
          postCode: String(customer.postCode || '-'),
          mobileNumber: String(customer.mobileNumber || '-'),
          email: String(customer.email || '-'),
          NHS_Number: String(customer.NHS_Number || '')
        }));
        console.log("updatedData", updatedData);
        // return;
        const res = await addCustomerExal(updatedData);
        if (res.status) {
          console.log("res.data", res.data);
          if (!res.data?.failed || res.data.failed.length === 0) {
            localStorage.removeItem(`failedCustomers-${merchantId}`);

            navigate("/all-customer");
          } else {
            console.log("res.data.failed", res.data.failed);
            setFailedCustomers(res.data.failed);
            localStorage.setItem(`failedCustomers-${merchantId}`, JSON.stringify(res.data.failed));
            toast.warning(`${res.data.failed.length} customers failed to upload. Click 'Download Failed Data' to get the details.`);
          }
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Error processing Excel file");
        console.error("Excel processing error:", error);
      } finally {
        setIsUploading(false);
        setSelectedFile(null);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="min-h-[calc(100vh-187px)]">
      <div className="d-flex justify-content-end mb-4">
        <div className="me-3">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="d-none"
            id="excelUpload"
            disabled={isUploading}
          />
          <label
            htmlFor="excelUpload"
            className="btn btn-success me-2"
            style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
          >
            Select Excel File
          </label>
          {selectedFile && (
            <button
              onClick={handleExcelUpload}
              className={`btn ${isUploading ? 'btn-secondary' : 'btn-primary'}`}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Data'}
            </button>
          )}
          {failedCustomers && failedCustomers.length > 0 && (
            <button
              onClick={downloadFailedData}
              className="btn btn-warning ms-2"
            >
              Download Failed Data
            </button>
          )}
          <button
            onClick={downloadTemplate}
            className="btn btn-primary ms-2"
          >
            Download Template
          </button>
        </div>
      </div>

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
              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                <label htmlFor="firstName" className="form-label mb-0">First Name</label>
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
              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 ">
                <label htmlFor="lastName" className="form-label mb-0">Last Name</label>
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
              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                <div>

                  <label htmlFor="mobileNumber" className="form-label mb-0">Contact Number</label>
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
                </div>
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>

              <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 ">
                <div className="location">
                  <label htmlFor="email" className="form-label mb-0">Email</label>
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
                  <label htmlFor="address" className="form-label mb-0">Address</label>
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

              <div className="input-error col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                <div className="location">
                  <label htmlFor="city" className="form-label mb-0">City</label>
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
              <div className="input-error col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-5 col-12 ">
                <div className="location">
                  <label htmlFor="postCode" className="form-label mb-0">Post Code</label>
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
                </div>
                <ErrorMessage
                  name="postCode"
                  component="div"
                  className="error text-danger ps-2"
                />
              </div>


              <div className="input-error col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12">
                <div className="location">
                  <label htmlFor="country" className="form-label mb-0">Country</label>
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
              <div className="input-error col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-5 col-12">
                <div className="location">
                  <label htmlFor="NHS_Number" className="form-label mb-0">NHS Number</label>
                  <Field
                    type="text"
                    name="NHS_Number"
                    className="form-control"
                    placeholder="NHS_Number"
                    style={{
                      height: "4.5em",
                      border: "1px solid #E6E6E6",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <ErrorMessage
                  name="NHS_Number"
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
    </div>
  );
};

export default AddUser;

{/* Example Excel Data Format:
[
  {
    "firstName": "John",
    "lastName": "Doe", 
    "country": "USA",
    "city": "New York",
    "address": "123 Main St",
    "postCode": "10001",
    "mobileNumber": "1234567890",
    "email": "john@example.com"
  }
] */}
