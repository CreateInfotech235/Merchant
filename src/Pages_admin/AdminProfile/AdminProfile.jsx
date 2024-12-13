import React, { useEffect, useState } from "react";
import "./AdminProfile.css";
import defaultProfileImage from "../../assets_admin/profile.svg";
import { getAdminProfile, updateAdminProfile } from "../../Components_admin/Api/Admin";
import { Spinner } from "react-bootstrap";
import DotsLoader from "../DotsLoader/DotsLoader";

const ProfilePage = () => {
  const [adminData, setAdminData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    adminId: "",
    name: "",
    profileImage: "",
    email: "",
    contactNumber: "",
    countryCode: "",
  });

  const fetchAdminData = async () => {
    const adminData = await getAdminProfile();
    if (adminData.status) {
      setAdminData(adminData.data);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    setFormData({ ...adminData });
  }, [adminData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateData = async () => {
    const response = await updateAdminProfile(formData);
    if (response.status) {
      fetchAdminData();
    }
    setIsLoading(false);
    setIsUpdating(false);
  };


  const isFormChanged = () => {
    return JSON.stringify(formData) !== JSON.stringify(adminData);
  };

  return (
    <div className="profile-page">
      <div className="w-full h-full bg-white p-4 rounded-lg">
        <form>
          {/* Profile Image */}
          <div className="form-group profile-image-container">
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              disabled={!isUpdating}
            />
            <label htmlFor="profileImage">
              <div className="profile-image-wrapper">
                <img
                  src={formData.profileImage || defaultProfileImage}
                  alt="Profile"
                  className="profile-image-preview"
                  style={{ opacity: !isUpdating ? 0.9 : 1 }}
                />
              </div>
            </label>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "contactNumber", "countryCode"].map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isUpdating}
                  className={`input-field ${!isUpdating ? "opacity-90" : "opacity-100"}`}
                />
              </div>
            ))}
          </div>

          {/* Save and Edit Buttons */}
          <div className="w-full h-[50px] rounded-lg overflow-hidden flex justify-between">
            {isUpdating ? (
              <>
                <div className="w-[100px] bg-green-500 h-full " style={{ opacity: !isFormChanged() ? 0.5 : 1 }} >

                </div>
                <button
                  type="button"
                  className={`bg-green-500 w-full  h-full p-2 text-white ${!isFormChanged() ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (isFormChanged()) {
                      setIsLoading(true);
                      updateData();
                    }
                  }}
                  disabled={!isFormChanged()}
                >
                  {isLoading ? <>  <div className="h-full flex justify-center items-center">  Loading <DotsLoader /></div></> : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="bg-red-500 w-[100px] h-full p-2 text-white"
                  onClick={() => { setIsUpdating(false); setFormData({ ...adminData }); }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-green-500 w-full h-full p-2 text-white"
                onClick={() => setIsUpdating(true)}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
