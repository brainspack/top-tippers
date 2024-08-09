import React, { useState } from "react";
import { Box, Skeleton, Pagination } from "@mui/material";

const CustomPagination = ({ total, userList, rowsPerPage, isLoading }) => {
  const totalPages = Math.ceil(total / rowsPerPage);
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        height: "50px",
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width={400} height={40} />
      ) : (
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
      )}
    </Box>
  );
};

export default CustomPagination;
