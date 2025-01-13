// import React, { useState , useEffect} from "react";
// import GoogleMapReact from "google-map-react";
// import { getDeliveryManLocation } from "../../Components_admin/Api/DeliveryMan";

// const DeliveryManDestination = () => {
//   const [selectedLocation, setSelectedLocation] = useState({
//     lat: null,
//     lng: null,
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const itemsPerPage = 10;
//   const [location, setLoaction] = useState([]); // State for API data
//   const [totalPages, setTotalPages] = useState(1); // For pagination

//   const fetchLocation = async () => {
//     const searchParam = searchTerm ? `&searchValue=${searchTerm}` : '';
//     const res = await getDeliveryManLocation(currentPage, itemsPerPage, searchParam);
//     console.log('res location',res);

//     if (res.status) {
//       setLoaction(res.data.data);
//       setTotalPages(Math.ceil(res.data.totalDataCount / itemsPerPage));
//     }
//   }

//   useEffect(() => {
//     fetchLocation();
//   }, [currentPage, searchTerm]);
//   const handleMapClick = ({ lat, lng }) => {
//     setSelectedLocation({ lat, lng });
//   };
//   return (
//     <>
//       <div className="delivery-man-location">
//         <div style={{ height: "672px", width: "1388px" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{
//               key: "AIzaSyAZsykEn-ZvYj-i1ubEl3Ss4zdaWKCyGCg",
//             }}
//             defaultCenter={{
//               lat: 59.95,
//               lng: 30.33,
//             }}
//             defaultZoom={11}
//             onClick={handleMapClick}
//           >
//             {selectedLocation.lat && selectedLocation.lng && (
//               <AnyReactComponent
//                 lat={selectedLocation.lat}
//                 lng={selectedLocation.lng}
//                 text="Selected Location"
//               />
//             )}
//           </GoogleMapReact>
//         </div>

//         <div class="d-xxl-flex flex-xxl-row  d-xl-flex flex-xl-row  d-lg-flex flex-lg-row  d-md-flex  flex-md-row d-sm-flex flex-sm-row  flex-column d-flex">
//           <div class="d-flex">
//             <div>
//               <h3 class="fw-bold pb-4 mt-5">Delivery information</h3>
//               <table>
//                 <tr class="pb-3">
//                   <td class="fw-bold pe-2 mb-3 pb-3">delivery man name:</td>
//                   <td class="pb-3">darrel asmtim</td>
//                 </tr>
//                 <tr class="pb-3">
//                   <td class="fw-bold pe-2 mb-3 pb-3">delivery man number:</td>
//                   <td class="pb-3">45621562546</td>
//                 </tr>
//                 <tr>
//                   <td class="fw-bold pe-2 mb-3 pb-3">delivery man distance:</td>
//                   <td class="pb-3">0 to 45.2 Miles around</td>
//                 </tr>
//                 <tr>
//                   <td class="fw-bold pe-2 mb-3 pb-3">delivery man charges:</td>
//                   <td class="pb-3">10</td>
//                 </tr>
//               </table>
//             </div>

//             <div class="vertical m-4"></div>
//           </div>

//           <div>
//             <h3 class="fw-bold pb-4 mt-5">charges</h3>
//             <table>
//               <tr class="pb-3">
//                 <td class="fw-bold pe-3 mb-3 pb-3">fixed charge:</td>
//                 <td class="pb-3"> 50</td>
//               </tr>
//               <tr class="pb-3">
//                 <td class="fw-bold pe-3 mb-3 pb-3">cancel charge:</td>
//                 <td class="pb-3">45</td>
//               </tr>
//               <tr>
//                 <td class="fw-bold pe-3 mb-3 pb-3">per distance charge:</td>
//                 <td class="pb-3">0 </td>
//               </tr>
//               <tr>
//                 <td class="fw-bold pe-3 mb-3 pb-3">per weight charge:</td>
//                 <td class="pb-3">10</td>
//               </tr>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DeliveryManDestination;
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import locationimg from "../../assets_admin/delivery-bike.png";
import { getDeliveryManLocation } from "../../Components_admin/Api/DeliveryMan";

function DeliveryManDestination() {
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const [deliveryMen, setDeliveryMen] = useState([]);
  const [center, setCenter] = useState({
    lat: 40.7128, // Default center (New York)
    lng: -74.006,
  });

  const apiKey = "AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo";
  const mapRef = useRef(null);

  const fetchDeliveryMen = async () => {
    const response = await getDeliveryManLocation(1, 500000);
    console.log("response", response.data);
    if (response.status) {
      setDeliveryMen(response.data.data);
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
          center={center}
          zoom={5}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Markers will be added via useEffect */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default DeliveryManDestination;
