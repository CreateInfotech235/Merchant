import React from "react";
import HeaderLogo from "../../assets_web/logo-new.png";
import logo from "../../assets_web/logoCreate.png";
import gallery01 from "../../assets_web/gallery-01.jpg";
import gallery02 from "../../assets_web/gallery-02.jpg";
import gallery03 from "../../assets_web/gallery-03.jpg";
import gallery04 from "../../assets_web/gallery-04.jpg";
import gallery05 from "../../assets_web/gallery-05.jpg";
import gallery06 from "../../assets_web/gallery-06.jpg";

function Footer() {
  return (
    // <footer className="bg-white" aria-labelledby="footer-heading">
    <div className=" mx-auto border border-blue-400">
      <footer className="w-full bg-[#F9F9F9] py-8 px-7 lg:px-20">
        {/* <!-- Top Section --> */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-6 sm:space-y-0">
          {/* <!-- Logo --> */}
          <div className="w-1/2">
            <div className="flex-shrink-0">
              <img src={HeaderLogo} alt="Logo" width={100} height={100} />
            </div>

            {/* <!-- Subscription Form --> */}
            <form className="flex items-center justify-start mt-4">
              <div className="flex flex-col w-full items-center">
                <form className="flex  flex-col sm:flex-row items-center w-full">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 w-full sm:w-auto py-2 px-4 sm:mb-0 border border-gray-600 focus:outline-none focus:ring focus:ring-[#1D1D37]"
                  />
                  <button
                    type="submit"
                    className="py-2 px-6 bg-[#1D1D37] text-white font-bold hover:bg-[#F95C19]"
                  >
                    SUBSCRIBE!
                  </button>
                </form>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 text-center sm:text-left mt-8 w-1/2 px-10 ">
            {/* <!-- Company Section --> */}
            <div >
              <h3 className="text-2xl font-bold text-black noto small text-left">
                Company
              </h3>
              <ul className="mt-4 space-y-2 text-left">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    About us
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Resources Section --> */}
            <div>
              <h3 className="text-2xl font-bold text-black noto small text-left">
                Resources
              </h3>
              <ul className="mt-4 space-y-2 text-left">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Cookie policy
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Follow Us Section --> */}
            <div>
              <h3 className="text-2xl font-bold text-black noto small text-left">
                Follow Us
              </h3>
              <ul className="mt-4 space-y-2 text-left">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 space-x-2"
                  >
                    <i className="fab fa-facebook"></i>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 space-x-2"
                  >
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 space-x-2"
                  >
                    <i className="fab fa-linkedin"></i>
                    <span>Linkedin</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 space-x-2"
                  >
                    <i className="fab fa-youtube"></i>
                    <span>Youtube</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 space-x-2"
                  >
                    <i className="fab fa-skype"></i>
                    <span>Skype</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <!-- Middle Section --> */}

        {/* <!-- Bottom Section --> */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600 text-sm">
          All rights Reserved © Your Company, 2021
        </div>
      </footer>
    </div>
    // </footer>
  );
}

export default Footer;
