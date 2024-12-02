import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapWithMarker() {
    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    
    const apiKey = 'AIzaSyDB4WPFybdVL_23rMMOAcqIEsPaSsb-jzo'; 
    const mapRef = useRef(null);
    const center = {
        lat: 40.7128,  
        lng: -74.0060,
    };

    useEffect(() => {
        const map = mapRef.current;
      
    
        if (window.google && map) {
            // Create a marker and set its position
            const marker = new window.google.maps.Marker({
                position: center,
                map: map, // Attach marker to the map
                title: 'New York City', // Optional title
            });

            // Optionally, you can add a click event listener for the marker
            marker.addListener('click', () => {
                alert('Marker clicked!');
            });
        }
    }, [center]);

    return (
        <div>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                    onLoad={(map) => (mapRef.current = map)} // Save map instance
                >
                    {/* Marker will be added via useEffect */}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default MapWithMarker;