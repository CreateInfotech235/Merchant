
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import locationimg from "../../assets_admin/delivery-bike.png";
import { getDeliveryManLocation } from "../../Components_admin/Api/DeliveryMan";
import { getAllUsers } from "../../Components_admin/Api/User";
import Select from 'react-select';

function DeliveryManDestination() {
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const [deliveryMen, setDeliveryMen] = useState([]);
  const [center, setCenter] = useState({
    lat: 40.7128, // Default center (New York)
    lng: -74.006,
  });
  const [merchantId, setMerchantId] = useState(null);
  const [merchantdata, setMerchantdata] = useState([]);
  const [merchantloading, setMerchantloading] = useState(false);

  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const mapRef = useRef(null);

  const fetchDeliveryMen = async () => {
    setDeliveryMen([]);
console.log("merchantId", merchantId);

    const response = await getDeliveryManLocation(merchantId);

    console.log("response", response.data);
    if (response.status) {
      if (response.data.length > 0) {
        setDeliveryMen(response.data);
      } else {
        setDeliveryMen([]);
      }
    }
  };

  // useEffect(() => {
  //   fetchDeliveryMen();
  // }, []);


  useEffect(() => {
    const fetchMerchantData = async () => {
      console.log("fetchMerchantData");
      try {
        const response = await getAllUsers();
        console.log("response", response);
        if (response.status) {
          setMerchantdata(response.data);
          setMerchantloading(false);
        }
      } catch (error) {
        console.error("Error fetching merchant data:", error);
        setMerchantloading(false);
      }
    };
    fetchMerchantData();
  }, []);


  useEffect(() => {
    const addMarkersAndAdjustBounds = () => {
      const map = mapRef.current;

      if (!map || !window.google || deliveryMen.length === 0) return;

      const bounds = new window.google.maps.LatLngBounds();

      deliveryMen.forEach((deliveryMan) => {
        let position = null;

        if (
          deliveryMan?.status === "ENABLE" &&
          deliveryMan?.location?.coordinates?.length === 2 &&
          !isNaN(parseFloat(deliveryMan?.location?.coordinates[1])) &&
          !isNaN(parseFloat(deliveryMan?.location?.coordinates[0]))
        ) {
          position = {
            lat: parseFloat(deliveryMan?.location?.coordinates[1]),
            lng: parseFloat(deliveryMan?.location?.coordinates[0]),
          };
        } else if (
          deliveryMan?.status === "ENABLE" &&
          deliveryMan?.defaultLocation?.coordinates?.length === 2 &&
          !isNaN(parseFloat(deliveryMan?.defaultLocation?.coordinates[1])) &&
          !isNaN(parseFloat(deliveryMan?.defaultLocation?.coordinates[0]))
        ) {
          position = {
            lat: parseFloat(deliveryMan?.defaultLocation?.coordinates[1]),
            lng: parseFloat(deliveryMan?.defaultLocation?.coordinates[0]),
          };
        }

        if (position) {
          const marker = new window.google.maps.Marker({
            position,
            map,
            title: `${deliveryMan?.firstName} ${deliveryMan?.lastName}`,
            icon: {
              url: locationimg, // URL of the image
              scaledSize: new window.google.maps.Size(40, 40), // Adjust width and height
            },
          });


          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="info-window-container">
                <div class="info-header">
                  <h4 class="delivery-man-name">${deliveryMan?.firstName} ${deliveryMan?.lastName}</h4>
                </div>
              </div>`,
          });


          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
          bounds.extend(position);
        }
      });

      // Adjust map to fit all markers
      map.fitBounds(bounds);
    };

    // if (deliveryMen.length > 0) {
      addMarkersAndAdjustBounds();
    // }
  }, [deliveryMen]);


  return (
    <>
      <div className="d-flex justify-between items-center py-3">
        <div>
          <label htmlFor="merchantSelect" className="p-0">Select Merchant:</label>
          <Select
            className={`basic-single w-[500px]`}
            classNamePrefix="select"
            id="merchantSelect"
            isLoading={merchantloading}
            isSearchable={true}
            defaultValue={merchantdata.length > 0 ? { value: merchantdata[0]._id, label: merchantdata[0].firstName + " " + merchantdata[0].lastName } : null}
            name="color"
            options={merchantdata.map((item) => ({
              value: item._id,
              label: item.firstName + " " + item.lastName + " (" + item?.email + ")"
            }))}
            onChange={(e) => {
              setMerchantId(e.value);
            }}
            isDisabled={merchantloading}
            placeholder="Select merchant ..."
          />
        </div>
        <div>
          <button className="btn btn-primary" disabled={merchantId === null || merchantId === "" || merchantloading} onClick={fetchDeliveryMen}>Get data of selected merchant </button>
        </div>
      </div>
      <div>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={5}
            onLoad={(map) => (mapRef.current = map)}
          >
            {/* Markers will be added via useEffect */}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default DeliveryManDestination;
