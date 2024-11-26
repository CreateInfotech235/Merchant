import React, { useState } from 'react'
import GoogleMapReact from "google-map-react";

const DeliveryManLocation = () => {
    const [selectedLocation, setSelectedLocation] = useState({
        lat: null,
        lng: null,
      });
    const handleMapClick = ({ lat, lng }) => {
        setSelectedLocation({ lat, lng });
      };
  return (
    <>
  <div className="delivery-man-location">

<div style={{ height: "672px", width: "1388px", }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyAZsykEn-ZvYj-i1ubEl3Ss4zdaWKCyGCg",
                }}
                defaultCenter={{
                  lat: 59.95,
                  lng: 30.33,
                }}
                defaultZoom={11}
                onClick={handleMapClick}
              >
                {selectedLocation.lat && selectedLocation.lng && (
                  <AnyReactComponent
                    lat={selectedLocation.lat}
                    lng={selectedLocation.lng}
                    text="Selected Location"
                  />
                )}
              </GoogleMapReact>
            </div>
  </div>

  <div></div>
  </>
  )
}

export default DeliveryManLocation