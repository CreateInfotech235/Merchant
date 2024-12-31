import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { loadGoogleMapsApi } from "./loadGoogleMapsApi";

const MapModal = ({ location, onHide }) => {
    console.log("location",location);
  const mapContainerStyle = { width: "100%", height: "400px" };
  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo"; // Replace with your actual API key
  const mapRef = useRef(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsApi(apiKey, ["places", "geometry"])
      .then(() => setIsGoogleLoaded(true))
      .catch((error) => console.error("Error loading Google Maps API:", error));
  }, [apiKey]);

  const handleMapLoad = (map) => {
    mapRef.current = map;

    if (location && location.length === 2) {
      const [lng, lat] = location;
      new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: "Location Marker",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });

      map.setCenter({ lat, lng });
    }
  };

  return (
    <Modal className="modal-xl" show={true} onHide={onHide} centered>
      <ModalHeader closeButton>
        <h5>Map</h5>
      </ModalHeader>
      <ModalBody>
        {isGoogleLoaded ? (
          <div
            id="map"
            style={mapContainerStyle}
            ref={(el) => {
              if (el && !mapRef.current) {
                const [lng, lat] = location || [0, 0];
                const map = new window.google.maps.Map(el, {
                  center: { lat, lng },
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
