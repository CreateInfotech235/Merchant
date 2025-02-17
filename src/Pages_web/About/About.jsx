import React, { useEffect } from "react";
import Gotop from "../../Components_web/Gotop/Gotop";
import { Link, useNavigate } from "react-router-dom";
import tracking from "../../assets_web/Group (4).png";
import oficina from "../../assets_web/Group 159.png";
import courierman from "../../assets_web/courier man.jpg";
import bgImage from "../../assets_web/image (41).png";
import effect from "../../assets_web/image (42).png";
import HeavyBox from "../../assets_web/About us page-bro (1) 1.png";
import Setting from "../../assets_web/fluent_people-team-32-regular.png";
import Right from "../../assets_web/ph_seal-check.png";
function About() {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "instant" });
  // }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <>
      <div className="w-full relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16 md:py-24 lg:py-32">
        <img
          alt=""
          src={bgImage}
          className="absolute inset-0 -z-10 w-full h-full object-cover object-right md:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full bg-[#06052D5D]/80 -z-10"
        ></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:justify-between">
          {/* Text Content */}
          <div className="max-w-full lg:max-w-2xl xs:text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium tracking-tight text-[#FF6600] leading-snug capitalize noto small">
              Reliable Delivery, Trusted Service–Every Time.
            </h1>
            <h2 className="mt-4 md:mt-6 lg:mt-8 text-white text-base sm:text-lg md:text-xl lg:text-4xl font-bold">
              our Trusted Partner in Fast and Reliable Shipping.
            </h2>
            <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium">
              we are dedicated to providing reliable, fast, and secure delivery
              services across the UK and beyond. With years of experience in the
              courier industry we pride ourselves on our commitment to customer
              satisfaction.
            </p>
            {/* <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center lg:justify-start">
              <Link to="/contact">
                <button className="bg-[#FF6600] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base md:text-lg">
                  Get Started
                  <span className="ml-2">&rarr;</span>
                </button>
              </Link>
            </div> */}
          </div>
          {/* Image Content */}
          <div className="mt-8 lg:mt-0 max-w-full lg:max-w-lg">
            <img src={HeavyBox} alt="Heavy Box" className="w-full h-auto" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24">
        <div className="">
          <h1 className="text-4xl capitalize text-center font-bold tracking-wide noto small">
            About Us
          </h1>
          <div className="flex justify-center mt-3 items-center">
            <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
            <img src={Setting} className="text-center" width={"50px"} alt="" />
            <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
          </div>
        </div>
      </div>

      {/* Section: Our Support */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        {/* Support Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="overflow-hidden rounded-lg transition-shadow duration-300">
            <img
              src={oficina}
              alt="Support Office"
              className="w-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Text */}
          <div>
            <h3 className="text-3xl font-bold md:text-left mb-4">
              Committed to Delivering Excellence Every Step of the Way.
            </h3>
            <p className="text-lg leading-relaxed mb-4">
              With a strong focus on customer satisfaction, we deliver your
              parcels with care and speed, ensuring they reach their destination
              safely and on time. Whether you're sending small packages or large
              shipments, we provide tailored solutions to meet.
            </p>
            <div className="flex items-center my-2">
              <p className="text-lg leading-relaxed">
                <img src={Right} alt="" className="mr-2" />
              </p>
              <span>Reliable Delivery</span>
            </div>
            <div className="flex items-center my-2">
              <p className="text-lg leading-relaxed">
                <img src={Right} alt="" className="mr-2" />
              </p>
              <span>Customer-Focused Service</span>
            </div>
            <div className="flex items-center my-2">
              <p className="text-lg leading-relaxed">
                <img src={Right} alt="" className="mr-2" />
              </p>
              <span>Fast and Efficient</span>
            </div>
            <div className="flex items-center my-2">
              <p className="text-lg leading-relaxed">
                <img src={Right} alt="" className="mr-2" />
              </p>
              <span>Commitment to Quality</span>
            </div>
            <div className="mx-auto mt-6 md:mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <button className="bg-[#1D1D37] text-white px-4 py-2 rounded-md">
                About More
                <span className="ml-2">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Delivering unmatched service with innovative technology,
                customer-first solutions, and reliable support.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#4A47C1] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Real-Time Tracking
                  </h3>
                  <p className="text-gray-600">
                    Stay updated on every step of your delivery with live GPS
                    tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#4A47C1] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Route Optimization
                  </h3>
                  <p className="text-gray-600">
                    Reduce delivery times with AI-driven route optimization.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#4A47C1] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Dedicated Support
                  </h3>
                  <p className="text-gray-600">
                    Our support team works around the clock to resolve all your
                    queries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {/* Section: Courier Tracking */}
      {/* <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-center md:text-left mb-4">
                24/7 Courier Tracking
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                Track your couriers in real-time with live updates, delivery
                status, and location monitoring. Stay in control and optimize
                delivery routes effortlessly.
              </p>
              <p className="text-lg leading-relaxed">
                Our platform provides instant notifications, delivery reports,
                and proof of delivery for a seamless experience.
              </p>
            </div>
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://insights.workwave.com/wp-content/uploads/2024/09/pp-blog-gps.jpg"
                alt="Courier Tracking Dashboard"
                className="w-full transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="mx-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24 bg-[#1D1D37] rounded-lg p-10">
          <div className="md:flex justify-center items-baseline">
            <div className="md:w-1/3 w-full md:border-r-4 border-[#FF6600] md:mt-3">
              <h1 className="text-4xl mb-2 text-[#FF6600] capitalize font-bold tracking-wide noto small">
                1500+
              </h1>
              <h3 className="text-2xl text-white capitalize font-bold tracking-wide noto small">
                Project Completed
              </h3>
              <p className="text-lg text-[#D6D6D6] leading-relaxed">
                Our project completion service ensures timely, reliable delivery
                from start to finish.
              </p>
            </div>
            <div className="md:w-1/3 w-full md:border-r-4 border-[#FF6600] md:ml-4 md:mt-3">
              <h1 className="text-4xl mb-2 text-[#FF6600] capitalize font-bold tracking-wide noto small">
                200+
              </h1>
              <h3 className="text-2xl text-white capitalize font-bold tracking-wide noto small">
                Best Deliveryman's
              </h3>
              <p className="text-lg text-[#D6D6D6] leading-relaxed">
                committed to providing the best service, ensuring every delivery
                is handled with care and efficiency.
              </p>
            </div>
            <div className="md:w-1/3 w-full md:ml-4 md:mt-3">
              <h1 className="text-4xl mb-2 text-[#FF6600] capitalize font-bold tracking-wide noto small">
                75+
              </h1>
              <h3 className="text-2xl text-white capitalize font-bold tracking-wide noto small">
                International Awards
              </h3>
              <p className="text-lg text-[#D6D6D6] leading-relaxed">
                committed to providing the best service, ensuring every delivery
                is handled with care and efficiency.
              </p>
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
