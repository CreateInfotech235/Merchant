import React from "react";
import logo from '../../assets_web/logoCreate.png';
import gallery01 from "../../assets_web/gallery-01.jpg";
import gallery02 from "../../assets_web/gallery-02.jpg";
import gallery03 from "../../assets_web/gallery-03.jpg";
import gallery04 from "../../assets_web/gallery-04.jpg";
import gallery05 from "../../assets_web/gallery-05.jpg";
import gallery06 from "../../assets_web/gallery-06.jpg";

function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="bg-[#111827] px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              className="h-24"
              src={logo}
              alt="Company name"
            />
            <p className="text-sm leading-6 text-white">
              Making football look better to the world and a more respectful
              game.
            </p>
            <div className="flex space-x-6">
              {/* Social Media Links */}
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                {/* Facebook Icon */}
              </a>
              <a href="#" className="text-yellow-500 hover:text-gray-500">
                <span className="sr-only">the team is on fire</span>
                {/* Custom Icon */}
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <span className="sr-only">X</span>
                {/* X Icon */}
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                {/* GitHub Icon */}
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">YouTube</span>
                {/* YouTube Icon */}
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-3 xl:grid-cols-3 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Solutions</h3>
                <ul className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Marketing</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Analytics</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Commerce</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Insights</a></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Pricing</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Documentation</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Guides</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">API Status</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">About</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Blog</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Jobs</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Press</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Partners</a></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Claim</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Privacy</a></li>
                  <li><a href="#" className="text-sm leading-6 text-gray-400 hover:text-[#cad0db]">Terms</a></li>
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-1 md:gap-1 text-white">
              <div className="w-full">Gallery</div>
              <div className="flex flex-wrap justify-evenly">
                <div className="w-[125px] h-[125px] md:w-[100px] md:h-[100px] bg-cover my-1 mx-1" style={{ backgroundImage: `url(${gallery01})` }}></div>
                <div className="w-[125px] h-[125px] md:w-[100px] md:h-[100px] bg-cover my-1 mx-1" style={{ backgroundImage: `url(${gallery02})` }}></div>
                <div className="w-[125px] h-[125px] md:w-[100px] md:h-[100px] bg-cover my-1 mx-1" style={{ backgroundImage: `url(${gallery03})` }}></div>
                <div className="w-[125px] h-[125px] md:w-[100px] md:h-[100px] bg-cover my-1 mx-1" style={{ backgroundImage: `url(${gallery04})` }}></div>
                <div className="w-[125px] h-[125px] md:w-[100px] md:h-[100px] bg-cover my-1 mx-1" style={{ backgroundImage: `url(${gallery05})` }}></div>
                <div className="w-[125px] h-[125px] md:w-[100px] md:h-[100px] bg-cover my-1 mx-1" style={{ backgroundImage: `url(${gallery06})` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">&copy; 2020 Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
