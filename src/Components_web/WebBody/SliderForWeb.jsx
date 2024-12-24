import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import img from "../../assets_web/Avatar.png";
function SliderForWeb() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    dots: true
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="w-full border rounded-lg p-4">
          <div>
            <h3 className="text-2xl text-[#F95C19] font-bold mb-3">
              Fantastic service!
            </h3>
            <p>
              I purchased a phone from an e-commerce site, and this courier
              service provider assisted me in getting it delivered to my home. I
              received my phone within one day, and I was really satisfied with
              their service when I received it. They are really quick and
              dependable. They give me with the option of real-time delivery
              status, which allows me to track the progress of my goods
              delivery. I get a lot of questions from call center support and
              key account managers. They come highly recommended. Confidently
              say that they are really reliable.
            </p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="rating-star flex items-center gap-2">
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
            </div>
            <div className="flex items-center gap-2">
              <div className="info">
                <p className="font-bold">John Doe</p>
                <p>CEO, Company Name</p>
              </div>
              <div className="img">
                <img src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border rounded-lg p-4">
          <div>
            <h3 className="text-2xl text-[#F95C19] font-bold mb-3">
              Fantastic service!
            </h3>
            <p>
              I purchased a phone from an e-commerce site, and this courier
              service provider assisted me in getting it delivered to my home. I
              received my phone within one day, and I was really satisfied with
              their service when I received it. They are really quick and
              dependable. They give me with the option of real-time delivery
              status, which allows me to track the progress of my goods
              delivery. I get a lot of questions from call center support and
              key account managers. They come highly recommended. Confidently
              say that they are really reliable.
            </p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="rating-star flex items-center gap-2">
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
            </div>
            <div className="flex items-center gap-2">
              <div className="info">
                <p className="font-bold">John Doe</p>
                <p>CEO, Company Name</p>
              </div>
              <div className="img">
                <img src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border rounded-lg p-4">
          <div>
            <h3 className="text-2xl text-[#F95C19] font-bold mb-3">
              Fantastic service!
            </h3>
            <p>
              I purchased a phone from an e-commerce site, and this courier
              service provider assisted me in getting it delivered to my home. I
              received my phone within one day, and I was really satisfied with
              their service when I received it. They are really quick and
              dependable. They give me with the option of real-time delivery
              status, which allows me to track the progress of my goods
              delivery. I get a lot of questions from call center support and
              key account managers. They come highly recommended. Confidently
              say that they are really reliable.
            </p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="rating-star flex items-center gap-2">
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
            </div>
            <div className="flex items-center gap-2">
              <div className="info">
                <p className="font-bold">John Doe</p>
                <p>CEO, Company Name</p>
              </div>
              <div className="img">
                <img src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border rounded-lg p-4">
          <div>
            <h3 className="text-2xl text-[#F95C19] font-bold mb-3">
              Fantastic service!
            </h3>
            <p>
              I purchased a phone from an e-commerce site, and this courier
              service provider assisted me in getting it delivered to my home. I
              received my phone within one day, and I was really satisfied with
              their service when I received it. They are really quick and
              dependable. They give me with the option of real-time delivery
              status, which allows me to track the progress of my goods
              delivery. I get a lot of questions from call center support and
              key account managers. They come highly recommended. Confidently
              say that they are really reliable.
            </p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="rating-star flex items-center gap-2">
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
              <FaStar style={{ color: "#F95C19", fontSize: "20px" }} />
            </div>
            <div className="flex items-center gap-2">
              <div className="info">
                <p className="font-bold">John Doe</p>
                <p>CEO, Company Name</p>
              </div>
              <div className="img">
                <img src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SliderForWeb;
