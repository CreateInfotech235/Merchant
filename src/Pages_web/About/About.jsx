import React, { useEffect } from 'react'
import Gotop from '../../Components_web/Gotop/Gotop'
import { useNavigate } from 'react-router-dom';
import tracking from "../../assets_web/Group (4).png";
import oficina from "../../assets_web/oficina.jpg";
import courierman from "../../assets_web/courier man.jpg";


function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/contact');
  };

  return (
    <>
      <div className='w-full flex items-center justify-center h-[600px] bg-[url("https://media.licdn.com/dms/image/v2/C4D12AQHrfGZdQ2Uqpw/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1602750302518?e=1737590400&v=beta&t=H4BZORXsTMnicPf9j7fNHfqBH50bzhONT5BW186Cnyk")] bg-cover  bg-[rgba(0,0,0,0.6)] bg-blend-multiply' style={{ backgroundPositionX: "center", backgroundPositionY: "0" }}>
        <div className='container mx-auto text-white px-4'>
          <div className='w-full lg:w-[70%] font-bold text-[30px] sm:text-[40px] md:text-[50px]' style={{ lineHeight: "1.2" }}>
            Smart Delivery Management Platform
          </div>
          <div className='font-medium text-[16px] sm:text-[20px] md:text-[25px] w-full sm:w-[80%] md:w-[60%] mt-[20px]'>
            We provide delivery partners with an easy-to-use web platform to manage deliveries and track orders across London efficiently.
          </div>
          <button
            type="button"
            className="text-white mt-4 bg-[#221F92] hover:bg-[#2824a1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            onClick={handleClick}
          >
            Contact us
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>

      <div className='mb-4 items-center mt-[40px]'>
        <div className='container'>
          <div>
            <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
              Our Support
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
              <img src={tracking} className="text-center" width={"50px"} alt="Tracking Icon" />
              <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-[30px]'>
            <div className='w-full'>
              <div className='mx-auto w-[100%] lg:w-[80%]'>
                <img src={oficina} alt="Support Office" className='w-full' />
              </div>
            </div>
            <div className='w-full flex items-center'>
              <div className='w-full'>
                <div className='w-full text-center font-bold text-[25px] lg:text-[40px]'>
                  24/7 Support
                </div>
                <div className='mt-3 text-[19px] lg:text-[20px] leading-7'>
                  Our web platform provides comprehensive support for courier service management. We offer real-time tracking assistance, delivery route optimization, and technical support to ensure smooth operations for all our delivery partners.
                </div>
                <div className='mt-3 text-[19px] lg:text-[20px] leading-7'>
                  With our dedicated support team available around the clock, we help resolve delivery issues promptly and provide guidance on using our platform effectively. Our system streamlines courier management, making it easier for partners to focus on what matters most - delivering excellent service.
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-[50px]'>
            <div className='w-full order-2 md:order-1'>
              <div className='w-full'>
                <div className='w-full text-center font-bold text-[25px] lg:text-[40px]'>
                  24/7 Courier Tracking
                </div>
                <div className='mt-3 text-[19px] lg:text-[20px] leading-7'>
                  Our web platform provides real-time courier management and tracking capabilities. Monitor your deliveries 24/7 with live location updates, estimated arrival times, and detailed delivery status information.
                </div>
                <div className='mt-3 text-[19px] lg:text-[20px] leading-7'>
                  Track multiple couriers simultaneously, access delivery history, and generate detailed reports. Our platform helps you stay in control with features like instant notifications, proof of delivery, and route optimization to ensure efficient operations.
                </div>
              </div>
            </div>
            <div className='w-full order-1 md:order-2'>
              <div className='mx-auto w-[100%] lg:w-[80%]'>
                <img src={oficina} alt="Courier Tracking Dashboard" className='w-full' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Gotop />
    </>
  )
}

export default About
