import React, { useEffect, useState } from 'react';
import profilePlaceholder from '../../assets_mercchant/car.png';
import certificatePlaceholder from '../../assets_mercchant/certi.svg';
import { getMerchantProfile } from '../Api/Profile';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaIdCard, FaEnvelope, FaPen } from 'react-icons/fa';

const ProfilePage = () => {
  const [merchant, setMerchant] = useState({});

  const getMerchant = async () => {
    const res = await getMerchantProfile();
    if (res.status) setMerchant(res.data[0]);
    console.log(res.data[0]);
  };

  useEffect(() => {
    getMerchant();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        
        {/* Profile Card */}
        <div className="relative bg-white rounded-3xl overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-r from-blue-500 to-purple-600 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-20"></div>

          {/* Profile Header */}
          <div className="relative pt-20 pb-8 px-6 text-center">
            <div className="relative inline-block">
              <img
                src={merchant.image || profilePlaceholder}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              />
              <Link
                to={{ pathname: "/update-profile" }}
                state={{ merchant }}
                className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg"
              >
                <FaPen size={14} />
              </Link>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-800">
              {`${merchant.firstName || ''} ${merchant.lastName || ''}`}
            </h1>
            <div className="flex items-center justify-center mt-2 text-gray-600">
              <FaEnvelope className="mr-2" />
              <p>{merchant.email}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
            
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Contact Information</h2>
              
              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <FaPhone className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{merchant.contactNumber || '-'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <FaMapMarkerAlt className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {`${merchant?.address?.street || '-'}, ${merchant?.address?.city || '-'}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {`${merchant?.address?.postalCode || '-'}, ${merchant?.address?.country || '-'}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Medical Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Medical Information</h2>
              
              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <FaIdCard className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Certificate Number</p>
                  <p className="font-medium">{merchant.medicalCertificateNumber || 'N/A'}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 mb-2">Medical Certificate</p>
                <img
                  src={merchant.medicalCertificate || certificatePlaceholder}
                  alt="Medical Certificate"
                  className="w-full h-48 rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6 bg-white text-center">
            <Link
              to={{ pathname: "/update-profile" }}
              state={{ merchant }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:-translate-y-0.5"
            >
              <FaPen className="mr-2" />
              Update Profile
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
