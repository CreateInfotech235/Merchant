import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { loadGoogleMapsApi } from "./loadGoogleMapsApi";
import { getDeliveryManLocations } from "../../Components_admin/Api/DeliveryMan";

const MapModal = ({ location, onHide }) => {
  console.log(location);
  const [deliveryManLocations, setDeliveryManLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapContainerStyle = { width: "100%", height: "400px" };
  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo"; // Replace with your actual API key
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps API
    loadGoogleMapsApi(apiKey, ["places", "geometry"])
      .then(() => setIsGoogleLoaded(true))
      .catch((error) => console.error("Error loading Google Maps API:", error));
  }, [apiKey]);

  const fetchLocation = async () => {
    try {
      const response = await getDeliveryManLocations(location);
      console.log(response);
      if (response.status && response.data) {
        const coordinates =
          response.data.status === "ENABLE" &&
          response.data.location?.coordinates?.length === 2
            ? [
                response.data.location.coordinates[0],
                response.data.location.coordinates[1],
              ]
            : response.data.status !== "ENABLE" &&
              response.data.defaultLocation?.coordinates?.length === 2
            ? [
                response.data.defaultLocation.coordinates[0],
                response.data.defaultLocation.coordinates[1],
              ]
            : null;

        if (coordinates) {
          setDeliveryManLocations(coordinates);
        }
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMarkerPosition = ([lng, lat]) => {
    // Update marker position without reloading the map
    console.log([lng, lat]);
    
    if (mapRef.current) {
      if (!markerRef.current) {
        markerRef.current = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapRef.current,
          title: "Delivery Location",
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        });
      } else {
        markerRef.current.setPosition({ lat, lng });
      }
      mapRef.current.setCenter({ lat, lng });
    }
  };

  useEffect(() => {
    // Fetch location initially and set interval for live updates
    fetchLocation();
    const interval = setInterval(() => {
      fetchLocation();
    }, 13000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update marker when location changes
    if (deliveryManLocations && deliveryManLocations.length === 2) {
      updateMarkerPosition(deliveryManLocations);
    }
  }, [deliveryManLocations]);

  const initializeMap = (el) => {
    if (el && !mapRef.current) {
      const [lng, lat] = deliveryManLocations || [0, 0];
      const map = new window.google.maps.Map(el, {
        center: { lat, lng },
        zoom: 19,
      });
      mapRef.current = map;
      if (deliveryManLocations && deliveryManLocations.length === 2) {
        updateMarkerPosition(deliveryManLocations);
      }
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
            ref={(el) => initializeMap(el)}
          />
        ) : (
          <div>Loading Map...</div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default MapModal;
