import { useNavigate } from "react-router-dom";
import ControlledSwitches from "../SwitchComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";

import { Box } from "@mui/material";
import CustomPagination from "../reuse/CustomPagination";

export const MANAGE_USER_TABLE_COLUMNS = (
  deactivateUser,
  deactivateUserData,
  userList,
  openModal,
  userData
) => {
  const navigate = useNavigate();
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "country",
      label: "Country",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "isTopSportUser",
      label: "TopSport",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
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
            color: "black",
            display: "flex",
            justifyContent: "center",
          },
        }),
        customBodyRender: (value, rowData) => {
          return (
            <>
              <ControlledSwitches
                value={value}
                rowData={rowData}
                statusChangeApi={deactivateUser}
                deactivateUserData={deactivateUserData}
                userList={userList}
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
            color: "black",
          },
        }),
        customBodyRender: (value, rowData) => {
          return (
            <>
              <Box display="flex" gap="10px">
                <VisibilityIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                  onClick={() => navigate(`/admin/userprofile/${value}`)}
                ></VisibilityIcon>
                <DeleteIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                  onClick={() => openModal(value, "delete")}
                />

                {userData?.data?.map((e) => {
                  if (e._id === value) {
                    return e.isVerified === "No" ? (
                      <MailIcon
                        sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                        onClick={() => openModal(value, "verify")}
                      />
                    ) : (
                      ""
                    );
                  }
                })}
              </Box>
            </>
          );
        },
      },
    },
  ];
  return columns;
};

export const MANAGE_USER_OPTIONS = (userData, userList, isLoading) => {
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
            total={userData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userList}
            isLoading={isLoading}
          />
        </>
      );
    },
  };

  return options;
};
