import React, { useEffect, useState } from "react";
import { Box, Skeleton, Pagination } from "@mui/material";

const CustomPagination = (props) => {
  const { total, userList, rowsPerPage } = props;
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
    // if(id){
    //   reqParams.sport=id
    // }
    userList(reqParams);
  };

  useEffect(() => {
    if (rowsPerPage && total !== undefined) {
      const pages = Math.ceil(total / rowsPerPage);
      console.log(pages, "pages");
      setTotalPages(pages);
    } else {
      setTotalPages(0);
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
