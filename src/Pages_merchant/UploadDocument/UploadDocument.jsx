import React, { useState } from "react";
import { Link } from "react-router-dom";
import add from "../../assets_mercchant/add.png";
import searchIcon from '../../assets_mercchant/search.png';
import certi1 from '../../assets_mercchant/certi1.svg'
import certi2 from '../../assets_mercchant/certi2.svg'

import certi3 from '../../assets_mercchant/certi3.svg'
import certi4 from '../../assets_mercchant/certi4.svg'
import certi5 from '../../assets_mercchant/certi5.svg'
import certi6 from '../../assets_mercchant/certi6.svg'

import DisableUser from "../../../../dashboard/src/Components/DisableUser/DisableUser";

const UploadDocument = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 10;
    const [showModel, setShowModel] = useState(false);

    // Example documents data with image references
    const documents = [
        { id: 1, name: "Document 1", image: certi1 },
        { id: 2, name: "Document 2", image: certi2  },
        { id: 2, name: "Document 3", image: certi3  },
        { id: 2, name: "Document 4", image: certi4  },
        { id: 2, name: "Document 5", image: certi5  },
        { id: 2, name: "Document 6", image: certi6  },
        // Add more documents as needed
    ];

    const closeModel = () => setShowModel(false);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page when search term changes
    };

    // Function to filter documents based on search term
    const filteredDocuments = documents.filter((document) =>
        document.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-100">
            <div className="d-flex justify-content-between py-3">
                <button className="delete">Delete</button>
                <Link to="/add-document">
                    <button type="button" className="btn text-light" style={{ background: "#D65246" }}>
                        <img src={add} alt="Add" className="icon" />
                        Add Document
                    </button>
                </Link>
            </div>
            <div className="search-container mb-3 d-flex align-items-center">
                <input
                    type="search"
                    className="search-btn border-1 rounded-start-4 p-3"
                    placeholder="Search document"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-img rounded-end-4 border-0">
                    <img src={searchIcon} className="search" alt="search icon" />
                </button>
            </div>
            {showModel && (
                <DisableUser show={showModel} close={closeModel} />
            )}
            <div class="w-75 m-5">
                <ul className="document-list d-flex gap-5">
                    {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((document) => (
                            <li key={document.id} className="document-item list-unstyled">
                                <img src={document.image} alt={document.name} className="document-image" />
                               
                            </li>
                        ))
                    ) : (
                        <li>No documents found</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UploadDocument;
