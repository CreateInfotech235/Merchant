import React, { useState, useEffect } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
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
import { FixedSizeList as List } from "react-window";
const UpdateOrderModalMulti = ({ onHide, Order, isSingle, setIsUpdate2}) => {
  console.log("Order1234", Order);

  const navigate = useNavigate(); // Fixed duplicate navigate declaration
  const merchant = JSON.parse(localStorage.getItem("userData"));
  const [deliveryMan, setDeliveryMen] = useState([]);
  const [deliveryManId, setDeliveryMenId] = useState(
    Order?.deliveryManId || null
  );
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lengthofdeliverymen, setLengthofdeliverymen] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  console.log(initialValues.deliveryDetails);
  const [parcelTypeDetail, setParcleTypeDetail] = useState([]);
  const [isParcelTypeLoading, setIsParcelTypeLoading] = useState(true);
  const [isclicked, setIsclicked] = useState(false);
  const [searchCustomerList, setSearchCustomerList] = useState([]);


  // Function to get current location and update form fields
  const getCurrentLocation = async (setFieldValue) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });

          // Reverse Geocoding to get the address from coordinates
          try {
            const mapApi = await getMapApi();
            const apiKey = mapApi.data.find(item => item.status == true).mapKey || "";

            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );

            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const address = data.results[0].formatted_address;

              // Update Formik fields
              setFieldValue('pickupDetails.address', address);
              setFieldValue('pickupDetails.location.latitude', latitude);
              setFieldValue('pickupDetails.location.longitude', longitude);

              // toast.success("Pickup address updated using current location.");
            } else {
              toast.error("Unable to retrieve address from current location.");
            }
          } catch (error) {
            console.error("Error during reverse geocoding:", error);
            toast.error("Error retrieving current location address.");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get current location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const selectedCustomer = customer.find(
      (c) => c.email === Order.cutomerEmail
    );
  }, [customer]);

  useEffect(() => {
    const fetchData = async () => {
      const parcelTypeRes = await getMerchantParcelType();
      if (parcelTypeRes.status) {
        setParcleTypeDetail(parcelTypeRes.data);
        setIsParcelTypeLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Get current location on component mount
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

      const deliveryMans = await getAllDeliveryMans({ createdByAdmin: true });
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
      deliveryDetails: Order?.deliveryAddress.map((delivery) => ({
        ...delivery,
        cashOnDelivery: delivery.cashOnDelivery ? "true" : "false",
      })),
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
            if (cashOnDelivery === "true" && !value) {
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
        parcelType2: Yup.array().of(Yup.string())
      })
    ),
  });


  const submitHandler = () => {
    setIsclicked(true);
    setTimeout(() => {
      setIsclicked(false);
    }, 10);
  }

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

    const formattedValues = {
      ...values,
      deliveryDetails: values.deliveryDetails.map((detail) => ({
        ...detail,
        cashOnDelivery: detail.cashOnDelivery === "true",
      })),
    };

    const timestamp = new Date(formattedValues.dateTime).getTime();
    const pictimestamp = new Date(formattedValues.pickupDetails.dateTime).getTime();
    let arrayoferror = [];
    let pickuplocation =
      formattedValues.pickupDetails.location.latitude === null
        ? null
        : {
          latitude: formattedValues.pickupDetails.location.latitude,
          longitude: formattedValues.pickupDetails.location.longitude,
        };
    let deliverylocations = [];

    const arrayofaddress = formattedValues.deliveryDetails.map((delivery, index) => {
      return delivery.address;
    });

    const arrayofpostcode = formattedValues.deliveryDetails.map((delivery, index) => {
      return delivery.postCode;
    });
    const distancesAndDurations = [];

    // Handle pickup location
    if (formattedValues.pickupDetails.address) {
      console.log("pickupDetails.address", formattedValues.pickupDetails.address);

      const mapApi = await getMapApi();
      const apiKey = mapApi.data[0]?.status ? mapApi.data[0].mapKey : "";
      console.log(apiKey);
      console.log(`${formattedValues.pickupDetails.address} ${formattedValues.pickupDetails.postCode}`);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          `${formattedValues.pickupDetails.address} ${formattedValues.pickupDetails.postCode}`
        )}&key=${apiKey}`
      );

      const data = await response.json();
      console.log("pickupdata", data);
      if (data.results && data.results.length > 0) {
        console.log("pickupdata", data);
        const { lat, lng } = data.results[0].geometry.location;
        pickuplocation = { latitude: lat, longitude: lng };
        console.log("pickuplocation", pickuplocation);
        setFieldValue("pickupDetails.location.latitude", lat);
        setFieldValue("pickupDetails.location.longitude", lng);
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
    const mapApiForDelivery = await getMapApi();
    const apiKeyForDelivery = mapApiForDelivery.data[0]?.status ? mapApiForDelivery.data[0].mapKey : "";

    if (arrayofaddress) {
      for (let index = 0; index < arrayofaddress.length; index++) {
        const address = arrayofaddress[index];
        console.log("address", `${address} ${arrayofpostcode[index]}`);
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            `${address} ${arrayofpostcode[index]}`
          )}&key=${apiKeyForDelivery}`
        );
        const data = await response.json();
        console.log("data", data);
        if (data.results && data.results.length > 0) {
          console.log("data", data);
          if (data.status !== "ZERO_RESULTS") {
            const deliverylocation = { latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng };
            // distancesAndDurations.push({status:true,distance:{value:Order?.deliveryAddress,text:"0 km"},duration:{value:0,text:"0 min"}});
            deliverylocations.push(deliverylocation);
          } else {
            console.log("data", data);
            arrayoferror.push(`in order ${index + 1} delivery address (${address} ${arrayofpostcode[index+1]}) not found. Please try again.`);
          }
        } else {
          arrayoferror.push(`in order ${index + 1} delivery address (${address} ${arrayofpostcode[index+1]}) not found. Please try again.`);
        }
      }

      if (arrayoferror.length > 0) {
        console.log("arrayoferror", arrayoferror);
        toast.error(arrayoferror.join("\n"));
        arrayoferror = [];
        setIsUpdate(false);
        return;
      }

      var payload = {
        dateTime: timestamp,
        deliveryManId: formattedValues.deliveryManId,
        pickupDetails: {
          ...formattedValues.pickupDetails,
          dateTime: pictimestamp,
          location: {
            latitude: pickuplocation.latitude,
            longitude: pickuplocation.longitude
          }
        },
        merchant: merchant._id,
        deliveryDetails: formattedValues.deliveryDetails.map((delivery, index) => ({
          address: delivery.address,
          status: delivery.status,
          cashOnDelivery: delivery.cashOnDelivery,
          description: delivery.description,
          email: delivery.email,
          mobileNumber: delivery.mobileNumber,
          name: delivery.name,
          parcelsCount: delivery.parcelsCount,
          postCode: delivery.postCode,
          subOrderId: delivery.subOrderId,
          paymentCollectionRupees: delivery.paymentCollectionRupees,
          distance: Order?.deliveryAddress.find((item) => item.subOrderId === delivery.subOrderId)?.distance || 0,
          duration: Order?.deliveryAddress.find((item) => item.subOrderId === delivery.subOrderId)?.duration || "0 min",
          // parcelType: delivery?.parcelType || "",
          pickupsignature: Order?.deliveryAddress.find((item) => item.subOrderId === delivery.subOrderId)?.pickupsignature || "",
          deliverysignature: Order?.deliveryAddress.find((item) => item.subOrderId === delivery.subOrderId)?.deliverysignature || "",
          reason: delivery.reason || "",
          parcelType2: delivery?.parcelType2 || [],
          location: {
            latitude: deliverylocations[index]?.latitude,
            longitude: deliverylocations[index]?.longitude
          },
          description: delivery.description || "",
          customerId: delivery.customerId,
        }))
      };
      console.log("payload", payload);

      const res1 = await orderUpdateMulti(Order._id, payload, Order);
      console.log("res1", res1);
      if (res1.status) {
        console.log("res1", res1);
        onHide();
        setIsUpdate(prev => !prev);
        setIsUpdate2(prev => !prev);
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


  const statusColors = {
    CREATED: "gray",
    ASSIGNED: "blue",
    ACCEPTED: "green",
    CANCELLED: "red",
    UNASSIGNED: "red",
    DELIVERED: "teal",
    PICKED_UP: "orange",
    DEPARTED: "#F8AC1FFF",
    ARRIVED: "purple",
  };

  const getColorClass = (status) =>
    `${statusColors[status]?.toLowerCase() || "default"}`;


    // Custom MenuList component for react-select using react-window
    const MenuList = (props) => {
      const { options, children, maxHeight, getValue } = props;
      const height = 30;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;
  
      return (
        <List
          height={maxHeight}
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    };



    const filterOptions = (option, inputValue) => {
      const normalizedInput = inputValue?.toLowerCase().trim();
      const inputParts = normalizedInput?.split(' '); // Split the input by spaces
      const label = option?.label?.trim().toLowerCase();
      return inputParts.every(part => label.includes(part)); // Check if all parts are included in the label
    };

  return (
    <Modal show={true} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Update Order {Order.orderId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, errors }) => {
            // Set customer IDs when initialValues change

            useEffect(() => {
              console.log(initialValues, 'initialValues123');
              console.log(values, 'values123');
              initialValues.deliveryDetails?.forEach((detail, index) => {
                setFieldValue(`deliveryDetails.${index}.customerId`, detail?.customerId ?? "");
              });
            }, [initialValues, setFieldValue]);

            if (Object.keys(errors).length > 0) {
              if (isclicked) {  
                console.log(errors, 'errors');
                if (errors?.pickupDetails) {
                  document.getElementById("pickup-information")?.scrollIntoView({ behavior: 'smooth' });
                }else if (errors?.deliveryManId) {
                  document.getElementById("delivery-information")?.scrollIntoView({ behavior: 'smooth' });
                }else if (errors?.deliveryDetails) {
                  var fas = false;
                  errors?.deliveryDetails.forEach((error, index) => {
                    if (error && !fas) {
                      document.getElementById(`delivery-information-${index}`)?.scrollIntoView({ behavior: 'smooth' });
                      fas = true;
                    }
                  });
                }
              }
            }

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
                  <div className="col-12 col-lg-12 row" style={{ display: isSingle ? "none" : "" }} id="pickup-information">
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
                        // onChange={(e) => {
                        //   setFieldValue('pickupDetails.dateTime', e.target.value);
                        // }}
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
                        // onChange={(e) => {
                        //   setFieldValue('pickupDetails.postCode', e.target.value);
                        // }}
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
                          // onChange={(e) => {
                          //   setFieldValue('pickupDetails.address', e.target.value);
                          // }}
                        />
                        <ErrorMessage
                          name="pickupDetails.address"
                          component="div"
                          className="error text-danger ps-2"
                        />
                      </div>
                      <div className="col-4">
                        {/* Use Current Location Button */}
                        <button
                          type="button"
                          className="btn btn-primary rounded w-100"
                          style={{
                            height: "3em",
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

                    {/* Additional Pickup Fields */}
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
                        // onChange={(e) => {
                        //   setFieldValue('pickupDetails.mobileNumber', e.target.value);
                        // }}
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
                        // onChange={(e) => {
                        //   setFieldValue('pickupDetails.name', e.target.value);
                        // }}
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
                        // onChange={(e) => {
                        //   setFieldValue('pickupDetails.email', e.target.value);
                        // }}
                      />
                      <ErrorMessage
                        name="pickupDetails.email"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>

                    <div className="input-error mb-1 col-3">
                      <label className="fw-thin p-0 pb-1 ">
                        Pickup Instruction (Optional) :
                      </label>
                      <Field
                        as="textarea"
                        name="pickupDetails.description"
                        className="form-control h-[70px]"
                        placeholder="Pickup Instruction"
                        rows="3"
                        style={{
                          border: "1px solid #E6E6E6",
                          borderRadius: "5px",
                          height: "3em",
                        }}
                        disabled={isUpdate}
                        // onChange={(e) => {
                        //   setFieldValue('pickupDetails.description', e.target.value);
                        //  }}
                      />
                      <ErrorMessage
                        name="pickupDetails.description"
                        component="div"
                        className="error text-danger ps-2"
                      />
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="col-12 col-lg-12 mt-2" id="delivery-information">
                    <h3 className="fw-bold text-4xl pb-1 text-center">
                      Delivery Information
                    </h3>

                    {/* Select Delivery Man */}
                    <div className="input-error col-12 col-sm-6 mb-1">
                      <label className="fw-thin p-0 pb-1 ">
                        Select Delivery Man :
                      </label>
                      <Field
                        as="select"
                        name={`deliveryManId`}
                        className={`w-full h-[3em] border border-[#E6E6E6] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!(Order?.deliveryAddress?.every(
                          subOrder => subOrder?.status === "ASSIGNED" || subOrder?.status === "ARRIVED"
                        )) ? "cursor-not-allowed" : ""}`}
                        style={{
                          backgroundColor: isUpdate ? "#e9ecef" : "white",
                        }}
                        disabled={isUpdate || !(Order?.deliveryAddress?.every(
                          subOrder => subOrder?.status === "ASSIGNED" || subOrder?.status === "ARRIVED"
                        ))}
                      >
                        {console.log(Order, "Order?.deliveryDetails")}
                        <option value="" className="text-gray-500">
                          {isLoading ? "Loading..." : "Select Delivery Man"}
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
                              <React.Fragment key={index}>
                                <option
                                  value="admin"
                                  className="text-center bg-[#bbbbbb] text-[#ffffff] font-bold text-[1.25rem] py-[0.5rem]"
                                  disabled
                                >
                                  Admin
                                </option>
                                <option
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
                              </React.Fragment>
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

                    {/* Delivery Details */}
                    {values.deliveryDetails?.map((data, index) => (
                      <div className={`row shadow rounded-md ${index !== 0 ? "mt-4" : "mt-2"}  ${ data?.trashed === true ? "cursor-not-allowed" : (data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "" : "cursor-not-allowed"}  ${data?.trashed === true ? "bg-[#dcdcdc]" : (data?.status !== "ASSIGNED" && data?.status !== "ARRIVED") ? "bg-[#dcdcdc]" : ""}   `} key={index} style={{ display: isSingle ? (isSingle !== index + 1 ? "none" : "") : "" }} id={`delivery-information-${index}`}>
                        <div className="col-12 col-lg-12 text-black font-bold text-2xl p-3 flex justify-between">
                          <div className="d-flex justify-between w-100">
                            <div>
                            {`Delivery Information ${index + 1}`}
                            </div>
                           
                            <div style={{fontSize: "1rem",marginRight: "10px"}} >
                            Order Status : <span style={{color: getColorClass(data?.status)}}>{`${data?.status?.replace("_", " ")[0].toUpperCase() + data?.status?.replace("_", " ").slice(1).toLowerCase()}`}</span>
                            </div>
                          </div>
                          <div>
                            {values.deliveryDetails.length > 1 && !isUpdate && (
                              <button
                                className={`btn btn-danger ${ data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                                type="button"
                                style={{
                                  display: isSingle ? "none" : "block",
                                  visibility: "visible"
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const updatedDetails = values.deliveryDetails.filter((_, i) => i !== index);
                                  setFieldValue('deliveryDetails', updatedDetails);
                                }}
                                disabled={ data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                              >
                                Delete
                              </button>
                            )}

                          </div>
                        </div>
                        {data?.trashed === true ? <div style={{fontSize: "1rem",marginRight: "10px",color: "red"}} >
                             Order in Trashed
                            </div> :null
                            }

                        {/* Select Customer */}
                        <div className="input-error mb-1 col-12" style={{ border: "none" }}>
                          <label className="fw-thin p-0 pb-1">
                            Select Customer :
                          </label>
                          <Select
                              name={`deliveryDetails.${index}.customerId`}
                              className="form-control mb-1 p-0"
                              isDisabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                              styles={{
                                control: (base) => ({ ...base, height: "3em", backgroundColor: isUpdate ? "#e9ecef" : "white", }),
                              }}
                              options={customer?.map((cust) => ({
                                value: cust?._id.toString(),
                                label: ` ${cust?.NHS_Number} - ${cust?.firstName}  ${cust?.lastName}  -  ${cust?.address}  -  ${cust?.postCode}`,
                                 ...cust
                              }))}
                              placeholder={isLoading ? "Loading..." : "Select Customer"}
                              isClearable
                              filterOption={filterOptions}
                              components={{MenuList}}
                              value={customer.find(cust => cust._id === values.deliveryDetails[index]?.customerId) ? {
                                label: `${customer.find(cust => cust._id === values.deliveryDetails[index]?.customerId).NHS_Number} - ${customer.find(cust => cust._id === values.deliveryDetails[index]?.customerId).firstName} ${customer.find(cust => cust._id === values.deliveryDetails[index]?.customerId).lastName} - ${customer.find(cust => cust._id === values.deliveryDetails[index]?.customerId).address} - ${customer.find(cust => cust._id === values.deliveryDetails[index]?.customerId).postCode}`,
                                value: values.deliveryDetails[index]?.customerId,
                                customer: customer.find(cust => cust._id === values.deliveryDetails[index]?.customerId)
                              } : null}
                              onChange={(selectedOption) => {
                                if (selectedOption) {
                                  setFieldValue(`deliveryDetails.${index}.customerId`, selectedOption?.value.toString());
                                  setFieldValue(`deliveryDetails.${index}.address`, selectedOption?.address);
                                  setFieldValue(`deliveryDetails.${index}.mobileNumber`, selectedOption?.mobileNumber);
                                  setFieldValue(`deliveryDetails.${index}.email`, selectedOption?.email);
                                  setFieldValue(`deliveryDetails.${index}.postCode`, selectedOption?.postCode);
                                  setFieldValue(`deliveryDetails.${index}.name`, `${selectedOption?.firstName} ${selectedOption?.lastName}`);
                                } else {
                                  setFieldValue(`deliveryDetails.${index}.customerId`, "");
                                  setFieldValue(`deliveryDetails.${index}.address`, "");
                                  setFieldValue(`deliveryDetails.${index}.mobileNumber`, "");
                                  setFieldValue(`deliveryDetails.${index}.email`, "");
                                  setFieldValue(`deliveryDetails.${index}.postCode`, "");
                                  setFieldValue(`deliveryDetails.${index}.name`, "");
                                }
                              }}
                            />
                          <ErrorMessage
                            name={`deliveryDetails.${index}.customerId`}
                            component="div"
                            className="error text-danger ps-2"
                          />
                        </div>

                        {/* Customer Name */}
                        <div className="input-error mb-1 col-4">
                          <label className="fw-thin p-0 pb-1 ">
                            Customer Name :
                          </label>
                          <Field
                            type="text"
                            name={`deliveryDetails.${index}.name`}
                            className={`form-control ${data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                            placeholder="Customer Name"
                            disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                            // onChange={(e) => {
                            //   setFieldValue(`deliveryDetails.${index}.name`, e.target.value);
                            // }}
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


                        {/* Parcels Count */}
                        <div className="input-error col-12 col-sm-3 mb-1">
                          <label className="fw-thin p-0 pb-1">Parcels Count :</label>
                          <Field
                            type="number"
                            name={`deliveryDetails.${index}.parcelsCount`}
                            onChange={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                              }
                              const value = e.target.value;
                              setFieldValue(`deliveryDetails.${index}.parcelsCount`, Number(value ? value : "0"));
                            }}
                            onWheel={(e) => e.currentTarget.blur()}
                            className={`form-control ${data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                            placeholder={`ParcelsCount`}

                            style={{
                              height: "3em",
                              border: "1px solid #E6E6E6",
                              borderRadius: "5px",
                            }}
                            disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                          />
                          <ErrorMessage
                            name={`deliveryDetails.${index}.parcelsCount`}
                            component="div"
                            className="error text-danger ps-2"
                          />
                        </div>

                        {/* Cash on Delivery */}
                        <div className="input-error col-12 col-sm-2 mb-1">
                          <label className="fw-thin p-0 pb-1 ">
                            Cash on Delivery :
                          </label>

                          <div className="d-flex align-items-center justify-evenly">
                            {/* True Option */}
                            <label className="me-3">
                              <Field
                                type="radio"
                                name={`deliveryDetails.${index}.cashOnDelivery`}
                                value="true"
                                disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
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
                                value="false"
                                disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
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

                        {/* Payment Collection */}
                        {values.deliveryDetails[index].cashOnDelivery === "true" && (
                          <div className="input-error col-12 col-sm-3 mb-1">
                            <label className="fw-thin p-0 pb-1 ">
                              Payment Collection : Amount
                            </label>
                            <Field
                              as="input"
                              name={`deliveryDetails.${index}.paymentCollectionRupees`}
                              type="number"
                              onChange={(e) => {
                                const value = e.target.value;
                                setFieldValue(`deliveryDetails.${index}.paymentCollectionRupees`, Number(value ? value : "0"));
                              }}

                              onWheel={(e) => e.currentTarget.blur()}
                              className="form-control mt-0"
                              disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                              style={{ height: "3em", border: "1px solid #E6E6E6", scrollbarWidth: "none" }}
                              placeholder="Enter Payment Collection pounds"

                            />
                            <ErrorMessage
                              name={`deliveryDetails.${index}.paymentCollectionRupees`}
                              component="div"
                              className="error text-danger ps-2"
                            />
                          </div>
                        )}

                        
                        {/* Delivery Email */}
                        <div className="input-error mb-1 col-4">
                          <label className="fw-thin p-0 pb-1 ">
                            Delivery Email :
                          </label>
                          <Field
                            type="text"
                            name={`deliveryDetails.${index}.email`}
                            className={`form-control ${data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                            placeholder="Delivery Email"
                            disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                            // onChange={(e) => {
                            //   setFieldValue(`deliveryDetails.${index}.email`, e.target.value);
                            // }}
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

                        {/* Delivery Contact Number */}
                        <div className="input-error mb-1 col-4">
                          <label className="fw-thin p-0 pb-1 ">
                            Delivery Contact Number :
                          </label>
                          <Field
                            type="text"
                            name={`deliveryDetails.${index}.mobileNumber`}
                            className={`form-control ${data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                            placeholder="Delivery Contact Number"
                            disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                            onChange={(e) => {
                              setFieldValue(`deliveryDetails.${index}.mobileNumber`, e.target.value.replace(/[^0-9-()]/g, ''));
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

                        {/* Select Parcel Type */}



                        <div className="input-error mb-1 col-4">
                          <label className="fw-thin p-0 pb-1 ">
                            Select Parcel Type (Optional):
                          </label>
                          <Select
                            name={`deliveryDetails.${index}.parcelType2`}
                            className={`form-control p-0 ${data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                            styles={{
                              control: (base) => ({ ...base, minHeight: "3em", backgroundColor: isUpdate ? "#e9ecef" : "white", }),
                            }}
                            options={parcelTypeDetail.map((type) => ({
                              value: type.parcelTypeId,
                              label: type.label
                            }))}
                            value={values?.deliveryDetails[index]?.parcelType2?.map(id => ({
                              value: id.toString(),
                              label: parcelTypeDetail.find(t => t.parcelTypeId.toString() == id.toString())?.label
                            }))}
                            placeholder={isParcelTypeLoading ? "Loading..." : "Select Parcel Types"}
                            onChange={(selectedOptions) => {
                              setFieldValue(`deliveryDetails.${index}.parcelType2`, selectedOptions.map(opt => opt.value));
                            }}
                            isMulti={true}
                            isDisabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                          />

                          {/* <Select
                            name={`deliveryDetails.${index}.parcelType2`}
                            className="form-control p-0"
                            styles={{
                              control: (base) => ({ ...base, minHeight: "3em", backgroundColor: isUpdate ? "#e9ecef" : "white", }),
                            }}
                            options={parcelTypeDetail.map((type) => ({
                              value: type.parcelTypeId,
                              label: type.label
                            }))}
                            value={isParcelTypeLoading ? [] : initialValues?.deliveryDetails[index]?.parcelType2?.map(id => ({
                              value: id,
                              label: parcelTypeDetail.find(t => t.parcelTypeId === id)?.label
                            }))}
                            placeholder={`${isParcelTypeLoading ? "Loading..." : "Select Parcel Types"}`}
                            onChange={(selectedOptions) => {
                              console.log(selectedOptions, 'selectedOptions');
                              console.log(values.deliveryDetails[index].parcelType2, 'values.deliveryDetails[index].parcelType2');
                              
                              
                              setFieldValue(`deliveryDetails.${index}.parcelType2`, selectedOptions.map(opt => opt.value));
                            }}
                            // onChange={(selectedOptions) => {
                            //   setFieldValue(`deliveryDetails.${index}.parcelType2`, selectedOptions.map(opt => opt.value));
                            // }}
                            isMulti={true}
                          /> */}
                          {!isParcelTypeLoading && parcelTypeDetail.length === 0 && (
                            <Link
                            
                                  to="/multi-order-parcel"
                                  className="btn btn-primary mt-2"
                                >
                                  Go to create Parcel Types
                                </Link>
                          )}
                          <ErrorMessage
                            name={`deliveryDetails.${index}.parcelType2`}
                            component="div"
                            className="error text-danger ps-2"
                          />
                        </div>






                        {/* Delivery Postcode */}
                        <div className="input-error mb-1 col-4">
                          <label className="fw-thin p-0 pb-1 ">
                            Delivery Postcode :
                          </label>
                          <Field
                            type="text"
                            name={`deliveryDetails.${index}.postCode`}
                            className={`form-control w-25% h-100% ${data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                            disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                            onChange={(e) => {
                              setFieldValue(`deliveryDetails.${index}.postCode`, e.target.value);
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

                        {/* Delivery Address */}
                        <div className="input-error mb-1 col-4">
                          <label className="fw-thin p-0 pb-1 ">
                            Delivery Address :
                          </label>
                          <Field
                            type="text"
                            as="textarea"
                            name={`deliveryDetails.${index}.address`}
                            className={`form-control w-25% h-100% ${data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                            disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                            onChange={(e) => {
                              setFieldValue(`deliveryDetails.${index}.address`, e.target.value);
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

                        {/* Delivery Instruction */}
                        <div className="input-error mb-3 col-4">
                          <label className="fw-thin p-0 pb-1 ">
                            Delivery Instruction (Optional) :
                          </label>
                          <Field
                            as="textarea"
                            name={`deliveryDetails.${index}.description`}
                            className={`form-control ${data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED") ? "cursor-not-allowed" : ""}`}
                            placeholder="Delivery Instruction"
                            disabled={isUpdate || data?.trashed === true || !(data?.status === "ASSIGNED" || data?.status === "ARRIVED")}
                            rows="2"
                            onChange={(e) => {
                              setFieldValue(`deliveryDetails.${index}.description`, e.target.value);
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

                    {/* Add Delivery Information Button and Submit Controls */}
                    <div className={`d-flex mt-2 ${isSingle ? "justify-content-end" : "justify-content-between"}`}>

                      <button className="btn btn-primary mt-3" type="button" style={{ display: isSingle ? "none" : "" }} disabled={isUpdate} onClick={() => {
                        setFieldValue('deliveryDetails', [...values.deliveryDetails, {
                          subOrderId: Math.max(...values.deliveryDetails.map(item => item.subOrderId), 0) + 1,
                          index: values.deliveryDetails.length,
                          status: `${Order?.status == "ARRIVED" ? "ARRIVED" : "ASSIGNED"}`,
                          address: "",
                          cashOnDelivery: "false",
                          description: "",
                          distance: 0,
                          duration: "0 min",
                          email: "",
                          mobileNumber: "",
                          location: {
                            latitude: 0,
                            longitude: 0
                          },
                          name: "",
                          parcelsCount: 1,
                          paymentCollectionRupees: "0",
                          postCode: "",
                          customerId: "",
                          parcelType: "",
                          trashed: false
                        }]);
                      }}>
                        + Add Delivery Information
                      </button>
                      <ErrorMessage
                        name="deliveryDetails"
                        component={({ error }) => {
                          console.log("Delivery Details Error:", error);
                          return (
                            <div className="error text-danger ps-2">
                              {error}
                            </div>
                          );
                        }}
                      />

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
                          onClick={() => {
                            submitHandler();
                          }}
                        >
                          {isUpdate ? "Order updating..." : "Update Order"}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Parcel Types */}
                {/* ... any additional code ... */}

              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderModalMulti;