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
import Pricing from "./Pages_web/Pricing/Pricing";
import Tracking from "./Pages_web/Tracking/Tracking";
import LoginWeb from "./Components_web/Login/Login";
import SignupWeb from "./Components_web/SignUp/Signup";
import SupportTicket from "./Pages_merchant/SupportTicket/SupportTicket";
import About from "./Pages_web/About/About";
import Contact from "./Pages_web/Contact/Contact";
import InvoiceFormate from "./Pages_merchant/AllOrder/InvoiceFormate";
import ViewSupportTicketsMerchant from './Pages_merchant/SupportTicket/ViewSupportTickets'
import ProtectedRouteAdmin from "./Pages_admin/Protected/Protected";
import UnprotectedRouteAdmin from "./Pages_admin/Protected/UnProtectedRoute";
import Dashboard from "./Pages_admin/Dashboard/Dashboard";
import LoginAdmin from "./Components_admin/Login/Login";
import Sidebar from "./Components_admin/Sidebar/Sidebar";
import EditUser from "./Pages_admin/EditUser/EditUser";
import AddCountry from "./Pages_admin/AddCountry/AddCountry";
import AddCity from "./Pages_admin/AddCity/AddCity";
import UpdateCity from "./Pages_admin/UpdateCity/UpdateCity";
import Breadcrumb from "./Components_admin/Breadcrumb/Breadcrumb";

import Users from "./Pages_admin/Users/Users";
import Country from "./Pages_admin/Country/Country";
import City from "./Pages_admin/City/City";
import CreateOrderAdmin from "./Pages_admin/orders/CreateOrder/CreateOrder";
import ViewUser from "./Components_admin/ViewUser/ViewUser";
import AllOrderAdmin from "./Pages_admin/AllOrder/AllOrder";
import DeliveryManAdmin from "./Pages_admin/DeliveryMan/DeliveryMan";
import PendingDeliveryMan from "./Pages_admin/PendingDeliveryMan/PendingDeliveryMan";
import Document from "./Pages_admin/Document/Document";
import DeliveryManDocument from "./Pages_admin/DeliveryManDocument/DeliveryManDocument";
import DeliveryManLocationAdmin from "./Pages_admin/DeliveryManLocation/DeliveryManLocation";
import VehicleAdmin from "./Pages_admin/Vehicle/Vehicle";


import UpdateVehicle from "./Pages_admin/UpdateVehicle/UpdateVehicle";
import AddVehicleAdmin from "./Pages_admin/AddVehicle/AddVehicle";
import ExtraCharges from "./Pages_admin/AddExtraCharges/AddExtraCharges";
import UpdateParcelType from "./Pages_admin/UpdateParcelType/UpdateParcelType";
import AddParcelType from "./Pages_admin/AddParcelType/AddParcelType";
import ExtraCharge from "./Pages_admin/ExtraCharge/ExtraCharge";
import ParcelType from "./Pages_admin/ParcelType/ParcelType";
import PaymentGateway from "./Pages_admin/PaymentGateway/PaymentGateway";
import WithdrawRequest from "./Pages_admin/WithdrawRequest/WithdrawRequest";
import CurrencySetting from "./Pages_admin/CurrencySetting/CurrencySetting";
import PrivacyPolicy from "./Pages_admin/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "./Pages_admin/TermsCondition/TermsCondition";
import WalkThrough from "./Pages_admin/WalkThrough/WalkThrough";
import SetupAdmin from "./Pages_admin/Setup/Setup";
import InvoiceSetting from "./Pages_admin/InvoiceSetting/InvoiceSetting";
import OrderSetting from "./Pages_admin/OrderSetting/OrderSetting";
import Information from "./Pages_admin/Information/Information";
import WhyDelivery from "./Pages_admin/WhyDelivery/WhyDelivery";
import DownloadApp from "./Pages_admin/DownloadApp/DownloadApp";
import ContactInfo from "./Pages_admin/ContactInfo/ContactInfo";
import ClientReview from "./Pages_admin/ClientReview/ClientReview";
import OrderLocationAdmin from "./Pages_admin/OrderLocation/OrderLocation";
import DeliveryManDestination from "./Pages_admin/DeliveryManDestination/DeliveryManDestination";
import AddExtraCharges from "./Pages_admin/AddExtraCharges/AddExtraCharges";
import DeliveryPatner from "./Pages_admin/DeliveryPatner/DeliveryPatner";
import NotificationSetting from "./Pages_admin/NotificationSettings/NotificationSetting";
import Profile from "./Pages_admin/Profile/Profile";
import AdminProfile from "./Pages_admin/AdminProfile/AdminProfile";
import CustomerAdmin from "./Pages_admin/Customer/Customer";
import AddCustomerAdmin from "./Pages_admin/Customer/AddCustomer";
import OrderAdmin from "./Pages_admin/Order/Order";
import TransationList from "./Pages_admin/TransationList/TransationList";
import SubscriptionHisory from "./Pages_admin/SubscriptionHistory/SubscriptionHistory";
import SubscriptionMerchant from "./Pages_admin/SubscribedMerchant/SubscribedMerchant";
import SubscribedMerchant from "./Pages_admin/SubscribedMerchant/SubscribedMerchant";
import UnsubscribedMerchant from "./Pages_admin/UnsubscribedMerchant/UnSubscribedMerchant";
import DemoUsedMerchant from "./Pages_admin/DemoUsedMerchant/DemoUsedMerchant";
import PendingMerchantDocument from "./Pages_admin/PendingMerchantDocument/PendingMerchantDocument";
import DocumentRequired from "./Pages_admin/DocumentsRequired/DocumentsRequired";
import MerchantDocument from "./Pages_admin/MerchantDocument/MerchantDocument";
import ScheduleOrder from "./Pages_admin/ScheduleOrder/ScheduleOrder";
import ApprovedAdmin from "./Pages_admin/Approved/Approved";
import RejectedAdmin from "./Pages_admin/Rejected/Rejected";
import PendingAdmin from "./Pages_admin/Pending/Pending";
import RegularPickupRequest from "./Pages_admin/RegularPickupRequest/RegularPickupRequest";

import ExpressPickupRequest from "./Pages_admin/ExpressPickupRequest/ExpressPickupRequest";
import SupportTicketAdmin from "./Pages_admin/SupportTicket/SupportTicket";
import Notification from "./Pages_admin/Notification/Notification";
import Sendanyselecteduser from "./Pages_admin/Sendanyselecteduser/Sendanyselecteduser";
import Sendtoall from "./Pages_admin/Sendtoall/Sendtoall";
import Sendtodeliveryman from "./Pages_admin/Sendtodeliveryman/Sendtodeliveryman";
import Sendtomerchant from "./Pages_admin/Sendtomerchant/Sendtomerchant";
import Sendtouser from "./Pages_admin/sendtouser/sendtouser";
import Offer from "./Pages_admin/Offer/Offer";
import AboutUs from "./Pages_admin/AboutUs/AboutUs";
import DepositeMerchant from "./Pages_admin/DepositeMerchant/DepositeMerchant";
import DepositeDeliveryMan from "./Pages_admin/DepositeDeliveryMan/DepositeDeliveryMan";
import AutoMail from "./Pages_admin/AutoMail/AutoMail";
import Subscription from "./Pages_admin/Subscription/Subscription";
// import LoginAdmin from "./Components_admin/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import AddUser from "./Pages_admin/Users/AddUser";
import AddDeliveryManAdmin from "./Pages_admin/DeliveryMan/AddDeliveryMan";
import SubscriptionPlanAdmin from "./Pages_admin/SubscriptionPlan/SubscriptionPlan";
import Order from "./Pages_admin/Order/Order";
import MerchantDeliveryMan from "./Pages_admin/DeliveryMan/MerchantDeliveryMan";
import ViewSupportTickets from "./Pages_admin/SupportTicket/ViewSupportTickets";
import HomePage from "./Pages_admin/HomePage/HomePage";
import Faqs from "./Pages_web/Faqs/Faqs";
import PageNotFound from "./Pages_web/PageNotFound/PageNotFound";
import TermsConditions from "./Components_web/Terms & Conditions/TermsConditions";
import ForgotPassword from "./Components_web/forgot-password/forgot-password";
import AdminForgotPassword from "./Components_admin/admin-forgot-password/admin-forgot-password";
import MapSetting from "./Pages_admin/MapSetting/MapSetting";
import MultiOrders from "./Pages_merchant/CreateOrder/MultiOrders";
import MultiOrder from "./Pages_merchant/AllOrder/MultiOrder";
import TrashedMultiOrder from "./Pages_merchant/TrashedOrder/TrashedMultiOrder";
import MultiOrderParcel from "./Pages_merchant/AllOrder/MultiOrderParcel";
import CommonComponent from "./Pages_admin/common-component/common-component";
import { Tr } from "react-flags-select";
import DeliveryPersonTracking from "./Pages_merchant/AllOrder/tr";


function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [islogin, setIslogin] = useState(false);

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

  var accessToken = localStorage.getItem("accessToken");
  var merchnatId = localStorage.getItem("merchnatId");
  var userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    accessToken = localStorage.getItem("accessToken");
    merchnatId = localStorage.getItem("merchnatId");
    userData = JSON.parse(localStorage.getItem("userData"))
  }, [islogin]);

  const setalogin = () => {
    if (accessToken && merchnatId && userData) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    setIslogin(setalogin());
  }, []);


  useEffect(() => {
    setIslogin(setalogin());
  }, [accessToken, merchnatId, userData]);

  // console.log("USER islogin", islogin);
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" />

      <Routes>
        {/* Unprotected Routes */}
        <Route
          path="/merchant/login"
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
          path="/multi-orders"
          element={
            <ProtectedRoute>
              <MultiOrders />
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
          path="/all-multi-order"
          element={
            <ProtectedRoute>
              <MultiOrder />
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
          path="/trashed-multi-order"
          element={
            <ProtectedRoute>
              <TrashedMultiOrder />
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
          path="/multi-order-parcel"
          element={
            <ProtectedRoute>
              <MultiOrderParcel />
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
          path="/view-tickets-merchant"
          element={
            <ProtectedRoute>
              <ViewSupportTicketsMerchant />
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
          path="/subscription-active/*"
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
            <Formate Login={islogin} useData={userData}>
              <Mainbody />
            </Formate>
          }
        />
      
        <Route
          path="*"
          element={
            <Formate>
              <PageNotFound />
            </Formate>
          }
        />
        <Route
          path="/faqs"
          element={
            <Formate>
              <Faqs />
            </Formate>
          }
        />

        <Route
          path="/pricing"
          element={
            <Formate Login={islogin} useData={userData}>
              <Pricing />
            </Formate>
          }
        />
        <Route path="/login" element={<LoginWeb Login={islogin} setLogin={setIslogin}/>} />
        <Route path="/register" element={<SignupWeb />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/tracking"
          element={
            <Formate Login={islogin} useData={userData}>
              <Tracking Login={islogin} setLogin={setIslogin}/>
            </Formate>
          }
        />
        <Route
          path="/about"
          element={
            <Formate Login={islogin} useData={userData}>
              <About />
            </Formate>
          }
        />
        <Route
          path="/contact"
          element={
            <Formate Login={islogin} useData={userData}>
              <Contact />
            </Formate>
          }
        />
        <Route
          path="/terms-and-conditions/:isshow"
          element={
            <Formate Login={islogin} useData={userData}>
              <TermsConditions />
            </Formate>
          }
        />

        {/* adminRoutes */}

        <Route
          path="/admin-login"
          element={
            <UnprotectedRouteAdmin>
              <LoginAdmin />
            </UnprotectedRouteAdmin>
          }
        />
             <Route
          path="/admin-forgot-password"
          element={
            <UnprotectedRouteAdmin>
              <AdminForgotPassword />
            </UnprotectedRouteAdmin>
          }
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRouteAdmin>
              <Dashboard />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="/edit-merchant"
          element={
            <ProtectedRouteAdmin>
              <EditUser />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRouteAdmin>
              <AddUser />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-delivery-man-admin"
          element={
            <ProtectedRouteAdmin>
              <AddDeliveryManAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-country"
          element={
            <ProtectedRouteAdmin>
              <AddCountry />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-city"
          element={
            <ProtectedRouteAdmin>
              <AddCity />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/update-city"
          element={
            <ProtectedRouteAdmin>
              <UpdateCity />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/merchant"
          element={
            <ProtectedRouteAdmin>
              <Users />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/country"
          element={
            <ProtectedRouteAdmin>
              <Country />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/city"
          element={
            <ProtectedRouteAdmin>
              <City />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/map-setting"
          element={
            <ProtectedRouteAdmin>
              <MapSetting />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/create-order-admin"
          element={
            <ProtectedRouteAdmin>
              <CreateOrderAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/view-user"
          element={
            <ProtectedRouteAdmin>
              <ViewUser />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/view-tickets"
          element={
            <ProtectedRouteAdmin>
              <ViewSupportTickets />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/all-order-admin"
            element={
            <ProtectedRouteAdmin>
              <AllOrderAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/delivery-man-admin"
          element={
            <ProtectedRouteAdmin>
              <DeliveryManAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/delivery-man-merchant"
          element={
            <ProtectedRouteAdmin>
              <MerchantDeliveryMan />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/pending-delivery-man"
          element={
            <ProtectedRouteAdmin>
              <PendingDeliveryMan />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/document"
          element={
            <ProtectedRouteAdmin>
              <Document />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/delivery-man-document"
          element={
            <ProtectedRouteAdmin>
              <DeliveryManDocument />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/delivery-man-location-admin"
          element={
            <ProtectedRouteAdmin>
              <DeliveryManLocationAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/vehicle"
          element={
            <ProtectedRouteAdmin>
              <VehicleAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/update-vehicle"
          element={
            <ProtectedRouteAdmin>
              <UpdateVehicle />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-vehicle"
          element={
            <ProtectedRouteAdmin>
              <AddVehicleAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/update-parcel-type"
          element={
            <ProtectedRouteAdmin>
              <UpdateParcelType />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/parcel-type"
          element={
            <ProtectedRouteAdmin>
              <ParcelType />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-parcel-type"
          element={
            <ProtectedRouteAdmin>
              <AddParcelType />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/extra-charge"
          element={
            <ProtectedRouteAdmin>
              <ExtraCharge />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/payment-gateway"
          element={
            <ProtectedRouteAdmin>
              <PaymentGateway />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/withdraw-request"
          element={
            <ProtectedRouteAdmin>
              <WithdrawRequest />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/currency-setting"
          element={
            <ProtectedRouteAdmin>
              <CurrencySetting />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <ProtectedRouteAdmin>
              <PrivacyPolicy />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/terms-condition"
          element={
            <ProtectedRouteAdmin>
              <TermsCondition />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/walk-through"
          element={
            <ProtectedRouteAdmin>
              <WalkThrough />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/setup"
          element={
            <ProtectedRouteAdmin>
              <SetupAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/invoice-setting"
          element={
            <ProtectedRouteAdmin>
              <InvoiceSetting />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/order-setting"
          element={
            <ProtectedRouteAdmin>
              <OrderSetting />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/common-component"
          element={
            <ProtectedRouteAdmin>
              <CommonComponent />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/home-page"
          element={
            <ProtectedRouteAdmin>
              <HomePage />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/why-delivery"
          element={
            <ProtectedRouteAdmin>
              <WhyDelivery />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/download-app"
          element={
            <ProtectedRouteAdmin>
              <DownloadApp />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/contact-info"
          element={
            <ProtectedRouteAdmin>
              <ContactInfo />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/client-review"
          element={
            <ProtectedRouteAdmin>
              <ClientReview />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/order-location-admin"
          element={
            <ProtectedRouteAdmin>
              <OrderLocationAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/delivery-man-destination"
          element={
            <ProtectedRouteAdmin>
              <DeliveryManDestination />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-extra-charges"
          element={
            <ProtectedRouteAdmin>
              <AddExtraCharges />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/delivery-patner"
          element={
            <ProtectedRouteAdmin>
              <DeliveryPatner />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/notification-setting"
          element={
            <ProtectedRouteAdmin>
              <NotificationSetting />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteAdmin>
              <Profile />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRouteAdmin>
              <Order />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/transation-list"
          element={
            <ProtectedRouteAdmin>
              <TransationList />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/Subscription-history"
          element={
            <ProtectedRouteAdmin>
              <SubscriptionHisory />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/Subscribed-merchant"
          element={
            <ProtectedRouteAdmin>
              <SubscribedMerchant />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="/unSubscribed-merchant"
          element={
            <ProtectedRouteAdmin>
              <UnsubscribedMerchant />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/demo-used-merchant"
          element={
            <ProtectedRouteAdmin>
              <DemoUsedMerchant />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/pending-merchant-document"
          element={
            <ProtectedRouteAdmin>
              <PendingMerchantDocument />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/documents-required"
          element={
            <ProtectedRouteAdmin>
              <DocumentRequired />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/subscription-required"
          element={
            <ProtectedRouteAdmin>
              <SubscriptionPlanAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/merchant-document"
          element={
            <ProtectedRouteAdmin>
              <MerchantDocument />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/schedule-order"
          element={
            <ProtectedRouteAdmin>
              <ScheduleOrder />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/approved-admin"
          element={
            <ProtectedRouteAdmin>
              <ApprovedAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/rejected-admin"
          element={
            <ProtectedRouteAdmin>
              <RejectedAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/pending-admin"
          element={
            <ProtectedRouteAdmin>
              <PendingAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/regular-pickup-request"
          element={
            <ProtectedRouteAdmin>
              <RegularPickupRequest />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/express-pickup-request"
          element={
            <ProtectedRouteAdmin>
              <ExpressPickupRequest />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/support-ticket"
          element={
            <ProtectedRouteAdmin>
              <SupportTicketAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/send-any-selected-user"
          element={
            <ProtectedRouteAdmin>
              <Sendanyselecteduser />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/send-to-all"
          element={
            <ProtectedRouteAdmin>
              <Sendtoall />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/send-to-delivery-man"
          element={
            <ProtectedRouteAdmin>
              <Sendtodeliveryman />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/send-to-merchant"
          element={
            <ProtectedRouteAdmin>
              <Sendtomerchant />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/send-to-user"
          element={
            <ProtectedRouteAdmin>
              <Sendtouser />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRouteAdmin>
              <Notification />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/offer"
          element={
            <ProtectedRouteAdmin>
              <Offer />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectedRouteAdmin>
              <AboutUs />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/express-pickup-request"
          element={
            <ProtectedRouteAdmin>
              <ExpressPickupRequest />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/deposite-merchant"
          element={
            <ProtectedRouteAdmin>
              <DepositeMerchant />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/deposite-delivery-man"
          element={
            <ProtectedRouteAdmin>
              <DepositeDeliveryMan />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/auto-mail"
          element={
            <ProtectedRouteAdmin>
              <AutoMail />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/admin-profile"
          element={
            <ProtectedRouteAdmin>
              <AdminProfile />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/all-customer-admin"
          element={
            <ProtectedRouteAdmin>
              <CustomerAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-customer-admin"
          element={
            <ProtectedRouteAdmin>
              <AddCustomerAdmin />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path=""
          element={
            <ProtectedRouteAdmin>
              <Subscription />
            </ProtectedRouteAdmin>
          }
        />
      </Routes>

      <Analytics />
    </BrowserRouter>
  );
}

export default App;
