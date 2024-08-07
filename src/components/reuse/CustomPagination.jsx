import React, { useState } from "react";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ total, userList, rowsPerPage }) => {
  const totalPages = Math.ceil(total / rowsPerPage);
  const [change, setChange] = useState(1);
  const handlePageButtonClick = (e, pageNumber) => {
    setChange(pageNumber);
    const reqParams = {
      search_string: "",
      page: change,
      sortValue: "",
      sortOrder: "",
    };
    userList(reqParams);
  };

  return (
    <>
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
            variant="outlined"
            color={"primary"}
            shape="circle"
            boundaryCount={2}
            onChange={handlePageButtonClick}
          />
        </Box>
      </Box>
    </>
  );
};
export default CustomPagination;
