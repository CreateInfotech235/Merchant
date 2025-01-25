import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { loadGoogleMapsApi } from "./loadGoogleMapsApi";

const DeliveryPersonTracking = () => {
  const mapContainerStyle = { width: "100%", height: "100vh" };
  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const mapRef = React.useRef(null);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [distance, setDistance] = useState(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [error, setError] = useState(null);

  const location = { lat: 40.7128, lng: -74.006 }; // Delivery person location
  const deliveryLocations = [
    { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    { lat: 37.7749, lng: -122.4194 }, // San Francisco
  ];

  useEffect(() => {
    if (location) setCenter(location);
  }, [location]);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;

    const loadMap = () => {
      loadGoogleMapsApi(apiKey, ["places", "geometry", "directions"])
        .then(() => {
          setIsGoogleLoaded(true);
          setError(null);
        })
        .catch((error) => {
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(loadMap, 2000); // Retry after 2 seconds
          } else {
            setError("Failed to load map after multiple attempts");
          }
        });
    };

    loadMap();
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    try {
      const R = 6371;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lng2 - lng1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return (R * c).toFixed(2);
    } catch (err) {
      console.warn("Distance calculation error:", err);
      return 0;
    }
  };

  const handleMapLoad = (map) => {
    try {
      mapRef.current = map;

      if (location && deliveryLocations.length > 0) {
        const distanceInKm = calculateDistance(
          location.lat,
          location.lng,
          deliveryLocations[0].lat,
          deliveryLocations[0].lng
        );
        setDistance(distanceInKm);

        // Delivery person marker
        new window.google.maps.Marker({
          position: location,
          map: map,
          title: "Delivery Person Location",
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

        // Delivery location markers
        deliveryLocations.forEach((loc, index) => {
          new window.google.maps.Marker({
            position: loc,
            map: map,
            title: `Delivery Location ${index + 1}`,
            icon: index === 0 ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          });
        });

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });

        directionsRenderer.setMap(map);

        const waypoints = deliveryLocations.slice(0, -1).map(location => ({
          location,
          stopover: true
        }));

        const request = {
          origin: location,
          destination: deliveryLocations[deliveryLocations.length - 1],
          waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          }
        });
      }
    } catch (err) {
      console.warn("Map loading error:", err);
    }
  };

  if (error) {
    return null; // Hide error message
  }

  if (!isGoogleLoaded) {
    return null; // Hide loading message
  }

  return (
    <div>
      <h5>Delivery Tracking {distance && `(${distance} km)`}</h5>
      <div
        id="map"
        style={mapContainerStyle}
        ref={(el) => {
          if (el && !mapRef.current) {
            try {
              const map = new window.google.maps.Map(el, {
                center,
                zoom: 10,
              });
              handleMapLoad(map);
            } catch (err) {
              console.warn("Map initialization error:", err);
            }
          }
        }}
      />
    </div>
  );
};

export default DeliveryPersonTracking;
