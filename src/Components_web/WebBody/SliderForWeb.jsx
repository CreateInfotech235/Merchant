import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Slider from "react-slick";
import img from "../../assets_web/Avatar.png";

function SliderForWeb() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: 1,
    speed: 500,
    dots: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
    ],
  };

  const data = [
    {
      name: "John Doe",
      review: "Fantastic service!",
      image: img,
      position: "CEO, Company Name",
      massage: "I purchased a phone from an e-commerce site, and this courier service provider assisted me in getting it delivered to my home. I received my phone within one day, and I was really satisfied with their service when I received it. They are really quick and dependable. They give me the option of real-time delivery status, which allows me to track the progress of my goods delivery. I get a lot of questions from call center support and key account managers. They come highly recommended. Confidently say that they are really reliable.",
      rating: 5,
    },
    {
      name: "John Doe",
      review: "Fantastic service!",
      image: img,
      position: "CEO, Company Name",
      massage: "I purchased a phone from an e-commerce site, and this courier service provider assisted me in getting it delivered to my home. I received my phone within one day, and I was really satisfied with their service when I received it. They are really quick and dependable. They give me the option of real-time delivery status, which allows me to track the progress of my goods delivery. I get a lot of questions from call center support and key account managers. They come highly recommended. Confidently say that they are really reliable.",
      rating: 4,
    },
    {
      name: "John Doe",
      review: "Fantastic service!",
      image: img,
      position: "CEO, Company Name",
      massage: "I purchased a phone from an e-commerce site, and this courier service provider assisted me in getting it delivered to my home. I received my phone within one day, and I was really satisfied with their service when I received it. They are really quick and dependable. They give me the option of real-time delivery status, which allows me to track the progress of my goods delivery. I get a lot of questions from call center support and key account managers. They come highly recommended. Confidently say that they are really reliable.",
      rating: 3.5,
    },
    {
      name: "John Doe",
      review: "Fantastic service!",
      image: img,
      position: "CEO, Company Name",
      massage: "I purchased a phone from an e-commerce site, and this courier service provider assisted me in getting it delivered to my home. I received my phone within one day, and I was really satisfied with their service when I received it. They are really quick and dependable. They give me the option of real-time delivery status, which allows me to track the progress of my goods delivery. I get a lot of questions from call center support and key account managers. They come highly recommended. Confidently say that they are really reliable.",
      rating: 2,
    },
  ];

  return (
    <div className="slider-container max-w-screen-xl mx-auto px-4">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="w-full border rounded-lg p-4 bg-white mx-2">
            <div>
              <h3 className="text-2xl text-[#F95C19] font-bold mb-3">
                {item.review}
              </h3>
              <p className="text-sm md:text-base">
                {
                window.innerWidth > 780 ?  
                item.massage: item.massage.slice(0,200)+"..."
                }
              </p>
            </div>
            <div className="mt-3 flex">
              <div className="gap-2">
                <div className="info">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-500">CEO, Company Name</p>
                </div>
                <div className="rating-star flex items-center gap-1 mt-1">
                  {Array(Math.floor(item.rating)).fill().map((_, i) => (
                    <FaStar key={i} style={{ color: "#F95C19", fontSize: "20px" }} />
                  ))}
                  {item.rating % 1 !== 0 && <FaStarHalfAlt style={{ color: "#F95C19", fontSize: "20px" }} />}
                </div>

              </div>
              <div className="img ml-2">
                <img
                  src={item.image}
                  alt="Avatar"
                  className="w-17 h-17 rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .slick-list {
          overflow: visible;
        }
        .slick-slide {
          padding: 0 10px;
        }
      `}</style>
    </div>
  );
}

export default SliderForWeb;
