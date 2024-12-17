import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import countryList from "react-select-country-list";
import "./CreateOrder.css";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../Components_merchant/Api/Order";
import { getDeliveryMan, getAllDeliveryMans } from "../../Components_merchant/Api/DeliveryMan";
import { getAllCustomers } from "../../Components_merchant/Api/Customer";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
const CreateOrder = () => { 
  const naviagte = useNavigate();

  const [deliveryMan, setDeliveryMen] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [lengthofdeliverymen, setLengthofdeliverymen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const merchant = JSON.parse(localStorage.getItem("userData"));
  // console.log("merchant", merchant);

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    const fetchData = async () => {
      const customerRes = await getAllCustomers();
      const deliveryMans = await getAllDeliveryMans();
      
      const deliveryManRes = await getDeliveryMan();
      if (deliveryManRes.data || deliveryMans.data) {
        // Filter active delivery men from first source
        const activeDeliveryMen = deliveryManRes.data?.filter(man => man.status !== "DISABLE") || [];
        const formattedAdminDeliveryMen = deliveryMans.data?.map(man => ({
          ...man,
          firstName: man.firstName || man.name?.split(' ')[0] || undefined,
          lastName: man.lastName || (man.name?.split(' ').slice(1).join(' ')) || undefined,
          _id: man._id,
          email: man.email,
          contactNumber: man.contactNumber,
          status: man.status || 'ENABLE'
        })) || [];
        // console.log("formattedAdminDeliveryMen", formattedAdminDeliveryMen);

        // Combine both arrays and remove duplicates by _id and email
        setLengthofdeliverymen(activeDeliveryMen.length)
        const mergedDeliveryMen = [...activeDeliveryMen, ...formattedAdminDeliveryMen]

          .reduce((acc, current) => {
            const isDuplicate = acc.find(item =>
              item._id === current._id ||
              item.email === current.email
            );
            if (!isDuplicate && current.status !== "DISABLE") {
              return acc.concat([current]);
            }
            return acc;
          }, []);

        // console.log("mergedDeliveryMen", mergedDeliveryMen);
        setDeliveryMen(mergedDeliveryMen);
      }
      if (customerRes?.status) setCustomer(customerRes?.data || []);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d.toFixed(2);
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  }

  const getCurrentLocation = async (setFieldValue) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "AIzaSyA_kcxyVAPdpAKnQtzpVdOVMOILjGrqWFQ";

          // Fetch the formatted address using reverse geocoding
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          // console.log(data);
          if (data.results && data.results.length > 0) {
            const formattedAddress =
              data.results[0].formatted_address || "Unable to fetch address";
            const postalCodeComponent = data.results[0].address_components.find(component =>
              component.types.includes('postal_code')
            );
            const postalCode = postalCodeComponent ? postalCodeComponent.long_name : "";

            setFieldValue("pickupDetails.address", formattedAddress);
            setFieldValue("pickupDetails.postCode", postalCode);

          }

          setFieldValue("pickupDetails.location.latitude", latitude);
          setFieldValue("pickupDetails.location.longitude", longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert(
            "Failed to get current location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const getCoordinatesFromAddress = async (address, setFieldValue) => {
    // console.log(address);

    if (address) {
      // Fetch the coordinates using geocoding
      const apiKey = "AIzaSyA_kcxyVAPdpAKnQtzpVdOVMOILjGrqWFQ";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );
      const data = await response.json();
      // console.log(data);

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location; // Correctly extract latitude and longitude
        const formattedAddress = data.results[0]?.formatted_address || "Unable to fetch address";

        // console.log(formattedAddress, lat, lng);
        const postalCodeComponent = data.results[0].address_components.find(component =>
          component.types.includes('postal_code')
        );
        const postalCode = postalCodeComponent ? postalCodeComponent.long_name : "";


        // Set the address and coordinates to the form
        setFieldValue("deliveryDetails.address", formattedAddress);
        setFieldValue("deliveryDetails.location.latitude", lat);
        setFieldValue("deliveryDetails.location.longitude", lng);
        setFieldValue("deliveryDetails.postCode", postalCode);
      } else {
        alert("Address not found. Please try again.");
      }
    } else {
      alert("Please enter an address.");
    }

  };

  const initialValues = {
    parcelsCount: 1,
    paymentCollectionRupees: "",
    dateTime: new Date(),
    deliveryManId: "",
    pickupDetails: {
      location: {
        latitude: null, // Initialize with null or undefined
        longitude: null, // Empty array or [longitude, latitude]
      },
      dateTime: "",
      merchantId: merchant._id || "",
      address: `${merchant?.address?.street} , ${merchant?.address?.city} , ${merchant?.address?.postalCode} , ${merchant?.address?.country}` || "",
      // countryCode: merchant.countryCode || "",
      mobileNumber: merchant.contactNumber || "",
      email: merchant.email || "",
      name: `${merchant.firstName} ${merchant.lastName}` || "",
      description: "",
      postCode: merchant?.address?.postalCode || "",
    },
    deliveryDetails: {
      location: {
        latitude: null, // Initialize with null or undefined
        longitude: null, // Empty array or [longitude, latitude]
      },
      address: "",
      // countryCode: "",
      mobileNumber: "",
      name: "",
      email: "",
      description: "",
      postCode: "",
    },
    cashOnDelivery: "false",
  };

  const validationSchema = Yup.object().shape({
    parcelsCount: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .min(1),
    dateTime: Yup.string().required("Required"),
    paymentCollectionRupees: Yup.string().test(
      "paymentCollectionRequired",
      "Payment collection is required when cash on delivery is Yes",
      function (value) {
        const { cashOnDelivery } = this.parent;
        if (cashOnDelivery === "true" && !value) {
          return false;
        }
        return true;
      }
    ),
    pickupDetails: Yup.object().shape({
      // location: Yup.object().shape({
      //   latitude: Yup.number()
      //     .required("Latitude is required"),
      //   longitude: Yup.number()
      //     .required("Longitude is required"),
      // }),

      dateTime: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      // countryCode: Yup.string().required("Required"),
      mobileNumber: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      description: Yup.string(),
      postCode: Yup.string().required("Required"),
      // merchantId: Yup.number().required("Required"),
    }),
    deliveryDetails: Yup.object().shape({
      // location: Yup.object().shape({
      //   latitude: Yup.number()
      //     .required("Latitude is required"),
      //   longitude: Yup.number()
      //     .required("Longitude is required"),
      // }),
      address: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      // countryCode: Yup.string().required("Required"),
      mobileNumber: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      description: Yup.string(),
      postCode: Yup.string().required("Required"),
    }),
  });

  const options = useMemo(() => countryList().getData(), []);

  const onSubmit = async (values, { setFieldValue }) => {
    const timestamp = new Date(values.dateTime).getTime();
    const pictimestamp = new Date(values.pickupDetails.dateTime).getTime();
    var deliverylocation = null

    var pickuplocation = values.pickupDetails.location.latitude === null ? null : {
      latitude: values.pickupDetails.location.latitude,
      longitude: values.pickupDetails.location.longitude
    }

    if (!values.pickupDetails.location.latitude && !values.pickupDetails.location.longitude) {
      // console.log('Helo');
      if (values.pickupDetails.address) {
        // Fetch the coordinates using geocoding
        const apiKey = "AIzaSyA_kcxyVAPdpAKnQtzpVdOVMOILjGrqWFQ";
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(values.pickupDetails.address)}&key=${apiKey}`
        );
        const data = await response.json();
        // console.log(setFieldValue);

        if (data.results && data.results.length > 0) {
          const { lat, lng } = await data.results[0].geometry.location; // Correctly extract latitude and longitude
          const formattedAddress = await data.results[0]?.formatted_address || "Unable to fetch address";

          // console.log(formattedAddress, lat, lng);
          const postalCodeComponent = data.results[0].address_components.find(component =>
            component.types.includes('postal_code')
          );
          const postalCode = await postalCodeComponent ? postalCodeComponent.long_name : "";

          pickuplocation = {
            latitude: lat,
            longitude: lng
          }

          // Set the address and coordinates to the form
          setFieldValue("pickupDetails.address", formattedAddress);
          setFieldValue("pickupDetails.location.latitude", lat);
          setFieldValue("pickupDetails.location.longitude", lng);
          setFieldValue("pickupDetails.postCode", postalCode);
        } else {
          alert("Address not found. Please try again.");
        }
      } else {
        alert("Please enter an address.");
      }

    }
    if (!values.deliveryDetails.location.latitude && !values.deliveryDetails.location.longitude) {
      // console.log('Helo');
      if (values.pickupDetails.address) {
        // Fetch the coordinates using geocoding
        const apiKey = "AIzaSyA_kcxyVAPdpAKnQtzpVdOVMOILjGrqWFQ";
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(values.deliveryDetails.address)}&key=${apiKey}`
        );
        const data = await response.json();
        // console.log(setFieldValue);

        if (data.results && data.results.length > 0) {
          const { lat, lng } = await data.results[0].geometry.location; // Correctly extract latitude and longitude
          const formattedAddress = await data.results[0]?.formatted_address || "Unable to fetch address";

          // console.log(formattedAddress, lat, lng);
          const postalCodeComponent = data.results[0].address_components.find(component =>
            component.types.includes('postal_code')
          );
          const postalCode = await postalCodeComponent ? postalCodeComponent.long_name : "";

          deliverylocation = {
            latitude: lat,
            longitude: lng
          }

          // Set the address and coordinates to the form
          setFieldValue("deliveryDetails.address", formattedAddress);
          setFieldValue("deliveryDetails.location.latitude", lat);
          setFieldValue("deliveryDetails.location.longitude", lng);
          // setFieldValue("deliveryDetails.postCode", postalCode);
        } else {
          alert("Address not found. Please try again.");
        }
      } else {
        alert("Please enter an address.");
      }

    }

    // console.log(values);

    // Create a copy of values and conditionally include paymentCollectionRupees
    const payload = {
      ...values,
      dateTime: timestamp,
      pickupDetails: {
        ...values.pickupDetails,
        dateTime: pictimestamp,
        location: {
          latitude: pickuplocation.latitude,
          longitude: pickuplocation.longitude
        }
      },
      deliveryDetails: {
        ...values.deliveryDetails,

        location: {
          latitude: deliverylocation.latitude,
          longitude: deliverylocation.longitude
        }
      },
    };

    // Remove paymentCollectionRupees if cashOnDelivery is false
    if (values.cashOnDelivery === "false") {
      delete payload.paymentCollectionRupees;
    }

    const res = await createOrder(payload);

    if (res.status) {
      naviagte("/all-order");
    }
    // console.log(payload); // Log final payload for debugging
  };

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form className="create-order">
                {/* Parcel Types */}
                <div className="input-box row mb-2">
                  <div
                    key={"parcelsCount"}
                    className="input-error col-12 col-sm-6 mb-3"
                  >
                    <label className="fw-thin p-0 pb-1 ">Parcels Count :</label>
                    <Field
                      type="number"
                      name={"parcelsCount"}
                      className="form-control"
                      placeholder={`ParcelsCount`}
                      style={{
                        height: "4.5em",
                        border: "1px solid #E6E6E6",
                        borderRadius: "5px",
                      }}
                    />
                    <ErrorMessage
                      name={"parcelsCount"}
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>

                  <div className="input-error col-12 col-sm-6 mb-3">
                    <label className="fw-thin p-0 pb-1 ">Select Delivery Man :</label>
                    <Field
                      as="select"
                      
                      name="deliveryManId"
                      className="w-full h-[4.5em] border border-[#E6E6E6] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" className="text-gray-500">Select Delivery Man</option>
                      {deliveryMan.map((data, index) => {
                        let distance = '';
                        if (currentLocation && data.location) {
                          distance = calculateDistance(
                            currentLocation.latitude,
                            currentLocation.longitude,
                            data.location?.coordinates?.[1],
                            data.location?.coordinates?.[0]
                          );
                        }

                        if (lengthofdeliverymen === index) {
                          return (<>
                            <option
                              key={index}
                              value={"admin"} 
                              className="text-center bg-[#bbbbbb] text-[#ffffff] font-bold text-[1.25rem] py-[0.5rem]"
                              disabled
                            >
                              Admin
                            </option>
                            <option
                              key={`${index}-data`}
                              value={data._id}
                              className="py-1.5 px-3 hover:bg-gray-100 w-full flex justify-between mx-auto"
                            >
                              <span style={{float: 'left'}}>{`${data.firstName} ${data.lastName}`}</span>
                              <span style={{float: 'right'}}>{distance ? `${distance} km away` : ''}</span>
                            </option>
                          </>);
                        }
                        return (
                          <option
                            key={index}
                            value={data._id}
                            className="py-1.5 px-3 hover:bg-gray-100 w-full flex justify-between"
                          >
                            <span style={{float: 'left', width: '65%'}}>{`${data.firstName} ${data.lastName}`}</span>
                            <span style={{ display: 'inline-block', width: '100px' }}></span> 
                            <span style={{float: 'right', width: '30%', marginLeft: '5%'}}>{distance ? `- (${distance} km away)` : ''}</span>
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      name={"deliveryManId"}
                      component="div" 
                      className="error text-danger ps-2"
                    />
                  </div>
                  {values.cashOnDelivery === "true" && (
                    <div
                      key={"paymentCollectionRupees"}
                      className="input-error col-12 col-sm-6 mb-3"
                    >
                      <label className="fw-thin p-0 pb-1 ">Payment Collection : Amount</label>
                      <Field
                        as="input"
                        name="paymentCollectionRupees"
                        type="number"
                        className="form-control mt-3"
                        style={{ height: "4.5em", border: "1px solid #E6E6E6", }}
                        placeholder="Enter Payment Collection pounds  "
                      />
                      <ErrorMessage
                        name={"paymentCollectionRupees"}
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                  )}

                  <div
                    key="cashOnDelivery"
                    className="input-error col-12 col-sm-6 mb-3"
                  >
                    <label className="fw-thin p-0 pb-1 ">Cash on Delivery :</label>

                    <div className="d-flex align-items-center">
                      {/* True Option */}
                      <label className="me-3">
                        <Field
                          type="radio"
                          name="cashOnDelivery"
                          value="true"
                          className="form-check-input"
                          style={{
                            marginRight: "0.5em",
                            height: "1.2em",
                            width: "1.2em",
                          }}
                        />
                        Yes
                      </label>

                      {/* False Option */}
                      <label>
                        <Field
                          type="radio"
                          name="cashOnDelivery"
                          value="false"
                          className="form-check-input"
                          style={{
                            marginRight: "0.5em",
                            height: "1.2em",
                            width: "1.2em",
                          }}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Pickup Information */}
                <div className="pick-up mt-5 row">
                  <div className="col-12 col-lg-6">
                    <h3 className="fw-bold text-2xl pb-3">Pickup Information</h3>

                    {/* Pickup Details Fields */}
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Pickup Date & Time :</label>
                      <Field
                        type="datetime-local"
                        name="pickupDetails.dateTime"
                        className="form-control w-25% h-100%"
                        placeholder="Date and Time"
                        style={{ height: "4.5em", border: "1px solid #E6E6E6", }}
                      />
                      <ErrorMessage
                        name="pickupDetails.dateTime"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>

                    <div className="row">
                      <div className="input-error mb-3 col-9">
                        <label className="fw-thin p-0 pb-1 ">Pickup Address :</label>
                        <Field
                          type="text"
                          as="textarea"
                          name="pickupDetails.address"
                          className="form-control w-25% h-100%"
                          placeholder="Pickup Address"
                          style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                        />
                        <ErrorMessage
                          name="pickupDetails.address"
                          component="div"
                          className="error text-danger ps-2"
                        />
                      </div>
                      <div className="col-3">
                        {/* Use Current Location Button */}
                        <label htmlFor=""></label>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            height: "4.5em",
                            width: "w-100",
                            borderRadius: "0 5px 5px 0",
                          }}
                          onClick={() => getCurrentLocation(setFieldValue)}
                        >
                          Use Current Location
                        </button>
                      </div>
                    </div>

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Pickup Postcode :</label>
                      <Field
                        type="text"
                        name="pickupDetails.postCode"
                        className="form-control w-25% h-100%"
                        placeholder="Pickup Postcode"
                        style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="pickupDetails.postCode"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    {/* <div className="input-error mb-3">
                      <Field
                        as="select"
                        name="pickupDetails.countryCode"
                        className="form-control"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      >
                        <option value="" label="Select country code" />
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="pickupDetails.countryCode"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div> */}

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Pickup Contact Number :</label>
                      <Field
                        type="number"
                        name="pickupDetails.mobileNumber"
                        className="form-control"
                        placeholder="Pickup Contact Number"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="pickupDetails.mobileNumber"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Pickup Email :</label>
                      <Field
                        type="email"
                        name="pickupDetails.email"
                        className="form-control"
                        placeholder="Pickup Email"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="pickupDetails.email"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Merchant Name :</label>
                      <Field
                        type="text"
                        name="pickupDetails.name"
                        className="form-control"
                        placeholder="Merchant Name"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="pickupDetails.name"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Pickup Instraction (Optional) :</label>
                      <Field
                        as="textarea"
                        name="pickupDetails.description"
                        className="form-control"
                        placeholder="Pickup Instraction"
                        rows="4"
                        style={{
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="pickupDetails.description"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <h3 className="fw-bold text-2xl pb-3">Delivery Information</h3>
                    {/* Delivery Details Fields */}
                    {/* <div className="input-error mb-3"> */}
                    <label className="fw-thin p-0 pb-1 ">Select Customer :</label>
                    <Select
                      className="form-control mb-3 p-0"
                      styles={{
                        control: (base) => ({ ...base, padding: "15px" }),
                      }}
                      options={customer.map((cust) => ({
                        value: cust._id,
                        label: cust.firstName,
                        label: `${cust.firstName}  -  ${cust.email}  -  ${cust.mobileNumber}`,
                        ...cust,
                      }))}
                      placeholder="Select Customer"
                      isClearable
                      filterOption={(option, inputValue) => {
                        const data = option.data; // Access the original object from options
                        const searchValue = inputValue.toLowerCase();

                        // Match by name, email, or mobileNumber
                        return (
                          data.firstName.toLowerCase().includes(searchValue) ||
                          data.lastName.toLowerCase().includes(searchValue) ||
                          data.email.toLowerCase().includes(searchValue) ||
                          data.mobileNumber.toLowerCase().includes(searchValue)
                        );
                      }}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          setFieldValue(
                            "deliveryDetails.address",
                            `${selectedOption.address}, ${selectedOption.city || ''}, ${selectedOption.postCode || ''}, ${selectedOption.country || ''}`
                          );
                          // setFieldValue(
                          //   "deliveryDetails.countryCode",
                          //   selectedOption.countryCode || ""
                          // );
                          setFieldValue(
                            "deliveryDetails.mobileNumber",
                            selectedOption.mobileNumber
                          );
                          setFieldValue(
                            "deliveryDetails.email",
                            selectedOption.email
                          );
                          setFieldValue(
                            "deliveryDetails.description",
                            selectedOption.description
                          );
                          setFieldValue(
                            "deliveryDetails.postCode",
                            selectedOption.postCode
                          );
                          setFieldValue(
                            "deliveryDetails.name",
                            selectedOption.firstName
                          );
                        } else {
                          // Clear delivery details if no customer is selected
                          setFieldValue("deliveryDetails", {
                            address: "",
                            // countryCode: "",
                            mobileNumber: "",
                            email: "",
                            description: "",
                            postCode: "",
                            name: "",
                          });
                        }
                      }}
                    />
                    {/* </div> */}

                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Delivery Address :</label>
                      <Field
                        type="text"
                        as="textarea"
                        name="deliveryDetails.address"
                        className="form-control w-25% h-100%"
                        placeholder="Delivery Address"
                        style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.address"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    {/* <button
                    className="border p-2 bg-[#0D6EFD] text-white rounded mb-2"
                      onClick={() =>
                        getCoordinatesFromAddress(values.deliveryDetails.address, setFieldValue)
                      }
                    >
                      Verify Adress
                    </button> */}
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Delivery Postcode :</label>
                      <Field
                        type="text"
                        name="deliveryDetails.postCode"
                        className="form-control w-25% h-100%"
                        placeholder="Delivery Postcode"
                        style={{ height: "4.5em", border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.postCode"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    {/* <div className="input-error mb-3">
                      <Field
                        as="select"
                        name="deliveryDetails.countryCode"
                        className="form-control"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      >
                        <option value="" label="Select country code" />
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="deliveryDetails.countryCode"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div> */}
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Delivery Contact Number :</label>
                      <Field
                        type="number"
                        name="deliveryDetails.mobileNumber"
                        className="form-control"
                        placeholder="Delivery Contact Number"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.mobileNumber"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Delivery Email :</label>
                      <Field
                        type="email"
                        name="deliveryDetails.email"
                        className="form-control"
                        placeholder="Delivery Email"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.email"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Customer Name :</label>
                      <Field
                        type="text"
                        name="deliveryDetails.name"
                        className="form-control"
                        placeholder="Customer Name"
                        style={{
                          height: "4.5em",
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.name"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="input-error mb-3">
                      <label className="fw-thin p-0 pb-1 ">Delivery Instraction (Optional) :</label>
                      <Field
                        as="textarea"
                        name="deliveryDetails.description"
                        className="form-control"
                        placeholder="Delivery Instraction"
                        rows="4"
                        style={{
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                        }}
                      />
                      <ErrorMessage
                        name="deliveryDetails.description"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-secondary mt-3 me-4"
                    onClick={() => naviagte("/all-order")}
                    style={{ height: "4.5em" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    style={{ height: "4.5em" }}
                  >
                    Create Order
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default CreateOrder;
