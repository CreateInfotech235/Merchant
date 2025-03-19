import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../Components_admin/Sidebar/Sidebar";
import Breadcrumb from "../../Components_admin/Breadcrumb/Breadcrumb";
import Header from "../../Components_admin/Header/Header";
import { authenticateAdmin } from "../../Components_admin/Api/Dashboard";
import PageNotFound from "../../Pages_web/PageNotFound/PageNotFound";
const ProtectedRoute = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessTokenForAdmin");
  const navigate = useNavigate();
  const fetchData = async () => {
    const response = await authenticateAdmin()
    if (!response.status) {
      localStorage.removeItem("accessTokenForAdmin")
      localStorage.removeItem("refreshTokenForAdmin")
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }

  // Check authentication
  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      setIsLoading(true);
    }
  }, [token, navigate]);

  

  // Check free subscription

  // Theme mode effect
  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [themeMode]);

  // Fetch subscription info

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };


  if (isLoading) {
    return <PageNotFound />
  }
  return (
    <div className="container-fluid p-0">
      <div className="main row d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between">
        <div className="sidebarWrapper col-xxl-2 col-xl-2">
          {/* Show Sidebar only if authenticated */}
          <Sidebar />
        </div>
        <div className="content min-h-screen col-xxl-10 col-xl-10 col-lg-12 col-md-12 p-xxl-5 p-xl-5 p-lg-4 p-md-4 p-4">
          <div className="d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between d-lg-flex justify-content-lg-between d-md-flex justify-content-md-between d-sm-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-column">
            {/* Show Breadcrumb and Header only if authenticated */}
            <Breadcrumb />

            <Header toggleThemeMode={toggleThemeMode} themeMode={themeMode} />

          </div>
          {token ? children : null}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
