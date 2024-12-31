import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { getAllOrder } from "../../Components_admin/Api/Order";
import deliveryloc from "../../assets_mercchant/deliveryloc.png";
import pickup from "../../assets_mercchant/pickup.png";

function MapWithMarker() {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const [orders, setOrders] = useState([]);
  const [center, setCenter] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [locationType, setLocationType] = useState("delivery");

  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const mapRef = useRef(null);
  const markersRef = useRef([]); // Store markers

  const fetchOrders = async (type = "delivery") => {
    try {
      const response = await getAllOrder(null, 1, 1000000);

      if (response?.data) {
        const filteredOrders = response.data.filter((order) => {
          if (type === "pickup") {
            return order.pickupAddress?.location;
          }
          return order.deliveryAddress?.location;
        });

        setOrders(filteredOrders);

        const firstOrder = filteredOrders?.[0];
        if (firstOrder) {
          const location =
            type === "pickup"
              ? firstOrder.pickupAddress.location
              : firstOrder.deliveryAddress.location;

          setCenter({
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude),
          });
        }
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(locationType);
  }, [locationType]);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  useEffect(() => {
    const addMarkers = () => {
      const map = mapRef.current;

      if (!map || !window.google) {
        return;
      }

      clearMarkers(); // Clear existing markers

      orders.forEach((order) => {
        const location =
          locationType === "pickup"
            ? order.pickupAddress?.location
            : order.deliveryAddress?.location;

        if (location) {
          const position = {
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude),
          };

          if (!isNaN(position.lat) && !isNaN(position.lng)) {
            const marker = new window.google.maps.Marker({
              position: position,
              map: map,
              title: `Order ID: ${order._id}`,
            });

            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div>
                  <p>Order ID: ${order._id}</p>
                  <p>Status: ${order.status}</p>
                  <p>${locationType === "pickup" ? "Pickup" : "Delivery"} Address: ${
                    locationType === "pickup"
                      ? order.pickupAddress.address
                      : order.deliveryAddress.address
                  }</p>
                </div>
              `,
            });

            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });

            markersRef.current.push(marker); // Store marker in ref
          }
        }
      });
    };

    if (orders.length > 0) {
      addMarkers();
    }
  }, [orders, locationType]);

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  return (
    <div>
      <div className="d-flex justify-content-end items-center">
        <button
          type="button"
          className={`pickup-location p-1 border-0 text-light m-3 rounded-2 flex justify-center items-center ${
            locationType === "pickup" ? "active" : ""
          }`}
          onClick={() => setLocationType("pickup")}
        >
          <img src={pickup} className="loc-img " alt="Pick Up Location" /> Pick
          Up Location
        </button>
        <button
          type="button"
          className={`pickup-location p-1 border-0 text-light m-3 rounded-2 flex justify-center items-center ${
            locationType === "delivery" ? "active" : ""
          }`}
          onClick={() => setLocationType("delivery")}
        >
          <img src={deliveryloc} className="loc-img" alt="Delivery Location" />{" "}
          Delivery Location
        </button>
      </div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onLoad={onMapLoad}
        >
          {/* Markers will be added dynamically */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapWithMarker;
