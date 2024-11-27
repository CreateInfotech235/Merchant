// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import MerchantSidebar from "./Components/MerchantSidebar/MerchantSidebar";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import MerchantDashboard from "./Pages/MerchantDashboard/MerchantDashboard";
// import Breadcrumb from "../../dashboard/src/Components/Breadcrumb/Breadcrumb";
// import Header from "./Components/Header/Header";
// import CreateOrder from "./Pages/CreateOrder/CreateOrder";
// import AllOrder from "./Pages/AllOrder/AllOrder";
// import OrderLocation from "./Pages/OrderLocation/OrderLocation";
// import DeliveryMan from "./Pages/DeliveryMan/DeliveryMan";
// import Pending from "./Pages/Pending/Pending";
// import Approved from "./Pages/Approved/Approved";
// import Rejected from "../../dashboard/src/Pages/Rejected/Rejected";
// import Setup from "../../dashboard/src/Pages/Setup/Setup";
// import ParcelType from "./Pages/ParcelType/ParcelType";
// import Vehicle from "./Pages/Vehicle/Vehicle";
// import DepositeMerchant from "./Pages/Deposite/Deposite";
// import WithdrawRequest from "./Pages/WithdrawRequest/WithdrawRequest";
// import DeliveryManLocation from "./Pages/DeliverymanLocation/DeliveryManLocation";
// import SupportTicket from "./Pages/SupportTicket/SupportTicket";
// import RaiseIssue from "./Pages/RaiseIssue/RaiseIssue";
// import Offer from "./Pages/Offer/offer";
// import AddVehicle from "./Pages/AddVehicle/AddVehicle";
// import UpdateVehicle from "./Pages/UpdateVehicle/UpdateVehicle";
// import RegularCharge from "./Pages/RegularCharges/RegularCharges";
// import AddParcelType from "./Pages/AddParcelType/AddParcelType";
// import ExpressCharge from "./Pages/ExpressCharge/ExpressCharge";
// import RegularPickupRequest from "./Pages/RegularPickupRequest/RegularPickupRequest";
// import ExpressPickupRequest from "./Pages/ExpressPickupRequest/ExpressPickupRequest";
// import UploadDocument from "./Pages/UploadDocument/UploadDocument";
// import Cerificate from "./Pages/Certificate/Cerificate";


// function App() {
//   const [themeMode, setThemeMode] = useState("light");

//   useEffect(() => {
//     if (themeMode === "dark") {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }, [themeMode]);

//   const toggleThemeMode = () => {
//     setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//   };

//   return (
//     <BrowserRouter>
//       <div className={`app ${themeMode}`}>
//         <div className="container-fluid p-0">
//           <div className="main row d-xxl-flex flex-row justify-content-xxl-between d-xl-flex justify-content-xl-between">
//             <div className="sidebarWrapper col-xxl-2 col-xl-2">
//               <MerchantSidebar />
//             </div>
//             <div className="content col-xxl-10 col-xl-10 col-lg-12 col-md-12 p-xxl-5 p-xl-5 p-lg-4 p-md-4 p-4">
//               <div className="d-flex flex-xxl-row-reverse justify-content-xxl-between flex-xl-row-reverse justify-content-xl-between flex-lg-row-reverse justify-content-lg-between flex-md-row-reverse justify-content-md-between flex-sm-column justify-content-sm-center align-items-sm-center  flex-column justify-content-center align-items-center  ">
//                 <Header
//                   toggleThemeMode={toggleThemeMode}
//                   themeMode={themeMode}
//                 />

//                 <Breadcrumb />
//               </div>
//               <Routes>
//                 <Route
//                   path="/Merchant-dashboard"
//                   element={<MerchantDashboard />}
//                 />
//                 <Route path="/create-order" element={<CreateOrder />} />
//                 <Route path="/all-order" element={<AllOrder />} />
//                 <Route path="/order-location" element={<OrderLocation />} />
//                 <Route path="/delivery-man" element={<DeliveryMan />} />
//                 <Route path="/pending" element={<Pending />} />
//                 <Route path="/approved" element={<Approved />} />
//                 <Route path="/rejected" element={<Rejected />} />
//                 <Route path="/account-details" element={<Setup />} />
//                 <Route path="/parcel-type" element={<ParcelType />} />
//                 <Route path="/all-vehicle" element={<Vehicle />} />
//                 <Route path="/deposite" element={<DepositeMerchant />} />
//                 <Route path="/withdraw-request" element={<WithdrawRequest />} />
//                 <Route
//                   path="/Delivery-man-location"
//                   element={<DeliveryManLocation />}
//                 />
//                 <Route
//                   path="/Show-list-of-support-ticket"
//                   element={<SupportTicket />}
//                 />
//                 <Route path="/raise-issue" element={<RaiseIssue />} />
//                 <Route path="/offer" element={<Offer />} />
//                 <Route path="/add-vehicle" element={<AddVehicle />} />
//                 <Route path="/update-vehicle" element={<UpdateVehicle />} />
//                 <Route path="/regular-charges" element={<RegularCharge />} />
//                 <Route path="/add-parcel-type" element={<AddParcelType />} />
//                 <Route path="/express-charges" element={<ExpressCharge />} />
//                 <Route path="/regular-pickup-request" element={<RegularPickupRequest />} />
//                 <Route path="/express-pickup-request" element={<ExpressPickupRequest />} />
//                 <Route path="/upload-document" element={<UploadDocument/>} />
//                 <Route path="/certificate-number" element={<Cerificate/>} />
//                 <Route path="/subscription-plans" element={<SubscriptionPlan/>} />

//               </Routes>
//             </div>
//           </div>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MerchantSidebar from "./Components/MerchantSidebar/MerchantSidebar";
import Header from "./Components/Header/Header";
// import Breadcrumb from "../../dashboard/src/Components/Breadcrumb/Breadcrumb";
import MerchantDashboard from "./Pages/MerchantDashboard/MerchantDashboard";
import UnprotectedRoute from "./routing/UnProtectedRoute";
import ProtectedRoute from "./routing/ProtectedRoute";
// Import all pages
import CreateOrder from "./Pages/CreateOrder/CreateOrder";
import AllOrder from "./Pages/AllOrder/AllOrder";
import OrderLocation from "./Pages/OrderLocation/OrderLocation";
import DeliveryMan from "./Pages/DeliveryMan/DeliveryMan";
import Pending from "./Pages/Pending/Pending";
import Approved from "./Pages/Approved/Approved";
import Rejected from "./Pages/Rejected/Rejected";
import Setup from "./Pages/Setup/Setup";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/SignUpPage";
import Customer from "./Pages/Customer/Customer";
import AddCustomer from "./Pages/Customer/AddCustomer";
import AddDeliveryMan from "./Pages/DeliveryMan/AddDeliveryMan";
import Vehicle from "./Pages/Vehicle/Vehicle";
import AddVehicle from "./Pages/AddVehicle/AddVehicle"
import ProfilePage from "./Components/Profile/Profile";
import UpdateProfile from "./Components/Profile/UpdateProfile";
import SubscriptionPlan from "./Pages/SubscriptionPlan/SubscriptionPlan";
import TrashedOrder from "./Pages/TrashedOrder/TrashedOrder";
import SubscriptionActive from "./Pages/SubscriptionPlan/SubscriptionActive";
import TrashedCustomer from "./Pages/Customer/TrashedCustomer";
import TrashedDeliveryman from "./Pages/DeliveryMan/TrashedDeliveryman";
import FreePlan from "./Pages/FreePlan/FreePlan";


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
    <ToastContainer theme="colored"/>


      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={
          <UnprotectedRoute>
            <Login />
          </UnprotectedRoute>
        } />
       
        <Route path="/login" element={
          <UnprotectedRoute>
            <Login />
          </UnprotectedRoute>
        } />
        <Route path="/subscription" element={
            <FreePlan />
        } />

        <Route path="/sign-up" element={
          <UnprotectedRoute>
            <Signup />
          </UnprotectedRoute>
        } />

        {/* Protected Routes */}
        <Route path="/Merchant-dashboard" element={
          <ProtectedRoute>
            <MerchantDashboard />
          </ProtectedRoute>
        } />
        <Route path="/create-order" element={
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        } />
        <Route path="/all-order" element={
          <ProtectedRoute>
            <AllOrder />
          </ProtectedRoute>
        } />
        <Route path="/trashed-order" element={
          <ProtectedRoute>
            <TrashedOrder />
          </ProtectedRoute>
        } />
        <Route path="/order-location" element={
          <ProtectedRoute>
            <OrderLocation />
          </ProtectedRoute>
        } />
        <Route path="/delivery-man" element={
          <ProtectedRoute>
            <DeliveryMan />
          </ProtectedRoute>
        } />
        <Route path="/add-delivery-man" element={
          <ProtectedRoute>
            <AddDeliveryMan />
          </ProtectedRoute>
        } />
        <Route path="/delivery-man-trashed" element={
          <ProtectedRoute>
            <TrashedDeliveryman />
          </ProtectedRoute>
        } />
        <Route path="/pending" element={
          <ProtectedRoute>
            <Pending />
          </ProtectedRoute>
        } />
        <Route path="/approved" element={
          <ProtectedRoute>
            <Approved />
          </ProtectedRoute>
        } />
        <Route path="/rejected" element={
          <ProtectedRoute>
            <Rejected />
          </ProtectedRoute>
        } />
        <Route path="/account-details" element={
          <ProtectedRoute>
            <Setup />
          </ProtectedRoute>
        } />
        <Route path="/all-customer" element={
          <ProtectedRoute>
            <Customer />
          </ProtectedRoute>
        } />
        <Route path="/add-customer" element={
          <ProtectedRoute>
            <AddCustomer />
          </ProtectedRoute>
        } />
        <Route path="/trashed-customer" element={
          <ProtectedRoute>
            <TrashedCustomer />
          </ProtectedRoute>
        } />
        <Route path="/all-vehicle" element={
          <ProtectedRoute>
            <Vehicle />
          </ProtectedRoute>
        } />
        
        <Route path="/add-vehicle" element={
          <ProtectedRoute>
            <AddVehicle />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/update-profile" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } />
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
      </Routes>

      <Analytics />
    </BrowserRouter>
  );
}

export default App;