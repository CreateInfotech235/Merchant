import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const TomTomMap = () => {
  const mapElement = useRef(null);
  const longitude = 72.885500;
  const latitude = 21.237194;


  useEffect(() => {
    const map = tt.map({
      key: 'RY2hfAAy25pdy67HQqA49trW7RiJTTRC',
      container: mapElement.current,
      center: [longitude, latitude], // Replace with desired coordinates
      zoom: 10,
    });

    return () => map.remove(); // Cleanup map on component unmount
  }, []);

  return <div ref={mapElement} style={{ height: '500px', width: '100%' }} />;
};

export default TomTomMap;
