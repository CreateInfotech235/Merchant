import { useState, useEffect } from "react";
import { getWebLandingPage, updateWebLandingPage } from '../webApi/webApi';
import { convertImageToBase64 } from "./convertImageToBase64";
import { CiImageOn, CiImageOff } from "react-icons/ci";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const Fastlandingpage = () => {
    // State initialization
    const [menuData, setMenuData] = useState({
        AutoTyperlist: [],
        subTitle: "",
        description: "",
        bgImage: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bgImagetoggle, setBgImagetoggle] = useState(true); // New state for image type

    // Fetch menu data from API
    const fetchMenuData = async () => {
        console.log("fetchMenuData");
        try {
            setLoading(true);
            const response = await getWebLandingPage();
            console.log("response", response);
            if (response.status === 200) {
                setMenuData({
                    subTitle: response?.webLandingPage?.subTitle,
                    description: response?.webLandingPage?.description,
                    AutoTyperlist: response?.webLandingPage?.AutoTyperlist,
                    bgImage: response?.webLandingPage?.bgImage,
                });
            }
        } catch (err) {
            setError("Failed to fetch menu data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuData();
    }, []);

    const handleLogoChange = (field, value) => {
        setMenuData({
            ...menuData,
            logo: {
                ...menuData?.logo,
                [field]: value,
            },
        });
    };

    const handleFaviconChange = (field, value) => {
        setMenuData({
            ...menuData,
            favicon: {
                ...menuData?.favicon,
                [field]: value,
            },
        });
    };

    const handleMenuItemChange = (field, value, index) => {
        if (index == undefined) {
            setMenuData({
                ...menuData,
                [field]: value,
            });
        } else {
            const updatedMenuList = menuData?.AutoTyperlist.map((item, i) => i === index ? value : item);
            setMenuData({
                ...menuData,
                AutoTyperlist: updatedMenuList,
            });
        }
    };

    const handleButtonChange = (field, value) => {
        setMenuData({
            ...menuData,
            button: {
                ...menuData?.button,
                [field]: value,
            },
        });
    };

    const handleDefaultProfileImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertImageToBase64(file);
            setMenuData({
                ...menuData,
                bgImage: base64,
            });
        }
    };


    // Logo image upload handler
    const handleLogoImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertImageToBase64(file);
                handleLogoChange("img", base64);
            } catch (err) {
                setError("Error converting image to base64");
                console.error(err);
            }
        }
    };

    // Favicon image upload handler
    const handleFaviconImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertImageToBase64(file);
                handleFaviconChange("img", base64);
            } catch (err) {
                setError("Error converting image to base64");
                console.error(err);
            }
        }
    };

    // Add new menu item
    const handleAddtypingtext = () => {
        setMenuData({
            ...menuData,
            AutoTyperlist: [...menuData?.AutoTyperlist, ""],
        });
    };

    // Remove menu item
    const handleRemoveMenuItem = (index) => {
        const updatedMenuList = menuData?.AutoTyperlist.filter((_, i) => i !== index);
        setMenuData({
            ...menuData,
            AutoTyperlist: updatedMenuList,
        });
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("menuData", menuData);
        try {
            setLoading(true);
            console.log("menuData", menuData);
            const response = await updateWebLandingPage(menuData);
            if (response) {
                alert("Menu data saved successfully!");
                fetchMenuData();
            }
        } catch (err) {
            setError("Error saving data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Trigger file input for logo
    const triggerLogoFileInput = () => {
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "file";
        hiddenInput.accept = "image/*";
        hiddenInput.onchange = handleLogoImageUpload;
        hiddenInput.click();
    };

    // Trigger file input for favicon
    const triggerFaviconFileInput = () => {
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "file";
        hiddenInput.accept = "image/*";
        hiddenInput.onchange = handleFaviconImageUpload;
        hiddenInput.click();
    };

    if (loading) {
        return (
            <div className=" bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse space-y-8 w-full px-12">
                    {/* Skeleton loading UI */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="flex gap-6">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex gap-6 mt-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex gap-6 mt-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div>
            <div className=" bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Landing Page Settings</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    <div>
                        {bgImagetoggle ? (
                            <div className="">
                                <h3 className="text-xl font-semibold mb-4">bgImage</h3>
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="bgImage"
                                            onChange={(e) => handleDefaultProfileImageChange(e)}
                                            className="w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <div className="w-[200px] h-[200px] text-center border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400">
                                            {menuData?.bgImage ? (
                                                <label htmlFor="bgImage" className="cursor-pointer w-[200px] h-[200px] flex items-center justify-center">
                                                    <img src={menuData?.bgImage} alt="Default Profile Image" className="max-w-[200px] max-h-[200px] object-contain rounded-lg" />
                                                </label>
                                            ) : (
                                                <label htmlFor="bgImage" className="cursor-pointer">
                                                    <span className="text-gray-500 text-sm">Upload bgImage</span>
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>) :
                            (<div>
                                <h3 className="text-xl font-semibold mb-4">bgImage url</h3>
                                <input type="text" value={menuData?.bgImage} onChange={(e) => handleMenuItemChange("bgImage", e.target.value)} />
                            </div>)}
                        <div>
                            <div className="w-[150px] flex justify-between mt-4">
                                <button type="button" className={` text-blue-500 px-4 py-2 rounded-lg shadow-sm ${bgImagetoggle ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`} onClick={() => setBgImagetoggle(true)} >
                                    <CiImageOn className="text-2xl" />
                                </button>
                                <button type="button" className={` text-blue-500 px-4 py-2 rounded-lg shadow-sm ${bgImagetoggle ? "bg-gray-500 text-white" : "bg-blue-500 text-white"}`} onClick={() => setBgImagetoggle(false)}>
                                    <CiImageOff className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <ToggleButtonGroup
                        value={bgImagetoggle}
                        exclusive
                        onChange={(e)=>setBgImagetoggle(e.target.value)}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="true" aria-label="left aligned">
                            <CiImageOn />
                        </ToggleButton>
                        <ToggleButton value="false" aria-label="centered">
                            <div className="flex items-center gap-2">
                                Url
                                <CiImageOff />
                            </div>
                        </ToggleButton>
                    </ToggleButtonGroup> */}

                    <div>
                        <div>

                            <h3 className="text-xl font-semibold mb-4">subTitle</h3>
                            <input
                                type="text"
                                value={menuData?.subTitle}
                                onChange={(e) => handleMenuItemChange("subTitle", e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">description</h3>
                            <input
                                type="text"
                                value={menuData?.description}
                                onChange={(e) => handleMenuItemChange("description", e.target.value)}
                            />
                        </div>
                    </div>



                    {/* Menu Items Section */}
                    <div className="mb-8 col-span-2">
                        <h3 className="text-xl font-semibold mb-4">Menu Items</h3>
                        {menuData?.AutoTyperlist?.map((item, index) => (
                            <div
                                key={index}
                                className="flex  flex-col md:flex-row gap-4 mb-4 items-end bg-gray-50 p-4 rounded-lg border"
                            >
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">typing text</label>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleMenuItemChange("AutoTyperlist", e.target.value, index)}
                                        className="w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMenuItem(index)}
                                    className="text-red-500 text-sm mt-2 md:mt-0"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddtypingtext}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm"
                        >
                            Add Typeing text
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full col-span-2 py-3 rounded-lg text-white shadow-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};



export default Fastlandingpage;
