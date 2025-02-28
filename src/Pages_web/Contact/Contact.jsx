import React, { useState, useEffect } from "react";
import bgImage from "../../assets_web/image41.png";
import effect from "../../assets_web/image (42).png";
import HeavyBox from "../../assets_web/Contact us-bro 1.png";
import Setting from "../../assets_web/Group 127.png";
import Imagess from "../../assets_web/image_2.png";
import Mail from "../../assets_web/ic_outline-email.png";
import Call from "../../assets_web/material-symbols_call.png";
import Location from "../../assets_web/bytesize_location.png";
import Partner from "../../assets_web/mdi_partnership-outline.png";
import Partner1 from "../../assets_web/partner logo (1).jpg";
import Partner2 from "../../assets_web/partner logo (2).jpg";

import TomTomMap from "./TomTomMap";
import Gotop from "../../Components_web/Gotop/Gotop";
import { Link } from "react-router-dom";
import { createFunksen } from "../../typingef/typingef";
function Contact() {
  const scrollToContact = () => {
    const element = document.getElementById('ContactUs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const cleanup = createFunksen('#welcome-text-contact', ["Get in Touch – We're Here to Help!"]);
    return cleanup; // Ensure cleanup function is returned to avoid multiple instances
  }, []);


  return (
    <>

      <div className="w-full ">
        <div className="w-full relative isolate overflow-hidden py-12 sm:py-20 lg:py-24 shadow-md" style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backgroundBlendMode: 'multiply',
          backgroundAttachment: "fixed",
          backgroundPosition: 'top center'
        }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row justify-between items-center h-[60vh]">
            {/* Left Content */}
            <div className="w-full md:text-left">
              <h1 id="welcome-text-contact" className="text-xl h-[30px]  sm:text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight  text-[#FF6600] leading-tight capitalize">
                Welcome To Create Courier
              </h1>
              <h2 className="mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl md:text-2xl lg:text-4xl text-white font-bold">
                Have Question or Need Support?We will Assist You Promptly!
              </h2>
              <p className="mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium">
                We're here to help! If you have any questions or need assistance
                with your shipment, our friendly customer support team is just a
                call or click away. hether you need help with booking a delivery,
                tracking a parcel
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24">
        {/* Title Section */}
        <div>
          <h1 className="text-4xl capitalize text-center font-bold tracking-wide noto small" >
            Contact Us
          </h1>
          <div className="flex justify-center mt-3 items-center">
            <div className="line-left relative w-20 sm:w-36 h-[2px] bg-[#221F92] mx-3"></div>
            <img src={Setting} className="text-center" width="40" sm:width="50" alt="" />
            <div className="line-right w-20 sm:w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
          </div>
        </div>

        {/* Contact Form & Map Section */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center mt-10">
          <div className="w-full lg:w-1/2 p-4 lg:p-6">
            <TomTomMap />
          </div>
          <div className="w-full lg:w-1/2 p-4 lg:p-6 rounded-lg">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  id="trackingId"
                  name="trackingId"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your tracking ID"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your zip code"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter any additional notes"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-[#1D1D37] noto small text-white font-bold py-3 px-4 rounded-md hover:bg-[#3b3b6d] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Track Now
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <div className="w-full md:w-1/3 border p-6 rounded-lg">
            <div className="w-20 h-20 bg-[#1D1D37] rounded-full flex justify-center items-center mx-auto">
              <img src={Mail} alt="" />
            </div>
            <h1 className="text-center text-sm md:text-xl font-bold mt-3">createcourier456@gmail.com</h1>
          </div>
          <div className="w-full md:w-1/3 border p-6 rounded-lg">
            <div className="w-20 h-20 bg-[#1D1D37] rounded-full flex justify-center items-center mx-auto">
              <img src={Call} alt="" />
            </div>
            <h1 className="text-center text-xl font-bold mt-3">+44 78945 61232</h1>
          </div>
          <div className="w-full md:w-1/3 border p-6 rounded-lg">
            <div className="w-20 h-20 bg-[#1D1D37] rounded-full flex justify-center items-center mx-auto">
              <img src={Location} alt="" />
            </div>
            <h1 className="text-center text-xl font-bold mt-3">123, Anywhere, UK</h1>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-24">
          <h1 className="text-4xl capitalize text-center font-bold tracking-wide noto small">
            Our Partners
          </h1>
          <div className="flex justify-center mt-3 items-center">
            <div className="line-left relative w-20 sm:w-36 h-[2px] bg-[#221F92] mx-3"></div>
            <img src={Partner} className="text-center" width="50" sm:width="70" alt="" />
            <div className="line-right w-20 sm:w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
            <img src={Partner1} alt="" className="w-32 md:w-40" />
            <img src={Partner2} alt="" className="w-32 md:w-40" />
          </div>
        </div>
      </div>
      <Gotop />
    </>
  );
}

export default Contact;
