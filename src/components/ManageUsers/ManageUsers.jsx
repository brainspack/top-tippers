import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import SearchIcon from "@mui/icons-material/Search";
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
import CustomModal from "../reuse/CustomModal";
import UserMenu from "./UserMenu";
import {
  MANAGE_USER_OPTIONS,
  MANAGE_USER_TABLE_COLUMNS,
} from "./manageUserTableColumns";
import { useDisabledUserByNameMutation } from "../../api/UserDisabled";
import { useDownloadCsvByNameMutation } from "../../api/DownloadCsv";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(userDataSelector);
  console.log(userData, "userData");
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await userDeleteApi({ userId: id }).unwrap();
          dispatch(
            handleNotification({
              state: true,
              message: response?.message,
              severity: response?.code,
            })
          );
        } catch (error) {}
      });
    } else if (type === "verify") {
      setModalContent("Do you want to verify this account?");
      setAction(() => async () => {
        try {
          const response = await verifyUserApi({ userId: id }).unwrap();
          dispatch(
            handleNotification({
              state: true,
              message: response?.message,
              severity: response?.code,
            })
          );
        } catch (error) {}
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

  const [userList, { data, isLoading, isSuccess: userListSuccess }] =
    useGetUserListByNameMutation();

  const [
    deactivateUser,
    {
      data: deactivateUserData,

      isSuccess: deactivateUserSuccess,
    },
  ] = useDeactivateUserByNameMutation();

  const [
    userDeleteApi,
    {
      data: userDeleteData,
      isLoading: userDeleteLoading,

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
    if (data && data?.data) dispatch(updateUserData(data));
  }, [data, userListSuccess]);

  // disabled user api
  const [
    disabledUserApi,
    { data: userDisabledData, isSuccess: userDisabledSuccess },
  ] = useDisabledUserByNameMutation();

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userList(reqParams);
  }, [
    deactivateUserSuccess,
    userDeleteSuccess,
    verifyUserSuccess,
    userDisabledSuccess,
  ]);

  const csvData =
    userData?.data?.map((item) => ({
      userName: item.name,
      userEmail: item.user?.email,
    })) || [];

  const csvHeaders = [
    { label: "name", key: "userName" },
    { label: "email", key: "userEmail" },
  ];

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
                <UserMenu disabledUserApi={disabledUserApi} />
              </DropDownBox>
            </SearchWrapper>
            <ManageUserTableWrapper>
              {/* {userDisabledData?.data.length <= 0 ? (
                ""
              ) : ( */}
              <MUIDataTable
                data={userData?.data}
                columns={MANAGE_USER_TABLE_COLUMNS(
                  deactivateUser,
                  deactivateUserData,
                  userList,
                  openModal,
                  userData
                )}
                options={MANAGE_USER_OPTIONS(userData, userList, isLoading)}
              />
              {/* )} */}
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
              heading={"Delete User"}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageUsers;
