import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlledSwitches from "../SwitchComponent";
import { Box } from "@mui/material";
import CustomPagination from "../reuse/CustomPagination";

export const ARTICLE_TABLE_COLUMNS = (
  handleEditClick,
  articleDeleteApi,
  openModal,
  articleDeleteData
) => {
  const columns = [
    {
      name: "title",
      label: "Title",

      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "isActive",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
        customBodyRender: (value, rowData) => {
          return (
            <>
              <ControlledSwitches
                value={value}
                rowData={rowData}
                statusChangeApi={articleDeleteApi}
                deactivateUserData={articleDeleteData}

                //   userList={userList}
              />
            </>
          );
        },
      },
    },

    {
      name: "_id",
      label: "Actions",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
        customBodyRender: (value, rowData) => (
          <>
            <Box display="flex" gap="10px">
              <EditIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => handleEditClick(value, rowData)}
              ></EditIcon>
              <DeleteIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => openModal(value, "delete")}
              />
            </Box>
          </>
        ),
      },
    },
  ];
  return columns;
};

export const ARTICLE_OPTIONS = (
  listArticleData,
  userListArticle,
  articleDataFetching
) => {
  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    selectableRows: false,
    pagination: true,
    rowsPerPage: 5,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <>
          <CustomPagination
            total={listArticleData?.data?.totalDocs}
            mode="articlePage"
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userListArticle}
            // userData={articleData?.data?.docs}
            isLoading={articleDataFetching}
          />
        </>
      );
    },
  };

  return options;
};
