import React from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ArticlePagination = ({
  total,
  page,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  userListArticle,
  isLoading,
}) => {
  const theme = useTheme();
  const handleChangePage = (event, newPage) => {
    changePage(newPage - 1);
    userListArticle({
      page: newPage - 1,
      sortValue: "",
      sortOrder: "",
    });
  };

  //   const handleChangeRowsPerPage = (event) => {
  //     const newRowsPerPage = parseInt(event.target.value, 10);
  //     changeRowsPerPage(newRowsPerPage);
  //     changePage(0);
  //     userListArticle({
  //       page: 0,
  //       sortValue: "",
  //       sortOrder: "",
  //     });
  //   };

  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handleChangePage}
        color="primary"
        shape="circular"
        boundaryCount={2}
        siblingCount={1}
        disabled={isLoading}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              color: theme.palette.primary.main,
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default ArticlePagination;
