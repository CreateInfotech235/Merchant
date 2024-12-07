import React from 'react'

const Pagination = ({currentPage ,totalPages, handleClick}) => {
    
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map((number) => (
            <li
                key={number}
                id={number}
                onClick={handleClick}
                className={currentPage === number ? "active" : null}
            >
                {number}
            </li>
        ));
    };

    return (
        <div className="pagination-container d-flex justify-content-end mt-3">
            <ul className="pagination">{renderPageNumbers()}</ul>
        </div>
    )
}

export default Pagination