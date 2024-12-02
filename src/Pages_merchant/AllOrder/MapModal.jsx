import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';

const MapModal = ({ location, deliveryLocation, onHide, status, pickupLocation }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const apiKey = 'AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo';
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);  
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });

  const deliveryBoyMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const directionsRendererRef = useRef(null);

  // Set the center when location changes
  useEffect(() => {
    if (location) {
      setCenter(location);
    }
  }, [location]);

  // Async effect to load markers, handle click events and draw the route
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const retryInterval = 1000; // 1 second

    const addMarkersAndRoute = async () => {
      const map = mapRef.current;

      const showPickupMarker = ['CREATED', 'ASSIGNED', 'ACCEPTED'].includes(status);
      const locationToShow = showPickupMarker ? pickupLocation : deliveryLocation;

      if (!location || !locationToShow || !map || !window.google) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(addMarkersAndRoute, retryInterval);
          return;
        }
        console.log('Failed to load map after maximum retries');
        return;
      }

      // Clear previous markers and route
      if (deliveryBoyMarkerRef.current) {
        deliveryBoyMarkerRef.current.setMap(null);
      }
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setMap(null);
      }
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }

      // Add delivery boy marker
      const deliveryBoyMarker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: 'Delivery Boy Location',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        },
      });
      deliveryBoyMarkerRef.current = deliveryBoyMarker;

      deliveryBoyMarker.addListener('click', () => {
        alert('Delivery Boy Location');
      });

      // Add destination marker based on status
      const destinationMarker = new window.google.maps.Marker({
        position: locationToShow,
        map: map,
        title: showPickupMarker ? 'Pickup Location' : 'Delivery Location',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });
      destinationMarkerRef.current = destinationMarker;

      destinationMarker.addListener('click', () => {
        alert(showPickupMarker ? 'Pickup Location' : 'Delivery Location');
      });

      // Draw the route from delivery boy to destination
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsRendererRef.current = directionsRenderer;

      const request = {
        origin: location,
        destination: locationToShow,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    };

    if (!isMapLoaded) {
      addMarkersAndRoute();
      setIsMapLoaded(true);
    }
  }, [location, deliveryLocation, pickupLocation, status, isMapLoaded]);

  // Clean up markers and route when modal is closed
  const handleClose = () => {
    if (deliveryBoyMarkerRef.current) {
      deliveryBoyMarkerRef.current.setMap(null);
    }
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.setMap(null);
    }
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
    }
    onHide();
  };

  return (
    <Modal className='modal-xl' show={true} onHide={handleClose} centered>
      <ModalHeader closeButton>
        <h5>Delivery Tracking</h5>
      </ModalHeader>
      <ModalBody>
        <div style={{ height: '400px', width: '100%' }}>
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
              onLoad={(map) => {
                mapRef.current = map;
              }}
            >
              {/* Markers and route will be added via useEffect */}
            </GoogleMap>
          </LoadScript>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default MapModal;
