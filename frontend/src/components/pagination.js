import React from "react";
import { Pagination } from "@mui/material";
import "../css/pagination.css"
function MyPagination({ totalPages, handlePageNumber }) {
    return (
        <div className="pagination-container">
            <Pagination count={totalPages} size="small" onChange={handlePageNumber} />
        </div>
    );
}

export default MyPagination;