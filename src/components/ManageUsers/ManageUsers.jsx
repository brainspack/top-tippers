import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Skeleton,
  TextField,
} from "@mui/material";
import {
  DropDownBox,
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./ManangeUsersStyled";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MUIDataTable from "mui-datatables";
import { useGetUserListByNameMutation } from "../../api/UserList";
import { useDeactivateUserByNameMutation } from "../../api/DeactivateUser";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import { handleNotification } from "../../slices/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import ControlledSwitches from "../SwitchComponent";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import { updateUserData } from "../../slices/userSlice/user";
import CustomModal from "../reuse/CustomModal";
import { useDeleteUserByNameMutation } from "../../api/DeleteUser";
import BasicMenu from "../Dashboard/ProfileMenu";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../reuse/CustomPagination";
import BasicPagination from "../reuse/CustomPagination";
import UserMenu from "./UserMenu";
const ManageUsers = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("");
  const [modal, setModal] = useState(false);
  const openModal = (id) => {
    setModal(true);
    setView(id);
  };
  const closeModal = () => {
    setModal(false);
  };
  const dispatch = useDispatch();
  const [userList, sampleData] = useGetUserListByNameMutation();
  const { data, isLoading, error, isSuccess: userListSuccess } = sampleData;
  console.log(sampleData, "sampleData");
  const { data: userData } = useSelector(userDataSelector);
  const userAllData = useSelector(userDataSelector);

  console.log(userAllData, "thisIsState");
  const [
    deactivateUser,
    {
      data: deactivateUserData,
      isLoading: deactivateUserLoading,
      error: deactivateUserError,
      isSuccess: deactivateUserSuccess,
    },
  ] = useDeactivateUserByNameMutation();
  const [
    userDeleteApi,
    {
      data: userDeleteData,
      isLoading: userDeleteLoading,
      error: userDeleteError,
      isSuccess: userDeleteSuccess,
    },
  ] = useDeleteUserByNameMutation();
  const onHandleSearch = (e) => {
    const reqParams = {
      search_string: e.target.value,
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userList(reqParams);
  };
  const permanentDelete = async () => {
    try {
      userDeleteApi({ userId: view });
    } catch (error) {
      console.log(" Error", error);
    }
  };

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
        customBodyRender: (value, rowData) => (
          <>
            {console.log(data?.data, "insideEmail")}
            <Box display="flex" gap="10px">
              <VisibilityIcon
                onClick={() => navigate(`/admin/userprofile/${value}`)}
              ></VisibilityIcon>
              <DeleteIcon onClick={() => openModal(value)} />
            </Box>
          </>
        ),
      },
    },
  ];

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
            total={data?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userList}
            userData={userData}
          />
        </>
      );
    },
  };

  useEffect(() => {
    if (userDeleteLoading) return;
    if (userDeleteData?.code === 200) {
      if (userDeleteData) {
        dispatch(
          handleNotification({
            state: true,
            message: userDeleteData?.message,
            severity: userDeleteData?.code,
          })
        );
        closeModal();
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: userDeleteData?.message,
            severity: userDeleteData?.status,
          })
        );
      }
    }
  }, [userDeleteData, userDeleteLoading]);
  useEffect(() => {
    if (data && data?.data) dispatch(updateUserData(data?.data));
  }, [data, userListSuccess]);
  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userList(reqParams);
  }, [deactivateUserSuccess, userDeleteSuccess]);
  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Box>
            <ManageUsersHeading>Manage User</ManageUsersHeading>
          </Box>
          <Box border={"1px solid rgba(0, 0, 0, 0.1)"}>
            <Box
              padding={"15px"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: "primary.secondary" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    color="rgb(13, 25, 51)"
                    onChange={onHandleSearch}
                  />
                </Search>
              </Box>
              <DropDownBox>
                <UserMenu />
              </DropDownBox>
            </Box>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={userData}
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              userid={view}
              userDeleteApi={userDeleteApi}
              userDeleteData={userDeleteData}
              userDeleteLoading={userDeleteLoading}
              permanentDelete={permanentDelete}
            />
          </Box>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageUsers;
