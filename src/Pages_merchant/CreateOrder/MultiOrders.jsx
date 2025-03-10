import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CreateOrder.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrderMulti, reassignOrder } from "../../Components_merchant/Api/Order";
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
import { FixedSizeList as List } from 'react-window';
import { Autocomplete, TextField } from "@mui/material";


const MultiOrders = () => {
  const naviagte = useNavigate();

  const [deliveryMan, setDeliveryMen] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [lengthofdeliverymen, setLengthofdeliverymen] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const merchant = JSON.parse(localStorage.getItem("userData"));
  const [initialValues, setInitialValues] = useState({});
  const [newarrayoflocation, setNewarrayoflocation] = useState([]);
  const [parcelTypeDetail, setParcelTypeDetail] = useState([]);
  const [searchCustomerList, setSearchCustomerList] = useState([]);
  const [fullCustomerList, setFullCustomerList] = useState([]);
  const [isReassign, setIsReassign] = useState(false);
  // const [isSubmit, setIsSubmit] = useState(false);
  console.log("deliveryMan", deliveryMan);



  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [isDeliveryManLoading, setIsDeliveryManLoading] = useState(false);
  const [isParcelTypeLoading, setIsParcelTypeLoading] = useState(false);
  const [isclicked, setIsclicked] = useState(false);


  useEffect(() => {
    setSearchCustomerList(customer);
  }, [customer]);

  useEffect(() => {
    console.log("initialValues", initialValues);
    console.log("newarrayoflocation", newarrayoflocation);
  }, [initialValues, newarrayoflocation]);



  const submitHandler = () => {
    setIsclicked(true);
    setTimeout(() => {
      setIsclicked(false);
    }, 10);
  }




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

    const getParcelType = async () => {
      try {
        setIsParcelTypeLoading(true);
        const parcelTypeRes = await getMerchantParcelType();

        if (parcelTypeRes.status) {
          const nowdata = parcelTypeRes.data.filter((type) => type.status === "ENABLE");
          setParcelTypeDetail(nowdata);
          setIsParcelTypeLoading(true);
        }
      } catch (error) {
        console.error("Error fetching parcel types:", error);
      } finally {
        setIsParcelTypeLoading(false);
      }
    }

    const getCustomer = async () => {
      try {
        setIsCustomerLoading(true);
        const customerRes = await getAllCustomers();
        if (customerRes?.status) {
          const filteredCustomer = customerRes.data.filter(customer => !customer.trashed);
          setCustomer(filteredCustomer);
          setFullCustomerList(filteredCustomer);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsCustomerLoading(false);
      }
    };

    const getDeliveryMandata = async () => {
      try {
        setIsDeliveryManLoading(true);
        const deliveryMans = await getAllDeliveryMans({ createdByAdmin: true });
        const deliveryManRes = await getDeliveryMan();
        if (deliveryManRes.data || deliveryMans.data) {
          const activeDeliveryMen = deliveryManRes.data?.filter((man) => man.status !== "DISABLE" && !man.trashed).sort((b, a) => a.isVerified - b.isVerified) || [];
          const formattedAdminDeliveryMen = deliveryMans.data?.map((man) => ({
            ...man,
            firstName: man.firstName || man.name?.split(" ")[0],
            lastName: man.lastName || man.name?.split(" ").slice(1).join(" "),
            _id: man._id,
            email: man.email,
            contactNumber: man.contactNumber,
            status: man.status || "ENABLE",
          })).sort((b, a) => a?.isVerified - b?.isVerified) || [];

          setLengthofdeliverymen(activeDeliveryMen.length);
          const mergedDeliveryMen = [
            ...activeDeliveryMen,
            ...formattedAdminDeliveryMen,
          ].reduce((acc, current) => {
            const isDuplicate = acc.find((item) => item._id === current._id || item.email === current.email);
            if (!isDuplicate && current.status !== "DISABLE") {
              return acc.concat([current]);
            }
            return acc;
          }, []);

          setDeliveryMen(mergedDeliveryMen);
        }
      } catch (error) {
        console.error("Error fetching delivery men:", error);
      } finally {
        setIsDeliveryManLoading(false);
      }
    }





    const fetchData = async () => {
      getParcelType(),
        getCustomer(),
        getDeliveryMandata()
      setIsLoading(false);
    };

    fetchData();
  }, []);



  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Radius of the earth in miles
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in miles
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

          console.log("lodata", data);
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


  const location = useLocation();

  useEffect(() => {
    if (location?.state?.orderData) {
      setIsReassign(true);
    }
  }, [location]);

  useEffect(() => {
    console.log("location", location);

    async function setInitialValuesdata() {
      await setInitialValues(
        {
          dateTime: new Date(),
          deliveryManId: location?.state?.orderData?.deliveryManId || "",
          pickupDetails: {
            location: {
              latitude: null, // Initialize with null or undefined
              longitude: null, // Empty array or [longitude, latitude]
            },
            dateTime: location?.state?.orderData?.pickupDetails?.dateTime || "",
            merchantId: merchant._id || "",
            address:
              location?.state?.orderData?.pickupAddress?.address ||
            `${merchant?.address?.street} , ${merchant?.address?.city} , ${merchant?.address?.postalCode} , ${merchant?.address?.country}` ||
              "",
            // countryCode: merchant.countryCode || "",
            mobileNumber: location?.state?.orderData?.pickupAddress?.mobileNumber || merchant.contactNumber || "",
            email: location?.state?.orderData?.pickupAddress?.email || merchant.email || "",
            name: location?.state?.orderData?.pickupAddress?.name || `${merchant.firstName} ${merchant.lastName}` || "",
            description: location?.state?.orderData?.pickupAddress?.description || "",
            postCode: location?.state?.orderData?.pickupAddress?.postCode || merchant?.address?.postalCode || "",
          },
          deliveryDetails: location?.state?.orderData?.deliveryAddress.map((delivery) => ({
            customerId: delivery.customerId,
            // subOrderId: 1,
            parcelsCount: delivery.parcelsCount || 1,
            paymentCollectionRupees: delivery.paymentCollectionRupees || 0,
            location: {
              latitude: null, // Initialize with null or undefined
              longitude: null, // Empty array or [longitude, latitude]
            },
            address: delivery.address,
            // countryCode: "",
            mobileNumber: delivery.mobileNumber,
            parcelType2: delivery.parcelType2 || [],
            name: delivery.name,
            email: delivery.email,
            description: delivery.description,
            postCode: delivery.postCode,
            cashOnDelivery: delivery.cashOnDelivery.toString() || "false",
            distance: "",
            duration: "",
          }))
          
          || [{
            customerId: "",
            // subOrderId: 1,
            parcelsCount: 1,
            paymentCollectionRupees: 0,
            location: {
              latitude: null, // Initialize with null or undefined
              longitude: null, // Empty array or [longitude, latitude]
            },
            address: "",
            // countryCode: "",
            mobileNumber: "",
            parcelType2: [],
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



  const validationSchema = Yup.object().shape({
    dateTime: Yup.date().required("Required"),
    deliveryManId: Yup.string().required("Required Delivery Man"),
    pickupDetails: Yup.object().shape({
      dateTime: Yup.date().optional(),
      address: Yup.string().required("Required Pickup Address"),
      mobileNumber: Yup.string().required("Required Pickup Contact Number"),
      email: Yup.string().email("Invalid email").required("Required Pickup Email"),
      description: Yup.string(),
      postCode: Yup.string().required("Required Pickup Postcode"),
    }),
    deliveryDetails: Yup.array().of(
      Yup.object().shape({
        customerId: Yup.string().required("Required Customer to be selected"),
        address: Yup.string().required("Required Delivery Address"),
        name: Yup.string(),
        mobileNumber: Yup.string(),
        email: Yup.string(),
        description: Yup.string(),
        postCode: Yup.string().required("Required Delivery Postcode").matches(/^[A-Za-z0-9\s-]+$/, "Invalid Postcode"),
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
        parcelType2: Yup.array().optional(),
      })
    )
  });


  const onSubmit = async (values, { setFieldValue }) => {
    setIsOrderCreated(true);
    console.log("values", values);
    const timestamp = new Date(values.dateTime).getTime();
    console.log("timestamp", timestamp);
    console.log("values.pickupDetails.dateTime", values.pickupDetails.dateTime);
    const pictimestamp = new Date(values.pickupDetails.dateTime ? values.pickupDetails.dateTime : new Date().toISOString().slice(0, 16)).getTime();
    console.log("pictimestamp", pictimestamp);
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
        console.log("lat", lat);
        console.log("lng", lng);
        pickuplocation = { latitude: lat, longitude: lng };
        // Removed setInitialValues as we are using values directly
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
        // ${arrayofpostcode[index]}
        const data = await response.json();
        console.log("data1451", data);
        if (data.results && data.results.length > 0) {
          console.log("data145", data);
          if (data.status !== "ZERO_RESULTS") {
            const deliverylocation = { latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng };
            distancesAndDurations.push({ status: true, distance: { value: 0, text: "0 km" }, duration: { value: 0, text: "0 min" } })
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
        deliveryManId: values.deliveryManId, // Use values directly
        pickupDetails: {
          ...values.pickupDetails,
          dateTime: pictimestamp,
          mobileNumber: values.pickupDetails.mobileNumber.toString(),
          location: {
            latitude: pickuplocation.latitude,
            longitude: pickuplocation.longitude
          }
        },
        merchant: merchant._id,
        deliveryDetails: values.deliveryDetails.map((delivery, index) => ({
          customerId: delivery.customerId,
          address: delivery.address,
          cashOnDelivery: delivery.cashOnDelivery,
          description: delivery.description,
          email: delivery.email,
          mobileNumber: delivery.mobileNumber,
          name: delivery.name,
          parcelsCount: delivery.parcelsCount,
          postCode: delivery.postCode,
          // subOrderId: delivery.subOrderId,
          paymentCollectionRupees: delivery.paymentCollectionRupees,
          distance: distancesAndDurations[index]?.distance.value,
          duration: distancesAndDurations[index]?.duration.text,
          parcelType2: delivery.parcelType2,
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
        if (isReassign) {
          await reassignOrder(merchant._id, location?.state?.orderData?.orderId);
        }
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
        {({ index, style }) => <div style={style} className="leading-none">{children[index]}</div>}
      </List>
    );
  };

  // Update the renderRow function to be used in Autocomplete
  const renderRow = ({ index, style }) => {
    const option = options[index];
    return (
      <div style={style} key={option.value}>
        {option.label}
      </div>
    );
  };

  // Add the filter and sort functions
  const filterOptions = (option, inputValue) => {
    const normalizedInput = inputValue?.toLowerCase().trim();
    const inputParts = normalizedInput?.split(' '); // Split the input by spaces
    const label = option?.label?.trim().toLowerCase();
    return inputParts.every(part => label.includes(part)); // Check if all parts are included in the label
  };

  const sortOptions = (options, inputValue) => {
    const inputParts = inputValue.toLowerCase().split(' ');

    return options.sort((a, b) => {
      const aMatches = inputParts.reduce((count, part) => {
        return count + (a.firstName.toLowerCase().includes(part) || a.lastName.toLowerCase().includes(part) ? 1 : 0);
      }, 0);

      const bMatches = inputParts.reduce((count, part) => {
        return count + (b.firstName.toLowerCase().includes(part) || b.lastName.toLowerCase().includes(part) ? 1 : 0);
      }, 0);

      // Sort by number of matches first
      if (aMatches !== bMatches) {
        return bMatches - aMatches; // Higher match count comes first
      }

      // If match counts are equal, sort by the order of letters in the search term
      const aFullName = `${a.firstName} ${a.lastName}`.toLowerCase();
      const bFullName = `${b.firstName} ${b.lastName}`.toLowerCase();

      // Check the position of the first matching letter in the search term
      const aPosition = inputParts.map(part => aFullName.indexOf(part)).filter(pos => pos !== -1);
      const bPosition = inputParts.map(part => bFullName.indexOf(part)).filter(pos => pos !== -1);

      // If both have matching letters, sort by the first occurrence
      if (aPosition.length && bPosition.length) {
        return Math.min(...aPosition) - Math.min(...bPosition);
      }

      // If one has matches and the other doesn't, prioritize the one with matches
      if (aPosition.length) return -1;
      if (bPosition.length) return 1;

      return aFullName.localeCompare(bFullName); // Fallback to alphabetical order
    });
  };

  const removeBorder = () => {
    const customerId = document.querySelectorAll(".deliveryDetails-customerId");
    customerId.forEach(element => {
      element.querySelector("input").style.border = "none"; // Set border style to none
      // element.querySelector("input").style.border.focus = "none"; // Set border style to none
      element.querySelector("input").style.outline = "none"; // Set border style to none
      element.querySelector("input").style.boxShadow = "none"; // Set border style to none
      element.querySelector("input").addEventListener("focus", () => {
        element.querySelector("input").style.border = "none"; // Set border style to none
      });
    });
  }

  useEffect(() => {
    setInterval(() => {
      removeBorder();
    }, 1);
  }, []);

  const renderOption = ({ option }) => (
    <div>
      {option?.label}
    </div>
  );

  const options = customer?.map((cust) => ({
    label: `${cust?.NHS_Number} - ${cust?.firstName} ${cust?.lastName} - ${cust?.address} - ${cust?.postCode}`,
    value: cust?._id?.toString(),
    ...cust,
  })) || [];

  return (
    <>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(values, { setFieldValue });
          }
        }}

      >

        {({ setFieldValue, values, errors }) => {
          console.log("errors", errors);
          if (Object.keys(errors).length > 0) {
            if (isclicked) {
              console.log("errors", errors);

              if (errors?.pickupDetails) {
                document.getElementById("pickup-information")?.scrollIntoView({ behavior: 'smooth' });
              } else if (errors?.deliveryManId) {
                document.getElementById("delivery-information")?.scrollIntoView({ behavior: 'smooth' });
              } else if (errors?.deliveryDetails) {
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
            <Form className="create-order">

              <div className="pick-up mt-2 row">

                {/* Pickup Information */}
                <div className="col-12 col-lg-12 row">
                  <h3 className="fw-bold text-4xl pb-1 text-center" id="pickup-information">
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
                      style={{ height: "3em", border: "1px solid #E6E6E6" }}
                      disabled={isOrderCreated}
                    // onChange={(e) => {
                    //   setFieldValue("pickupDetails.dateTime", e.target.value);
                    // }}
                    />
                    <ErrorMessage
                      name="pickupDetails.dateTime"
                      component="div"
                      className="error text-danger ps-2"
                    />
                  </div>

                  <div className="input-error mb-1 col-3">
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
                    // onChange={(e) => {
                    //   setFieldValue("pickupDetails.postCode", e.target.value);
                    // }}
                    />
                    <ErrorMessage
                      name="pickupDetails.postCode"
                      component="div"
                      id="pickup-postcode-error"
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
                      // onChange={(e) => {
                      //   setFieldValue("pickupDetails.address", e.target.value);
                      // }}
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
                      // onChange={(e) => {
                      //   setFieldValue("pickupDetails.mobileNumber", e.target.value);
                      // }}
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
                    // onChange={(e) => {
                    //   setFieldValue("pickupDetails.name", e.target.value);
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
                      disabled={isOrderCreated}
                    // onChange={(e) => {
                    //   setFieldValue("pickupDetails.email", e.target.value);
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
                      Pickup Instructions (Optional) :
                    </label>
                    <Field
                      as="textarea"
                      name="pickupDetails.description"
                      className="form-control h-[70px]"
                      placeholder="Pickup Instructions"
                      rows="3"
                      style={{
                        border: "1px solid #E6E6E6",
                        borderRadius: "5px",
                        height: "3em",
                      }}
                      disabled={isOrderCreated}
                    // onChange={(e) => {
                    //   setFieldValue("pickupDetails.description", e.target.value);
                    // }}
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
                  <h3 className="fw-bold text-4xl pb-1 text-center" id="delivery-information">
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
                      // onChange={(e) => {
                      //   setFieldValue("deliveryManId", e.target.value);
                      // }}
                      disabled={isOrderCreated}
                      style={{
                        backgroundColor: isOrderCreated ? "#e9ecef" : "white",
                      }}
                    >
                      <option value="" className="text-gray-500">
                        {isDeliveryManLoading ? "Loading..." : "Select Delivery Man"}
                      </option>
                      {deliveryMan.map((data, index) => {
                        let distance = "";
                        if (currentLocation && data?.location) {
                          distance = calculateDistance(
                            currentLocation?.latitude,
                            currentLocation?.longitude,
                            data?.location?.coordinates?.[1],
                            data?.location?.coordinates?.[0]
                          );
                        }

                        if (lengthofdeliverymen === index) {
                          return (
                            <>
                              <option
                                key={index}
                                value={"admin"}
                                className="text-center bg-[#bbbbbb] text-[#ffffff] font-bold text-[1.25rem] py-[0.5rem]"
                                disabled={true}
                              >
                                Admin
                              </option>
                              <option
                                key={`${index}-data`}
                                value={data?._id}
                                className="py-1.5 px-3 hover:bg-gray-100 w-full flex justify-between mx-auto"
                                disabled={!data?.isVerified}
                              >
                                <span
                                  style={{ float: "left" }}
                                >{`${data?.firstName} ${data?.lastName}`}</span>
                                <span style={{ float: "right", marginLeft: "20px" }}>
                                  {distance ? `- (${distance} miles away)` : ""}
                                  {data?.isVerified ? "" : " Not Verified"}
                                </span>
                              </option>
                            </>
                          );
                        }
                        return (
                          <option
                            key={index}
                            value={data?._id}
                            className={`py-1.5 px-3 hover:bg-gray-100 w-full flex justify-between`}
                            disabled={!data?.isVerified}
                          >
                            <span
                              style={{ float: "left", width: "65%" }}
                            >{`${data?.firstName} ${data?.lastName}`}</span>
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
                                marginLeft: "20px",
                              }}
                            >
                              {distance ? `- (${distance} miles away)` : ""}
                              {data?.isVerified ? "" : " Not Verified"}
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
                    values?.deliveryDetails?.map((data, index) => (
                      <div className={`row shadow  rounded-md ${index !== 0 ? "mt-4" : "mt-2"}`} key={index} id={`delivery-information-${index}`}>

                        <div className="col-12 col-lg-12 text-black font-bold text-2xl p-3 flex justify-between">
                          <div>

                            {`Delivery Information ${index + 1}`}
                          </div>
                          <div>
                            {
                              index > 0 && (
                                <button className="btn btn-danger" type="button" onClick={() => {
                                  setFieldValue("deliveryDetails", values.deliveryDetails.filter((_, i) => i !== index));
                                }} disabled={isOrderCreated}>
                                  Remove
                                </button>
                              )
                            }
                          </div>
                        </div>
                        <div className="input-error mb-1 col-7">
                          <label className="fw-thin p-0 pb-1 ">
                            Select Customer :
                          </label>
                          <div>
                            <Select
                              name={`deliveryDetails.${index}.customerId`}
                              className="form-control mb-1 p-0"
                              isDisabled={isOrderCreated}
                              styles={{
                                control: (base) => ({ ...base, height: "3em", backgroundColor: isOrderCreated ? "#e9ecef" : "white", }),
                              }}
                              options={searchCustomerList?.map((cust) => ({
                                value: cust?._id.toString(),
                                label: ` ${cust?.NHS_Number} - ${cust?.firstName}  ${cust?.lastName}  -  ${cust?.address}  -  ${cust?.postCode}`,
                                ...cust,
                              }))}
                              placeholder={isCustomerLoading ? "Loading..." : "Select Customer"}
                              isClearable
                              filterOption={filterOptions}
                              components={{ MenuList }}

                              value={searchCustomerList.find(cust => cust._id === values.deliveryDetails[index]?.customerId) ? {
                                label: `${searchCustomerList.find(cust => cust._id === values.deliveryDetails[index]?.customerId).NHS_Number} - ${searchCustomerList.find(cust => cust._id === values.deliveryDetails[index]?.customerId).firstName} ${searchCustomerList.find(cust => cust._id === values.deliveryDetails[index]?.customerId).lastName} - ${searchCustomerList.find(cust => cust._id === values.deliveryDetails[index]?.customerId).address} - ${searchCustomerList.find(cust => cust._id === values.deliveryDetails[index]?.customerId).postCode}`,
                                value: values.deliveryDetails[index]?.customerId,
                                customer: searchCustomerList.find(cust => cust._id === values.deliveryDetails[index]?.customerId)
                              } : null}
                              onChange={(selectedOption) => {
                                console.log("Selected Option:", selectedOption);
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
                        </div>
                        <div className="mb-1 col-4">

                        </div>

                        <div className="input-error mb-1 col-4">
                          <label className="fw-thin p-0 pb-1 ">
                            Customer Name (Optional) :
                          </label>
                          <Field
                            type="text"
                            name={`deliveryDetails.${index}.name`}
                            className="form-control"
                            placeholder="Customer Name"
                            // onChange={(e) => {
                            //   setFieldValue(`deliveryDetails.${index}.name`, e.target.value);
                            // }}
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



                        <div
                          key={"parcelsCount"}
                          className="input-error col-12 col-sm-4 mb-1"
                        >
                          <label className="fw-thin p-0 pb-1 ">Parcels Count :</label>
                          <Field
                            type="text"
                            name={`deliveryDetails.${index}.parcelsCount`}
                            onChange={(e) => {
                              const value = e.target.value;
                              const isValueNumber = !isNaN(value);
                              if (isValueNumber) {
                                setFieldValue(`deliveryDetails.${index}.parcelsCount`, Number(value ? value : "0"));
                              }
                            }
                            }
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
                          <label className="fw-thin p-0 pb-1  ">
                            Cash on Delivery :
                          </label>

                          <div className="d-flex align-items-center justify-evenly">
                            {/* True Option */}
                            <label className="me-3">
                              <Field
                                type="radio"
                                name={`deliveryDetails.${index}.cashOnDelivery`}
                                onChange={(e) => {
                                  setFieldValue(`deliveryDetails.${index}.cashOnDelivery`, e.target.value);
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
                                  setFieldValue(`deliveryDetails.${index}.cashOnDelivery`, e.target.value);
                                  setFieldValue(`deliveryDetails.${index}.paymentCollectionRupees`, 0);
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
                            className="input-error col-12 col-sm-2 mb-1"
                          >
                            <label className="fw-thin p-0 pb-1 ">
                              Payment Amount
                            </label>
                            <Field
                              as="input"
                              name={`deliveryDetails.${index}.paymentCollectionRupees`}
                              type="number"
                              onWheel={(e) => e.currentTarget.blur()}
                              className="form-control mt-0"
                              style={{ height: "3em", border: "1px solid #E6E6E6", scrollbarWidth: "none" }}
                              placeholder="Enter Payment Collection pounds"
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
                            Delivery Email (Optional) :
                          </label>
                          <Field
                            type="text"
                            name={`deliveryDetails.${index}.email`}
                            className="form-control"
                            placeholder="Delivery Email"
                            // onChange={(e) => {
                            //   setFieldValue(`deliveryDetails.${index}.email`, e.target.value);
                            // }}
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
                            // onChange={(e) => {
                            //   setFieldValue(`deliveryDetails.${index}.mobileNumber`, e.target.value);
                            // }}
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
                            name={`deliveryDetails.${index}.parcelType2`}
                            className="form-control p-0"
                            styles={{
                              control: (base) => ({ ...base, minHeight: "3em", backgroundColor: isOrderCreated ? "#e9ecef" : "white", }),
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
                            isDisabled={isOrderCreated}
                          />
                          {
                            !isParcelTypeLoading && parcelTypeDetail.length === 0 && (
                              <Link
                                to="/multi-order-parcel"
                                className="btn btn-primary mt-2"
                              >
                                Go to create Parcel Types
                              </Link>
                            )
                          }
                          <ErrorMessage
                            name={`deliveryDetails.${index}.parcelType2`}
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
                            // onChange={(e) => {
                            //   setFieldValue(`deliveryDetails.${index}.postCode`, e.target.value);
                            // }}
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
                            // onChange={(e) => {
                            //   setFieldValue(`deliveryDetails.${index}.address`, e.target.value);
                            // }}
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
                            Delivery Instructions (Optional) :
                          </label>
                          <Field
                            as="textarea"
                            name={`deliveryDetails.${index}.description`}
                            className="form-control"
                            placeholder="Delivery Instructions"
                            rows="2"
                            // onChange={(e) => {
                            //   setFieldValue(`deliveryDetails.${index}.description`, e.target.value);
                            // }}
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

                    <button className="btn btn-primary mt-3" type="button" disabled={isOrderCreated} onClick={() => {

                      setFieldValue("deliveryDetails", [...values.deliveryDetails, {
                        // subOrderId: values.deliveryDetails.length + 1,
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
                        parcelType2: []
                      }]);
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
                        onClick={() => {
                          submitHandler();
                        }}
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
    </>
  );



};

export default MultiOrders;

