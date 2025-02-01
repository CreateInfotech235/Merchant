import React, { useState, useEffect } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
  getAllDeliveryMans,
  getDeliveryMan,
  updateDeliveryBoy,
} from "../../Components_merchant/Api/DeliveryMan";
import Select from "react-select";
import { getAllCustomers } from "../../Components_merchant/Api/Customer";
import {
  orderUpdateMulti,
} from "../../Components_merchant/Api/Order";
import { getMerchantParcelType } from "../../Components_merchant/Api/ParcelType";
import { getMapApi } from "../../Components_admin/Api/MapApi";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";

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
  const [parcelTypeDetail, setParcleTypeDetail] = useState([]);

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
    const fetchData = async () => {
      const parcelTypeRes = await getMerchantParcelType();
      if (parcelTypeRes.status) {
        setParcleTypeDetail(parcelTypeRes.data);
      }
    };
    fetchData();
  }, []);

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

      const deliveryMans = await getAllDeliveryMans({createdByAdmin: true});
      const deliveryManRes = await getDeliveryMan();
      if (deliveryManRes.data || deliveryMans.data) {
        // Filter active delivery men from first source
        const activeDeliveryMen =
          deliveryManRes.data?.filter((man) => man.status !== "DISABLE" && man.trashed !== true) || [];
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
  console.log(initialValues.deliveryDetails, 'initialValues.deliveryDetails');


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
        name: Yup.string(),
        mobileNumber: Yup.string(),
        email: Yup.string(),
        description: Yup.string(),
        postCode: Yup.string().required("postcode is required"),
        distance: Yup.number(),
        duration: Yup.string(),
        location: Yup.object().shape({
          latitude: Yup.number(),
          longitude: Yup.number()
        }),
        customerId: Yup.string().required("customer is required"),
        cashOnDelivery: Yup.string().required("Required"),
        parcelType: Yup.string()
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

  const calculateDistanceeinMiles = (value) => {
    console.log("value", value);
    return ((parseFloat(value.distance.text.replace(/[^\d.]/g, "")) * 0.621371).toFixed(2));
  }



  const onSubmit = async (values, { setFieldValue }) => {
    setIsUpdate(true);
    console.log("values", values);
    const timestamp = new Date(values.dateTime).getTime();
    const pictimestamp = new Date(values.pickupDetails.dateTime).getTime();
    const arrayoferror = []
    let pickuplocation =
      values.pickupDetails.location.latitude === null
        ? null
        : {
          latitude: values.pickupDetails.location.latitude,
          longitude: values.pickupDetails.location.longitude,
        };
    let deliverylocations = []

    const arrayofaddress = values.deliveryDetails.map((delivery, index) => {
      return delivery.address;
    })


    const arrayofpostcode = values.deliveryDetails.map((delivery, index) => {
      return delivery.postCode;
    })
    const distancesAndDurations = []
    // const deliverylocations =[]


    // Handle pickup location

    if (values.pickupDetails.address) {
      console.log("pickupDetails.address", values.pickupDetails.address);

      const mapApi = await getMapApi();
      const apiKey = mapApi.data[0]?.status ? mapApi.data[0].mapKey : "";
      console.log(apiKey);
      console.log(`${values.pickupDetails.address} ${values.pickupDetails.postCode}`);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          `${values.pickupDetails.address} ${values.pickupDetails.postCode}`
        )}&key=${apiKey}`
      );

      const data = await response.json();
      console.log("pickupdata", data);
      if (data.results && data.results.length > 0) {
        console.log("pickupdata", data);
        const { lat, lng } = data.results[0].geometry.location;
        pickuplocation = { latitude: lat, longitude: lng };
        console.log("pickuplocation", pickuplocation);
        setInitialValues(prev => ({
          ...prev,
          pickupDetails: {
            ...prev.pickupDetails,
            location: { latitude: lat, longitude: lng }
          }
        }));
        // setFieldValue("pickupDetails.location.latitude", lat);
        // setFieldValue("pickupDetails.location.longitude", lng);
      } else {
        toast.error("Pickup address not found. Please try again.");
        setIsUpdate(false);
        return;
      }
    } else {
      toast.error("Please enter a pickup address.");
      setIsUpdate(false);
      return;
    }


    // Handle delivery location
    const mapApi = await getMapApi();
    const apiKey = mapApi.data[0]?.status ? mapApi.data[0].mapKey : "";

    if (arrayofaddress) {



      for (let index = 0; index < arrayofaddress.length; index++) {
        const address = arrayofaddress[index];
        console.log("address", `${address} ${arrayofpostcode[index]}`);
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            `${address} ${arrayofpostcode[index]}`
          )}&key=${apiKey}`
        );
        const data = await response.json();
        console.log("data", data);
        if (data.results && data.results.length > 0) {
          console.log("data", data);
          if (data.status !== "ZERO_RESULTS") {
            const deliverylocation = { latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng };
            distancesAndDurations.push({status:true,distance:{value:0,text:"0 km"},duration:{value:0,text:"0 min"}})
            deliverylocations.push(deliverylocation)
          } else {
            console.log("data", data);
            arrayoferror.push(`in order ${index + 1} delivery address (${address} ${arrayofpostcode[index]}) not found. Please try again.`);
          }
        } else {
          arrayoferror.push(`in order ${index + 1} delivery address (${address} ${arrayofpostcode[index]}) not found. Please try again.`);
        }

      }

      if (arrayoferror.length > 0) {
        console.log("arrayoferror", arrayoferror);
        toast.error(arrayoferror.join("\n"));
        arrayoferror = []
        setIsUpdate(false);
        return;
      }




      var payload = {
        dateTime: timestamp,
        deliveryManId: initialValues.deliveryManId,
        pickupDetails: {
          ...initialValues.pickupDetails,
          dateTime: pictimestamp,
          location: {
            latitude: pickuplocation.latitude,
            longitude: pickuplocation.longitude
          }
        },
        merchant: merchant._id,
        deliveryDetails: initialValues.deliveryDetails.map((delivery, index) => ({
          address: delivery.address,
          cashOnDelivery: delivery.cashOnDelivery,
          description: delivery.description,
          email: delivery.email,
          mobileNumber: delivery.mobileNumber,
          name: delivery.name,
          parcelsCount: delivery.parcelsCount,
          postCode: delivery.postCode,
          subOrderId: delivery.subOrderId,
          paymentCollectionRupees: delivery.paymentCollectionRupees,
          distance: distancesAndDurations[index]?.distance.value,
          duration: distancesAndDurations[index]?.duration.text,
          parcelType: delivery.parcelType,
          location: {
            latitude: deliverylocations[index]?.latitude,
            longitude: deliverylocations[index]?.longitude
          },
          description: delivery.description,
          customerId: delivery.customerId,
        }))
      };
      console.log("payload", payload);

      const res1 = await orderUpdateMulti(Order._id, payload,Order);
      console.log("res1", res1);
      if (res1.status) {
        console.log("res1", res1);
        onHide();
        navigate("/all-multi-order");
      } else {
        setIsUpdate(false);
      }
      return;
    } else {
      toast.error("Please enter delivery address");
      setIsUpdate(false);
    }

    if (arrayoferror.length > 0) {
      toast.error(arrayoferror.join("\n"));
      setIsUpdate(false);
    }
    setIsUpdate(false);
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
            // Set customer IDs when initialValues change
            useEffect(() => {
              console.log(initialValues, 'initialValues123');
              console.log(values, 'values123');
              initialValues.deliveryDetails?.forEach((detail, index) => {
                setFieldValue(`deliveryDetails.${index}.customerId`, detail?.customerId ?? "");
              });
            }, [initialValues, setFieldValue]);

            return (
              <Form
                className="create-order"
                onKeyDown={(e) => {
                  // Prevent form submission on Enter key except in textarea elements
                  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                  }
                }}
              >

                <div className="pick-up mt-2 row">

                  {/* Pickup Information */}
                  <div className="col-12 col-lg-12 row" style={{ display: isSingle ? "none" : "" }}>
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
                        disabled={isUpdate}
                        style={{ height: "3em", border: "1px solid #E6E6E6" }}
                        onChange={(e)=>{
                          setInitialValues(prev => ({
                            ...prev,
                            pickupDetails: {
                              ...prev.pickupDetails,
                              dateTime: e.target.value
                            }
                          }));
                        }}
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
                        disabled={isUpdate}
                        onChange={(e)=>{
                          setInitialValues(prev => ({
                            ...prev,
                            pickupDetails: {
                              ...prev.pickupDetails,
                              postCode: e.target.value
                            }
                          }));
                        }}
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
                            fontSize: "15px",

                          }}
                          disabled={isUpdate}
                          onChange={(e)=>{
                            setInitialValues(prev => ({
                              ...prev,
                              pickupDetails: {
                                ...prev.pickupDetails,
                                address: e.target.value
                              }
                            }));
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
                          disabled={isUpdate}
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
                        disabled={isUpdate}
                        onChange={(e)=>{
                          setInitialValues(prev => ({
                            ...prev,
                            pickupDetails: {
                              ...prev.pickupDetails,
                              mobileNumber: e.target.value
                            }
                          }));
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
                        disabled={isUpdate}
                        onChange={(e)=>{
                          setInitialValues(prev => ({
                            ...prev,
                            pickupDetails: {
                              ...prev.pickupDetails,
                              name: e.target.value
                            }
                          }));
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
                        disabled={isUpdate}
                        onChange={(e)=>{
                          setInitialValues(prev => ({
                            ...prev,
                            pickupDetails: {
                              ...prev.pickupDetails,
                              email: e.target.value
                            }
                          }));
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
                        disabled={isUpdate}
                        onChange={(e)=>{
                          setInitialValues(prev => ({
                            ...prev,
                            pickupDetails: {
                              ...prev.pickupDetails,
                              description: e.target.value
                            }
                          }));
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
                        style={{
                          backgroundColor: isUpdate ? "#e9ecef" : "white",
                        }}
                        disabled={isUpdate}
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
                        <div className={`row shadow  rounded-md ${index !== 0 ? "mt-4" : "mt-2"}`} key={index} style={{ display: isSingle ? isSingle != index + 1 ? "none" : "" : "" }}>

                          <div className="col-12 col-lg-12 text-black font-bold text-2xl p-3 flex justify-between">
                            <div>
                              {`Delivery Information ${index + 1}`}
                            </div>
                            <div>
                              {
                                index > 0 && (
                                  <button className="btn btn-danger" disabled={isUpdate} onClick={() => {
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
                          <div className="input-error mb-1 col-4" style={{ border: "none" }}>
                            <label className="fw-thin p-0 pb-1">
                              Select Customer:
                            </label>
                            <Autocomplete
                              disablePortal
                              value={customer.find(cust => cust._id === initialValues.deliveryDetails[index].customerId) ? {
                                label: `${customer.find(cust => cust._id === initialValues.deliveryDetails[index].customerId).NHS_Number} - ${customer.find(cust => cust._id === initialValues.deliveryDetails[index].customerId).firstName} ${customer.find(cust => cust._id === initialValues.deliveryDetails[index].customerId).lastName} - ${customer.find(cust => cust._id === initialValues.deliveryDetails[index].customerId).address} - ${customer.find(cust => cust._id === initialValues.deliveryDetails[index].customerId).postCode}`,
                                value: initialValues.deliveryDetails[index].customerId,
                                customer: customer.find(cust => cust._id === initialValues.deliveryDetails[index].customerId)
                              } : null}
                              options={customer.map((cust) => ({
                                label: `${cust.NHS_Number} - ${cust.firstName} ${cust.lastName} - ${cust.address} - ${cust.postCode}`,
                                value: cust._id,
                                customer: cust
                              }))}
                              sx={{ width: "100%", border: "none", borderRadius: "5px", outline: "none", "& .MuiInputBase-input": { border: "none", outline: "none" } ,"& .MuiInputBase-input:focus": { border: "none", outline: "none",boxShadow: "none" } }}
                              onChange={(e, newValue) => {
                                console.log(newValue, 'newValue');
                                if (newValue) {
                                  console.log(newValue, 'newValue');
                                  setFieldValue(`deliveryDetails.${index}.customerId`, newValue.value);
                                  const selectedCustomer = newValue.customer;

                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev?.deliveryDetails?.map((item, i) =>
                                      i === index ? {
                                        ...item,
                                        customerId: selectedCustomer._id,
                                        address: selectedCustomer.address,
                                        mobileNumber: selectedCustomer.mobileNumber,
                                        email: selectedCustomer.email,
                                        description: selectedCustomer.description,
                                        postCode: selectedCustomer.postCode,
                                        name: selectedCustomer.firstName
                                      } : item
                                    )
                                  }));
                                } else {
                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) =>
                                      i === index ? {
                                        ...item,
                                        address: "",
                                        mobileNumber: "",
                                        email: "",
                                        description: "",
                                        postCode: "",
                                        name: ""
                                      } : item
                                    )
                                  }));
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  style={{
                                    backgroundColor: isUpdate ? "#e9ecef" : "white",
                                    // border: "1px solid #E6E6E6",
                                    borderRadius: "5px",
                                    // height: "3em",
                                  }}
                                  label="Select Customer"
                                  disabled={isUpdate}
                                />
                              )}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.customerId`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>



                          {/*                         
                          <div className="input-error mb-1 col-4 ">
                            <label className="fw-thin p-0 pb-1 ">
                              Select Customer :
                            </label>
                            <Field name={`deliveryDetails.${index}.customerId`}>
                              {({ field, form }) => (
                                <Field
                                  as="select"
                                  name={`deliveryDetails.${index}.customerId`}
                                  className="w-full h-[3em] border border-[#E6E6E6] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) => {
                                    const selectedCustomer = customer.find(cust => cust._id === e.target.value);
                                    
                                    if (selectedCustomer) {
                                      setInitialValues(prev => ({
                                        ...prev,
                                        deliveryDetails: prev?.deliveryDetails?.map((item, i) => 
                                          i === index ? {
                                            ...item,
                                            customerId: selectedCustomer._id,
                                            address: selectedCustomer.address,
                                            mobileNumber: selectedCustomer.mobileNumber,
                                            email: selectedCustomer.email,
                                            description: selectedCustomer.description,
                                            postCode: selectedCustomer.postCode,
                                            name: selectedCustomer.firstName
                                          } : item
                                        )
                                      }));
                                    } else {
                                      setInitialValues(prev => ({
                                        ...prev,
                                        deliveryDetails: prev.deliveryDetails.map((item, i) => 
                                          i === index ? {
                                            ...item,
                                            address: "",
                                            mobileNumber: "",
                                            email: "",
                                            description: "",
                                            postCode: "",
                                            name: ""
                                          } : item
                                        )
                                      }));
                                    }
                                  }}
                                  style={{
                                    backgroundColor: isUpdate ? "#e9ecef" : "white",
                                  }}
                                  disabled={isUpdate}
                                >
                                  <option value="" className="text-gray-500">
                                    Select Customer
                                  </option>
                                  {customer.map((cust) => (
                                    <option
                                      key={cust._id}
                                      value={cust._id}
                                      className="py-1.5 px-3 hover:bg-gray-100 w-300px flex justify-between"
                                    >
                                      {`${cust.NHS_Number} - ${cust.firstName} ${cust.lastName} - ${cust.address} - ${cust.postCode}`}
                                    </option>
                                  ))}
                                </Field>
                              )}
                            </Field>
                            <ErrorMessage
                              name={`deliveryDetails.${index}.customerId`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div> */}


                          <div
                            key={"parcelsCount"}
                            className="input-error col-12 col-sm-3 mb-1"
                          >
                            <label className="fw-thin p-0 pb-1 ">Parcels Count :</label>
                            <Field
                              type="number"
                              name={`deliveryDetails.${index}.parcelsCount`}
                              onChange={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                }
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
                              disabled={isUpdate}
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
                                  disabled={isUpdate}
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
                                  disabled={isUpdate}
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
                                disabled={isUpdate}
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
                              disabled={isUpdate}
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
                              type="text"
                              name={`deliveryDetails.${index}.email`}
                              className="form-control"
                              placeholder="Delivery Email"
                              disabled={isUpdate}
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
                              disabled={isUpdate}
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
                              `Select Parcel Type (Optional) :`
                            </label>
                            <Select
                              name={`deliveryDetails.${index}.parcelType`}
                              className="form-control p-0"
                              isDisabled={isUpdate}
                              styles={{
                                control: (base) => ({ ...base, height: "3em", backgroundColor: isUpdate ? "#e9ecef" : "white", }),
                              }}
                              options={parcelTypeDetail.map((type) => ({
                                value: type.parcelTypeId,
                                label: type.label
                              }))}
                              value={parcelTypeDetail.find(type => type.parcelTypeId === initialValues.deliveryDetails[index].parcelType)}
                              placeholder="Select Parcel Type"
                              onChange={(selectedOption) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) =>
                                    i === index ? { ...item, parcelType: selectedOption.value } : item
                                  )
                                }));
                              }}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.parcelType`}
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
                              disabled={isUpdate}
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
                              disabled={isUpdate}
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
                              disabled={isUpdate}
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

                      <button className="btn btn-primary mt-3" style={{ display: isSingle ? "none" : "" }} disabled={isUpdate} type="button" onClick={() => {
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
                            parcelType: "",
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
                          onClick={() => { onHide(); navigate("/all-multi-order") }}
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
