import React from "react";
import pageNotFoundImage from "../../assets_web/404 Error with a cute animal-bro 1.png";
function PageNotFound() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <img src={pageNotFoundImage} alt="Page Not Found" />
      </div>
      <h1 className="text-8xl text-center font-sans text-[#9A9898]">404</h1>
      <p className="text-center text-5xl mt-4 noto font-semibold small">
        Oops! Page Not Be Found
      </p>
      <p className="text-center text-xl my-4 text-gray-600">
        Sorry but the page you are looking for does not exist, has been removed,
        changed or is temporarily unavailable.
      </p>

    
    </div>
  );
}

export default PageNotFound;
