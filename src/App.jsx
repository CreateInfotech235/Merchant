import React, { useEffect, useState } from "react";

import "./App.css";

// import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MerchantSidebar from "./Components_merchant/MerchantSidebar/MerchantSidebar";
import Header from "./Components_merchant/Header/Header";
// import Breadcrumb from "../../dashboard/src/Components/Breadcrumb/Breadcrumb";
import MerchantDashboard from "./Pages_merchant/MerchantDashboard/MerchantDashboard";
import UnprotectedRoute from "./routing_merchant/UnProtectedRoute";
import ProtectedRoute from "./routing_merchant/ProtectedRoute";
// Import all pages
import CreateOrder from "./Pages_merchant/CreateOrder/CreateOrder";
import AllOrder from "./Pages_merchant/AllOrder/AllOrder";
import OrderLocation from "./Pages_merchant/OrderLocation/OrderLocation";
import DeliveryMan from "./Pages_merchant/DeliveryMan/DeliveryMan";
import Pending from "./Pages_merchant/Pending/Pending";
import Approved from "./Pages_merchant/Approved/Approved";
import Rejected from "./Pages_merchant/Rejected/Rejected";
import Setup from "./Pages_merchant/Setup/Setup";
import Login from "./Pages_merchant/Auth/Login";
import Signup from "./Pages_merchant/Auth/SignUpPage";
import Customer from "./Pages_merchant/Customer/Customer";
import AddCustomer from "./Pages_merchant/Customer/AddCustomer";
import AddDeliveryMan from "./Pages_merchant/DeliveryMan/AddDeliveryMan";
import Vehicle from "./Pages_merchant/Vehicle/Vehicle";
import AddVehicle from "./Pages_merchant/AddVehicle/AddVehicle";
import ProfilePage from "./Components_merchant/Profile/Profile";
import UpdateProfile from "./Components_merchant/Profile/UpdateProfile";
import SubscriptionPlan from "./Pages_merchant/SubscriptionPlan/SubscriptionPlan";
import TrashedOrder from "./Pages_merchant/TrashedOrder/TrashedOrder";
import SubscriptionActive from "./Pages_merchant/SubscriptionPlan/SubscriptionActive";
import TrashedCustomer from "./Pages_merchant/Customer/TrashedCustomer";
import TrashedDeliveryman from "./Pages_merchant/DeliveryMan/TrashedDeliveryman";
import FreePlan from "./Pages_merchant/FreePlan/FreePlan";
import DeliveryManLocation from "./Pages_merchant/DeliveryMan/DeliveryManLocation";
import Formate from "./Components_web/Formate/Formate";
import Mainbody from "./Components_web/WebBody/Mainbody";
import Pricing from './Pages_web/Pricing/Pricing'
import Tracking from './Pages_web/Tracking/Tracking'
import LoginWeb from './Components_web/Login/Login'
import SignupWeb from './Components_web/SignUp/Signup'
import SupportTicket from "./Pages_merchant/SupportTicket/SupportTicket";
import About from "./Pages_web/About/About";
import Contact from "./Pages_web/Contact/Contact";
import InvoiceFormate from "./Pages_merchant/AllOrder/InvoiceFormate";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" />

      <Routes>
        {/* Unprotected Routes */}
        <Route
          path="/merchant"
          element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          }
        />

        <Route
          path="/merchant/login"
          element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          }
        />
        <Route path="/subscription" element={<FreePlan />} />

        <Route
          path="/sign-up"
          element={
            <UnprotectedRoute>
              <Signup />
            </UnprotectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/Merchant-dashboard"
          element={
            <ProtectedRoute>
              <MerchantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-order"
          element={
            <ProtectedRoute>
              <CreateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-order"
          element={
            <ProtectedRoute>
              <AllOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trashed-order"
          element={
            <ProtectedRoute>
              <TrashedOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice-format"
          element={
            <ProtectedRoute>
              <InvoiceFormate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-location"
          element={
            <ProtectedRoute>
              <OrderLocation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery-man"
          element={
            <ProtectedRoute>
              <DeliveryMan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Show-list-of-support-ticket"
          element={
            <ProtectedRoute>
              <SupportTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-delivery-man"
          element={
            <ProtectedRoute>
              <AddDeliveryMan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery-man-trashed"
          element={
            <ProtectedRoute>
              <TrashedDeliveryman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery-man-location"
          element={
            <ProtectedRoute>
              <DeliveryManLocation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pending"
          element={
            <ProtectedRoute>
              <Pending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approved"
          element={
            <ProtectedRoute>
              <Approved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rejected"
          element={
            <ProtectedRoute>
              <Rejected />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account-details"
          element={
            <ProtectedRoute>
              <Setup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-customer"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-customer"
          element={
            <ProtectedRoute>
              <AddCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trashed-customer"
          element={
            <ProtectedRoute>
              <TrashedCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-vehicle"
          element={
            <ProtectedRoute>
              <Vehicle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-vehicle"
          element={
            <ProtectedRoute>
              <AddVehicle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription-plans"
          element={
            <ProtectedRoute>
              <SubscriptionPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription-active"
          element={
            <ProtectedRoute>
              <SubscriptionActive />
            </ProtectedRoute>
          }
        />

        {/* web */}

        <Route
          path="/"
          element={
            <Formate>
              <Mainbody />
            </Formate>
          }
        />

        <Route
          path="/pricing"
          element={
            <Formate>
              <Pricing />
            </Formate>
          }
        />
        <Route path="/login" element={<LoginWeb />} />
        <Route path="/register" element={<SignupWeb />} />
        <Route
          path="/tracking"
          element={
            <Formate>
              <Tracking />
            </Formate>
          }
        />
        <Route
          path="/about"
          element={
            <Formate>
              <About />
            </Formate>
          }
        />
        <Route
          path="/contact"
          element={
            <Formate>
              <Contact />
            </Formate>
          }
        />
      </Routes>

      <Analytics />
    </BrowserRouter>
  );
}

export default App;
