import { useState } from "react";
import HeaderLogo from "../../assets_web/logoCreateBlack.png";
import LoginImg from "../../assets_web/post job.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/pricing", text: "Pricing" },
    { to: "/tracking", text: "Tracking" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" }
  ];

  const getLinkClass = (path, isMobile = false) => {
    const baseClass = `${isMobile ? 'block ' : ''}px-${isMobile ? '3' : '2'} py-2 text-gray-900 hover:text-blue-700`;
    return `${baseClass} ${location.pathname === path ? 'text-blue-700 font-bold' : ''}`;
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={HeaderLogo} className="h-[70px] md:h-[90px]" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex lg:space-x-8 md:space-x-4">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className={getLinkClass(link.to)}>
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Login/Register Section */}
          <div className="flex items-center lg:space-x-4 md:space-x-2">
            <Link to="/login" className="flex items-center text-gray-900 hover:text-blue-700 lg:px-3 md:px-2 px-2 py-1 ml-5">
              <img src={LoginImg} className="h-6 w-6 mr-1" alt="" />
              <span className="whitespace-nowrap">Login</span>
            </Link>
            <Link to="/register" className="bg-blue-700 text-white px-[10px] py-[5px] md:px-[20px] md:py-[7px] rounded-lg hover:bg-blue-800 whitespace-nowrap ml-5">
              Register
            </Link>
            
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ml-1 p-2 rounded-md text-gray-700 hover:text-blue-700 focus:outline-none">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'h-full' : 'h-0'} overflow-hidden transition-all ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={getLinkClass(link.to, true)}
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
