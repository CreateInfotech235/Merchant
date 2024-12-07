// ProfilePage.jsx
import React, { useState } from "react";
import "./AdminProfile.css";
import defaultProfileImage from "../../assets_admin/profile.svg"; // Add this default image to your assets

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    adminId: "",
    name: "",
    profileImage: "",
    email: "",
    contactNumber: "",
    countryCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form Data:", formData);
  };

  return (
    <div className="profile-page">
      <h1>Admin Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group profile-image-container">
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="profile-image-wrapper">
            <img
              src={formData.profileImage || defaultProfileImage}
              alt="Profile"
              className="profile-image-preview"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryCode">Country Code</label>
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
