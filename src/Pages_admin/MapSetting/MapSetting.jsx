import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_admin/add.png";
import styled from "styled-components";
import { getMapApi, postMapApi, updateMapApi } from "../../Components_admin/Api/MapApi";

const StyledWrapper = styled.div`
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 62px;
    height: 35px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    background: #fff;
    transition: 0.4s;
    border-radius: 30px;
    border: 1px solid #ccc;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.9em;
    width: 1.9em;
    border-radius: 16px;
    left: 1.2px;
    top: 0;
    bottom: 0;
    background-color: white;
    box-shadow: 0 2px 5px #999999;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #5fdd54;
    border: 1px solid transparent;
  }

  input:checked + .slider:before {
    transform: translateX(1.5em);
  }
`;

function MapSetting() {
  const [apiKey, setApiKey] = useState("");
  const [data, setData] = useState(null); // Use `null` to indicate no data initially

  const handleInputChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      alert("Please enter a valid API key.");
      return;
    }

    try {
      const response = await postMapApi({ apiKey });
      if (response.status) {
        setApiKey("");
        fetchApidata(); // Refresh data after submission
      } else {
        alert("Failed to submit the API Key. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting API key:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const fetchApidata = async () => {
    try {
      const response = await getMapApi();
      if (response.status) {
        setData(response.data[0]); // Assuming the response contains the data in an array
      } else {
        alert("Failed to fetch data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleToggleStatus = async () => {
    try {
      const updatedStatus = !data.status; // Toggle current status
      const response = await updateMapApi({ id: data._id ,mapKey : data.mapKey , status: updatedStatus }); // Send updated status to API
      if (response.status) {
        setData((prevData) => ({ ...prevData, status: updatedStatus })); // Update local state
        console.log(`Status updated to: ${updatedStatus ? "ON" : "OFF"}`);
      } else {
        alert("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    fetchApidata();
  }, []);

  return (
    <div>
      <div className="min-h-[calc(100vh-187px)]">
        <div className="d-flex justify-content-end align-items-center nav-bar pb-3">
          <div>
            <Link to="/add-customer-admin">
              <button
                className="btn text-white flex items-center"
                style={{ background: "#D65246" }}
              >
                <img src={add} className="pe-2" alt="Add" />
                Add Google map api
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-gray-700">
                Enter Google Maps API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded"
                placeholder="API Key"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn text-white"
                style={{ background: "#D65246" }}
              >
                Submit API Key
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-center">API Key</h2>
          {data ? (
            <div className="flex justify-center mt-4">
              <table className="table-auto border-collapse border border-gray-300 w-3/4">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">#</th>
                    <th className="border border-gray-300 px-4 py-2">API Key</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      1
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data.mapKey}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <StyledWrapper>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={data.status}
                            onChange={handleToggleStatus}
                          />
                          <span className="slider" />
                        </label>
                      </StyledWrapper>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center mt-4 text-gray-500">
              No API key has been added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapSetting;
