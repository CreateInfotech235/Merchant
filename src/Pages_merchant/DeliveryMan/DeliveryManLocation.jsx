import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import locationimg from "../../assets_mercchant/delivery-bike.png";
import { getDeliveryMan } from "../../Components_merchant/Api/DeliveryMan";
import './DeliveryMan.css'
function DeliveryManLocation() {
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const [deliveryMen, setDeliveryMen] = useState([]);
  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const mapRef = useRef(null);

  const fetchDeliveryMen = async () => {
    const response = await getDeliveryMan();
    console.log("response", response);
    if (response.status) {
      setDeliveryMen(response.data);
    }
  };

  useEffect(() => {
    fetchDeliveryMen();
  }, []);

  useEffect(() => {
    const addMarkersAndAdjustBounds = () => {
      const map = mapRef.current;

      if (!map || !window.google || deliveryMen.length === 0) return;

      const bounds = new window.google.maps.LatLngBounds();

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
          const marker = new window.google.maps.Marker({
            position,
            map,
            title: `${deliveryMan.firstName} ${deliveryMan.lastName}`,
            icon: {
              url: locationimg, // URL of the image
              scaledSize: new window.google.maps.Size(40, 40), // Adjust width and height
            },
          });
          

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="info-window-container">
                <div class="info-header">
                  <h4 class="delivery-man-name">${deliveryMan.firstName} ${deliveryMan.lastName}</h4>
                </div>
              </div>`,
          });
          

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
          bounds.extend(position);
        }
      });

      // Adjust map to fit all markers
      map.fitBounds(bounds);
    };

    if (deliveryMen.length > 0) {
      addMarkersAndAdjustBounds();
    }
  }, [deliveryMen]);

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Markers will be added dynamically */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default DeliveryManLocation;
