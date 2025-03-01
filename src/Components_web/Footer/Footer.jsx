import React from "react";
import HeaderLogo from "../../assets_web/logo-new.png";
import { data, Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

function Footer() {

  const navLinks = [
    { to: "/", text: "Home" },
    // { to: "/pricing", text: "Pricing" },
    // { to: "/tracking", text: "Tracking" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
    { to: "/Services", text: "Services" },
  ];

  const mediaLink = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/"
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/"
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/"
    },
    {
      name: "Twitter",
      link: "https://www.twitter.com/"
    },

  ]



const contactLink = [
  {
    icon: <FaMapMarkerAlt className="text-2xl text-[#ff6600]" />,
    name: "Address",
    link: "https://maps.app.goo.gl/7JMR6G1Sic3ajght8",
    data: "381 Church Lane, Kingsbury, London, NW9 8JB",
  },
  {
    icon: <FaEnvelope className="text-2xl text-[#ff6600]" />,
    name: "Email",
    link: "mailto:info@britishchemist.co.uk",
    data: "info@britishchemist.co.uk",
  },
  {
    icon: <FaPhoneAlt  className="text-2xl text-[#ff6600]" />,
    name: "Contact Us",
    link: "tel:02080040895",
    data: "020 8004 0895",
  },
  
  
]

  return (
    <div className="mx-auto bg-gray-100 text-gray-800">
      <footer className="w-full py-8 px-4 md:px-10 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start  space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="w-full md:w-1/3 lg:w-1/6 text-center md:text-left">
            <div className="flex justify-center md:justify-center">
              <img src={HeaderLogo} alt="Logo" className="h-[70px] md:h-[80px]" />
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 grid grid-cols-1 sm:grid-cols-4 gap-6  text-center md:text-left items-start">
            {/* Company */}
            <div>
              <h3 className="text-lg font-bold">Main Menu</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to} className="hover:text-gray-600">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/faqs" className="hover:text-gray-600">FAQs</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className="hover:text-gray-600">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-gray-600">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="hover:text-gray-600">Cookie policy</Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-lg font-bold">Follow Us</h3>
              <ul className="mt-4 space-y-2">
                {mediaLink.map((link, index) => (
                  <li key={index} className="flex ">
                    <Link to={link.link} className="hover:text-gray-600 mx-2 flex items-center gap-1" target="_blank">
                    <img src={`https://logo.clearbit.com/${new URL(link.link).hostname}`} alt={link.name} className="w-7 h-7 rounded-full" />
                      <span> {link.name}</span>
                    </Link>
                  </li>
                ))}

              </ul>
            </div>
            
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-lg font-bold">Contact Us</h3>
              <ul className="mt-4 space-y-2">
                {contactLink.map((link, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {link.icon} 
                    <Link to={link.link} className="hover:text-gray-600" target="_blank">
                      {link.data}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600 text-xs md:text-sm">
          <Link to="/terms-and-conditions" className="hover:text-gray-800">
            All rights Reserved © Your Company, {new Date().getFullYear()}
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
