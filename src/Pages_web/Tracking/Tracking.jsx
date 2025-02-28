import React, { useState, useEffect } from "react";
import bgImage from "../../assets_web/image41.png";
import HeavyBox from "../../assets_web/Location tracking-amico 1.png";
import Setting from "../../assets_web/pngtree-tracking-line-icon-vector-png-image_6692888 1.png";
import Imagess from "../../assets_web/image_2.png";
import Gotop from "../../Components_web/Gotop/Gotop";
import { Link } from "react-router-dom";
import { createFunksen } from "../../typingef/typingef";
function Tracking({ Login, setLogin }) {
  useEffect(() => {
    const cleanup = createFunksen('#welcome-text-tracking', ["Welcome To Create Courier", "Track Your Courier!"]);
    return cleanup; // Ensure cleanup function is returned to avoid multiple instances
  }, []);
  return (
    <>

      <div className="w-full ">
        <div className="w-full relative isolate overflow-hidden py-12 sm:py-20 lg:py-24  shadow-md" style={{
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
              <h1 id="welcome-text-tracking" className="text-xl h-[30px]  sm:text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight  text-[#FF6600] leading-tight capitalize">
                Welcome To Create Courier
              </h1>
              <h2 className="mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl md:text-2xl lg:text-4xl text-white font-bold">
              Track Your Package in Real-Time <br /> Stay Updated on Your Shipment’s
              Journey
              </h2>
              <p className="mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium">
              The Tracking section allows you to monitor the status of your shipment
              at every stage of its journey. Simply enter your tracking number to get
              real-time updates on your parcel’s location.
                       </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24">
        <div>
          <h1 className="text-4xl capitalize text-center font-bold tracking-wide noto small">
            Courier Tracking
          </h1>
          <div className="flex justify-center mt-3 items-center">
            <div className="line-left relative w-24 sm:w-36 h-[2px] bg-[#221F92] mx-3"></div>
            <img src={Setting} className="text-center" width={"50px"} sm:width={"70px"} alt="" />
            <div className="line-right w-24 sm:w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center mt-10">
          <div className="w-full lg:w-1/2 px-4">
            <h3 className="text-base sm:text-lg text-[#696969] font-light tracking-wide text-center lg:text-left">
              Stay informed and in control of your delivery with our time tracking system. By entering
              your tracking number, you can instantly access detailed updates on the status of your parcel
              from pickup to final delivery.
            </h3>
            <img src={Imagess} alt="" className="mt-5 w-full max-w-md mx-auto lg:mx-0" />
          </div>
          <div className="w-full lg:w-1/2 px-4 mt-6 lg:mt-0">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  id="trackingId"
                  name="trackingId"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your tracking ID"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your zip code"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
      </div>
      <Gotop />

    </>
  );
}

export default Tracking;
