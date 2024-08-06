import React, { useEffect, useState } from "react";
import { Box, Button, PaginationItem, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// // const CustomPagination = ({
// //   total,
// //   page,
// //   rowsPerPage,
// //   changeRowsPerPage,
// //   changePage,
// //   userList,
// //   isEdit,
// //   userData,
// // }) => {
// //   console.log(userData, "userDataFromTable");
// //   const handlePageButtonClick = (pageNumber) => {
// //     console.log(pageNumber, "pagenumber");
// //     changePage(pageNumber);
// //     const reqParams = {
// //       search_string: "",
// //       page: pageNumber,
// //       sortValue: "",
// //       sortOrder: "",
// //     };
// //     userList(reqParams);
// //   };
// //   console.log(total, "TOTAL");

// //   const [hoveredPage, setHoveredPage] = useState(null);
// //   const totalPages = Math.ceil(total / rowsPerPage);
// //   useEffect(() => {
// //     if (page < totalPages) {
// //       changePage(page + 1);
// //     }
// //   }, [totalPages, total]);
// //   let startPage = 0;
// //   let endPage = totalPages;

// //   const pageNumbers = Array.from(
// //     { length: endPage - startPage },
// //     (_, i) => startPage + i + 1
// //   );

// //   return (
// //     <Box
// //       sx={{
// //         display: "flex",
// //         justifyContent: "space-between",
// //         alignItems: "center",
// //       }}
// //     >
// //       <Button
// //         sx={{
// //           lineHeight: "16.94px",
// //           fontSize: "14px",
// //           fontWeight: 400,
// //           textTransform: "none",
// //           width: "121px",
// //           borderRadius: "20px",
// //           color: "#000000",
// //           backgroundColor:
// //             page === 0 ? "#F0F0F0 !important" : "#FFFFFF !important",
// //           border: page === 0 ? "none" : "1px  solid #DEDEDE",
// //           height: "40px",
// //           boxShadow: "none",
// //           "&:hover": {
// //             boxShadow: "none",
// //           },
// //         }}
// //         variant="contained"
// //         onClick={() => handlePageButtonClick(page - 1)}
// //         disabled={page === 0}
// //         startIcon={<ArrowBackIcon color={page === 0 ? "#C2C2C2" : "#000000"} />}
// //       >
// //         Previous
// //       </Button>
// //       <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
// //         {pageNumbers.map((pageNumber) => (
// //           <Button
// //             key={pageNumber}
// //             sx={{
// //               borderRadius: "50%",
// //               width: "40px",
// //               height: "40px",
// //               fontSize: "14px",
// //               fontWeight: 500,
// //               minWidth: "unset",
// //               boxShadow: "none",
// //               border:
// //                 page === pageNumber - 1 ? "none" : "1px solid transparent",

// //               backgroundColor:
// //                 page === pageNumber - 1 ? "primary.main" : "transparent",
// //               color:
// //                 page === pageNumber - 1
// //                   ? "primary.contrastText"
// //                   : hoveredPage === pageNumber
// //                   ? "#000000"
// //                   : "#818181",

// //               "&:hover": {
// //                 boxShadow: "none",
// //                 border:
// //                   page === pageNumber - 1
// //                     ? "none"
// //                     : hoveredPage === pageNumber
// //                     ? "1px solid #DEDEDE"
// //                     : "none",
// //                 backgroundColor:
// //                   page === pageNumber - 1
// //                     ? "primary.main"
// //                     : hoveredPage === pageNumber
// //                     ? "#FFFFFF"
// //                     : "transparent",
// //               },
// //             }}
// //             variant="contained"
// //             onClick={() => handlePageButtonClick(pageNumber)}
// //           >
// //             {pageNumber}
// //           </Button>
// //         ))}
// //       </Box>
// //       <Button
// //         sx={{
// //           lineHeight: "16.94px",
// //           fontSize: "14px",
// //           fontWeight: 400,
// //           textTransform: "none",
// //           width: "96px",
// //           borderRadius: "20px",
// //           backgroundColor:
// //             page >= totalPages - 1
// //               ? "#F0F0F0 !important"
// //               : "#FFFFFF !important",

// //           color: "#000000",
// //           border: page >= totalPages - 1 ? "none" : "1px  solid #DEDEDE",
// //           height: "40px",
// //           boxShadow: "none",
// //           "&:hover": {
// //             boxShadow: "none",
// //           },
// //         }}
// //         variant="contained"
// //         onClick={() => handlePageButtonClick(page + 1)}
// //         disabled={page >= totalPages - 1}
// //         endIcon={
// //           <ChevronRightIcon
// //             color={page >= totalPages - 1 ? "#C2C2C2" : "#000000"}
// //           />
// //         }
// //       >
// //         Next
// //       </Button>
// //     </Box>
// //   );
// // };

// // ????????????????????????????????????????????????????????????????????????????//

const CustomPagination = ({ total, userList, changePage, rowsPerPage }) => {
  const totalPages = Math.floor(total / rowsPerPage);
  const [change, setChange] = useState(1);
  console.log(change, "CHANGESTATE");

  const handlePageButtonClick = (e, pageNumber) => {
    console.log(pageNumber, "PAGENUMBER");
    setChange(pageNumber);

    // changePage(change);
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
