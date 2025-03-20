import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./../Pages_merchant/Auth/auth.css"
import "bootstrap/dist/css/bootstrap.min.css";

const UnprotectedRoute = ({ children }) => {
  return  children;  // Only render children if token does not exist
};

export default UnprotectedRoute;
