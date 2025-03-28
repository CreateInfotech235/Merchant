import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import locationimg from "../../assets_admin/delivery-bike.png";
import { getDeliveryManLocation } from "../../Components_admin/Api/DeliveryMan";
import { getAllUsers } from "../../Components_admin/Api/User";
import Select from 'react-select';
import { toast } from "react-toastify";

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
  const [mapmarkloading, setMapmarkloading] = useState(false);
  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const clearMarkers = () => {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  const fetchDeliveryMen = async () => {
    clearMarkers();
    setDeliveryMen([]);
    setMapmarkloading(true);
    console.log("merchantId", merchantId);
    const response = await getDeliveryManLocation(merchantId);

    console.log("response", response.data);
    if (response.status) {
      if (response?.data?.length > 0) {
        setDeliveryMen(response.data);
      } else {
        toast.error("delivery men location not found",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          }
        );
        setDeliveryMen([]);
      }
    }
    setMapmarkloading(false);
  };

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

      clearMarkers();

      if (!map || !window.google || deliveryMen.length === 0) return;

      const bounds = new window.google.maps.LatLngBounds();
      const newMarkers = [];

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
              url: locationimg,
              scaledSize: new window.google.maps.Size(40, 40),
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
          newMarkers.push(marker);
          bounds.extend(position);
        }
      });

      setMarkers(newMarkers);

      if (newMarkers.length > 0) {
        map.fitBounds(bounds);
      } else {
        map.setCenter(center);
        map.setZoom(5);
      }
    };

    addMarkersAndAdjustBounds();
  }, [deliveryMen]);

  useEffect(() => {
    fetchDeliveryMen();
    if (merchantId) {
      setShowModal(false);
    }
  }, [merchantId]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            // Close only if clicking the overlay (outside the modal)
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select Merchant</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer px-2"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <Select
              className="basic-single w-full"
              classNamePrefix="select"
              isLoading={merchantloading}
              isSearchable={true}
              defaultValue={merchantdata.length > 0 ? { value: merchantdata[0]._id, label: merchantdata[0].firstName + " " + merchantdata[0].lastName } : null}
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
        </div>
      )}

      <div className="d-flex justify-between items-center py-3">
        <div>
          <label htmlFor="merchantSelect" className="p-0">Select Merchant:</label>
          <Select
            className={`basic-single w-[500px]`}
            classNamePrefix="select"
            id="merchantSelect"
            isLoading={merchantloading}
            isSearchable={true}
            value={merchantId ? { value: merchantId, label: merchantdata.find(item => item._id === merchantId).firstName + " " + merchantdata.find(item => item._id === merchantId).lastName } : null}
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
      </div>

      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Markers will be added via useEffect */}
        </GoogleMap>
      </div>
    </>
  );
}

export default DeliveryManDestination;
