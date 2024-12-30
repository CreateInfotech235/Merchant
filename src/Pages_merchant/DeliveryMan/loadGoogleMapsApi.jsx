let isScriptLoaded = false;

export const loadGoogleMapsApi = (apiKey, libraries = []) => {
  return new Promise((resolve, reject) => {
    if (isScriptLoaded) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    const librariesParam = libraries.length ? `&libraries=${libraries.join(',')}` : '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${librariesParam}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isScriptLoaded = true;
      resolve(window.google);
    };

    script.onerror = (error) => reject(error);

    document.head.appendChild(script);
  });
};
