import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from "../reuse/CustomPagination";

export const AD_TABLE_COLUMNS = (handleEditClick, openModal) => {
  const columns = [
    {
      name: "name",
      label: "Name",

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
      name: "type",
      label: "Type",
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
        customBodyRender: (value) => {
          console.log();

          switch (value) {
            case "topsport_banner":
              return "TopSport Banner";
            case "tipping_success":
              return "TopSport Success";
            default:
              return value;
          }
        },
      },
    },
    {
      name: "mediaType",
      label: "Media Type",
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
      name: "userType",
      label: "User Type",
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
      name: "sport",
      label: "Sports",
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
      name: "pages",
      label: "Pages",
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
        customBodyRender: (value) => {
          console.log();

          switch (value) {
            case "Tip":
              return "TIPPING";
            case "Scorecard":
              return "Scorecard";
            case "every_page":
              return "every_page";
            default:
              return value;
          }
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
                onClick={() => handleEditClick(rowData)}
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

export const AD_OPTIONS = (userAdData, userAdApi, userAdLoading) => {
  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    selectableRows: false,
    pagination: true,
    rowsPerPage: 10,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <>
          <CustomPagination
            total={userAdData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userAdApi}
            userData={userAdData?.data}
            isLoading={userAdLoading}
          />
        </>
      );
    },
  };

  return options;
};
