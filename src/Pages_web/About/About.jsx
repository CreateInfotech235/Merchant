import React, { useEffect } from 'react';
import Gotop from '../../Components_web/Gotop/Gotop';
import { useNavigate } from 'react-router-dom';
import tracking from '../../assets_web/Group (4).png';
import oficina from '../../assets_web/oficina.jpg';
import courierman from '../../assets_web/courier man.jpg';

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
      {/* Hero Section */}
      <div className="relative w-full h-[600px] bg-cover bg-center flex items-center justify-center" 
           style={{ backgroundImage: 'url("https://media.licdn.com/dms/image/v2/C4D12AQHrfGZdQ2Uqpw/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1602750302518?e=1737590400&v=beta&t=H4BZORXsTMnicPf9j7fNHfqBH50bzhONT5BW186Cnyk")' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00000088] to-[#000000a3]"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Smart Delivery Management Platform
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-xl mx-auto mb-6">
            Manage deliveries and track orders across London efficiently using our user-friendly platform.
          </p>
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-[#221F92] to-[#4A47C1] hover:from-[#1D1A7E] hover:to-[#3B37A1] px-6 py-3 rounded-lg text-white font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Section: Our Support */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Support</h2>
          <div className="flex justify-center items-center">
            <div className="h-[2px] w-24 bg-[#221F92]"></div>
            <img src={tracking} alt="Tracking Icon" className="mx-2 w-12" />
            <div className="h-[2px] w-24 bg-[#221F92]"></div>
          </div>
        </div>

        {/* Support Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={oficina} alt="Support Office" className="w-full object-cover transform hover:scale-105 transition-transform duration-300" />
          </div>
          {/* Text */}
          <div>
            <h3 className="text-3xl font-bold text-center md:text-left mb-4">24/7 Support</h3>
            <p className="text-lg leading-relaxed mb-4">
              Our web platform offers comprehensive courier service management with real-time tracking, route optimization, and technical support. We ensure smooth operations for delivery partners across London.
            </p>
            <p className="text-lg leading-relaxed">
              With our dedicated support team available 24/7, we help resolve delivery issues promptly, ensuring a hassle-free experience for all our partners.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Delivering unmatched service with innovative technology, customer-first solutions, and reliable support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4A47C1] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Real-Time Tracking</h3>
                <p className="text-gray-600">
                  Stay updated on every step of your delivery with live GPS tracking.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4A47C1] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Route Optimization</h3>
                <p className="text-gray-600">
                  Reduce delivery times with AI-driven route optimization.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4A47C1] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Dedicated Support</h3>
                <p className="text-gray-600">
                  Our support team works around the clock to resolve all your queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section: Courier Tracking */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
            {/* Text */}
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-center md:text-left mb-4">24/7 Courier Tracking</h3>
              <p className="text-lg leading-relaxed mb-4">
                Track your couriers in real-time with live updates, delivery status, and location monitoring. Stay in control and optimize delivery routes effortlessly.
              </p>
              <p className="text-lg leading-relaxed">
                Our platform provides instant notifications, delivery reports, and proof of delivery for a seamless experience.
              </p>
            </div>
            {/* Image */}
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://insights.workwave.com/wp-content/uploads/2024/09/pp-blog-gps.jpg"
                alt="Courier Tracking Dashboard"
                className="w-full transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Go Top Button */}
      <Gotop />
    </>
  );
}

export default About;
