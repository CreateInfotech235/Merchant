import React from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import img from "../../assets_web/Avatar.png";

function SliderForWeb() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "20px", // Adjusted for better responsiveness
    slidesToShow: 1,
    speed: 500,
    dots: true,
    responsive: [
      {
        breakpoint: 1024, // For medium and large screens
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480, // For small screens and mobiles
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
    ],
  };

  return (
    <div className="slider-container max-w-screen-xl mx-auto px-4">
      <Slider {...settings}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full border rounded-lg p-4 bg-white">
            <div>
              <h3 className="text-2xl text-[#F95C19] font-bold mb-3">
                Fantastic service!
              </h3>
              <p className="text-sm md:text-base">
                I purchased a phone from an e-commerce site, and this courier
                service provider assisted me in getting it delivered to my home.
                I received my phone within one day, and I was really satisfied
                with their service when I received it. They are really quick and
                dependable. They give me the option of real-time delivery status,
                which allows me to track the progress of my goods delivery. I get
                a lot of questions from call center support and key account
                managers. They come highly recommended. Confidently say that
                they are really reliable.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="rating-star flex items-center gap-1">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} style={{ color: "#F95C19", fontSize: "20px" }} />
                  ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="info">
                  <p className="font-bold">John Doe</p>
                  <p className="text-sm text-gray-500">CEO, Company Name</p>
                </div>
                <div className="img">
                  <img
                    src={img}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderForWeb;
