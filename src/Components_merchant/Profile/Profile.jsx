import React, { useEffect, useState } from 'react';
import './Profile.css';
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
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={merchant.image || profilePlaceholder}
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">
          {merchant.name || `${merchant.firstName || ''} ${merchant.lastName || ''}`}
        </h2>
        <p className="profile-email">{merchant.email}</p>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <label>Contact Number:</label>
          <span className="ms-3">{merchant.contactNumber || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Address:</label>
          <span className="ms-3">{merchant?.address?.street || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Postcode:</label>
          <span className="ms-3">{merchant?.address?.postalCode || '-'}</span>
        </div>
        <div className="detail-item">
          <label>City:</label>
          <span className="ms-3">{merchant?.address?.city || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Country:</label>
          <span className="ms-3">{merchant?.address?.country || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Medical Certificate Number:</label>
          <span className="ms-3">{merchant.medicalCertificateNumber || 'N/A'}</span>
        </div>
        <div className="detail-item certificate-container">
          <label>Medical Certificate:</label>
          <img
            src={merchant.medicalCertificate || certificatePlaceholder}
            alt="Medical Certificate"
            className="certificate-image"
          />
        </div>
      </div>
      <div className="profile-actions">
        <Link 
        to={{pathname : "/update-profile" }}
        state={{merchant}}
        className="update-profile-btn">
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
