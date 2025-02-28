import React, { useEffect, useState } from "react";
import tracking from "../../assets_web/Group (4).png";
import Setting from "../../assets_web/services 1.png";
import fast_delivery from "../../assets_web/fast-delivery 1.png";
import iconamoon_clock from "../../assets_web/iconamoon_clock-bold.png";
import international_delivery from "../../assets_web/international-delivery-svgrepo-com 1.png";
import tracking_icon from "../../assets_web/tracking_icon.png";
import happy_man from "../../assets_web/Rectangle 12.png";
import pakage from "../../assets_web/image 1.png";
import VideoPlayer from "../../assets_web/Icon.png";
import deliveryMan from "../../assets_web/12008 1.png";
import HeavyBox from "../../assets_web/Heavy box-amico.png";
import Icon from "../../assets_web/Group 7.png";
import Icon1 from "../../assets_web/Group 7 (1).png";
import Icon2 from "../../assets_web/Group 7 (2).png";
import Icon3 from "../../assets_web/Group 7 (3).png";
import Icon4 from "../../assets_web/Group 7 (4).png";
import carbon_task from "../../assets_web/carbon_task-approved.png";
import partner1 from "../../assets_web/partner logo (1).jpg";
import partner2 from "../../assets_web/partner logo (2).jpg";
import { FaArrowRight } from "react-icons/fa";
import bgImage from "../../assets_web/HeroImg.png";

import solar_box from "../../assets_web/solar_box-linear.png";
import people from "../../assets_web/fluent_people-team-16-regular.png";
import earth from "../../assets_web/ion_earth.png";
import weight from "../../assets_web/mdi_weight-kg.png";
import basil_processor from "../../assets_web/basil_processor-outline.png";

import "./Mainbody.css";

import streamline_payment from "../../assets_web/streamline_payment-10.png";
import order_confirmation from "../../assets_web/order-confirmation 1.png";
import Group_3 from "../../assets_web/Group-(3).png";

import Gotop from "../Gotop/Gotop";
import { getWebHome } from "../Api/Webapi";
import SliderForWeb from "./SliderForWeb";
import { Link } from "react-router-dom";
import { createFunksen } from "../../typingef/typingef";
const servicesdata = [
  {
    service: "Timely Delivery",
    description:
      "Creating stellar user interfaces and web experiences using the latest.",
    icon: Icon,
  },
  {
    service: "Limitless Pickup",
    description:
      "Building intuitive, user-centric designs that drive engagement and conversion.",
    icon: Icon1,
  },
  {
    service: "Cash on delivery",
    description:
      "Enhancing your website's visibility in search engines for increased organic traffic.",
    icon: Icon2,
  },
  {
    service: "Get Payment Any Time",
    description:
      "Designing websites that look and perform equally well on all devices and screen sizes.",
    icon: Icon3,
  },
  {
    service: "Secure Handling",
    description:
      "Developing robust, scalable server-side logic for a wide range of web applications.",
    icon: Icon4,
  },
];

const links = [
  { name: "Open roles", href: "#" },
  { name: "Internship program", href: "#" },
  { name: "Our values", href: "#" },
  { name: "Meet our leadership", href: "#" },
];

function Mainbody() {
  const [webHome, setWebHome] = useState(null);
  const [services, setservices] = useState([]);

  // useEffect(() => {
  //   const data = async () => {
  //     const data = await getWebHome();
  //     //  tamrare

  //     // setWebHome(data);
  //     // setservices(servicesdata);
  //   };
  //   data();
  // }, []);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "instant" });
  // }, []);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "instant" });
  // }, [webHome]);


  useEffect(() => {
    const cleanup = createFunksen('#welcome-text', ["","Welcome To Create Courier"]);
    return cleanup; // Ensure cleanup function is returned to avoid multiple instances
  }, []);


  return (
    <>
      <div>
        <div className="w-full ">
          <div className="w-full relative isolate overflow-hidden py-12 sm:py-20 lg:py-24  shadow-md" style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backgroundBlendMode: 'multiply',
            backgroundAttachment: "fixed",
            backgroundPosition: 'center'
          }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row justify-between items-center h-[60vh]">
              {/* Left Content */}
              <div className="w-full md:text-left">
                <h1 id="welcome-text" className="text-xl h-[30px]  sm:text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight  text-[#FF6600] leading-tight capitalize">
                  Welcome To Create Courier
                </h1>
                <h2 className="mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl md:text-2xl lg:text-4xl text-white font-bold">
                  Fast & Reliable Courier Services for All Your Shipping Needs.
                </h2>
                <p className="mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium">
                  We provide fast, reliable, and secure courier services to meet
                  all your delivery needs. Whether you're sending a small package
                  or a large shipment, our team ensures timely and safe delivery
                  with tracking options for peace of mind.
                </p>
              </div>

              {/* Right Image */}
              {/* <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <img
                src={HeavyBox}
                alt="Courier Service"
                className="w-full max-w-sm mx-auto lg:max-w-full"
              />
            </div> */}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12 lg:my-24">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl capitalize text-center font-bold tracking-wide noto small">
              Top Services
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-24 sm:w-36 h-[2px] bg-[#221F92] mx-2 sm:mx-3"></div>
              <img
                src={Setting}
                className="text-center w-10 sm:w-16"
                alt="Setting Icon"
              />
              <div className="line-right w-24 sm:w-36 h-[2px] bg-[#221F92] mx-2 sm:mx-3 relative"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8">
            {/* Service Card */}
            {[
              {
                img: fast_delivery,
                title: "Fast Delivery",
                description:
                  "With real-time tracking and a reliable network of drivers, we prioritize speed without compromising safety. Trust for all your urgent shipping needs.",
                features: ["Corporate goods", "Shipment", "Accessories"],
              },
              {
                img: iconamoon_clock,
                title: "24/7 Support",
                description:
                  "We know that your shipping needs follow a 9-to-5 schedule. That's why our 24/7 courier service is available for all your packages.",
                features: ["Corporate goods", "Shipment", "Accessories"],
              },
              {
                img: international_delivery,
                title: "International Shipping",
                description:
                  "Courier globally with confidence, ensuring fast, secure, and reliable delivery to destinations around the world.",
                features: [
                  "Ensuring fast",
                  "Safe & secure",
                  "Reliable delivery",
                ],
              },
              {
                img: tracking_icon,
                title: "Package Tracking",
                description:
                  "Stay updated with real-time tracking, providing you with complete visibility of your package’s journey from start to finish.",
                features: ["Staying updated", "Pick-up to delivery", "Helpful"],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-200 rounded-t-full p-4"
              >
                <div className="w-36 sm:w-48 md:w-56 lg:w-72 overflow-hidden">
                  <div className="w-full flex justify-center mt-8 sm:mt-14">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="max-w-full"
                    />
                  </div>
                  <p className="text-center text-lg sm:text-xl lg:text-2xl font-bold noto small mt-3">
                    {service.title}
                  </p>
                  <p className="text-justify px-2 sm:px-5 mt-2 text-[#7B7A8B] text-sm sm:text-base">
                    {service.description}
                  </p>
                  <div className="w-full flex flex-wrap px-2 sm:px-5 mt-2">
                    {service.features.map((feature, idx) => (
                      <p
                        key={idx}
                        className="flex py-1 w-full items-center text-[#7B7A8B] text-sm"
                      >
                        <span className="w-3 h-3 block bg-[#FF6600] rounded-full mr-2"></span>
                        {feature}
                      </p>
                    ))}
                  </div>
                  <div
                    className="flex justify-center items-center py-2 mx-2 sm:mx-5 my-6 hover:bg-orange-500 hover:text-white transition"
                    style={{
                      borderColor: "#FF6600",
                      borderWidth: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    Learn More
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto relative isolate max-w-7xl lg:px-8 my-24">
          {/* <div className=""> */}
          <div className="mx-6">
            <img
              src={happy_man}
              alt=""
              width={"100%"}
              className="absolute inset-0 -z-10 size-full "
            />
            {/* </div> */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
              <div className="max-w-2xl lg:mx-0">
                <img
                  src={VideoPlayer}
                  alt=""
                  width={"20%"}
                  className="mx-auto mt-8 sm:mt-36"
                />
                <h1 className="text-2xl noto small  mt-3 text-center  md:text-3xl lg:text-[31px] font-medium tracking-tight text-[#FF6600] leading-[1.2] md:leading-[1.4] capitalize noto small">
                  {/* FASTEST DELIVERY */}
                  Fastest Delivery
                </h1>
                <h2 className="mt-4 max-w-md text-center md:mt-8 md:text-lg text-white font-medium mb-8 sm:mb-32">
                  You can get your valuable item in the fastest period of time
                  with safety. Because your emergency is our first priority.
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12 lg:my-24">
          {/* Section Heading */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold capitalize tracking-wide">
              Our Delivery About
            </h1>
            <div className="flex justify-center items-center mt-4">
              <div className="relative w-24 sm:w-32 md:w-36 h-[2px] bg-[#221F92] mx-3"></div>
              <img
                src={tracking}
                className="w-10 sm:w-12 md:w-14"
                alt="Tracking Icon"
              />
              <div className="relative w-24 sm:w-32 md:w-36 h-[2px] bg-[#221F92] mx-3"></div>
            </div>
          </div>

          {/* Features Section */}
          <section id="features" className="py-12 md:py-20 lg:py-28">
            <div className="container mx-auto flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12">
              {/* Left Column */}
              <div className="flex flex-col space-y-6 md:w-1/2">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left">
                  What’s different about Manage?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center md:text-left">
                  Manage provides all the functionality your team needs, without
                  the complexity. Our software is tailor-made for modern digital
                  product teams.
                </p>
                <img
                  src={deliveryMan}
                  className="w-full rounded-lg"
                  alt="Delivery Man"
                />
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-8 md:w-1/2">
                {/* Feature 1 */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="px-5 py-2 font-bold text-white rounded-full bg-[#221F92]">
                      01
                    </div>
                    <h3 className="text-lg font-bold md:hidden">
                      Track company-wide progress
                    </h3>
                  </div>
                  <div>
                    <h3 className="hidden md:block text-lg font-bold">
                      Track company-wide progress
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      See how your day-to-day tasks fit into the wider vision.
                      Go from tracking progress at the milestone level all the
                      way down to the smallest of details. Never lose sight of
                      the bigger picture again.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="px-5 py-2 font-bold text-white rounded-full bg-[#221F92]">
                      02
                    </div>
                    <h3 className="text-lg font-bold md:hidden">
                      Advanced built-in reports
                    </h3>
                  </div>
                  <div>
                    <h3 className="hidden md:block text-lg font-bold">
                      Advanced built-in reports
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Advanced built-in reports for a courier company in London
                      offer real-time tracking, delivery performance analysis,
                      route optimization, traffic insights, customer feedback,
                      and operational data to enhance efficiency and improve
                      service.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="px-5 py-2 font-bold text-white rounded-full bg-[#221F92]">
                      03
                    </div>
                    <h3 className="text-lg font-bold md:hidden">
                      Everything you need in one place
                    </h3>
                  </div>
                  <div>
                    <h3 className="hidden md:block text-lg font-bold">
                      Everything you need in one place
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Courier services across all of London, providing fast,
                      reliable, and efficient delivery solutions. We handle all
                      your needs in one place, ensuring quick and safe
                      transportation throughout the city.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${pakage})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-[#1D1D37] bg-opacity-70"></div>
          <div className="w-full max-w-screen-xl mx-auto relative ">
            {/* Background image */}

            {/* Content */}
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between px-8 lg:px-16 py-12 lg:py-20 ">
              {/* Left content */}
              <div className="max-w-xl">
                <h1 className="text-white text-2xl md:text-4xl font-bold mb-4 noto small">
                  We Take Care About Transport At on For Your Business
                </h1>
                <p className="text-gray-300 text-sm md:text-lg mb-16">
                  Our services include Same-Day Delivery for urgent needs,
                  Next-Day Delivery for quick turnarounds, and International
                  Shipping for global reach.
                </p>
                {/* <div className="flex md:justify-start justify-center">
                  <a
                    href="#"
                    className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold md:text-lg text-sm hover:bg-orange-600 transition"
                  >
                    Read more
                  </a>
                </div> */}
              </div>

              {/* Right stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 lg:mt-0 items-center">
                {/* Stat card 1 */}
                <div className="bg-[#1D1D37]  rounded-lg p-6 text-center text-white">
                  <div className="text-orange-500 text-4xl mb-4">
                    <img src={solar_box} alt="" className="mx-auto " />
                  </div>
                  <p className="text-2xl font-bold">380k+</p>
                  <p className="text-gray-300 mt-2">Delivery Packagings</p>
                </div>

                {/* Stat card 2 */}
                <div className="bg-[#1D1D37]  rounded-lg p-6 text-center text-white">
                  <div className="text-orange-500 text-4xl mb-4">
                    <img src={people} alt="" className="mx-auto " />
                  </div>
                  <p className="text-2xl font-bold">70k+</p>
                  <p className="text-gray-300 mt-2">Happy Clients</p>
                </div>

                {/* Stat card 3 */}
                <div className="bg-[#1D1D37]  rounded-lg p-6 text-center text-white">
                  <div className="text-orange-500 text-4xl mb-4">
                    <img src={earth} alt="" className="mx-auto " />
                  </div>
                  <p className="text-2xl font-bold">380k+</p>
                  <p className="text-gray-300 mt-2">Delivery Packagings</p>
                </div>

                {/* Stat card 4 */}
                <div className="bg-[#1D1D37]  rounded-lg p-6 text-center text-white">
                  <div className="text-orange-500 text-4xl mb-4">
                    <img src={weight} alt="" className="mx-auto " />
                  </div>
                  <p className="text-2xl font-bold">50k+</p>
                  <p className="text-gray-300 mt-2">Tons Of Goods</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
          <div>
            <h1 className="text-2xl sm:text-3xl text-[#F95C19] capitalize text-center font-bold tracking-wide">
              TESTIMONIAL
            </h1>
            <p className="text-center text-2xl sm:text-[39px] noto small font-bold text-[#000000]">
              Our Awesome Clients
            </p>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-24 sm:w-36 h-[2px] bg-[#221F92] mx-2 sm:mx-3"></div>
              <img
                src={tracking}
                className="text-center"
                width="40"
                sm:width="50"
                alt=""
              />
              <div className="line-right relative w-24 sm:w-36 h-[2px] bg-[#221F92] mx-2 sm:mx-3"></div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <SliderForWeb />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-14">
          <div>
            <h1 className="text-3xl sm:text-4xl capitalize text-center font-bold tracking-wide">
              Working Process
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-20 sm:w-36 h-[2px] bg-[#221F92] mx-2 sm:mx-3"></div>
              <img
                src={basil_processor}
                className="text-center"
                width="40px"
                alt=""
              />
              <div className="line-right w-20 sm:w-36 h-[2px] bg-[#221F92] mx-2 sm:mx-3 relative"></div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mt-10">
            <div className="w-full lg:w-1/2 p-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl capitalize font-bold tracking-wide noto small mt-8 lg:mt-20">
                We Take Care About Transport At on For Your Business
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mt-4">
                Our services include Same-Day Delivery for urgent needs,
                Next-Day Delivery for quick turnarounds, and International
                Shipping for global reach.
              </p>
              {/* <div>
                <button className="bg-[#F95C19] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-base sm:text-lg hover:bg-orange-600 transition mt-6">
                  Read more
                </button>
              </div> */}
            </div>
            <div className="w-full lg:w-1/2 p-4 space-y-6">
              <div className="md:flex items-center">
                <div className="w-36 h-20 sm:w-36 sm:h-20 rounded-full bg-[#1D1D37] flex justify-center items-center me-3">
                  <img src={carbon_task} alt="" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl noto small capitalize font-bold tracking-wide">
                    Shipment Booking
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500">
                    The first step in the courier process involves the customer
                    booking a shipment. This is done through an online
                  </p>
                </div>
              </div>
              <div className="md:flex items-center">
                <div className="w-36 h-20 sm:w-36 sm:h-20 rounded-full bg-[#1D1D37] flex justify-center items-center me-3">
                  <img src={streamline_payment} alt="" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl noto small capitalize font-bold tracking-wide">
                    Payment Process
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500">
                    Once the shipment details are confirmed, the customer is
                    directed to make a payment for the service.
                  </p>
                </div>
              </div>
              <div className="md:flex items-center">
                <div className="w-36 h-20 sm:w-36 sm:h-20 rounded-full bg-[#1D1D37] flex justify-center items-center me-3">
                  <img src={Group_3} alt="" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl noto small capitalize font-bold tracking-wide">
                    Tracking & Monitoring
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500">
                    After payment, the customer receives a tracking number,
                    which allows them to monitor the parcel’s journey.
                  </p>
                </div>
              </div>
              <div className="md:flex items-center ">
                <div className="w-36 h-20 sm:w-36 sm:h-20 rounded-full bg-[#1D1D37] flex justify-center items-center me-3">
                  <img src={order_confirmation} alt="" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl noto small capitalize font-bold tracking-wide">
                    Delivery Confirmation
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500">
                    If there are any issues with delivery, the website often
                    offers options to reschedule or track the delivery status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="loader">section 4</div> */}
      </div>
      <Gotop />
    </>
  );
}

export default Mainbody;
