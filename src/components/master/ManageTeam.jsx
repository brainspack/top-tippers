import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import MUIDataTable from "mui-datatables";
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
import { TEAM_OPTIONS, TEAM_TABLE_COLUMNS } from "./masterTableColumns";

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
                columns={TEAM_TABLE_COLUMNS(
                  teamData,
                  deactivateUser,
                  deactivateUserData,
                  navigate,
                  openModal
                )}
                options={TEAM_OPTIONS(teamData, teamList, teamDataFetching)}
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
