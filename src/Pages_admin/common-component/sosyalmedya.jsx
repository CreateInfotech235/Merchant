import { useEffect, useState } from "react";
import { convertImageToBase64 } from "./convertImageToBase64";
import { createWebSocialMedia, getWebSocialMedia } from "../webApi/webApi";
const SocialMedia = () => {
  const [menuData, setMenuData] = useState({
    email: "",
    phoneNumber: "",
    socialMedia: [
      {
        icon: "",
        name: "",
        link: "",
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);





  const fetchData = async () => {
    const response = await getWebSocialMedia()
    if (response.status === 200) {
      console.log("response", response.webSocialMedia);
      setMenuData({
        email: response?.webSocialMedia?.email,
        phoneNumber: response?.webSocialMedia?.phoneNumber,
        socialMedia: response?.webSocialMedia?.socialMedia.map((item) => ({
          icon: item?.icon,
          name: item?.name,
          link: item?.link
        }))
      })
    }
  }

  useEffect(() => {
    const data = async () => {
      await fetchData()
    }
    data()
  }, [])



  const handleInputChange = (field, value) => {
    setMenuData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updatedSocialMediaPlatforms = [...menuData?.socialMedia];
    updatedSocialMediaPlatforms[index] = {
      ...updatedSocialMediaPlatforms[index],
      [field]: value,
    };
    setMenuData((prevState) => ({
      ...prevState,
      socialMedia: updatedSocialMediaPlatforms,
    }));
  };

  const handleDefaultImageChange = async (index, e) => {
    const file = e.target.files[0];
    const filetype = file.type;
    if (filetype.startsWith("image/") && file) {
      const base64 = await convertImageToBase64(file);
      setMenuData((prevState) => ({
        ...prevState,
        socialMedia: prevState?.socialMedia?.map((item, i) =>
          i === index ? { ...item, icon: base64 } : item
        ),
      }));
    }
  };

  const handleAddSocialMediaPlatform = () => {
    setMenuData((prevState) => ({
      ...prevState,
      socialMedia: [
        ...prevState.socialMedia,
        { icon: "", name: "", link: "" },
      ],
    }));
  };

  const handleRemoveSocialMediaPlatform = (index) => {
    setMenuData((prevState) => ({
      ...prevState,
      socialMedia: prevState.socialMedia.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting menu data:", menuData);
    try {
      setLoading(true);
      const response = await createWebSocialMedia(menuData);
      if (response.status === 200) {
        alert("Data saved successfully!")
        fetchData()
      }
    } catch (err) {
      setError("Error saving data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Social Media Settings</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="text"
                  value={menuData?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={menuData?.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 col-span-2">
            <h3 className="text-xl font-semibold mb-4">Social Media Platforms</h3>
            {menuData?.socialMedia?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 mb-4 items-end bg-gray-50 p-4 rounded-lg border"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      id={`icon-${index}`}
                      onChange={(e) => handleDefaultImageChange(index, e)}
                      className="w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="w-[100px] h-[100px] text-center border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400">
                      {item.icon ? (
                        <label htmlFor={`icon-${index}`} className="cursor-pointer w-[100px] h-[100px] flex items-center justify-center">
                          <img src={item?.icon} alt="Default Image" className="max-w-[100px] max-h-[100px] object-contain rounded-lg" />
                        </label>
                      ) : (
                        <label htmlFor={`icon-${index}`} className="cursor-pointer">
                          <span className="text-gray-500 text-sm">Upload Default Image</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                  <input
                    type="text"
                    value={item?.name}
                    onChange={(e) => handleSocialMediaChange(index, "name", e.target.value)}
                    className="w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">link</label>
                  <input
                    type="text"
                    value={item?.link}
                    onChange={(e) => handleSocialMediaChange(index, "link", e.target.value)}
                    className="w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSocialMediaPlatform(index)}
                  className="text-red-500 text-sm mt-2 md:mt-0"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSocialMediaPlatform}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm"
            >
              Add Social Media Platform
            </button>
          </div>

          <button
            type="submit"
            className="w-full col-span-2 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SocialMedia;
