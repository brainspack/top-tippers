import {
  Box,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Skeleton,
} from "@mui/material";
import {
  DropDownBox,
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
} from "./ManangeUsersStyled";
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

const ManageUsers = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  console.log(isActive, "ACTIVE");
  const [userList, { data, isLoading, error, isSuccess: userListSuccess }] =
    useGetUserListByNameMutation();
  const { data: userData } = useSelector(userDataSelector);
  console.log(userData, "thisIsState");
  const [
    deactivateUser,
    {
      data: deactivateUserData,
      isLoading: deactivateUserLoading,
      error: deactivateUserError,
      isSuccess: deactivateUserSuccess,
    },
  ] = useDeactivateUserByNameMutation();
  const onHandleSwitchChange = (event) => {
    const newStatus = event.target.checked;
    setIsActive(newStatus);
  };
  const onHandleOpen = (id) => {
    console.log(id, "VIEW");
  };
  useEffect(() => {
    if (data && data.data) dispatch(updateUserData(data?.data));
  }, [data, userListSuccess]);

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userList(reqParams);
  }, [deactivateUserSuccess]);
  const handleUserStatus = (data) => {
    console.log(data, "dataInfunction");
  };
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e08300", color: "black" },
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
          style: { backgroundColor: "#e08300", color: "black" },
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
          style: { backgroundColor: "#e08300", color: "black" },
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
          style: { backgroundColor: "#e08300", color: "black" },
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
            backgroundColor: "#e08300",
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
            backgroundColor: "#e08300",
            color: "black",
          },
        }),
        customBodyRender: (data) => (
          <>
            <Box display="flex" gap="10px">
              <VisibilityIcon
                onClick={() => onHandleOpen(data)}
              ></VisibilityIcon>
              <DeleteIcon />
              {!data?.data?.isVerified ? <EmailIcon /> : ""}
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
  };
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
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box
                className="inputbox"
                sx={{
                  display: "flex",
                  border: "1px solid rgba(0,0,0,0.1)",
                  width: "40%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SearchIcon />
                </Box>
                <input type="search"></input>
              </Box>
              <DropDownBox>
                <MenuOpenIcon />
              </DropDownBox>
            </Box>
            {console.log(data?.data[0], "data?.data?.name")}
            <MUIDataTable data={userData} columns={columns} options={options} />
          </Box>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageUsers;
