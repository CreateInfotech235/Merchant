import Typed from 'typed.js';

export function createFunksen(id, textArray, typeSpeed=80, backSpeed=100) {
  const options = {
    strings: textArray,
    typeSpeed: typeSpeed,
    backSpeed: backSpeed,
    loop: true,
    showCursor: false, // Added to not show the cursor
  };
  const isid = id.includes('#') ? id : `#${id}`;

  const getElement = document.querySelector(isid);

  if(!getElement){
    return;
  }

  // Initialize Typed.js with the provided id and options
  const typing = new Typed(isid, options);

  // Return a cleanup function to destroy the instance
  return () => {
    typing.destroy();
  };
}
