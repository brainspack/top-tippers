import React, { useEffect, useState } from "react";
import { Box, Skeleton, Pagination } from "@mui/material";

const CustomPagination = ({ total, userList, rowsPerPage, isLoading }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageButtonClick = (e, pageNumber) => {
    setCurrentPage(pageNumber);
    const reqParams = {
      search_string: "",
      page: pageNumber,
      sortValue: "",
      sortOrder: "",
    };
    userList(reqParams);
  };

  useEffect(() => {
    if (rowsPerPage && total) {
      const pages = Math.ceil(total / rowsPerPage);
      setTotalPages(pages);
    }
  }, [rowsPerPage, total]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        height: "50px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          color="primary"
          shape="circular"
          boundaryCount={2}
          onChange={handlePageButtonClick}
        />
      </Box>
    </Box>
  );
};

export default CustomPagination;
