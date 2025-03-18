import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import locationimg from "../../assets_mercchant/delivery-bike.png";
import { getDeliveryMan } from "../../Components_merchant/Api/DeliveryMan";
import './DeliveryMan.css'

function DeliveryManLocation() {
  const mapContainerStyle = {
    width: "100%",
    height: window.innerHeight - 220,
  };

  const [deliveryMen, setDeliveryMen] = useState([]);
  const [markers, setMarkers] = useState([]);
  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Moved setCenter here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeliveryMan();
        if (response.status) {
          setDeliveryMen(response.data);
        }
      } catch (error) {
        console.error("Error fetching delivery men:", error);
      }
    };
    fetchData();
  }, []);

  const addMarkersAndAdjustBounds = () => {
    const map = mapRef.current;
    
    if (!map || !window.google || deliveryMen.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    const newMarkers = [];
    let hasValidMarkers = false;

    deliveryMen.forEach((deliveryMan) => {
      let position = null;

      if (
        deliveryMan.status === "ENABLE" &&
        deliveryMan.location?.coordinates?.length === 2 &&
        !isNaN(parseFloat(deliveryMan.location.coordinates[1])) &&
        !isNaN(parseFloat(deliveryMan.location.coordinates[0]))
      ) {
        position = {
          lat: parseFloat(deliveryMan.location.coordinates[1]),
          lng: parseFloat(deliveryMan.location.coordinates[0]),
        };
      } else if (
        deliveryMan.status === "ENABLE" &&
        deliveryMan.defaultLocation?.coordinates?.length === 2 &&
        !isNaN(parseFloat(deliveryMan.defaultLocation.coordinates[1])) &&
        !isNaN(parseFloat(deliveryMan.defaultLocation.coordinates[0]))
      ) {
        position = {
          lat: parseFloat(deliveryMan.defaultLocation.coordinates[1]),
          lng: parseFloat(deliveryMan.defaultLocation.coordinates[0]),
        };
      }
      if (position) {
        const geocoder = new window.google.maps.Geocoder();
        
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === "OK" && results[0]) {
            const postalCode = results[0].address_components.find(component => component.types.includes("postal_code"))?.long_name;
            const address = postalCode ? `${results[0].formatted_address.replace(postalCode, '')} (${postalCode})` : results[0].formatted_address;
            
            const marker = new window.google.maps.Marker({
              position,
              map,
              title: `${deliveryMan.firstName} ${deliveryMan.lastName}`,
              icon: {
                url: locationimg,
                scaledSize: new window.google.maps.Size(40, 40),
              },
            });
            console.log("marker", marker);

            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div class="info-window-container">
                  <div class="info-header">
                    <h4 class="delivery-man-name" style="font-weight: bold;">${deliveryMan.firstName} ${deliveryMan.lastName}</h4>
                    <p class="delivery-man-address"><strong style="font-weight: bold;">Address:</strong> ${address}</p>
                  </div>
                </div>`,
            });
            
            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });

            newMarkers.push(marker);
            hasValidMarkers = true;
            bounds.extend(position);
          }
        });
      }
    });
    // find the center of all markers by math


    setMarkers(newMarkers);

    if (hasValidMarkers) {
      map.fitBounds(bounds);
    }
  };

  useEffect(() => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
    console.log("deliveryMen", deliveryMen);
   
    console.log("isLoaded", isLoaded);
    console.log("deliveryMen.length", deliveryMen.length);
    console.log("mapRef.current", mapRef.current);

    if (isLoaded && deliveryMen.length > 0 && mapRef.current) {
      addMarkersAndAdjustBounds();
    }
  }, [deliveryMen, isLoaded]);

  useEffect(() => {
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [markers]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4} // Set zoom level here
        center={center}
        onLoad={(map) => {
          mapRef.current = map;
          addMarkersAndAdjustBounds(); // Fast render and then set mapRef
        }}
      >
        {/* Markers will be added dynamically */}
      </GoogleMap>
    </div>
  );
}

export default DeliveryManLocation;
