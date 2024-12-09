import React, { useState, useEffect } from 'react';
import { FaBox, FaShippingFast, FaCheckCircle, FaTruck, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Tracking({ Login, setLogin  }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Login === true) {
      const storedTrackingNumber = localStorage.getItem("trackingNumber");
      if (storedTrackingNumber) {
        setTrackingNumber(storedTrackingNumber);
        handleTrackingSearch();
      }
    }
  }, [Login]);

  const handleTrackingSearch = () => {
    // Mock tracking status - replace with actual API call
    setTrackingStatus({
      status: 'in_transit',
      location: 'Mumbai, India', 
      timestamp: new Date().toLocaleString(),
      estimatedDelivery: '2024-02-01',
      currentStep: 2,
      messages: [
        {
          sender: 'Delivery Agent',
          message: 'Package has been picked up and is on the way',
          time: '10:30 AM'
        },
        {
          sender: 'System', 
          message: 'Package arrived at Mumbai sorting facility',
          time: '2:45 PM'
        }
      ]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Login === true) {
      localStorage.removeItem("trackingNumber");
      handleTrackingSearch();
    } else {
      localStorage.setItem("trackingNumber", trackingNumber);
      const confirm = window.confirm("You need to login first. Do you want to proceed to login page?");
      if (confirm) {
        navigate("/login");
      }
    }
  };

  const steps = [
    {
      icon: <FaBox className="text-xl" />,
      title: 'Order Placed',
      description: 'Your order has been placed successfully'
    },
    {
      icon: <FaTruck className="text-xl" />, 
      title: 'Order Picked Up',
      description: 'Package has been picked up by courier'
    },
    {
      icon: <FaShippingFast className="text-xl" />,
      title: 'In Transit',
      description: 'Your package is on the way'
    },
    {
      icon: <FaCheckCircle className="text-xl" />,
      title: 'Delivered',
      description: 'Package has been delivered'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#221F92] mb-6 tracking-tight">
            Track Your Package
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed with real-time tracking and instant delivery updates at your fingertips
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#221F92] to-[#1a1873] rounded-2xl shadow-2xl p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative flex-1 w-full">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter your tracking ID here..."
                  className="w-full h-14 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 text-lg transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-white text-[#221F92] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <FaSearch className="text-xl" />
                Track Now
              </button>
            </div>
          </form>
        </div>

        {trackingStatus && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-8">
              <div className="flex justify-between items-center relative">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${index < trackingStatus.currentStep ? 'bg-green-500 text-white' :
                        index === trackingStatus.currentStep ? 'bg-[#221F92] text-white' :
                          'bg-gray-200 text-gray-400'}`}>
                      {step.icon}
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-medium text-gray-800">{step.title}</div>
                      <div className="text-xs text-gray-500 mt-1 max-w-[120px]">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 -z-10">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${(trackingStatus.currentStep - 1) * 33.33}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTruck className="text-[#221F92]" />
                    <h3 className="font-medium text-gray-800">Current Status</h3>
                  </div>
                  <p className="text-[#221F92] font-medium">{trackingStatus.status === 'in_transit' ? 'In Transit' : trackingStatus.status}</p>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaMapMarkerAlt className="text-[#221F92]" />
                    <h3 className="font-medium text-gray-800">Location</h3>
                  </div>
                  <p className="text-[#221F92] font-medium">{trackingStatus.location}</p>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaClock className="text-[#221F92]" />
                    <h3 className="font-medium text-gray-800">Last Updated</h3>
                  </div>
                  <p className="text-[#221F92] font-medium">{trackingStatus.timestamp}</p>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendarAlt className="text-[#221F92]" />
                    <h3 className="font-medium text-gray-800">Expected Delivery</h3>
                  </div>
                  <p className="text-[#221F92] font-medium">{trackingStatus.estimatedDelivery}</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">Delivery Updates</h3>
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="flex items-center gap-1 text-[#221F92] hover:text-[#1a1873]"
                  >
                    <BsChatDots />
                    <span>{showChat ? 'Hide Chat' : 'Show Chat'}</span>
                  </button>
                </div>

                {showChat && (
                  <div className="space-y-3">
                    {trackingStatus.messages.map((msg, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span className="font-medium">{msg.sender}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="text-gray-800">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tracking;
