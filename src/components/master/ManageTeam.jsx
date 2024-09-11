import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import {
  setModalSportName,
  updateModalVisibility,
  updateUserData,
} from "../../slices/userSlice/user";
import { handleNotification } from "../../slices/Snackbar";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import ControlledSwitches from "../SwitchComponent";
import CustomModal from "../reuse/CustomModal";
import CustomPagination from "../reuse/CustomPagination";
import { useTeamListByNameMutation } from "../../api/GetTeamList";
import { useBlockTeamByNameMutation } from "../../api/BlockTeam";
import { useDeleteTeamByNameMutation } from "../../api/DeleteTeam";
import AddIcon from "@mui/icons-material/Add";

import CustomSelect from "./CustomSelect";
import { manageSportSelector } from "../../slices/manageTeam/manageTeamSelector";
import {
  setCurrentModule,
  updateSportList,
  updateTeamList,
} from "../../slices/manageTeam/manageTeam";
import AddTeamModal from "./AddTeamModal";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { AddSportBtn } from "./masterStyled";
import { useAddTeamByNameMutation } from "../../api/AddNewTeam";

const ManageTeam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teamData, sportData } = useSelector(manageSportSelector);

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await userDeleteApi({ teamId: id }).unwrap();
          if (response?.code === 200) {
            dispatch(
              handleNotification({
                state: true,
                message: response?.message,
                severity: response?.code,
              })
            );
          } else {
            dispatch(
              handleNotification({
                state: true,
                message: response?.message,
                severity: response?.code,
              })
            );
          }
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
    }

    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleOpen = () => {
    dispatch(updateModalVisibility(true));
  };

  const [
    teamList,
    { data, isLoading: teamDataFetching, error, isSuccess: userListSuccess },
  ] = useTeamListByNameMutation();

  const [
    deactivateUser,
    {
      data: deactivateUserData,
      isLoading: deactivateUserLoading,
      error: deactivateUserError,
      isSuccess: deactivateUserSuccess,
    },
  ] = useBlockTeamByNameMutation();

  const [
    userDeleteApi,
    {
      data: userDeleteData,
      isLoading: userDeleteLoading,
      error: userDeleteError,
      isSuccess: userDeleteSuccess,
    },
  ] = useDeleteTeamByNameMutation();
  const [
    listSportApi,
    {
      data: listSportData,
      isLoading,
      error: listSportError,
      success: listSportSuccess,
    },
  ] = useGetUserListSportApiByNameMutation();

  useEffect(() => {
    if (listSportData && listSportData?.data)
      dispatch(updateSportList(listSportData));
  }, [listSportData]);
  const [addTeamApi, { data: addTeamData, isSuccess: addTeamSuccess }] =
    useAddTeamByNameMutation();
  useEffect(() => {
    if (data && data?.data) dispatch(updateTeamList(data));
  }, [data, userListSuccess, addTeamSuccess]);

  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    teamList(reqParams);
  }, [deactivateUserSuccess, userDeleteSuccess, addTeamSuccess]);

  const columns = [
    {
      name: "teamname",
      label: "Team Name",
      options: {
        filter: true,
        sort: true,

        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "sport",
      label: "Sport",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.sportname}</Box>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "teamLogo",
      label: "Logo",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
        customBodyRender: (data, value) => {
          {
            // console.log(value, "VALUE");
          }
          return (
            <>
              {teamData?.data.map((e) => {
                if (e._id === value.rowData[4]) {
                  return (
                    <Box
                      className="logoBox"
                      sx={{ height: "50px", width: "50px" }}
                    >
                      <img src={e.teamLogo} />
                    </Box>
                  );
                }
              })}
            </>
          );
        },
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
                  onClick={() => navigate(`/admin/teamdetail/${value}`)}
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                ></VisibilityIcon>
                <DeleteIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                  onClick={() => openModal(value, "delete")}
                />
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
            total={teamData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={teamList}
            userData={teamData?.data}
            isLoading={teamDataFetching}
          />
        </>
      );
    },
  };
  const { isModalVisible, modalSportName } = useSelector(userDataSelector);
  useEffect(() => {
    dispatch(setCurrentModule("team"));
  }, []);
  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Team</ManageUsersHeading>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "30%",
              }}
            >
              <CustomSelect
                data={listSportData}
                listSportApi={listSportApi}
                sportData={sportData}
                teamListApi={teamList}
                teamListData={data}
                userListSuccess={userListSuccess}
              />
              <AddSportBtn disableRipple onClick={handleOpen}>
                <AddIcon sx={{ mr: 1 }} />
                Add Team
              </AddSportBtn>{" "}
              <AddTeamModal
                data={listSportData}
                listSportApi={listSportApi}
                open={isModalVisible}
                onClose={() => dispatch(updateModalVisibility(false))}
                initialSportName={modalSportName}
                sportData={sportData}
                addTeamApi={addTeamApi}
              />
            </Box>
          </Box>
          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={teamData?.data}
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
              heading={"Delete Team"}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageTeam;
