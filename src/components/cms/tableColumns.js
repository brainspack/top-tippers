// export const columns = [
//   {
//     name: "title",
//     label: "Titles",

//     options: {
//       filter: true,
//       sort: true,
//       setCellHeaderProps: () => ({
//         style: {
//           backgroundColor: "#e5a842",
//           color: "white",
//           fontWeight: "600",
//         },
//       }),
//     },
//   },
//   {
//     name: "content",
//     label: "Rules",
//     options: {
//       filter: true,
//       sort: true,
//       setCellHeaderProps: () => ({
//         style: {
//           backgroundColor: "#e5a842",
//           color: "white",
//           fontWeight: "600",
//         },
//       }),
//     },
//   },

//   {
//     name: "_id",
//     label: "Actions",
//     options: {
//       filter: true,
//       sort: true,
//       setCellHeaderProps: () => ({
//         style: {
//           backgroundColor: "#e5a842",
//           color: "white",
//           fontWeight: "600",
//         },
//       }),
//       customBodyRender: (value, rowData) => (
//         <>
//           <Box display="flex" gap="10px">
//             <EditIcon
//               sx={{ cursor: "pointer", color: "#9f8e8ede" }}
//               onClick={() => handleEditClick(rowData)}
//             ></EditIcon>
//             {/* <DeleteIcon
//                 sx={{ cursor: "pointer", color: "#9f8e8ede" }}
//                 onClick={() => openModal(value, "delete")}
//               /> */}
//           </Box>
//         </>
//       ),
//     },
//   },
// ];

// export const options = () => {
//   return (options = {
//     filter: false,
//     download: false,
//     search: false,
//     print: false,
//     viewColumns: false,
//     selectableRows: false,
//     pagination: true,
//     rowsPerPage: 5,
//     customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
//       return (
//         <>
//           <CustomPagination
//             total={userListContentData?.totalCount}
//             page={page}
//             rowsPerPage={rowsPerPage}
//             changeRowsPerPage={changeRowsPerPage}
//             changePage={changePage}
//             userList={listContentApi}
//             userData={userListContentData?.data}
//             isLoading={userListContentDataFetching}
//           />
//         </>
//       );
//     },
//   });
// };
