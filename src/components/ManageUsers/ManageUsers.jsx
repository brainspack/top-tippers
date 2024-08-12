import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import { useGetUserListByNameMutation } from "../../api/UserList";
import { useDeactivateUserByNameMutation } from "../../api/DeactivateUser";
import { useDeleteUserByNameMutation } from "../../api/DeleteUser";
import { useVerifyUserByNameMutation } from "../../api/VerifyUser";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import { updateUserData } from "../../slices/userSlice/user";
import { handleNotification } from "../../slices/Snackbar";
import {
  DropDownBox,
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  Search,
  SearchContainer,
  SearchIconWrapper,
  SearchWrapper,
  StyledInputBase,
} from "./ManangeUsersStyled";
import ControlledSwitches from "../SwitchComponent";
import CustomModal from "../reuse/CustomModal";
import CustomPagination from "../reuse/CustomPagination";
import UserMenu from "./UserMenu";

const ManageUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userData } = useSelector(userDataSelector);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          await userDeleteApi({ userId: id }).unwrap();
          dispatch(
            handleNotification({
              state: true,
              message: userDeleteData?.message,
              severity: userDeleteData?.code,
            })
          );
        } catch (error) {
          dispatch(
            handleNotification({
              state: true,
              message: userDeleteData?.message,
              severity: userDeleteData?.code,
            })
          );
        }
      });
    } else if (type === "verify") {
      setModalContent("Do you want to verify this account?");
      setAction(() => async () => {
        try {
          await verifyUserApi({ userId: id }).unwrap();
          dispatch(
            handleNotification({
              state: true,
              message: verifyUserData?.message,
              severity: verifyUserData?.code,
            })
          );
        } catch (error) {
          dispatch(
            handleNotification({
              state: true,
              message: verifyUserData?.message,
              severity: verifyUserData?.code,
            })
          );
        }
      });
    }
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const onHandleSearch = (e) => {
    const reqParams = {
      search_string: e.target.value,
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userList(reqParams);
  };

  const [userList, { data, isLoading, error, isSuccess: userListSuccess }] =
    useGetUserListByNameMutation();

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
  const [
    verifyUserApi,
    {
      data: verifyUserData,
      isLoading: verifyUserLoading,
      isSuccess: verifyUserSuccess,
    },
  ] = useVerifyUserByNameMutation();

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
    if (verifyUserLoading) return;
    if (verifyUserData?.code === 200) {
      if (verifyUserData) {
        dispatch(
          handleNotification({
            state: true,
            message: verifyUserData?.message,
            severity: verifyUserData?.code,
          })
        );
        closeModal();
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: verifyUserData?.message,
            severity: verifyUserData?.status,
          })
        );
      }
    }
  }, [verifyUserData, verifyUserLoading]);

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
  }, [deactivateUserSuccess, userDeleteSuccess, verifyUserSuccess]);

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
          console.log(rowData, value, "thisIsRowData");
          return (
            <>
              <Box display="flex" gap="10px">
                <VisibilityIcon
                  onClick={() => navigate(`/admin/userprofile/${value}`)}
                ></VisibilityIcon>
                <DeleteIcon onClick={() => openModal(value, "delete")} />

                {userData?.map((e) => {
                  if (e._id === value) {
                    return e.isVerified === "No" ? (
                      <MailIcon onClick={() => openModal(value, "verify")} />
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
            isLoading={isLoading}
          />
        </>
      );
    },
  };

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box>
            <ManageUsersHeading>Manage User</ManageUsersHeading>
          </Box>
          <SearchContainer>
            <SearchWrapper>
              <Box sx={{ width: "45%" }}>
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
            </SearchWrapper>
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
              content={modalTitle}
              action={action}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageUsers;
