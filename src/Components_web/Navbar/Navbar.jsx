import { useState } from "react";
import HeaderLogo from "../../assets_web/logoCreateBlack.png";
import LoginImg from "../../assets_web/post job.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileIcon from "../../assets_mercchant/profile.png";
import { MdDashboardCustomize } from "react-icons/md";
import Button from "./Button";

function Navbar({ Login, userData }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(userData);
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


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("merchnatId");
    localStorage.removeItem("userData");
    setIsProfileMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
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
            {Login ? (
              <div className="navbar-option p-2 position-relative flex items-center">
                <Link to="/Merchant-dashboard" className=" flex items-center">
                  <Button />
                  {/* <MdDashboardCustomize className="text-white text-2xl md:text-3xl" />
                  <span className="text-white ml-1 text-sm hidden md:inline flex-none group-hover:flex">Dashboard</span> */}
                </Link>
                {
                  userData?.image ? (
                    <img
                      src={userData.image}
                      alt="User Profile"
                      onClick={handleProfileClick}
                      className="h-[50px] w-[50px] md:h-[65px] md:w-[65px] lg:h-[70px] lg:w-[70px] rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <img
                      src={profileIcon}
                      alt="User Profile"
                      onClick={handleProfileClick}
                      className="h-[50px] w-[50px] md:h-[65px] md:w-[65px] lg:h-[70px] lg:w-[70px] rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  )
                }

                {isProfileMenuOpen && (
                  <div
                    className="profile-menu shadow position-absolute bg-white"
                  >
                    <ul className="list-unstyled m-0">
                      <li className="p-2" onClick={handleNavigateToProfile}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-5 w-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        Profile
                      </li>
                      <li className="p-2" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-5 w-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="flex items-center text-gray-900 hover:text-blue-700 lg:px-3 md:px-2 px-2 py-1 ml-5">
                  <img src={LoginImg} className="h-6 w-6 mr-1" alt="" />
                  <span className="whitespace-nowrap">Login</span>
                </Link>
                <Link to="/register" className="bg-blue-700 text-white px-[10px] py-[5px] md:px-[20px] md:py-[7px] rounded-lg hover:bg-blue-800 whitespace-nowrap ml-5">
                  Register
                </Link>
              </>
            )}

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
