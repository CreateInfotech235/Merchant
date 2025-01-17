import React, { useState, useEffect, useMemo } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
  getAllDeliveryMans,
  getDeliveryMan,
  updateDeliveryBoy,
} from "../../Components_merchant/Api/DeliveryMan";
import countryList from "react-select-country-list";
import Select from "react-select";
import { getAllCustomers } from "../../Components_merchant/Api/Customer";
import {
  calculateDistancee,
  updateOrder,
} from "../../Components_merchant/Api/Order";

const UpdateOrderModalMulti = ({ onHide, Order, isSingle }) => {
  console.log("Order", Order);

  const navigate = useNavigate(); // Fixed duplicate navigate declaration
  const merchant = JSON.parse(localStorage.getItem("userData"));
  const [deliveryMan, setDeliveryMen] = useState([]);
  const [deliveryManId, setDeliveryMenId] = useState(
    Order?.deliveryManId || null
  );
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  const [lengthofdeliverymen, setLengthofdeliverymen] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialValues, setInitialValues] = useState({});
console.log(initialValues.deliveryDetails);

  // const [isOrderUpdated, setIsOrderUpdated] = useState(false);

  useEffect(() => {
    const selectedCustomer = customer.find(
      (c) => c.email === Order.cutomerEmail
    );
    if (selectedCustomer?._id) {
      setCustomerId(selectedCustomer?._id);
    }
  }, [customer]);

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  console.log(Order);
  useEffect(() => {
    const fetchData = async () => {
      const customerRes = await getAllCustomers();

      const deliveryMans = await getAllDeliveryMans();
      const deliveryManRes = await getDeliveryMan();
      if (deliveryManRes.data || deliveryMans.data) {
        // Filter active delivery men from first source
        const activeDeliveryMen =
          deliveryManRes.data?.filter((man) => man.status !== "DISABLE") || [];
        const formattedAdminDeliveryMen =
          deliveryMans.data?.map((man) => ({
            ...man,
            firstName: man.firstName || man.name?.split(" ")[0] || undefined,
            lastName:
              man.lastName ||
              man.name?.split(" ").slice(1).join(" ") ||
              undefined,
            _id: man._id,
            email: man.email,
            contactNumber: man.contactNumber,
            status: man.status || "ENABLE",
          })) || [];

        // Combine both arrays and remove duplicates by _id and email
        setLengthofdeliverymen(activeDeliveryMen.length);
        const mergedDeliveryMen = [
          ...activeDeliveryMen,
          ...formattedAdminDeliveryMen,
        ].reduce((acc, current) => {
          const isDuplicate = acc.find(
            (item) => item._id === current._id || item.email === current.email
          );
          if (!isDuplicate && current.status !== "DISABLE") {
            return acc.concat([current]);
          }
          return acc;
        }, []);

        setDeliveryMen(mergedDeliveryMen);
      }
      if (customerRes.status) setCustomer(customerRes.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const formatDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    setInitialValues({
      dateTime: Order?.dateTime || new Date(),
      deliveryManId: deliveryManId || "",
      pickupDetails: {
        location: {
          latitude: Order?.pickupAddress?.location?.latitude || null,
          longitude: Order?.pickupAddress?.location?.longitude || null,
        },
        dateTime: formatDateTime(Order?.pickupAddress?.dateTime) || "",
        address: Order?.pickupAddress?.address || "",
        merchantId: Order?.pickupAddress?.merchantId || "",
        mobileNumber: Order?.pickupAddress?.mobileNumber || "",
        email: Order?.pickupAddress?.email || "",
        name: Order?.pickupAddress?.name || "",
        description: Order?.pickupAddress?.description || "",
        postCode: Order?.pickupAddress?.postCode || "",
      },
      deliveryDetails: Order?.deliveryAddress,
    });
  }, [Order]);

  console.log("initialValues", initialValues);
  const validationSchema = Yup.object().shape({
    dateTime: Yup.string().required("Required"),
    pickupDetails: Yup.object().shape({
      dateTime: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      mobileNumber: Yup.number().required("Required"),
      name: Yup.string().required("Required"),
      postCode: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      description: Yup.string(),
      location: Yup.object().shape({
        latitude: Yup.number().required("Required"),
        longitude: Yup.number().required("Required"),
      }),
      merchantId: Yup.string().required("Required"),
    }),
    deliveryManId: Yup.string().required("Required"),
    deliveryDetails: Yup.array().of(
      Yup.object().shape({
        subOrderId: Yup.number().required("Required"),
        paymentCollectionRupees: Yup.string().test(
          "paymentCollectionRequired",
          "Payment collection is required when cash on delivery is Yes",
          function (value) {
            const { cashOnDelivery } = this.parent;
            if (cashOnDelivery === true && !value) {
              return false;
            }
            return true;
          }
        ),
        parcelsCount: Yup.number()
          .required("Required")
          .positive("Must be positive")
          .min(1),
        address: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
        mobileNumber: Yup.number().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        description: Yup.string(),
        postCode: Yup.string().required("Required"),
        distance: Yup.number().required("Required"),
        duration: Yup.string().required("Required"),
        location: Yup.object().shape({
          latitude: Yup.number().required("Required"),
          longitude: Yup.number().required("Required")
        }),
        cashOnDelivery: Yup.string().required("Required")
        
      })
    ),
  });


  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d.toFixed(2);
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };



  const onSubmit = async (values, { setFieldValue }) => {
    setIsUpdate(true);
    console.log("values",values);
    const timestamp = new Date(values.dateTime).getTime();
    const pictimestamp = new Date(values.pickupDetails.dateTime).getTime();
    let deliverylocation = [];
    let pickuplocation = null;
    var distanceMiles = null;
    let distanceKm = null;
    let duration = null;

    // Handle pickup location
    if (
      values.pickupDetails.location.latitude &&
      values.pickupDetails.location.longitude
    ) {
      console.log("Enter in PickUp");

      if (values.pickupDetails.address) {
        try {
          const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              values.pickupDetails.address
            )}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            const formattedAddress = data.results[0]?.formatted_address;
            const postalCodeComponent = data.results[0].address_components.find(
              (component) => component.types.includes("postal_code")
            );
            const postalCode = postalCodeComponent
              ? postalCodeComponent.long_name
              : "";

            pickuplocation = { latitude: lat, longitude: lng };
            // setFieldValue("pickupDetails.address", formattedAddress);
            setFieldValue("pickupDetails.location.latitude", lat);
            setFieldValue("pickupDetails.location.longitude", lng);
            // setFieldValue("pickupDetails.postCode", postalCode);
          } else {
            alert("Pickup address not found. Please try again.");
            return;
          }
        } catch (error) {
          console.error("Error fetching pickup coordinates:", error);
          alert("Error processing pickup address");
          return;
        }
      }
    } else {
      pickuplocation = values.pickupDetails.location;
    }

    // Handle delivery location
    if (
      values.deliveryDetails.location.latitude &&
      values.deliveryDetails.location.longitude
    ) {
      console.log("Enter in Delivery");

      if (values.deliveryDetails.address) {
        try {
          const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              values.deliveryDetails.address
            )}&key=${apiKey}`
          );
          const data = await response.json();
          console.log(data, "Locationn");

          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            const formattedAddress = data.results[0]?.formatted_address;

            deliverylocation = { latitude: lat, longitude: lng };
            // setFieldValue("deliveryDetails.address", formattedAddress);
            setFieldValue("deliveryDetails.location.latitude", lat);
            setFieldValue("deliveryDetails.location.longitude", lng);
          } else {
            alert("Delivery address not found. Please try again.");
            return;
          }
        } catch (error) {
          console.error("Error fetching delivery coordinates:", error);
          alert("Error processing delivery address");
          return;
        }
      }
    } else {
      deliverylocation = values.deliveryDetails.location;
    }

    console.log(
      pickuplocation.latitude,
      pickuplocation.longitude,
      deliverylocation.latitude,
      deliverylocation.longitude,
      "sdfkgsdsfgsf"
    );

    if (
      pickuplocation.latitude &&
      pickuplocation.longitude &&
      deliverylocation.latitude &&
      deliverylocation.longitude
    ) {
      console.log("Hello");
      console.log(
        pickuplocation.latitude,
        pickuplocation.longitude,
        deliverylocation.latitude,
        deliverylocation.longitude
      );

      const distance = await calculateDistancee(
        pickuplocation,
        deliverylocation
      );
      console.log(distance.distance);
      setFieldValue("distance", distance.distance.text);
      setFieldValue("duration", distance.duration.text);
      distanceKm = parseFloat(distance.distance.text.replace(/[^\d.]/g, ""));
      distanceMiles = (distanceKm * 0.621371).toFixed(2); // Convert and round to 2 decimal places
      distanceMiles = parseFloat(distanceMiles); // Ensure it's a number type
      duration = distance.duration.text;
      console.log(distance);
    }

    const payload = {
      ...values,
      dateTime: timestamp,
      pickupDetails: {
        ...values.pickupDetails,
        dateTime: pictimestamp,
        location: {
          latitude: pickuplocation.latitude,
          longitude: pickuplocation.longitude,
        },
      },
      deliveryDetails: {
        ...values.deliveryDetails,
        location: {
          latitude: deliverylocation.latitude,
          longitude: deliverylocation.longitude,
        },
      },
      distance: distanceMiles,
      duration: duration,
    };
    console.log(payload);

    if (!values.cashOnDelivery) {
      delete payload.paymentCollectionRupees;
    }
console.log( payload, "payload");

    try {
      const res = await updateOrder(Order._id, payload);
      if (res.status) {
        onHide();
        navigate("/all-order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order");
    } finally {
      setIsUpdate(false);
    }
  };

  return (
    <Modal show={true} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Update Order {Order.showOrderNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form className="create-order">

                <div className="pick-up mt-2 row">

                  {/* Pickup Information */}
                  <div className="col-12 col-lg-12 row" style={{display: isSingle ? "none" : ""}}>
                    <h3 className="fw-bold text-4xl pb-1 text-center">
                      Pickup Information
                    </h3>

                    {/* Pickup Details Fields */}
                    <div className="input-error mb-1 col-3">
                      <label className="fw-thin p-0 pb-1 ">
                        Pickup Date & Time :
                      </label>
                      <Field
                        type="datetime-local"
                        name="pickupDetails.dateTime"
                        className="form-control w-25% h-100%"
                        placeholder="Date and Time"
                        defaultValue={new Date().toISOString().slice(0, 16)}
                        style={{ height: "3em", border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="pickupDetails.dateTime"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>

                    <div className="input-error mb-1 col-3" >
                      <label className="fw-thin p-0 pb-1 ">
                        Pickup Postcode :
                      </label>
                      <Field
                        type="text"
                        name="pickupDetails.postCode"
                        className="form-control w-25% h-100%"
                        placeholder="Pickup Postcode"
                        style={{ height: "3em", border: "1px solid #E6E6E6" }}
                      />
                      <ErrorMessage
                        name="pickupDetails.postCode"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="row col-6">
                      <div className="input-error mb-1 col-8">
                        <label className="fw-thin p-0 pb-1 ">
                          Pickup Address :
                        </label>
                        <Field
                          type="text"
                          as="textarea"
                          name="pickupDetails.address"
                          className="form-control w-25% h-100%"
                          placeholder="Pickup Address"
                          style={{
                            height: "3em",
                            border: "1px solid #E6E6E6",
                            fontSize: "15px"
                          }}
                        />
                        <ErrorMessage
                          name="pickupDetails.address"
                          component="div"
                          className="error text-danger ps-2"
                        />
                      </div>
                      <div className="col-4 "  >
                        {/* Use Current Location Button */}
                        <button
                          type="button"
                          className="btn btn-primary rounded"
                          style={{
                            height: "3em",
                            width: "w-100",
                            borderRadius: "0 5px 5px 0",
                            marginTop: "1.8em",
                            lineHeight: "1"
                          }}
                          onClick={() => getCurrentLocation(setFieldValue)}
                        >
                          Use Current Location
                        </button>
                      </div>
                    </div>

                    {/* <div className="input-error mb-1">
                      <Field
                        as="select"
                        name="pickupDetails.countryCode"
                        className="form-control"
                        style={{
                          height: "3em",
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

                    <div className="input-error mb-1 col-3">
                      <label className="fw-thin p-0 pb-1 ">
                        Pickup Contact Number :
                      </label>
                      <Field
                        type="text"
                        name="pickupDetails.mobileNumber"
                        className="form-control"
                        placeholder="Pickup Contact Number"
                        style={{
                          height: "3em",
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

                    <div className="input-error mb-1 col-3">
                      <label className="fw-thin p-0 pb-1 ">
                        Merchant Name :
                      </label>
                      <Field
                        type="text"
                        name="pickupDetails.name"
                        className="form-control"
                        placeholder="Merchant Name"
                        style={{
                          height: "3em",
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

                    <div className="input-error mb-1 col-3">
                      <label className="fw-thin p-0 pb-1 ">
                        Pickup Email :
                      </label>
                      <Field
                        type="email"
                        name="pickupDetails.email"
                        className="form-control"
                        placeholder="Pickup Email"
                        style={{
                          height: "3em",
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

                    <div className="input-error mb-1 col-3">
                      <label className="fw-thin p-0 pb-1 ">
                        Pickup Instraction (Optional) :
                      </label>
                      <Field
                        as="textarea"
                        name="pickupDetails.description"
                        className="form-control h-[70px]"
                        placeholder="Pickup Instraction"
                        rows="3"
                        style={{
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                          height: "3em",
                        }}
                      />
                      <ErrorMessage
                        name="pickupDetails.description"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                  </div>
                  {/* Delivery Information */}
                  <div className="col-12 col-lg-12 mt-2">
                    <h3 className="fw-bold text-4xl pb-1 text-center">
                      Delivery Information
                    </h3>
                    <div className="input-error col-12 col-sm-6 mb-1">
                      <label className="fw-thin p-0 pb-1 ">
                        Select Delivery Man :
                      </label>
                      <Field
                        as="select"
                        name={`deliveryManId`}
                        className="w-full h-[3em] border border-[#E6E6E6] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          setInitialValues(prev => ({
                            ...prev,
                            deliveryManId: e.target.value
                          }));
                        }}
                      >
                        <option value="" className="text-gray-500">
                          Select Delivery Man
                        </option>
                        {deliveryMan.map((data, index) => {
                          let distance = "";
                          if (currentLocation && data.location) {
                            distance = calculateDistance(
                              currentLocation.latitude,
                              currentLocation.longitude,
                              data.location?.coordinates?.[1],
                              data.location?.coordinates?.[0]
                            );
                          }

                          if (lengthofdeliverymen === index) {
                            return (
                              <>
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
                                  <span
                                    style={{ float: "left" }}
                                  >{`${data.firstName} ${data.lastName}`}</span>
                                  <span style={{ float: "right" }}>
                                    {distance ? `${distance} km away` : ""}
                                  </span>
                                </option>
                              </>
                            );
                          }
                          return (
                            <option
                              key={index}
                              value={data._id}
                              className="py-1.5 px-3 hover:bg-gray-100 w-full flex justify-between"
                            >
                              <span
                                style={{ float: "left", width: "65%" }}
                              >{`${data.firstName} ${data.lastName}`}</span>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "100px",
                                }}
                              ></span>
                              <span
                                style={{
                                  float: "right",
                                  width: "30%",
                                  marginLeft: "5%",
                                }}
                              >
                                {distance ? `- (${distance} km away)` : ""}
                              </span>
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        name={`deliveryManId`}
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    {
                      initialValues?.deliveryDetails?.map((data, index) => (
                        <div className={`row shadow  rounded-md ${index !== 0 ? "mt-4" : "mt-2"}`} key={index} style={{display:isSingle? isSingle!=index+1 ? "none" : "" : ""}}>

                          <div className="col-12 col-lg-12 text-black font-bold text-2xl p-3 flex justify-between">
                            <div>
                              {`Delivery Information ${index + 1}`}
                            </div>
                            <div>
                              {
                                index > 0 && (
                                  <button className="btn btn-danger" onClick={() => {
                                    setInitialValues(prev => ({
                                      ...prev,
                                      deliveryDetails: prev?.deliveryDetails?.filter((_, i) => i !== index)
                                    }));
                                  }}>
                                    Delete
                                  </button>
                                )
                              }
                            </div>
                          </div>

                          <div className="input-error mb-1 col-4 ">
                            <label className="fw-thin p-0 pb-1 ">
                              Select Customer :
                            </label>
                            <Select
                              name={`deliveryDetails.${index}.customerId`}
                              className="form-control mb-1 p-0"

                              styles={{
                                control: (base) => ({ ...base,   height: "3em" }),
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
                                const data = option.data;
                                const searchValue = inputValue.toLowerCase();
                                return (
                                  data.firstName.toLowerCase().includes(searchValue) ||
                                  data.lastName.toLowerCase().includes(searchValue) ||
                                  data.email.toLowerCase().includes(searchValue) ||
                                  data.mobileNumber.toLowerCase().includes(searchValue)
                                );
                              }}
                              onChange={(selectedOption) => {
                                if (selectedOption) {

                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev?.deliveryDetails?.map((item, i) => i === index ? { ...item, customerId: selectedOption.value } : item)
                                  }));
                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev?.deliveryDetails?.map((item, i) => i === index ? { ...item, address: selectedOption.address } : item)
                                  }));

                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, mobileNumber: selectedOption.mobileNumber } : item)
                                  }));


                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, email: selectedOption.email } : item)
                                  }));

                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, description: selectedOption.description } : item)
                                  }));

                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, postCode: selectedOption.postCode } : item)
                                  }));

                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, name: selectedOption.firstName } : item)
                                  }));
                                } else {
                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, address: "", mobileNumber: "", email: "", description: "", postCode: "", name: "" } : item)
                                  }));
                                }
                              }}
                            />
                          </div>


                          <div
                            key={"parcelsCount"}
                            className="input-error col-12 col-sm-3 mb-1"
                          >
                            <label className="fw-thin p-0 pb-1 ">Parcels Count :</label>
                            <Field
                              type="number"
                              name={`deliveryDetails.${index}.parcelsCount`}
                              onChange={(e) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, parcelsCount: e.target.value } : item)
                                }));
                              }}
                              className="form-control"
                              placeholder={`ParcelsCount`}
                              style={{
                                height: "3em",
                                border: "1px solid #E6E6E6",
                                borderRadius: "5px",
                              }}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.parcelsCount`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>

                          <div
                            key="cashOnDelivery"
                            className="input-error col-12 col-sm-2 mb-1"
                          >
                            <label className="fw-thin p-0 pb-1 ">
                              Cash on Delivery :
                            </label>

                            <div className="d-flex align-items-center justify-evenly">
                              {/* True Option */}
                              <label className="me-3">
                                <Field
                                  type="radio"
                                  name={`deliveryDetails.${index}.cashOnDelivery`}
                                  onChange={(e) => {
                                    setInitialValues(prev => ({
                                      ...prev,
                                      deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, cashOnDelivery: e.target.value } : item)
                                    }));
                                  }}
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
                                  name={`deliveryDetails.${index}.cashOnDelivery`}
                                  onChange={(e) => {
                                    setInitialValues(prev => ({
                                      ...prev,
                                      deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, cashOnDelivery: e.target.value } : item)
                                    }));
                                  }}
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
                          {initialValues?.deliveryDetails[index]?.cashOnDelivery === "true" && (
                            <div
                              key={"paymentCollectionRupees"}
                              className="input-error col-12 col-sm-3 mb-1"
                            >
                              <label className="fw-thin p-0 pb-1 ">
                                Payment Collection : Amount
                              </label>
                              <Field
                                as="input"
                                name={`deliveryDetails.${index}.paymentCollectionRupees`}
                                type="number"
                                onChange={(e) => {
                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, paymentCollectionRupees: e.target.value } : item)
                                  }));
                                }}
                                className="form-control mt-0"
                                style={{ height: "3em", border: "1px solid #E6E6E6" }}
                                placeholder="Enter Payment Collection pounds  "

                              />
                              <ErrorMessage
                                name={`deliveryDetails.${index}.paymentCollectionRupees`}
                                component="div"
                                className="error text-danger ps-2"
                              />
                            </div>
                          )}


                          <div className="input-error mb-1 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Customer Name :
                            </label>
                            <Field
                              type="text"
                              name={`deliveryDetails.${index}.name`}
                              className="form-control"
                              placeholder="Customer Name"
                              onChange={(e) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, name: e.target.value } : item)
                                }));
                              }}
                              style={{
                                height: "3em",
                                border: "1px solid #E6E6E6",
                                borderRadius: "5px",
                              }}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.name`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>





                          <div className="input-error mb-1 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Delivery Email :
                            </label>
                            <Field
                              type="email"
                              name={`deliveryDetails.${index}.email`}
                              className="form-control"
                              placeholder="Delivery Email"
                              onChange={(e) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, email: e.target.value } : item)
                                }));
                              }}
                              style={{
                                height: "3em",
                                border: "1px solid #E6E6E6",
                                borderRadius: "5px",
                              }}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.email`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>


                          <div className="input-error mb-1 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Delivery Contact Number :
                            </label>
                            <Field
                              type="text"
                              name={`deliveryDetails.${index}.mobileNumber`}
                              className="form-control"
                              placeholder="Delivery Contact Number"
                              onChange={(e) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, mobileNumber: e.target.value } : item)
                                }));
                              }}
                              style={{
                                height: "3em",
                                border: "1px solid #E6E6E6",
                                borderRadius: "5px",
                              }}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.mobileNumber`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>



                          <div className="input-error mb-1 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Delivery Postcode :
                            </label>
                            <Field
                              type="text"
                              name={`deliveryDetails.${index}.postCode`}
                              className="form-control w-25% h-100%"
                              onChange={(e) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, postCode: e.target.value } : item)
                                }));
                              }}
                              placeholder="Delivery Postcode"
                              style={{ height: "3em", border: "1px solid #E6E6E6" }}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.postCode`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>
                          <div className="input-error mb-1 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Delivery Address :
                            </label>
                            <Field
                              type="text"
                              as="textarea"
                              name={`deliveryDetails.${index}.address`}
                              className="form-control w-25% h-100%"
                              onChange={(e) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, address: e.target.value } : item)
                                }));
                              }}
                              placeholder="Delivery Address"
                              style={{ height: "3em", border: "1px solid #E6E6E6" }}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.address`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>



                          <div className="input-error mb-3 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Delivery Instraction (Optional) :
                            </label>
                            <Field
                              as="textarea"
                              name={`deliveryDetails.${index}.description`}
                              className="form-control"
                              placeholder="Delivery Instraction"
                              rows="2"
                              onChange={(e) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, description: e.target.value } : item)
                                }));
                              }}
                              style={{
                                border: "1px solid #E6E6E6",
                                borderRadius: "5px",
                                height: "3em"
                              }}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.description`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>

                        </div>
                      ))}

                    <div className={`d-flex  mt-2 ${isSingle ? "justify-content-end" : "justify-content-between"}`}>

                      <button className="btn btn-primary mt-3" style={{display:isSingle ? "none" : "" }} type="button" onClick={() => {
                        setInitialValues(prev => ({
                          ...prev,
                          deliveryDetails: [...prev.deliveryDetails, {
                            subOrderId: prev.deliveryDetails.length + 1,
                            address: "",
                            cashOnDelivery: "false",
                            description: "",
                            distance: "",
                            duration: "",
                            email: "",
                            mobileNumber: "",
                            location: {
                              latitude: null, // Initialize with null or undefined
                              longitude: null, // Empty array or [longitude, latitude]
                            },
                            name: "",
                            parcelsCount: 1,
                            paymentCollectionRupees: 0,
                            postCode: "",
                          }]
                        }))
                      }}>
                        + Add Delivery Information
                      </button>

                      {/* Submit Button */}
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-secondary mt-1 me-4"
                          onClick={() => { onHide(); navigate("/all-multi-order")}}
                          style={{ height: "3em" }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary mt-1"
                          style={{ height: "3em" }}
                          disabled={isUpdate}
                        >
                          {isUpdate ? "Order updating..." : "Update Order"}
                        </button>
                      </div>
                    </div>


                  </div>
                </div>



                {/* Parcel Types */}



              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderModalMulti;
