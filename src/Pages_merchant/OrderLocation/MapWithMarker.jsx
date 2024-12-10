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
    lng: -74.006,
  });

  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const mapRef = useRef(null);

  const fetchOrders = async () => {
    try {
      const merchnatId = localStorage.getItem("merchnatId");
      const response = await getOrders(merchnatId);
      console.log("response", response.data);

      if (response) {
        setOrders(response.data);

        const firstOrder = response.data[0];
        if (firstOrder?.deliveryAddress?.location) {
          setCenter({
            lat: parseFloat(firstOrder.deliveryAddress.location.latitude),
            lng: parseFloat(firstOrder.deliveryAddress.location.longitude),
          });
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
        console.log("Failed to load map after maximum retries");
        return;
      }

      // Create markers for each order's delivery location
      orders.forEach((order) => {
        if (order.deliveryAddress?.location) {
          const position = {
            lat: parseFloat(order.deliveryAddress.location?.latitude),
            lng: parseFloat(order.deliveryAddress.location?.longitude),
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

  return (
    <div>
      {window.google ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Markers will be added via useEffect */}
        </GoogleMap>
      ) : (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onLoad={(map) => (mapRef.current = map)}
          >
            {/* Markers will be added via useEffect */}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
}

export default MapWithMarker;
