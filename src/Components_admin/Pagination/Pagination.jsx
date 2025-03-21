import React from 'react'
import { Pagination as MuiPagination, Stack } from "@mui/material";

const Pagination = ({ currentPage, totalPages, handleClick, isshowold=true, totalDataCount, setItemsPerPage, itemsPerPage }) => {

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

    if (isshowold) {
        return (
            <div className="pagination-container d-flex justify-content-end mt-3">
                <ul className="pagination">{renderPageNumbers()}</ul>
            </div>
        )
    }else{
        return (
           <>
            <div className={`justify-content-end align-items-end ${totalDataCount == 0 ? "d-none" : "d-flex"}`}>
              <Stack spacing={2}>
                <MuiPagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(e, page) => handleClick(e, page)}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>

              <select
                className="form-select w-20 ms-3"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
            </div>
           </>
        )
    }

}

export default Pagination