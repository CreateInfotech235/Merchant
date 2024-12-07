import React, { useState , useEffect} from "react";
import GoogleMapReact from "google-map-react";
import { getDeliveryManLocation } from "../../Components_admin/Api/DeliveryMan";

const DeliveryManDestination = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });


  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [location, setLoaction] = useState([]); // State for API data
  const [totalPages, setTotalPages] = useState(1); // For pagination


  const fetchLocation = async () => {
    const searchParam = searchTerm ? `&searchValue=${searchTerm}` : ''; 
    const res = await getDeliveryManLocation(currentPage, itemsPerPage, searchParam); 
    console.log('res location',res);
    
    if (res.status) {
      setLoaction(res.data.data);
      setTotalPages(Math.ceil(res.data.totalDataCount / itemsPerPage));
    }
  }

  useEffect(() => {
    fetchLocation();
  }, [currentPage, searchTerm]);
  const handleMapClick = ({ lat, lng }) => {
    setSelectedLocation({ lat, lng });
  };
  return (
    <>
      <div className="delivery-man-location">
        <div style={{ height: "672px", width: "1388px" }}>
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

        <div class="d-xxl-flex flex-xxl-row  d-xl-flex flex-xl-row  d-lg-flex flex-lg-row  d-md-flex  flex-md-row d-sm-flex flex-sm-row  flex-column d-flex">
          <div class="d-flex">
            <div>
              <h3 class="fw-bold pb-4 mt-5">Delivery information</h3>
              <table>
                <tr class="pb-3">
                  <td class="fw-bold pe-2 mb-3 pb-3">delivery man name:</td>
                  <td class="pb-3">darrel asmtim</td>
                </tr>
                <tr class="pb-3">
                  <td class="fw-bold pe-2 mb-3 pb-3">delivery man number:</td>
                  <td class="pb-3">45621562546</td>
                </tr>
                <tr>
                  <td class="fw-bold pe-2 mb-3 pb-3">delivery man distance:</td>
                  <td class="pb-3">0 to 45.2 Miles around</td>
                </tr>
                <tr>
                  <td class="fw-bold pe-2 mb-3 pb-3">delivery man charges:</td>
                  <td class="pb-3">10</td>
                </tr>
              </table>
            </div>

            <div class="vertical m-4"></div>
          </div>

          <div>
            <h3 class="fw-bold pb-4 mt-5">charges</h3>
            <table>
              <tr class="pb-3">
                <td class="fw-bold pe-3 mb-3 pb-3">fixed charge:</td>
                <td class="pb-3"> 50</td>
              </tr>
              <tr class="pb-3">
                <td class="fw-bold pe-3 mb-3 pb-3">cancel charge:</td>
                <td class="pb-3">45</td>
              </tr>
              <tr>
                <td class="fw-bold pe-3 mb-3 pb-3">per distance charge:</td>
                <td class="pb-3">0 </td>
              </tr>
              <tr>
                <td class="fw-bold pe-3 mb-3 pb-3">per weight charge:</td>
                <td class="pb-3">10</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryManDestination;
