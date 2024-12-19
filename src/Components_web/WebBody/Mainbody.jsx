import React, { useEffect, useState } from "react";
import tracking from "../../assets_web/Group (4).png";
import service from "../../assets_web/service icon.png";
import service1 from "../../assets_web/service icon (1).png";
import service2 from "../../assets_web/service icon (2).png";
import service3 from "../../assets_web/service icon (3).png";
import deliveryMan from "../../assets_web/12008 1.png";
import Icon from "../../assets_web/Group 7.png";
import Icon1 from "../../assets_web/Group 7 (1).png";
import Icon2 from "../../assets_web/Group 7 (2).png";
import Icon3 from "../../assets_web/Group 7 (3).png";
import Icon4 from "../../assets_web/Group 7 (4).png";
import partner1 from "../../assets_web/partner logo (1).jpg";
import partner2 from "../../assets_web/partner logo (2).jpg";
import { Container, Row, Col, Card } from "react-bootstrap";
// react icons
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

import "./Mainbody.css";

import Gotop from "../Gotop/Gotop"
import { getWebHome } from "../Api/Webapi";
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
const stats = [
  { name: "total order", value: "12" },
  { name: "total customer", value: "300+" },
  { name: "total delivery", value: "40" },
];
function Mainbody() {
  const [webHome, setWebHome] = useState(null);
  const [services, setservices] = useState([]);

  useEffect(() => {
    const data = async () => {
      const data = await getWebHome()
      setWebHome(data)
    }
    data()
  }, []);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);






  return (
    <>
      <div>
        {
          webHome?.header?.isShow &&
          <div className="w-full relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
            <img
              alt=""
              src={webHome?.header?.bgImage}
              className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
            />
            <div
              aria-hidden="true"
              className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl lg:mx-0">
                <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2] md:leading-[1.4] capitalize">
                  {webHome?.header?.title}
                </h3>
                <p className="mt-4 md:mt-8 text-base md:text-lg lg:text-xl text-gray-300 font-medium">
                  {webHome?.header?.description}
                </p>
              </div>
              <div className="mx-auto mt-6 md:mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-4 md:gap-6 lg:gap-10 text-sm md:text-base font-semibold text-white">
                  {links.map((link) => (
                    <a key={link.name} href={link.href} className="hover:text-blue-400 transition-colors">
                      {link.name} <span aria-hidden="true">&rarr;</span>
                    </a>
                  ))}
                </div>
                <dl className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {webHome?.header?.status?.map((stat) => (
                    <div key={stat.title} className="flex flex-col-reverse gap-1 bg-black/20 p-4 rounded-lg">
                      <dt className="text-sm md:text-base text-gray-300">{stat.title}</dt>
                      <dd className="text-2xl md:text-4xl font-bold text-white">
                        {stat.number}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        }
        {
          webHome?.services?.isShow && (
            <>
              <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24">
                <div className="">
                  <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
                    {webHome?.services?.title}
                  </h1>
                  <div className="flex justify-center mt-3 items-center">
                    <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
                    <img src={tracking} className="text-center" width={"50px"} alt="" />
                    <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 justify-center">
                  {
                    webHome?.services?.data?.map((service) => (
                      <>
                        <div className="demo hover:bg-[#221F92] py-5 px-2 max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group">
                          <div className="flex flex-col items-center">
                            <img
                              className="w-24 h-24 mb-3 group-hover:opacity-75 transition-opacity"
                              src={service.image}
                              alt="service image"
                            />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white group-hover:text-white transition-colors">
                              {service.title}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400 px-14 text-center group-hover:text-white transition-colors">
                              {service.description}
                            </span>
                          </div>
                          <div className="flex justify-end px-4 pt-4">
                            <svg
                              className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ))
                  }

                </div>
              </div>
            </>
          )
        }

        {
          webHome?.deliverySolutions?.isShow && (
            <>
              <div className="mx-auto  my-24">
                <div className="mb-9">
                  <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
                    {webHome?.deliverySolutions?.title}
                  </h1>
                  <div className="flex justify-center mt-3 items-center">
                    <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
                    <img src={tracking} className="text-center" width={"50px"} alt="" />
                    <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
                  </div>
                </div>

                <div className="w-full bg-[#111827] text-white">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="py-20 flex flex-wrap justify-center">
                      <div className="w-full sm:w-1/3 flex justify-center mb-8 sm:mb-0">
                        <div className="w-[80%]">
                          <img src={webHome?.deliverySolutions?.data[0]?.image} alt="" width={"30px"} />
                          <div className="text-[20px] mt-[10px] font-extrabold">
                            B2C Brands
                          </div>
                          <div className="mt-[10px]">
                            Logistics in London is more than moving goods; it’s about building trust and enhancing experiences for your brand and customers. Our team provides personalized support every step of the way.
                          </div>
                          <div className="mt-[25px] text-[#c2ccff] font-semibold text-[15px] flex items-center group hover:text-[#c2ccff] transition ease-in-out delay-150 duration-500">
                            Know More <FaArrowRight className="ml-2 group-hover:ml-4" />
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-1/3 flex justify-center mb-8 sm:mb-0">
                        <div className="w-[80%]">
                          <TbTruckDelivery className="font-medium text-5xl" />
                          <div className="text-[20px] mt-[10px] font-extrabold">
                            Fast Delivery
                          </div>
                          <div className="mt-[10px]">
                            Looking for fast and secure delivery in London? Our courier service guarantees prompt, reliable, and efficient delivery for all your packages, big or small, ensuring your items arrive on time.
                          </div>
                          <div className="mt-[25px] text-[#c2ccff] font-semibold text-[15px] flex items-center group hover:text-[#c2ccff] transition ease-in-out delay-150 duration-500">
                            Know More <FaArrowRight className="ml-2 group-hover:ml-4" />
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-1/3 flex justify-center mb-8 sm:mb-0">
                        <div className="w-[80%]">
                          <IoHomeOutline className="font-medium text-5xl" />
                          <div className="text-[20px] mt-[10px] font-extrabold">
                            Delivery At Home
                          </div>
                          <div className="mt-[10px]">
                            Get your items delivered straight to your doorstep in London with our hassle-free home delivery service. From groceries to electronics and gifts, we bring everything you need quickly and safely.
                          </div>
                          <div className="mt-[25px] text-[#c2ccff] font-semibold text-[15px] flex items-center group hover:text-[#c2ccff] transition ease-in-out delay-150 duration-500">
                            Know More <FaArrowRight className="ml-2 group-hover:ml-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>)
        }





        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-24">
          <div className="">
            <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
              our delivery about
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
              {/* <div className="flex justify-center"> */}
              <img
                src={tracking}
                className="text-center"
                width={"50px"}
                alt=""
              // srcset=""
              />
              {/* </div> */}
              <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
            </div>
          </div>

          <div className="">
            <section id="features" className="md:py-40 xl:py-10">
              <div className="container flex flex-col mx-auto mt-10 space-y-12 sm:px-2 md:space-y-0 md:px-12 md:flex-row">
                <div className="flex-col space-y-12 h-full md:w-1/2">
                  <h2 className="max-w-md text-4xl font-bold text-center lg:mx-0 sm:mx-auto md:text-left">
                    What’s different about Manage?
                  </h2>
                  <p className="max-w-sm text-center text-darkGrayishBlue lg:mx-0 sm:mx-auto md:text-left">
                    Manage provides all the functionality your team needs, without
                    the complexity. Our software is tailor-made for modern digital
                    product teams.
                  </p>
                  <img src={deliveryMan} width={"100%"} alt="" />
                </div>

                <div className="flex flex-col space-y-12 md:px-12 md:w-1/2">
                  <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
                    <div className="rounded-l-full bg-brightRedSuperLight md:bg-transparent">
                      <div className="flex items-center space-x-2">
                        <div className="px-5 py-2 font-bold text-white rounded-full bg-[#221F92] md:py-1">
                          01
                        </div>
                        <h3 className="text-base font-bold md:mb-4 md:hidden">
                          Track company-wide progress
                        </h3>
                      </div>
                    </div>
                    <div>
                      <h3 className="hidden mb-4 text-lg font-bold md:block">
                        Track company-wide progress
                      </h3>
                      <p className="text-darkGrayishBlue lg:mx-0 sm:mx-auto md:text-left">
                        See how your day-to-day tasks fit into the wider vision.
                        Go from tracking progress at the milestone level all the
                        way done to the smallest of details. Never lose sight of
                        the bigger picture again.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
                    <div className="rounded-l-full bg-brightRedSuperLight md:bg-transparent">
                      <div className="flex items-center space-x-2">
                        <div className="px-5 py-2 font-bold text-white rounded-full bg-[#221F92] md:py-1">
                          02
                        </div>
                        <h3 className="text-base font-bold md:mb-4 md:hidden">
                          Advanced built-in reports
                        </h3>
                      </div>
                    </div>
                    <div>
                      <h3 className="hidden mb-4 text-lg font-bold md:block">
                        Advanced built-in reports
                      </h3>
                      <p className="text-darkGrayishBlue lg:mx-0 sm:mx-auto md:text-left">
                        Advanced built-in reports for a courier company in London offer real-time tracking, delivery performance analysis, route optimization, traffic insights, customer feedback, and operational data to enhance efficiency and improve service.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
                    <div className="rounded-l-full bg-brightRedSuperLight md:bg-transparent">
                      <div className="flex items-center space-x-2">
                        <div className="px-5 py-2 font-bold text-white rounded-full bg-[#221F92] md:py-1">
                          03
                        </div>
                        <h3 className="text-base font-bold md:mb-4 md:hidden">
                          Everything you need in one place
                        </h3>
                      </div>
                    </div>
                    <div>
                      <h3 className="hidden mb-4 text-lg font-bold md:block">
                        Everything you need in one place
                      </h3>
                      <p className="text-darkGrayishBlue lg:mx-0 sm:mx-auto md:text-left">
                        Courier services across all of London, providing fast, reliable, and efficient delivery solutions. We handle all your needs in one place, ensuring quick and safe transportation throughout the city
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>


        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-8">
          <div className="">
            <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
              our happy achivment
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
              {/* <div className="flex justify-center"> */}
              <img
                src={tracking}
                className="text-center"
                width={"50px"}
                alt=""
              />
              {/* </div> */}
              <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#221F92]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap py-10 justify-between lg:justify-center gap-y-8">
              <div className="w-full sm:w-1/2 md:w-1/4 my-6 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">7K+</h2>
                <h4 className="text-white font-semibold text-lg sm:text-2xl">
                  Branches
                </h4>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 my-6 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  50m+
                </h2>
                <h4 className="text-white font-semibold text-lg sm:text-2xl">
                  Parcel Delivered
                </h4>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 my-6 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">4L+</h2>
                <h4 className="text-white font-semibold text-lg sm:text-2xl">
                  Happy Merchant
                </h4>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 my-6 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  700+
                </h2>
                <h4 className="text-white font-semibold text-lg sm:text-2xl">
                  Positive Reviews
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-14">
          <div className="">
            <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
              why we courier
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
              {/* <div className="flex justify-center"> */}
              <img
                src={tracking}
                className="text-center"
                width={"50px"}
                alt=""
              />
              {/* </div> */}
              <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
            </div>
          </div>

          <div className="">
            <section id="services">
              <div className="mb-24 mt-9 flex flex-col justify-start space-y-10">
                <div className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3">
                  <div className="flex flex-col py-6 xl:p-6">
                    <h2 className="text-4xl font-medium tracking-tight">
                      Need more info?
                      <br />
                      <span className="text-gradient clash-grotesk tracking-normal">
                        I got you.
                      </span>
                    </h2>
                    <p className="mt-2 tracking-tighter text-secondary-foreground">
                      Here are some of the services I offer. If you have any
                      questions, feel free to reach out.
                    </p>
                  </div>
                  {services.map((service) => (
                    <div
                      key={service.service}
                      className="flex flex-col items-start rounded-md bg-[#dbe1ff] p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-[#0000001a] hover:shadow-md"
                    >
                      <div className="my-6 text-primary">
                        <img src={service.icon} width={"50%"} alt="" />
                      </div>
                      <span className="text-lg tracking-tight font-bold text-foreground">
                        {service.service}
                      </span>
                      <span className="mt-2 text-gray-500 tracking-tighter text-muted-foreground">
                        {service.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-14">
          <div className="">
            <h1 className="text-4xl capitalize text-center font-bold tracking-wide">
              our best partner
            </h1>
            <div className="flex justify-center mt-3 items-center">
              <div className="line-left relative w-36 h-[2px] bg-[#221F92] mx-3"></div>
              {/* <div className="flex justify-center"> */}
              <img
                src={tracking}
                className="text-center"
                width={"50px"}
                alt=""
              />
              {/* </div> */}
              <div className="line-right w-36 h-[2px] bg-[#221F92] mx-3 relative"></div>
            </div>
          </div>

          <div className="flex  justify-evenly flex-wrap mt-9 w-full gap-6">
            {[
              partner1,
              partner2,
            ].map((img, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-24px)] rounded-lg border flex justify-center p-5"
              >
                <img src={img} width="150px" alt={`partner-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Gotop />
    </>

  );
}

export default Mainbody;
