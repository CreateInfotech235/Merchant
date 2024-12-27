import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './TomTomMap.css'; // Import the external CSS file for styles

const TomTomMap = () => {
  const mapElement = useRef(null);
  const longitude = 72.8855;
  const latitude = 21.237194;

  useEffect(() => {
    const map = tt.map({
      key: 'RY2hfAAy25pdy67HQqA49trW7RiJTTRC',
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 10,
    });

    return () => map.remove(); // Cleanup map on component unmount
  }, []);

  return <div ref={mapElement} className="map-container" />;
};

export default TomTomMap;
