import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { getDeliveryMan } from '../../Components_merchant/Api/DeliveryMan';

function DeliveryManLocation() {
    const mapContainerStyle = {
        width: '100%',
        height: '100vh',
    };

    const [deliveryMen, setDeliveryMen] = useState([]);
    const [center, setCenter] = useState({
        lat: 40.7128, // Default center (New York)
        lng: -74.0060
    });
    
    const apiKey = 'AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo'; 
    const mapRef = useRef(null);

    const fetchDeliveryMen = async () => {
        const response = await getDeliveryMan();
        // console.log("response", response.data);
        if (response.status) {
            setDeliveryMen(response.data);
            
            // Set center based on first delivery man with valid coordinates
            const firstValidDeliveryMan = response.data.find(dm => 
                dm.location?.coordinates?.length === 2 &&
                !isNaN(parseFloat(dm.location.coordinates[1])) &&
                !isNaN(parseFloat(dm.location.coordinates[0]))
            );

            if (firstValidDeliveryMan) {
                setCenter({
                    lat: parseFloat(firstValidDeliveryMan.location.coordinates[1]),
                    lng: parseFloat(firstValidDeliveryMan.location.coordinates[0])
                });
            }
        }
    };

    useEffect(() => {
        fetchDeliveryMen();
    }, []);

    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 5;
        const retryInterval = 1000; // 1 second

        const addMarkers = () => {
            const map = mapRef.current;

            if (!map || !window.google) {
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(addMarkers, retryInterval);
                    return;
                }
                // console.log('Failed to load map after maximum retries');
                return;
            }

            // Create markers for each delivery man
            deliveryMen.forEach(deliveryMan => {
                if (deliveryMan.location && 
                    deliveryMan.location.coordinates && 
                    Array.isArray(deliveryMan.location.coordinates) &&
                    deliveryMan.location.coordinates.length === 2) {
                    
                    const position = {
                        lat: parseFloat(deliveryMan.location.coordinates[1]),
                        lng: parseFloat(deliveryMan.location.coordinates[0])
                    };

                    // Only create marker if coordinates are valid numbers
                    if (!isNaN(position.lat) && !isNaN(position.lng)) {
                        const marker = new window.google.maps.Marker({
                            position: position,
                            map: map,
                            title: `${deliveryMan.firstName} ${deliveryMan.lastName}`,
                        });

                        // Create info window with delivery man name
                        const infoWindow = new window.google.maps.InfoWindow({
                            content: `${deliveryMan.firstName} ${deliveryMan.lastName}`
                        });

                        // Show info window by default
                        infoWindow.open(map, marker);
                    }
                }
            });
        };

        if (deliveryMen.length > 0) {
            addMarkers();
        }
    }, [deliveryMen]);

    return (
        <div>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                    onLoad={(map) => (mapRef.current = map)}
                >
                    {/* Markers will be added via useEffect */}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default DeliveryManLocation;