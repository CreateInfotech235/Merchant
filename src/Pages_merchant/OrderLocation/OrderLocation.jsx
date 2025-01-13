import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./OrderLocation.css"; // Assuming a CSS file exists for styling
import deliveryloc from "../../assets_mercchant/deliveryloc.png";
import pickup from "../../assets_mercchant/pickup.png";
import accepted from "../../assets_mercchant/accepted.svg";
import assigned from "../../assets_mercchant/assigned.svg";
import arrived from "../../assets_mercchant/arrived.svg";
import pickedup from "../../assets_mercchant/picked-up.svg";
import departed from "../../assets_mercchant/departed.svg";
import MapWithMarker from "./MapWithMarker";

const AnyReactComponent = (
  { lat, lng, text } // Assuming AnyReactComponent is defined elsewhere
) => (
  <div>
    {text}
    <br />
    Latitude: {lat} <br />
    Longitude: {lng}
  </div>
);

const OrderLocation = () => {
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
        <div style={{ height: "672px", width: "100%" }}>
          {/* <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAZsykEn-ZvYj-i1ubEl3Ss4zdaWKCyGCg", // Replace with your actual Google Maps API key
            }}
            defaultCenter={{ lat: 59.95, lng: 30.33 }}
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
          </GoogleMapReact> */}

          <MapWithMarker address='dhara arcade mota varachha surat' />
        </div>
      </div>

    </>
  );
};

export default OrderLocation;
