import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// const CustomPagination = ({
//   total,
//   page,
//   rowsPerPage,
//   changeRowsPerPage,
//   changePage,
//   userList,
//   isEdit,
//   userData,
// }) => {
//   console.log(userData, "userDataFromTable");
//   const handlePageButtonClick = (pageNumber) => {
//     console.log(pageNumber, "pagenumber");
//     changePage(pageNumber);
//     const reqParams = {
//       search_string: "",
//       page: pageNumber,
//       sortValue: "",
//       sortOrder: "",
//     };
//     userList(reqParams);
//   };
//   console.log(total, "TOTAL");

//   const [hoveredPage, setHoveredPage] = useState(null);
//   const totalPages = Math.ceil(total / rowsPerPage);
//   useEffect(() => {
//     if (page < totalPages) {
//       changePage(page + 1);
//     }
//   }, [totalPages, total]);
//   let startPage = 0;
//   let endPage = totalPages;

//   // if (totalPages > maxVisiblePages) {
//   //   if (page <= Math.floor(maxVisiblePages / 2)) {
//   //     endPage = maxVisiblePages;
//   //   } else if (page >= totalPages - Math.floor(maxVisiblePages / 2)) {
//   //     startPage = totalPages - maxVisiblePages;
//   //   } else {
//   //     startPage = page - Math.floor(maxVisiblePages / 2);
//   //     endPage = page + Math.floor(maxVisiblePages / 2);
//   //   }
//   // }

//   const pageNumbers = Array.from(
//     { length: endPage - startPage },
//     (_, i) => startPage + i + 1
//   );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <Button
//         sx={{
//           lineHeight: "16.94px",
//           fontSize: "14px",
//           fontWeight: 400,
//           textTransform: "none",
//           width: "121px",

//           borderRadius: "20px",
//           color: "#000000",
//           backgroundColor:
//             page === 0 ? "#F0F0F0 !important" : "#FFFFFF !important",
//           border: page === 0 ? "none" : "1px  solid #DEDEDE",
//           height: "40px",
//           boxShadow: "none",
//           "&:hover": {
//             boxShadow: "none",
//           },
//         }}
//         variant="contained"
//         onClick={() => handlePageButtonClick(page - 1)}
//         disabled={page === 0}
//         startIcon={<ArrowBackIcon color={page === 0 ? "#C2C2C2" : "#000000"} />}
//       >
//         Previous
//       </Button>
//       <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//         {pageNumbers.map((pageNumber) => (
//           <Button
//             key={pageNumber}
//             sx={{
//               borderRadius: "50%",
//               width: "40px",
//               height: "40px",
//               fontSize: "14px",
//               fontWeight: 500,
//               minWidth: "unset",
//               boxShadow: "none",
//               border:
//                 page === pageNumber - 1 ? "none" : "1px solid transparent",

//               backgroundColor:
//                 page === pageNumber - 1 ? "primary.main" : "transparent",
//               color:
//                 page === pageNumber - 1
//                   ? "primary.contrastText"
//                   : hoveredPage === pageNumber
//                   ? "#000000"
//                   : "#818181",

//               "&:hover": {
//                 boxShadow: "none",
//                 border:
//                   page === pageNumber - 1
//                     ? "none"
//                     : hoveredPage === pageNumber
//                     ? "1px solid #DEDEDE"
//                     : "none",
//                 backgroundColor:
//                   page === pageNumber - 1
//                     ? "primary.main"
//                     : hoveredPage === pageNumber
//                     ? "#FFFFFF"
//                     : "transparent",
//               },
//             }}
//             variant="contained"
//             onClick={() => handlePageButtonClick(pageNumber - 1)}
//           >
//             {pageNumber}
//           </Button>
//         ))}
//       </Box>
//       <Button
//         sx={{
//           lineHeight: "16.94px",
//           fontSize: "14px",
//           fontWeight: 400,
//           textTransform: "none",
//           width: "96px",
//           borderRadius: "20px",
//           backgroundColor:
//             page >= totalPages - 1
//               ? "#F0F0F0 !important"
//               : "#FFFFFF !important",

//           color: "#000000",
//           border: page >= totalPages - 1 ? "none" : "1px  solid #DEDEDE",
//           height: "40px",
//           boxShadow: "none",
//           "&:hover": {
//             boxShadow: "none",
//           },
//         }}
//         variant="contained"
//         onClick={() => handlePageButtonClick(page + 1)}
//         disabled={page >= totalPages - 1}
//         endIcon={
//           <ChevronRightIcon
//             color={page >= totalPages - 1 ? "#C2C2C2" : "#000000"}
//           />
//         }
//       >
//         Next
//       </Button>
//     </Box>
//   );
// };

const CustomPagination = ({ total }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          count={total}
          siblingCount={2}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </>
  );
};
export default CustomPagination;
