import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { loadGoogleMapsApi } from "./loadGoogleMapsApi";
import tracking from "../../assets_mercchant/delivery-bike.png";


const MapModal = ({
  location,
  deliveryLocation,
  onHide,
  status,
  pickupLocation,
}) => {
  const mapContainerStyle = { width: "100%", height: "400px" };
  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo"; // Replace with your actual API key
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [distance, setDistance] = useState(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    if (location) setCenter(location);
  }, [location]);

  useEffect(() => {
    if (status === "DELIVERED") {
      onHide();
      return;
    }

    loadGoogleMapsApi(apiKey, ["places", "geometry", "directions"])
      .then(() => setIsGoogleLoaded(true))
      .catch((error) => console.error("Error loading Google Maps API:", error));
  }, [apiKey, status, onHide]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Return distance in km
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const handleMapLoad = (map) => {
    mapRef.current = map;

    if (location && deliveryLocation) {
      const showPickupMarker = ["CREATED", "ASSIGNED", "ACCEPTED"].includes(
        status
      );
      const locationToShow = showPickupMarker
        ? pickupLocation
        : deliveryLocation;

      const distanceInKm = calculateDistance(
        location.lat,
        location.lng,
        locationToShow.lat,
        locationToShow.lng
      );
      setDistance(distanceInKm);

      new window.google.maps.Marker({
        position: location,
        map: map,
        
        title: "Delivery Boy Location",
        icon: {
          url: tracking, // Replace with your custom icon URL
          scaledSize: new window.google.maps.Size(32, 32), // Adjust size
        },
      });

      new window.google.maps.Marker({
        position: locationToShow,
        map: map,
        title: showPickupMarker ? "Pickup Location" : "Delivery Location",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true, // Suppress default A and B markers
      });

      directionsRenderer.setMap(map);

      const request = {
        origin: location,
        destination: locationToShow,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);

          // Add custom start marker
          new window.google.maps.Marker({
            position: result.routes[0].legs[0].start_location,
            map: map,
            icon: {
              url: tracking, // Replace with your custom icon URL
              scaledSize: new window.google.maps.Size(32, 32), // Adjust size
            },
            style: {
              width: "32px",
              height: "32px",
            },
            title: "Start Location", // Optional tooltip
          });

          // Add custom end marker
          new window.google.maps.Marker({
            position: result.routes[0].legs[0].end_location,
            map: map,
            icon: {
              url: "path/to/end-icon.png", // Replace with your custom icon URL
              scaledSize: new window.google.maps.Size(32, 32), // Adjust size
            },
            title: "Destination", // Optional tooltip
          });
        } else {
          console.error("Directions request failed:", status);
        }
      });
    }
  };

  const handleClose = () => {
    onHide();
  };

  if (status === "DELIVERED") {
    return null;
  }

  return (
    <Modal className="modal-xl" show={true} onHide={handleClose} centered>
      <ModalHeader closeButton>
        <h5>Delivery Tracking {distance && `(${distance} km)`}</h5>
      </ModalHeader>
      <ModalBody>
        {isGoogleLoaded ? (
          <div
            id="map"
            style={mapContainerStyle}
            ref={(el) => {
              if (el && !mapRef.current) {
                const map = new window.google.maps.Map(el, {
                  center,
                  zoom: 10,
                });
                handleMapLoad(map);
              }
            }}
          />
        ) : (
          <div>Loading Map...</div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default MapModal;
