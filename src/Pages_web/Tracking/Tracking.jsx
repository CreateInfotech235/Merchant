import React, { useState, useEffect } from "react";
import bgImage from "../../assets_web/image (41).png";
import HeavyBox from "../../assets_web/Location tracking-amico 1.png";
import Setting from "../../assets_web/pngtree-tracking-line-icon-vector-png-image_6692888 1.png";
import Imagess from "../../assets_web/image_2.png";
import Gotop from "../../Components_web/Gotop/Gotop";
import { Link } from "react-router-dom";
function Tracking({ Login, setLogin }) {
  return (
    <>
     <div className="w-full relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
  <img
    alt=""
    src={bgImage}
    className="absolute inset-0 -z-10 w-full h-full object-cover object-right md:object-center"
  />
  <div
    aria-hidden="true"
    className="absolute top-0 left-0 w-full h-full bg-[#06052D]/80 -z-10"
  ></div>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap lg:flex-nowrap justify-between items-center">
    {/* Text Section */}
    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-medium tracking-tight text-[#FF6600] leading-[1.2] sm:leading-[1.3] capitalize noto small">
        Track Your Courier!
      </h1>
      <h2 className="mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl lg:text-4xl text-white font-bold">
        Track Your Package in Real-Time <br /> Stay Updated on Your Shipment’s
        Journey
      </h2>
      <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg lg:text-xl text-gray-300 font-medium">
        The Tracking section allows you to monitor the status of your shipment
        at every stage of its journey. Simply enter your tracking number to get
        real-time updates on your parcel’s location.
      </p>
        {/* <div className="mt-6 sm:mt-8">
          <Link to="/about">
            <button className="bg-[#FF6600] text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-md text-sm sm:text-base lg:text-lg">
              Get Started
              <span className="ml-2">&rarr;</span>
            </button>
          </Link>
        </div> */}
    </div>

    {/* Image Section */}
    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
      <img
        src={HeavyBox}
        alt="Heavy box illustration"
        className="w-full max-w-sm md:max-w-md lg:max-w-lg"
      />
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
