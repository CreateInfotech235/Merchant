import React, { useEffect, useState } from 'react';
import profilePlaceholder from '../../assets_mercchant/car.png'; // Placeholder profile image
import certificatePlaceholder from '../../assets_mercchant/certi.svg'; // Placeholder certificate image
import { getMerchantProfile } from '../Api/Profile';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [merchant, setMerchant] = useState({});

  const getMerchant = async () => {
    const res = await getMerchantProfile();
    console.log(res);
    if (res.status) setMerchant(res.data[0]);
  };

  useEffect(() => {
    getMerchant();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg ">
        <div className="relative flex items-center justify-center">
          {/* Profile Image and Name */}
          <div className="absolute top-0 transform -translate-y-1/2">
            <img
              src={merchant.image || profilePlaceholder}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-600 mx-auto shadow-md"
            />
          </div>

          <div className="text-center pt-16 pb-6 px-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {merchant.name || `${merchant.firstName || ''} ${merchant.lastName || ''}`}
            </h2>
            <p className="text-sm text-gray-500">{merchant.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {/* Profile Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <label className="font-semibold text-gray-700">Contact Number:</label>
            <span className="text-gray-600 block mt-1">{merchant.contactNumber || '-'}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <label className="font-semibold text-gray-700">Street:</label>
            <span className="text-gray-600 block mt-1">{merchant?.address?.street || '-'}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <label className="font-semibold text-gray-700">Postcode:</label>
            <span className="text-gray-600 block mt-1">{merchant?.address?.postalCode || '-'}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <label className="font-semibold text-gray-700">City:</label>
            <span className="text-gray-600 block mt-1">{merchant?.address?.city || '-'}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <label className="font-semibold text-gray-700">Country:</label>
            <span className="text-gray-600 block mt-1">{merchant?.address?.country || '-'}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <label className="font-semibold text-gray-700">Medical Certificate Number:</label>
            <span className="text-gray-600 block mt-1">{merchant.medicalCertificateNumber || 'N/A'}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <label className="font-semibold text-gray-700">Medical Certificate:</label>
            <img
              src={merchant.medicalCertificate || certificatePlaceholder}
              alt="Medical Certificate"
              className="w-full max-h-52 mt-2 rounded-lg object-cover shadow-sm"
            />
          </div>
          <div className="text-center pb-6 self-end ">
            {/* Update Profile Button */}
            <Link
              to={{ pathname: "/update-profile" }}
              state={{ merchant }}
              className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:bg-green-700 hover:scale-105"
            >
              Update Profile
            </Link>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProfilePage;
