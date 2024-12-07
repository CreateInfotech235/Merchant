import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets_admin/search.png";
import add from "../../assets_admin/add.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";
import locationimg from "../../assets_admin/locationimg.png";
import show from "../../assets_admin/show.png";
import { getAllCustomers } from "../../Components_admin/Api/Customer";
import CutomerInfoModal from "./CustomerInfoModal";


const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [themeMode, setThemeMode] = useState("light");

    useEffect(() => {
        if (themeMode === "dark") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [themeMode]);

    const toggleThemeMode = () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const fetchCustomers = async () => {
        const response = await getAllCustomers();
        if (response.status) {
            setCustomers(response.data);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter((customer) => {
        const query = searchQuery.toLowerCase();
        return (
            customer.name.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query) ||
            customer.country.toLowerCase().includes(query) ||
            customer.city.toLowerCase().includes(query)
        );
    });

    const handleLocationClick = (coordinates) => {
        if (coordinates && coordinates.length === 2) {
            setSelectedLocation(coordinates);
            setIsMapModalOpen(true);
        } else {
            console.error("Invalid location coordinates");
        }
    };

    const handleShowInfo = (customer) => {
        setSelectedCustomer(customer);
        setIsInfoModalOpen(true);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="d-flex justify-content-end align-items-center">
                <button onClick={toggleThemeMode} className="btn btn-dark">
                    Toggle {themeMode === "light" ? "Dark" : "Light"} Mode
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center nav-bar pb-3">
                <div className="navbar">
                    <div className="navbar-options d-flex">
                        <input
                            type="search"
                            className="search-btn rounded-start-4 p-3"
                            placeholder="Search customers"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="search-img rounded-end-4 border-0">
                            <img src={searchIcon} className="search" alt="search icon" />
                        </button>
                    </div>
                </div>
                <div>
                    <Link to="/add-customer">
                        <button className="btn text-white" style={{ background: "#D65246" }}>
                            <img src={add} className="pe-2" alt="Add" />
                            Add Customer
                        </button>
                    </Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table-borderless w-100 text-center bg-light" style={{ fontSize: "12px" }}>
                    <thead className="text-light" style={{ background: "#253A71" }}>
                        <tr>
                            <th className="p-3">Customer ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Postcode</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center p-3">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            filteredCustomers.map((customer, index) => (
                                <tr key={index}>
                                    <td className="p-3">{customer._id}</td>
                                    <td className="p-3">{customer.name}</td>
                                    <td className="p-3">{customer.address}</td>
                                    <td className="p-3">{customer.email}</td>
                                    <td className="p-3">{customer.postCode}</td>
                                    <td className="table-head2">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleLocationClick([
                                                        customer.location?.coordinates[0],
                                                        customer.location?.coordinates[1],
                                                    ])
                                                }
                                            >
                                                <img src={locationimg} alt="Location" />
                                            </button>
                                            <button
                                                className="show-btn m-2"
                                                onClick={() => handleShowInfo(customer)}
                                            >
                                                <img src={show} alt="Show" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        

            {/* Customer Info Modal */}
            {isInfoModalOpen && selectedCustomer && (
                <CutomerInfoModal
                    customer={selectedCustomer}
                    onHide={() => setIsInfoModalOpen(false)} // Close the modal on hide
                />
            )}
        </>
    );
};

export default Customers;
