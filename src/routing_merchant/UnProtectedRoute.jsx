import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../Pages_merchant/Auth/auth.css"
import "bootstrap/dist/css/bootstrap.min.css";

const UnprotectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const merchnatId = localStorage.getItem('merchnatId')
  const navigate = useNavigate();

  // console.log('token', token, merchnatId);
  
  useEffect(() => {
    if (token && merchnatId) {
      navigate("/Merchant-dashboard");  // Redirect to dashboard if token exists
    }
  }, [token, navigate]);

  return (!token || !merchnatId )? children : null;  // Only render children if token does not exist
};

export default UnprotectedRoute;
