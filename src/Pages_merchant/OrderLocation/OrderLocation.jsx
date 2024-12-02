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

const location = {
  _id: "674ab16550433900eccd624e",
  orderId: 90,
  cashOnDelivery: false,
  dateTime: "2024-11-30T06:31:45.484Z",
  status: "ASSIGNED",
  customerName: "KRISH",
  pickupAddress: {
    location: {
      latitude: 21.23711,
      longitude: 72.8854336,
    },
    merchantId: "66d3f77c6e9d32f604674fb2",
    dateTime: "2024-12-01T06:31:00.000Z",
    address: "Amroli, Adajan Taluka, Surat, Gujarat, 394101, India",
    mobileNumber: 9484475572,
    name: "Create",
    email: "demo@gmail.com",
    request: "REGULAR",
    postCode: "NW9 9PG",
    cashOnDelivery: false,
    _id: "674ab16550433900eccd624f",
  },
  deliveryAddress: {
    address: "123 Motavarchha",
    mobileNumber: 1234567890,
    name: "KRISH",
    email: "john.doe12@example.com",
    postCode: "12345",
    cashOnDelivery: false,
    _id: "674ab16550433900eccd6250",
  },
  deliveryMan: "John Demo us",
  deliveryManId: "674009ee335599cce61c4c36",
  pickupDate: "01-12-2024 , 06:31",
  merchantId: "66d3f77c6e9d32f604674fb2",
  deliveryDate: null,
  createdDate: "30-11-2024 , 06:32",
  pickupRequest: "REGULAR",
  postCode: "NW9 9PG",
  trashed: true,
};

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
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="pickup-location p-1 border-0 text-light m-3 rounded-2 flex justify-center items-center"
        >
          <img src={pickup} className="loc-img" alt="Pick Up Location" /> Pick
          Up Location
        </button>
        <button
          type="button"
          className="pickup-location p-1 border-0 text-light m-3 rounded-2 flex justify-center items-center"
        >
          <img src={deliveryloc} className="loc-img" alt="Delivery Location" />{" "}
          Delivery Location
        </button>
      </div>
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

      <div class="d-xxl-flex flex-xxl-row d-xl-flex flex-xl-row d-lg-flex flex-lg-row d-md-flex flex-md-row d-sm-flex flex-sm-column d-flex flex-column align-items-center justify-content-xxl-start justify-content-xl-start  justify-content-lg-start  justify-content-md-start  justify-content-sm-center justify-content-center content">
        <div class="d-flex  align-items-center  align-content-center m-5">
          <div class="d-flex align-content-center table-responsive">
            <table className="table-borderless text-center">
              <tbody>
                <tr>
                  <td class="pe-3 pb-2">
                    <img src={accepted} class="accept" alt="Accepted" />
                  </td>
                  <td class="pe-3 pb-2">Accepted</td>
                  <td class="pe-3 pb-2">
                    <input type="checkbox" className="check" />
                  </td>
                </tr>
                <tr>
                  <td class="pe-3 pb-2">
                    <img src={assigned} class="accept" alt="Assigned" />
                  </td>
                  <td class="pe-3 pb-2">Assigned</td>
                  <td class="pe-3 pb-2">
                    <input type="checkbox" className="check" />
                  </td>
                </tr>
                <tr>
                  <td class="pe-3 pb-2">
                    <img src={arrived} class="accept" alt="Arrived" />
                  </td>
                  <td class="pe-3 pb-2">Arrived</td>
                  <td class="pe-3 pb-2">
                    <input type="checkbox" className="check" />
                  </td>
                </tr>
                <tr>
                  <td class="pe-3 pb-2">
                    <img src={pickedup} class="accept" alt="Picked Up" />
                  </td>
                  <td class="pe-3 pb-2">Picked Up</td>
                  <td class="pe-3 pb-2">
                    <input type="checkbox" className="check" />
                  </td>
                </tr>
                <tr>
                  <td class="pe-3 pb-2">
                    <img src={departed} class="accept" alt="Departed" />
                  </td>
                  <td class="pe-3 pb-2">Departed</td>
                  <td class="pe-3 pb-2">
                    <input type="checkbox" className="check" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="vertical m-4"></div>
        </div>

        <div class="d-flex  align-items-center  align-content-center table-responsive my-5">
          <table class="table-borderless ">
            <thead class="mb-3">
              <th class="pb-3">country</th>
              <th class="pb-3">Order</th>
            </thead>
            <tbody>
              <tr>
                <td class="pe-3 pb-2">afghanistan :</td>
                <td class="pe-3 pb-2">100</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">algeria :</td>
                <td class="pe-3 pb-2">50</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">Georgia :</td>
                <td class="pe-3 pb-2">70</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">antarctica :</td>
                <td class="pe-3 pb-2">40</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">Bolivia :</td>
                <td class="pe-3 pb-2">50</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">Moldova :</td>
                <td class="pe-3 pb-2">70</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">Vanuatu :</td>
                <td class="pe-3 pb-2">40</td>
              </tr>
            </tbody>
          </table>

          <div class="vertical m-4"></div>
        </div>

        <div class="d-flex  align-items-center  table-responsive align-content-center my-5">
          <table class="table-borderless m-5">
            <thead>
              <th class="pb-3">country</th>
              <th class="pb-3">Order</th>
            </thead>
            <tbody>
              <tr>
                <td class="pe-3 pb-2">afghanistan :</td>
                <td class="pe-3 pb-2">100</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">algeria :</td>
                <td class="pe-3 pb-2">50</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">Georgia :</td>
                <td class="pe-3 pb-2">70</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">antarctica :</td>
                <td class="pe-3 pb-2">40</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">Bolivia :</td>
                <td class="pe-3 pb-2">50</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">Moldova :</td>
                <td class="pe-3 pb-2">70</td>
              </tr>
              <tr>
                <td class="pe-3 pb-2">Vanuatu :</td>
                <td class="pe-3 pb-2">40</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderLocation;
