import React from "react";
import HeaderLogo from "../../assets_web/logo-new.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mx-auto border border-blue-400">
      <footer className="w-full bg-[#F9F9F9] py-8 px-4 md:px-10 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0">
          {/* Logo and Subscription Form */}
          <div className="w-full md:w-1/3 lg:w-1/4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <img src={HeaderLogo} alt="Logo" className="h-[70px] md:h-[80px]" />
            </div>
            <form className="mt-4">
              <div className="flex flex-col sm:flex-row items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 w-full sm:w-auto py-2 px-4 border border-gray-600 focus:outline-none focus:ring focus:ring-[#1D1D37] text-sm"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 sm:ml-2 py-2 px-6 bg-[#1D1D37] text-white font-bold hover:bg-[#F95C19] text-sm"
                >
                  SUBSCRIBE!
                </button>
              </div>
            </form>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-2/3 lg:w-3/4 text-center md:text-left">
            {/* Company */}
            <div>
              <h3 className="text-lg font-bold text-black">Company</h3>
              <ul className="mt-4 space-y-2">
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

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold text-black">Resources</h3>
              <ul className="mt-4 space-y-2">
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

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-bold text-black">Follow Us</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    <i className="fab fa-facebook"></i>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    <i className="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    <i className="fab fa-youtube"></i>
                    <span>YouTube</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    <i className="fab fa-skype"></i>
                    <span>Skype</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600 text-xs md:text-sm">
          <Link to="/terms-and-conditions">
          All rights Reserved © Your Company, {new Date().getFullYear()}
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
