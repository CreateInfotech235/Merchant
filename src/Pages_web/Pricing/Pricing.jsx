import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import bgImage from "../../assets_web/image41.png";
import Setting from "../../assets_web/1684798-200 1.png";

import dubleCheckW from "../../assets_web/akar-icons_double-check (1).png";
import dubleCheck from "../../assets_web/akar-icons_double-check.png";
import van from "../../assets_web/van.jpg";
import ExpressDelivery from "../../assets_web/Express Delivery.webp";
import StandardDelivery from "../../assets_web/Standard Delivery.webp";
import BulkTransport from "../../assets_web/Bulk Transport.jpg";
import truck from "../../assets_web/material-truck.png";
import SpecialCare from "../../assets_web/Special Care.jpg";
import Gotop from "./../../Components_web/Gotop/Gotop";
import { PiTruckDuotone } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { TbClock } from "react-icons/tb";
import { FaPoundSign } from "react-icons/fa";
import { createFunksen } from "../../typingef/typingef";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import { Title } from "chart.js";


function Pricing() {
  const navigate = useNavigate(); // Initialize navigate function
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "instant" });
  // }, []);
  // Function to handle button click
  const handleClick = () => {
    navigate("/about"); // Navigate to /about page
  };

  const swiperRef = useRef(null);

  // Function to handle previous slide
  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Function to handle next slide
  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const sliderdata = [
    {
      img: ExpressDelivery,
      title: "Express Delivery",
      dtale:
        "Same-day delivery service within London for urgent packages and documents. Our fastest delivery option with real-time tracking.",
    },
    {
      img: StandardDelivery,
      title: "Standard Delivery",
      dtale:
        "Reliable next-day delivery service perfect for regular shipments. Cost-effective solution with professional handling.",
    },
    {
      img: BulkTransport,
      title: "Bulk Transport",
      dtale:
        "Specialized service for large volumes and heavy cargo. Ideal for business shipments with competitive rates.",
    },
    {
      img: SpecialCare,
      title: "Special Care",
      dtale:
        "Dedicated handling for fragile and valuable items. Extra protection and insurance for your precious cargo.",
    },
  ];




  useEffect(() => {
    const cleanup = createFunksen('#welcome-text-pricing', ["Welcome To Create Courier", "Clear And Competitive Shipping Rates!"]);
    return cleanup; // Ensure cleanup function is returned to avoid multiple instances
  }, []);


  return (
    <>
      {/*part 1 */}
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
              <h1 id="welcome-text-pricing" className="text-xl h-[30px]  sm:text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight  text-[#FF6600] leading-tight capitalize">
                Welcome To Create Courier
              </h1>
              <h2 className="mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl md:text-2xl lg:text-4xl text-white font-bold">
                Enjoy affordable and shipping rates for all your packages.
              </h2>
              <p className="mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium">
                We offer competitive and transparent pricing for all our courier services. Our pricing is based on factors such as parcel size, delivery speed, and destination.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-12 ">
        <div className="">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl capitalize text-center font-bold tracking-wide noto small">
            Courier Pricing
          </h1>
          <div className="flex justify-center mt-3 items-center">
            <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
            <img src={Setting} className="text-center" width={"50px"} alt="" />
            <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
          </div>
        </div>
      </div>

      {/* part 3 */}
      <div className="mb-4  mx-auto max-w-7xl lg:px-8 my-2">
        <div className="container mx-auto px-4">
          {/* Card Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card Component */}

            <div className="relative shadow-lg rounded-lg overflow-hidden bg-white group hover:scale-105 transition-transform duration-300">
              {/* Card Number */}
              <div className="absolute -top-12 left-8 text-[#221F92] font-extrabold text-[100px] opacity-10">
                01
              </div>

              {/* Card Content */}
              <div className="p-6 text-center mt-10">
                <div>
                  <h1 className="text-[#221F92] font-extrabold mb-4 noto small text-[30px]">
                    Elite Pass
                  </h1>
                </div>
                <div className="flex justify-center items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#1D1D37] flex items-center justify-center">
                    <img src={truck} alt="" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold noto small mb-4">
                  Transport By Truck
                </h2>
                <h2 className="text-sm font-bold noto small mb-4">
                  10 per delivery & 200 yearly
                </h2>

                <div className="text-lg text-gray-700 mb-4">
                  <div className="flex items-center mb-2 text-[16px]">
                    <img
                      src={dubleCheck}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    Same Day Delivery
                  </div>
                  <div className="flex items-center mb-2 text-[16px]">
                    <img
                      src={dubleCheck}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    Customs Business Rules
                  </div>
                  <div className="flex items-center text-[16px]">
                    <img
                      src={dubleCheck}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    50 Courier Shipment/Month
                  </div>
                  <div className="flex items-center text-[16px]">
                    <img
                      src={dubleCheck}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    1 Year Full Insurance
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-gradient-to-r w-full bg-[#221F92] hover:from-blue-700 hover:to-blue-900 text-white py-2 px-6 rounded-lg shadow-lg font-medium"
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="relative shadow-lg rounded-lg overflow-hidden bg-[#1D1D37] group hover:scale-105 transition-transform duration-300">
              {/* Card Number */}
              <div className="absolute -top-12 left-8 text-[#ffffff] font-extrabold text-[100px] opacity-20">
                02
              </div>

              {/* Card Content */}
              <div className="p-6 text-center  mt-10">
                <div>
                  <h1 className="text-[#fff] font-extrabold mb-4 noto small text-[30px]">
                    Premium Pass
                  </h1>
                </div>
                <div className="flex justify-center items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#fff] flex items-center justify-center">
                    <img src={truck} alt="" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#fff] noto small mb-4">
                  Transport By Truck
                </h2>
                <h2 className="text-sm font-bold text-[#fff] noto small mb-4">
                  10 per delivery & 200 yearly
                </h2>

                <div className="text-lg text-[#8e8e8e] mb-4">
                  <div className="flex items-center mb-2 text-[16px] ">
                    <img
                      src={dubleCheckW}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    1 - Hour Delivery
                  </div>
                  <div className="flex items-center mb-2 text-[16px]">
                    <img
                      src={dubleCheckW}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    Real Time Tracking
                  </div>
                  <div className="flex items-center text-[16px]">
                    <img
                      src={dubleCheckW}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    200 Courier Shipment/Month
                  </div>
                  <div className="flex items-center text-[16px]">
                    <img
                      src={dubleCheckW}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    8 Year Full Insurance
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-gradient-to-r w-full bg-[#F95C19] hover:from-blue-700 hover:to-blue-900 text-white py-2 px-6 rounded-lg shadow-lg font-medium"
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="relative shadow-lg rounded-lg overflow-hidden bg-white group hover:scale-105 transition-transform duration-300">
              {/* Card Number */}
              <div className="absolute -top-12 left-8 text-[#221F92] font-extrabold text-[100px] opacity-10">
                03
              </div>

              {/* Card Content */}
              <div className="p-6 text-center mt-10">
                <div>
                  <h1 className="text-[#221F92] font-extrabold mb-4 noto small text-[30px]">
                    Gold Pass
                  </h1>
                </div>
                <div className="flex justify-center items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#1D1D37] flex items-center justify-center">
                    <img src={truck} alt="" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold noto small mb-4">
                  Transport By Truck
                </h2>
                <h2 className="text-sm font-bold noto small mb-4">
                  10 per delivery & 200 yearly
                </h2>

                <div className="text-lg text-gray-700 mb-4">
                  <div className="flex items-center mb-2 text-[16px]">
                    <img
                      src={dubleCheck}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />
                    2 - Hour Delivery
                  </div>
                  <div className="flex items-center mb-2 text-[16px]">
                    <img
                      src={dubleCheck}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    Real Time Tracking
                  </div>
                  <div className="flex items-center text-[16px]">
                    <img
                      src={dubleCheck}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    150 Courier Shipment/Month
                  </div>
                  <div className="flex items-center text-[16px]">
                    <img
                      src={dubleCheck}
                      alt=""
                      width={"20px"}
                      className="me-2"
                    />{" "}
                    5 Year Full Insurance
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-gradient-to-r w-full bg-[#221F92] hover:from-blue-700 hover:to-blue-900 text-white py-2 px-6 rounded-lg shadow-lg font-medium"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* swiper slider */}
      {/* <div className="w-full">
        <div className="container">
          <div className="mt-[50px]">
            <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
              our delivery man
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
              <img
                src={tracking}
                className="text-center"
                width={"50px"}
                alt=""
              />
              <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="custom-navigation">
              <button
                onClick={goPrev}
                className="prev-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center"
              >
                Prev
              </button>
              <button
                onClick={goNext}
                className="next-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center ml-5"
              >
                Next
              </button>
            </div>
          </div>

          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={false}
            modules={[Navigation, Autoplay]}
            className="mySwiper my-6 h-[600px]"
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            ref={swiperRef}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {sliderdata.map((item) => (
              <>
                <SwiperSlide className="h-[600px] flex items-center justify-center">
                  <div className="w-[90%]  shadow pb-4 mb-10 h-[98%] rounded overflow-hidden">
                    <div
                      className="w-full h-[300px]"
                      style={{
                        background: `url(${item.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="w-full bg-[#221F92] text-[#fff] py-2 px-3 font-extrabold text-[20px]">
                      {item.title}
                    </div>
                    <div className="mt-2 p-4 text-[20px] min-h-[120px]">
                      {item.dtale}
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center ml-5">
                        About more
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>

        </div>
      </div> */}
      <Gotop />
    </>
  );
}

export default Pricing;
