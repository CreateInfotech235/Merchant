import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import "./CreateOrder.css";
import { useNavigate } from "react-router-dom";
import { calculateDistancee, createOrder, createOrderMulti } from "../../Components_merchant/Api/Order";
import {
  getDeliveryMan,
  getAllDeliveryMans,
} from "../../Components_merchant/Api/DeliveryMan";
import { getAllCustomers } from "../../Components_merchant/Api/Customer";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { getMapApi } from "../../Components_admin/Api/MapApi";
import { toast } from "react-toastify";
import { getMerchantParcelType } from "../../Components_merchant/Api/ParcelType";

const MultiOrders = () => {
  const naviagte = useNavigate();

  const [deliveryMan, setDeliveryMen] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [lengthofdeliverymen, setLengthofdeliverymen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const merchant = JSON.parse(localStorage.getItem("userData"));
  const [initialValues, setInitialValues] = useState({});
  const [newarrayoflocation, setNewarrayoflocation] = useState([]);
  const [parcelTypeDetail, setParcelTypeDetail] = useState([]);
  // const [isSubmit, setIsSubmit] = useState(false);




  useEffect(() => {
    console.log("initialValues", initialValues);
    console.log("newarrayoflocation", newarrayoflocation);
  }, [initialValues, newarrayoflocation]);

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



    // function calculateDistanceandtimeandset (pickupLocation, deliveryLocation, index)  {
    //   console.log("enter calculateDistanceandtimeandset");
    //   const distance = calculateDistancee(pickupLocation, deliveryLocation);
    //   const duration = await calculateDistancee(pickupLocation, deliveryLocation);
    //   // setNewarrayoflocation(prev => [...prev, { distance, duration, index }]);
    // }


    // const calculateDistanceandtimeandset = async (pickupLocation, deliveryLocation, index) => {
    //   // const distance = calculateDistancee(pickupLocation, deliveryLocation);
    //   console.log("enter calculateDistanceandtimeandset");

    //   const duration = await calculateDistancee(pickupLocation, deliveryLocation);
    //   console.log("duration", duration);

    //   // setNewarrayoflocation(prev => [...prev, { distance, duration, index }]);
    // }



    const fetchData = async () => {
      const customerRes = await getAllCustomers();
      const deliveryMans = await getAllDeliveryMans();
      const parcelTypeRes = await getMerchantParcelType();
      if(parcelTypeRes.status){
        setParcelTypeDetail(parcelTypeRes.data);
      }

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
      console.log(customerRes);
      
      if (customerRes?.status) {
      const filteredCustomer = customerRes?.data?.filter(customer => customer.trashed == false);
      console.log(filteredCustomer);
        setCustomer(filteredCustomer || []);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
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

  const getCurrentLocation = async (setFieldValue) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const mapApi = await getMapApi();
          console.log(mapApi.data[0]);
          const apiKey = mapApi.data[0]?.status ? mapApi.data[0].mapKey : "";

          // Fetch the formatted address using reverse geocoding
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          // console.log(data);
          if (data.results && data.results.length > 0) {
            const formattedAddress =
              data.results[0].formatted_address || "Unable to fetch address";
            const postalCodeComponent = data.results[0].address_components.find(
              (component) => component.types.includes("postal_code")
            );
            const postalCode = postalCodeComponent
              ? postalCodeComponent.long_name
              : "";

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
      const mapApi = await getMapApi();
      console.log(mapApi.data[0]);
      const apiKey = mapApi.data[0]?.status ? mapApi.data[0].mapKey : "";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const data = await response.json();
      console.log(data);

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location; // Correctly extract latitude and longitude
        const formattedAddress =
          data.results[0]?.formatted_address || "Unable to fetch address";

        // console.log(formattedAddress, lat, lng);
        const postalCodeComponent = data.results[0].address_components.find(
          (component) => component.types.includes("postal_code")
        );
        const postalCode = postalCodeComponent
          ? postalCodeComponent.long_name
          : "";

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

  useEffect(() => {
    async function setInitialValuesdata() {
      await setInitialValues(
        {
          dateTime: new Date(),
          deliveryManId: "",
          pickupDetails: {
            location: {
              latitude: null, // Initialize with null or undefined
              longitude: null, // Empty array or [longitude, latitude]
            },
            dateTime: new Date().toISOString().slice(0, 16),
            merchantId: merchant._id || "",
            address:
              `${merchant?.address?.street} , ${merchant?.address?.city} , ${merchant?.address?.postalCode} , ${merchant?.address?.country}` ||
              "",
            // countryCode: merchant.countryCode || "",
            mobileNumber: merchant.contactNumber || "",
            email: merchant.email || "",
            name: `${merchant.firstName} ${merchant.lastName}` || "",
            description: "",
            postCode: merchant?.address?.postalCode || "",
          },
          deliveryDetails: [{
            subOrderId: 1,
            parcelsCount: 1,
            paymentCollectionRupees: 0,
            location: {
              latitude: null, // Initialize with null or undefined
              longitude: null, // Empty array or [longitude, latitude]
            },
            address: "",
            // countryCode: "",
            mobileNumber: "",
            parcelType: "",
            name: "",
            email: "",
            description: "",
            postCode: "",
            cashOnDelivery: "false",
            distance: "",
            duration: "",
          }],
        }
      );
    }
    setInitialValuesdata();
  }, []);

  // useEffect(() => {

  //   var name = initialValues;
  //   console.log("initialValues", initialValues);
  //   // setInitialValues({
  //   //   ...initialValues,
  //   //   deliveryDetails: DeliveryInformation,
  //   // });
  // }, [DeliveryInformation]);


  const validationSchema = Yup.object().shape({
    dateTime: Yup.date().required("Required"),
    deliveryManId: Yup.string().required("Required Delivery Man"),
    pickupDetails: Yup.object().shape({
      dateTime: Yup.date().required("Required Pickup Date & Time"),
      address: Yup.string().required("Required Pickup Address"),
      mobileNumber: Yup.string().required("Required Pickup Contact Number"),
      email: Yup.string().email("Invalid email").required("Required Pickup Email"),
      description: Yup.string(),
      postCode: Yup.string().required("Required Pickup Postcode"),
    }),
    deliveryDetails: Yup.array().of(
      Yup.object().shape({
        address: Yup.string().required("Required Delivery Address"),
        name: Yup.string(),
        mobileNumber: Yup.string(),
        email: Yup.string(),
        description: Yup.string(),
        postCode: Yup.string().required("Required Delivery Postcode"),
        parcelsCount: Yup.number()
          .required("Required Delivery Parcel Count")
          .positive("Must be positive")
          .min(1),
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
        parcelType: Yup.string().optional(),
      })
    )
  });

  const calculateDistanceeinMiles = (value) => {
    console.log("value", value);
    return ((parseFloat(value.distance.text.replace(/[^\d.]/g, "")) * 0.621371).toFixed(2));
  }




  const onSubmit = async (values, { setFieldValue }) => {

    setIsOrderCreated(true);
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


    const arrayofpostcode= values.deliveryDetails.map((delivery, index) => {
      return delivery.postCode;
    })
    const distancesAndDurations = []
    // const deliverylocations =[]



    // get pickup location from address
    console.log(values.pickupDetails.address);
    
    if (values.pickupDetails.address) {
      console.log("pickupDetails.address", values.pickupDetails.address);

      const mapApi = await getMapApi();
      const apiKey = mapApi.data[0]?.status ? mapApi.data[0].mapKey : "";
console.log(apiKey);

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
        setIsOrderCreated(false);
        return;
      }
    } else {
      toast.error("Please enter a pickup address.");
      setIsOrderCreated(false);
      return;
    }

    // Handle Delivery Locations
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
        if (data.results && data.results.length > 0) {
          console.log("data", data);
          if (data.status !== "ZERO_RESULTS") {   
            const deliverylocation = { latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng };
            distancesAndDurations.push(await calculateDistancee(pickuplocation, deliverylocation))
            deliverylocations.push(deliverylocation)
          } else {
            console.log("data", data);
            arrayoferror.push(`in order ${index + 1} delivery address (${address}) not found. Please try again.`);
          }
        } else {
          arrayoferror.push(`in order ${index + 1} delivery address (${address}) not found. Please try again.`);
        }

      }

      if (arrayoferror.length > 0) {
        console.log("arrayoferror", arrayoferror);
        toast.error(arrayoferror.join("\n"));
        setIsOrderCreated(false);
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
          distance: calculateDistanceeinMiles(distancesAndDurations[index]),
          duration: distancesAndDurations[index]?.duration.text,
          parcelType: delivery.parcelType,
          location: {
            latitude: deliverylocations[index]?.latitude,
            longitude: deliverylocations[index]?.longitude
          },
          description: delivery.description,
        }))
      };
      console.log("payload", payload);

      const res1 = await createOrderMulti(payload);
      console.log("res1", res1);
      if (res1.status) {
        console.log("res1", res1);
        naviagte("/all-multi-order");
      }
      return;
    } else {
      toast.error("Please enter delivery address");
      setIsOrderCreated(false);
    }

    if (arrayoferror.length > 0) {
      toast.error(arrayoferror.join("\n"));
      setIsOrderCreated(false);
    }
    setIsOrderCreated(false);
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
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          onKeyDown={(e)=>{if(e.key === 'Enter'){
            e.preventDefault();
            onSubmit(values, { setFieldValue });
          }}}
          
        >
          {({ setFieldValue, values }) => {
            return (
              <Form className="create-order">

                <div className="pick-up mt-2 row">

                  {/* Pickup Information */}
                  <div className="col-12 col-lg-12 row">
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
                        disabled={isOrderCreated}
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
                        disabled={isOrderCreated}
                      />
                      <ErrorMessage
                        name="pickupDetails.postCode"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                    <div className="row col-6">
                      <div className="input-error mb-1 col-9">
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
                        disabled={isOrderCreated}

                        />
                        <ErrorMessage
                          name="pickupDetails.address"
                          component="div"
                          className="error text-danger ps-2"
                        />
                      </div>
                      <div className="col-3 "  >
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
                          disabled={isOrderCreated}
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
                        disabled={isOrderCreated}
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
                        disabled={isOrderCreated}
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
                        disabled={isOrderCreated}
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
                        disabled={isOrderCreated}
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
                        disabled={isOrderCreated}
                        style={{
                          backgroundColor: isOrderCreated ? "#e9ecef" : "white",
                        }}
                      >
                        <option value="" className="text-gray-500">
                          Select Delivery Man
                        </option>
                        {deliveryMan.map((data, index) => {
                         console.log("data", data);
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
                                  disabled={isOrderCreated} 
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
                      values.deliveryDetails.map((data, index) => (
                        <div className={`row shadow  rounded-md ${index !== 0 ? "mt-4" : "mt-2"}`} key={index}>

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
                                      deliveryDetails: prev.deliveryDetails.filter((_, i) => i !== index)
                                    }));
                                  }}>
                                    Remove
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
                              isDisabled={isOrderCreated}

                              styles={{
                                control: (base) => ({ ...base, height: "3em",backgroundColor: isOrderCreated ? "#e9ecef" : "white",}),
                              }}
                              options={customer.map((cust) => ({
                                value: cust._id,
                                label: ` ${cust.NHS_Number} - ${cust.firstName}  ${cust.lastName}  -  ${cust.email}  -  ${cust.mobileNumber}`,
                                ...cust,
                              }))}
                              placeholder="Select Customer"
                              isClearable
                              filterOption={(option, inputValue) => {
                                const data = option.data;
                                const searchValue = inputValue.toLowerCase();

                                return (
                                  data.NHS_Number.toLowerCase().includes(searchValue) ||
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
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, customerId: selectedOption.value } : item)
                                  }));
                                  setInitialValues(prev => ({
                                    ...prev,
                                    deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, address: selectedOption.address } : item)
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
                              disabled={isOrderCreated}
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
                                  disabled={isOrderCreated}
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
                                  disabled={isOrderCreated}
                                />
                                No
                              </label>
                            </div>
                          </div>
                          {values?.deliveryDetails[index]?.cashOnDelivery === "true" && (
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
                                disabled={isOrderCreated}

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
                              Customer Name (Optional) :
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
                              disabled={isOrderCreated}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.name`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>





                          <div className="input-error mb-1 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Delivery Email (Optional) :
                            </label>
                            <Field
                              type="text"
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
                              disabled={isOrderCreated}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.email`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>


                          <div className="input-error mb-1 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Delivery Contact Number (Optional) :
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
                              disabled={isOrderCreated}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.mobileNumber`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>
                          
                          <div className="input-error mb-1 col-4">
                            <label className="fw-thin p-0 pb-1 ">
                              Select Parcel Type (Optional):
                            </label>
                            <Select
                              name={`deliveryDetails.${index}.parcelType`}
                              className="form-control p-0"
                              styles={{
                                control: (base) => ({ ...base, height: "3em",backgroundColor: isOrderCreated ? "#e9ecef" : "white",}),
                              }}
                              options={parcelTypeDetail.map((type) => ({
                                value: type.parcelTypeId,
                                label: type.label
                              }))}
                              placeholder="Select Parcel Type"
                              onChange={(selectedOption) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => 
                                    i === index ? { ...item, parcelType: selectedOption.value } : item
                                  )
                                }));
                              }}
                              isDisabled={isOrderCreated}
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
                              onChange={(e) => {
                                setInitialValues(prev => ({
                                  ...prev,
                                  deliveryDetails: prev.deliveryDetails.map((item, i) => i === index ? { ...item, postCode: e.target.value } : item)
                                }));
                              }}
                              placeholder="Delivery Postcode"
                              style={{ height: "3em", border: "1px solid #E6E6E6" }}
                              disabled={isOrderCreated}
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
                              disabled={isOrderCreated}
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
                              disabled={isOrderCreated}
                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.description`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>

                        </div>
                      ))}

                    <div className="d-flex justify-content-between mt-2">

                      <button className="btn btn-primary mt-3" type="button" disabled={isOrderCreated}   onClick={() => {
                        
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
                        + Add Another Delivery
                      </button>

                      {/* Submit Button */}
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-secondary mt-1 me-4"
                          onClick={() => naviagte("/all-multi-order")}
                          style={{ height: "3em" }}
                          // disabled={isOrderCreated}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary mt-1"
                          style={{ height: "3em" }}
                          disabled={isOrderCreated}
                        >
                          {isOrderCreated ? "Order creating..." : "Create Order"}
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
      )}
    </>
  );
};

export default MultiOrders;
