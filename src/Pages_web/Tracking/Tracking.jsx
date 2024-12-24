import React, { useState, useEffect } from "react";
import bgImage from "../../assets_web/image (41).png";
import HeavyBox from "../../assets_web/Location tracking-amico 1.png";
import Setting from "../../assets_web/pngtree-tracking-line-icon-vector-png-image_6692888 1.png";
import Imagess from "../../assets_web/image_2.png";
function Tracking({ Login, setLogin }) {
  return (
    <>
      <div className="w-full relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src={bgImage}
          className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full bg-[#06052D]/80 -z-10"
        ></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
          <div className="max-w-2xl lg:mx-0">
            <h1 className="text-2xl mt-3 md:text-3xl lg:text-5xl font-medium tracking-tight text-[#FF6600] leading-[1.2] md:leading-[1.4] capitalize noto small">
              Track Your Courier !
            </h1>
            <h2 className="mt-4 md:mt-8 md:text-lg lg:text-4xl text-white font-bold">
              Track Your Package in Real-Time Stay Update Your Shipment’s
              Journey
            </h2>
            <p className="mt-4 md:mt-8 text-base md:text-lg lg:text-xl text-gray-300 font-medium">
              The Tracking section allows you to monitor the status of your
              shipment at every stage of its journey. Simply enter your tracking
              number to get real-time updates on your parcel’s location
            </p>
            <div className="mx-auto mt-6 md:mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <button className="bg-[#FF6600] text-white px-4 py-2 rounded-md">
                Get Started
                <span className="ml-2">&rarr;</span>
              </button>
            </div>
          </div>
          <div className="max-w-2xl lg:mx-0">
            <img src={HeavyBox} alt="" width={"100%"} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24">
        <div className="">
          <h1 className="text-4xl capitalize text-center font-bold tracking-wide noto small">
            Courier Tracking
          </h1>
          <div className="flex justify-center mt-3 items-center">
            <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
            <img src={Setting} className="text-center" width={"70px"} alt="" />
            <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-1/2">
            <h3 className="text-lg text-[#696969] font-light tracking-wide">
              Stay inform and in control of your delivery with our time tracking
              system. By entering you tracking number, you can instantly access
              detail updates on the status of your parcel from pickup to final
              delivery.
            </h3>
            <img src={Imagess} alt="" width={"100%"} className="mt-5" />
          </div>
          <div className="w-1/2 p-6  rounded-lg">
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
      </div>
    </>
  );
}

export default Tracking;
