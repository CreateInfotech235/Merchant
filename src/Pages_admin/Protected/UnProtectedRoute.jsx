import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./../Pages_merchant/Auth/auth.css"
import "bootstrap/dist/css/bootstrap.min.css";

const UnprotectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessTokenForAdmin");
//   const merchnatId = localStorage.getItem('merchnatId')
  const navigate = useNavigate();

  // console.log('token', token);
  
  useEffect(() => {
    if (token) {
      navigate("/dashboard");  // Redirect to dashboard if token exists
    }
  }, [token, navigate]);

  return (!token)? children : null;  // Only render children if token does not exist
};

export default UnprotectedRoute;
