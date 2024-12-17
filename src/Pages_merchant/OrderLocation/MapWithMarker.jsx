import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import API from "../../Components_merchant/Api/Api";
import { getOrders } from "../../Components_merchant/Api/Order";

function MapWithMarker() {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const [orders, setOrders] = useState([]);
  const [center, setCenter] = useState({
    lat: 40.7128,
    lng: -74.0060,
  });

  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const mapRef = useRef(null);

  // Fetch orders data from the API
  const fetchOrders = async () => {
    try {
      const merchnatId = localStorage.getItem("merchnatId");
      const response = await getOrders(merchnatId);
      // console.log("response", response.data);

      if (response?.data) {
        setOrders(response.data || []);

        const firstOrder = response.data?.[0];
        if (
          firstOrder?.deliveryAddress?.location?.latitude &&
          firstOrder?.deliveryAddress?.location?.longitude
        ) {
          setCenter({
            lat: parseFloat(firstOrder.deliveryAddress.location.latitude),
            lng: parseFloat(firstOrder.deliveryAddress.location.longitude),
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
    fetchOrders();
  }, []);

  // Add markers to the map when orders data is updated
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const retryInterval = 1000;

    const addMarkers = () => {
      const map = mapRef.current;

      if (!map || !window.google) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(addMarkers, retryInterval);
          return;
        }
        // console.log("Failed to load map after maximum retries");
        return;
      }

      // Create markers for each order's delivery location
      orders.forEach((order) => {
        if (order.deliveryAddress?.location) {
          const position = {
            lat: parseFloat(order.deliveryAddress.location.latitude),
            lng: parseFloat(order.deliveryAddress.location.longitude),
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
                  <p>Delivery Address: ${order.deliveryAddress.address}</p>
                </div>
              `,
            });

            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });
          }
        }
      });
    };

    if (orders.length > 0) {
      addMarkers();
    }
  }, [orders]);

  // Handler when the map is loaded
  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onLoad={onMapLoad}
        >
          {/* Markers will be added via useEffect */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapWithMarker;
