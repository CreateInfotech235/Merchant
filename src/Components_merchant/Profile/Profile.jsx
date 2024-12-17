import React, { useEffect, useState } from 'react';

import certificatePlaceholder from '../../assets_mercchant/certi.svg';
import { getMerchantProfile } from '../Api/Profile';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaIdCard, FaEnvelope, FaPen } from 'react-icons/fa';

const ProfilePage = () => {
  const [merchant, setMerchant] = useState({});

  const getMerchant = async () => {
    const res = await getMerchantProfile();
    if (res.status) setMerchant(res.data[0]);
    // console.log(res.data[0]);
  };

  useEffect(() => {
    getMerchant();
  }, []);
  const PROFILEdefoltimg = 'data:image/jpeg;base64,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'
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
                src={merchant.image || PROFILEdefoltimg}
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
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Company Registration Information</h2>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <FaIdCard className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Company Register Number</p>
                  <p className="font-medium">{merchant.medicalCertificateNumber || 'N/A'}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 mb-2">Company Register Document</p>
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
