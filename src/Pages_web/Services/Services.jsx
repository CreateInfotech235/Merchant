import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import bgImage from "../../assets_web/image41.png";
import flatcoloriconsservices from "../../assets_web/flat-color-icons_services.png";

import ExpressDelivery from "../../assets_web/Express Delivery.webp";
import StandardDelivery from "../../assets_web/Standard Delivery.webp";
import BulkTransport from "../../assets_web/Bulk Transport.jpg";
import truck from "../../assets_web/material-truck.png";
import SpecialCare from "../../assets_web/Special Care.jpg";
import Gotop from "./../../Components_web/Gotop/Gotop";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { createFunksen } from "../../typingef/typingef";




import vanimg from "../../assets_web/material-symbols_delivery-truck-speed-outline-rounded.png";
import trackservice from "../../assets_web/track_service.png";
import availabilityservice from "../../assets_web/availability_service.png";
import Rectangle from "../../assets_web/Rectangle.png";
import { SlArrowRight } from "react-icons/sl";
function Services() {
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
        const cleanup = createFunksen('#welcome-text-services', ["Welcome To Create Courier", "Fast, Reliable, and Secure Courier Services"]);
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
                            <h1 id="welcome-text-services" className="text-xl h-[30px]  sm:text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight  text-[#FF6600] leading-tight capitalize">
                                Fast, Reliable, and Secure Courier Services
                            </h1>
                            <h2 className="mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl md:text-2xl lg:text-4xl text-white font-bold">
                                Reliable Courier Services  the
                                Security & Efficiency You Can Trust!
                            </h2>
                            <p className="mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium">
                                we specialise in fast, secure, and cost-effective delivery solutions tailored to
                                your needs. Whether it's urgent same-day delivery, next-day shipping, or
                                international courier services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mx-auto max-w-7xl px-6 lg:px-8 my-12 ">
                <div className="">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl capitalize text-center font-bold tracking-wide noto small">
                        Services
                    </h1>
                    <div className="flex justify-center mt-3 items-center">
                        <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
                        <img src={flatcoloriconsservices} className="text-center" width={"50px"} alt="" />
                        <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
                    </div>
                </div>
            </div>

            {/* part 3 */}

            <div className="container bg-[#1D1D37] py-10 rounded-lg">
                <div className="flex flex-col md:flex-row justify-evenly">
                    <div className="bg-[#1D1D37] text-[#FFFFFF] flex flex-col items-center w-full md:w-[30%] mb-5 md:mb-0">
                        <div className="flex justify-center items-center mt-5">
                            <img src={vanimg} alt="" width={"70px"} />
                        </div>
                        <div className="text-center w-[50%] mt-2">
                            <h3 className="text-2xl font-bold ">Fastest
                                & Secured delivery</h3>
                        </div>
                        <div className="text-center w-[80%] mt-2">
                            <p className="text-sm">Same-day and next-day options available
                                nationwide. we take pride in offering the
                                fastest and most secure courier
                                services</p>
                        </div>
                    </div>

                    <div className="h-[100% ] w-[10px] rounded bg-[#FF6600]">

                    </div>

                    <div className="bg-[#1D1D37] text-[#FFFFFF] flex flex-col items-center w-full md:w-[30%] mb-5 md:mb-0">
                        <div className="flex justify-center items-center mt-5">
                            <img src={trackservice} alt="" width={"70px"} />
                        </div>
                        <div className="text-center w-[50%] mt-2">
                            <h3 className="text-2xl font-bold ">Real-
                                Time Tracking</h3>
                        </div>
                        <div className="text-center w-[80%] mt-2">
                            <p className="text-sm">we believe in complete transparency and
                                peace of mind when it comes to your
                                deliveries. stay informed
                                about your parcel's journey</p>
                        </div>
                    </div>

                    <div className="h-[100% ] w-[10px] rounded bg-[#FF6600]">

                    </div>

                    <div className="bg-[#1D1D37] text-[#FFFFFF] flex flex-col items-center w-full md:w-[30%] mb-5 md:mb-0">
                        <div className="flex justify-center items-center mt-5">
                            <img src={availabilityservice} alt="" width={"70px"} />
                        </div>
                        <div className="text-center w-[50%] mt-2">
                            <h3 className="text-2xl font-bold ">24/7
                                Customer Support</h3>
                        </div>
                        <div className="text-center w-[80%] mt-2">
                            <p className="text-sm">we believe that great service goes beyond
                                just delivering parcels. That's why our
                                dedicated customer support team is
                                available 24/7 to assist you with </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* part 4 */}
            <div className="container p-0 mt-20 mb-20 px-3">
                <div className="flex flex-col md:flex-row justify-evenly">
                    <div className="w-full md:w-[45%]  md:mb-0">
                        <img src={Rectangle} alt="" className="w-full h-auto" />
                    </div>
                    <div className="w-full md:w-[45%]">
                        <div className="w-full flex flex-col h-full" >
                            <h1 className="text-[35px] font-bold tracking-wide capitalize pt-10 pb-2">
                                <span className="text-[#221F92]">:- our</span>
                                <span> </span>
                                <span className="text-[#FF6600]">delivery man</span>
                            </h1>
                            <div>
                                <p className="text-[15px] sm:text-[15px] md:text-[15px] lg:text-[20px] font-medium pt-2 pb-2">
                                    we provide a comprehensive range of fast, secure,
                                    and reliable courier services across the UK and
                                    internationally. Whether you need urgent same-day
                                    delivery, next-day express shipping, or cost-effective
                                    standard delivery, we are committed to delivering
                                    your parcels safely and on time.
                                </p>
                            </div>
                            {/* <div>
                                <button className="bg-[#1D1D37] text-white px-4 py-3 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base md:text-lg flex items-center" onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "instant" }) }}>
                                    Learn More <SlArrowRight className="ml-2 text-[15px] text-bold" />
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Gotop />
        </>
    );
}

export default Services;
