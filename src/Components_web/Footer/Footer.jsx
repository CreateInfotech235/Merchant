import React, { useEffect, useState } from "react";
import HeaderLogo from "../../assets_web/logo-new.png";
import { data, Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

function Footer({ navdata, SocialMediadata,footerdata,getfooterdata }) {
  const [navLinks, setnavLinks] = useState([]);
  const [mediaLink, setmediaLink] = useState([]);
  const [footer, setfooter] = useState([]);
  const [logo, setlogo] = useState("")


useEffect(()=>{
 getfooterdata()
},[])


useEffect(() => {
  console.log("footer", footerdata?.data?.webFooter)
  setfooter(footerdata)
}, [footerdata])




  useEffect(() => {
    const navLinks2 = navdata?.data?.webNavbar?.menuList?.map(item => ({
      to: item.path,
      text: item.name
    }));
    setlogo(navdata?.data?.webNavbar?.logo?.img)
    setnavLinks(navLinks2)
  }, [navdata])

  useEffect(() => {
    setmediaLink(SocialMediadata?.webSocialMedia?.socialMedia)
  }, [SocialMediadata])



  const contactLink = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-[#ff6600]" />,
     type: "LOCATION",
     startpoint: "",
    },
    {
      icon: <FaEnvelope className="text-2xl text-[#ff6600]" />,
      type: "EMAIL",
      startpoint: "mailto:",
    },
    {
      icon: <FaPhoneAlt className="text-2xl text-[#ff6600]" />,
      type: "PHONE",
      startpoint: "tel:",
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
              <img src={logo||HeaderLogo} alt="Logo" className="h-[70px] md:h-[80px]" />
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 grid grid-cols-2 sm:grid-cols-4 gap-6  text-center md:text-left items-start">
            {/* Company */}
            <div>
              <h3 className="text-lg font-bold">Main Menu</h3>
              <ul className="mt-4 space-y-2">
                {navLinks?.map((link, index) => (
                  <li key={index}>
                    <Link to={link?.to} className="hover:text-gray-600">
                      {link?.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold">Resources</h3>
              <ul className="mt-4 space-y-2">
                {footer?.data?.webFooter?.Resources?.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className="hover:text-gray-600">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-lg font-bold">Follow Us</h3>
              <ul className="mt-4 space-y-2">
                {mediaLink?.map((link, index) => (
                  <li key={index} className="flex">
                    <Link to={link.link} className="hover:text-gray-600 mx-2 flex items-center gap-1" target="_blank">
                      <img src={`https://logo.clearbit.com/${new URL(link.link).hostname}`} 
                           alt={link.name} 
                           className="w-7 h-7 rounded-full shadow" 
                           onError={(e) => { e.target.src = link.icon }} 
                      />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}

              </ul>
            </div>

            <div className="flex justify-center items-center flex-col ">
              <h3 className="text-lg font-bold">Contact Us</h3>
              <ul className="mt-4 space-y-2  w-full" >
               
               {
                footer?.data?.webFooter?.ContactUs?.map((link, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {contactLink.find(item => item.type === link?.type)?.icon}
                    <Link to={contactLink.find(item => item.type === link?.type)?.startpoint + link?.link.replace(/ /g, "")} className="hover:text-gray-600" style={{ wordBreak: "break-all" }} target="_blank">
                      {link?.data}
                    </Link>
                  </li>
                ))
               }
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600 text-xs md:text-sm">
          <Link to={footer?.data?.webFooter?.copyright?.link} className="hover:text-gray-800">
          {footer?.data?.webFooter?.copyright?.text}
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
