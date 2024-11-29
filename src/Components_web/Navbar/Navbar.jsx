import React from "react";
import HeaderLogo from "../../assets_web/logoCreateBlack.png";
import LoginImg from "../../assets_web/post job.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isActive = location.pathname;

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img width={"100%"} src={HeaderLogo} className="h-24" alt="Flowbite Logo" />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ul className="flex flex-col p-4 md:p-0 font-medium rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <div className="flex items-center">
                <div className="mr-2"><img src={LoginImg} width={"100%"} alt="" /></div>
                <Link
                  to="/login"
                  className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent ${
                    isActive === '/login' ? 'text-[rgb(26,86,219)]  rounded-none font-bold' : ''
                  } md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                  aria-current="page"
                >
                  Login
                </Link>
              </div>
            </li>
            <li>
              <Link
                to="/register"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent ${
                  isActive === '/register' ? 'text-[rgb(26,86,219)] rounded-none font-bold' : ''
                } md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                aria-current="page"
              >
                Register
              </Link>
            </li>
          </ul>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0  font-medium rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:p-0 md:dark:text-blue-500 ${
                  isActive === '/' ? 'text-[rgb(26,86,219)] rounded-none font-bold' : ''
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                  isActive === '/pricing' ? 'text-[rgb(26,86,219)] rounded-none font-bold' : ''
                } md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/tracking"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                  isActive === '/tracking' ? 'text-[rgb(26,86,219)] rounded-none font-bold' : ''
                } md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                Tracking
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                  isActive === '/about' ? 'text-[rgb(26,86,219)] rounded-none font-bold' : ''
                } md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                  isActive === '/contact' ? 'text-[rgb(26,86,219)] rounded-none font-bold' : ''
                } md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
