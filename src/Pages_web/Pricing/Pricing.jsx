import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import bgimg from "../../assets_web/Pricingbgimg.jpg";
import tracking from "../../assets_web/Group (4).png";
import courierman from "../../assets_web/courier man.jpg";
import van from "../../assets_web/van.jpg";
import ExpressDelivery from "../../assets_web/Express Delivery.webp";
import StandardDelivery from "../../assets_web/Standard Delivery.webp";
import BulkTransport from "../../assets_web/Bulk Transport.jpg";
import SpecialCare from "../../assets_web/Special Care.jpg";
import Gotop from "./../../Components_web/Gotop/Gotop"
import { PiTruckDuotone } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { TbClock } from "react-icons/tb";
import { FaPoundSign } from "react-icons/fa";


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import { Title } from 'chart.js';

function Pricing() {
  const navigate = useNavigate(); // Initialize navigate function
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  // Function to handle button click
  const handleClick = () => {
    navigate('/about'); // Navigate to /about page
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
  }


  const sliderdata = [
    {
      img: ExpressDelivery,
      title: "Express Delivery",
      dtale: "Same-day delivery service within London for urgent packages and documents. Our fastest delivery option with real-time tracking."
    },
    {
      img: StandardDelivery,
      title: "Standard Delivery",
      dtale: "Reliable next-day delivery service perfect for regular shipments. Cost-effective solution with professional handling."
    },
    {
      img: BulkTransport,
      title: "Bulk Transport",
      dtale: "Specialized service for large volumes and heavy cargo. Ideal for business shipments with competitive rates."
    },
    {
      img: SpecialCare,
      title: "Special Care",
      dtale: "Dedicated handling for fragile and valuable items. Extra protection and insurance for your precious cargo."
    }
  ]
  return (
    <>
      {/*part 1 */}
      <div
        className='w-full h-[600px] flex items-center'
        style={{
          background: `url(${bgimg})`,
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adding a slight dark overlay
          backgroundBlendMode: 'multiply', // Blending the background image with the overlay
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className='container mx-auto text-white px-4'>
          <div className='w-full lg:w-[70%] font-bold text-[30px] sm:text-[40px] md:text-[50px]' style={{ lineHeight: "1.2" }}>
            We courier your parcel at low cost and in time in London.
          </div>
          <div className='font-medium text-[16px] sm:text-[20px] md:text-[25px] w-full sm:w-[80%] md:w-[60%] mt-[20px]'>
            We offer reliable and affordable parcel courier services in London, ensuring on-time delivery and safe handling. Trust us for cost-effective, hassle-free shipping.
          </div>
          <button
            type="button"
            className="text-white mt-4 bg-[#221F92] hover:bg-[#2824a1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            onClick={handleClick} // Attach the handleClick function to the button
          >
            About us
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>


      {/* part 2 */}
      <div className='mb-4 items-center mt-[40px]'>
        <div className='container'>
          <div>
            <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
              Our Delivery Service
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
              <img src={tracking} className="text-center" width={"50px"} alt="Tracking Icon" />
              <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-[30px]'>
            <div className='w-full order-2 md:order-1 flex items-center'>
              <div className='w-full'>
                <div className='w-full text-center font-bold text-[25px]  lg:text-[40px] '>
                  Fast & Reliable London Service
                </div>
                <div className='mt-3 text-[19] lg:text-[20px] leading-7'>
                  Our courier service in London ensures fast, efficient, and reliable delivery across the city. Whether you're sending packages, important documents, or gifts, our team guarantees prompt delivery with professional care.
                </div>
                <div className='mt-3 text-[20px] leading-7'>
                  We pride ourselves on our local knowledge, which allows us to navigate London's bustling streets and deliver to even the most remote areas. Our couriers are equipped with the latest tracking technology, so you can always know where your package is.
                </div>
              </div>
            </div>
            <div className='w-full order-1 md:order-2'>
              <div className='mx-auto relative w-[100%] lg:w-[80%] overflow-hidden rounded'>
                  <img src={van} alt="Courier Van" className='w-full' />
                  <div className='w-[50%] absolute right-[-15px] bottom-[-15px] p-[15px]  bg-[#fff]  rounded overflow-hidden'>
                    <img src={courierman} alt="Courier Delivery" className='w-full rounded' />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>





      {/* part 3 */}
      <div className="mb-4 mt-[20px]">
  <div className="container mx-auto px-4">
    {/* Title Section */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold text-[#221F92] tracking-wide uppercase">
        Our Delivery Services
      </h1>
      <div className="flex justify-center items-center mt-4">
        <div className="w-24 h-[2px] bg-[#221F92]"></div>
        <img src={tracking} className="mx-3" width="50px" alt="Tracking Icon" />
        <div className="w-24 h-[2px] bg-[#221F92]"></div>
      </div>
    </div>

    {/* Card Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Card Component */}
      {[
        { id: 1, weight: "2kg", time: "7 days", amount: "30" },
        { id: 2, weight: "25kg", time: "7 days", amount: "78" },
        { id: 3, weight: "70kg", time: "7 days", amount: "140" },
      ].map((item) => (
        <div
          key={item.id}
          className="relative shadow-lg rounded-lg overflow-hidden bg-white group hover:scale-105 transition-transform duration-300"
        >
          {/* Card Number */}
          <div className="absolute -top-12 left-8 text-[#221F92] font-extrabold text-[100px] opacity-10">
            0{item.id}
          </div>

          {/* Card Content */}
          <div className="p-6 text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#221F92] to-[#6B5FD1] flex items-center justify-center">
                <PiTruckDuotone className="text-white text-5xl" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#221F92] mb-4">Transport By Truck</h2>

            <div className="text-lg text-gray-700 mb-4">
              <div className="flex items-center justify-center mb-2">
                <BsBoxSeam className="text-[#221F92] mr-2" /> Weight: {item.weight}
              </div>
              <div className="flex items-center justify-center mb-2">
                <TbClock className="text-[#221F92] mr-2" /> Time: {item.time}
              </div>
              <div className="flex items-center justify-center">
                <FaPoundSign className="text-[#221F92] mr-1" /> Amount: {item.amount}
              </div>
            </div>

            <button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white py-2 px-6 rounded-lg shadow-lg font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



      {/* swiper slider */}
      <div className='w-full'>
        <div className='container'>


          <div className="mt-[50px]">
            <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
              our delivery man
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
              <img src={tracking} className="text-center" width={"50px"} alt="" />
              <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
            </div>
          </div>


          <div className='flex justify-end' >
            <div className="custom-navigation">
              <button onClick={goPrev} className="prev-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center">Prev</button>
              <button onClick={goNext} className="next-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center ml-5">Next</button>
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
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
          >
            {
              sliderdata.map((item) => (
                <>
                  <SwiperSlide className='h-[600px] flex items-center justify-center'>
                    <div className='w-[90%]  shadow pb-4 mb-10 h-[98%] rounded overflow-hidden'>
                      <div className='w-full h-[300px]' style={{ background: `url(${item.img})`, backgroundSize: "cover", backgroundPosition: "center" }} >
                      </div>
                      <div className='w-full bg-[#221F92] text-[#fff] py-2 px-3 font-extrabold text-[20px]'>
                        {item.title}
                      </div>
                      <div className='mt-2 p-4 text-[20px] min-h-[120px]'>
                        {item.dtale}
                      </div>
                      <div className='flex justify-center items-center'>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center ml-5">About more</button>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              ))
            }
          </Swiper>

          {/* Custom navigation buttons */}
        </div>
      </div>
      <Gotop />
    </>
  );
}

export default Pricing;
