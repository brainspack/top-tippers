import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import { updateModalVisibility } from "../../slices/userSlice/user";
import { handleNotification } from "../../slices/Snackbar";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import CustomModal from "../reuse/CustomModal";

import AddIcon from "@mui/icons-material/Add";

import { manageSportSelector } from "../../slices/manageTeam/manageTeamSelector";
import {
  setCurrentModule,
  updateSportList,
} from "../../slices/manageTeam/manageTeam";
import AddTeamModal from "./AddTeamModal";

import { useGetUserListCompetitionApiByNameMutation } from "../../api/listCompetition";

import { useDeleteCompetitionByNameMutation } from "../../api/DeleteCompetition";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { useAddTeamByNameMutation } from "../../api/AddNewTeam";
import { AddSportBtn } from "./masterStyled";
import { manageRoundSelector } from "../../slices/manageRound/manageRoundSelector";
import { updateRoundList } from "../../slices/manageRound/manageRound";
import {
  COMPETITION_OPTIONS,
  COMPETITION_TABLE_COLUMNS,
} from "./masterTableColumns";
const ManageCompetition = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sportData } = useSelector(manageSportSelector);
  const { roundData } = useSelector(manageRoundSelector);

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await userDeleteApi({ compId: id }).unwrap();

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
    listCompetitionApi,
    {
      data: listCompetitionData,
      isLoading: teamDataFetching,
      isSuccess: listCompetitionSuccess,
    },
  ] = useGetUserListCompetitionApiByNameMutation();

  const [
    userDeleteApi,
    { data: userDeleteData, isSuccess: userDeleteSuccess },
  ] = useDeleteCompetitionByNameMutation();
  const [listSportApi, { data: listSportData }] =
    useGetUserListSportApiByNameMutation();

  useEffect(() => {
    if (listSportData && listSportData?.data)
      dispatch(updateSportList(listSportData));
  }, [listSportData]);
  const [addTeamApi, { data: addTeamData, isSuccess: addTeamSuccess }] =
    useAddTeamByNameMutation();
  useEffect(() => {
    if (listCompetitionData && listCompetitionData?.data)
      dispatch(updateRoundList(listCompetitionData));
  }, [listCompetitionData, listCompetitionSuccess]);

  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    listCompetitionApi(reqParams);
  }, [userDeleteSuccess, addTeamSuccess]);

  const { isModalVisible, modalSportName } = useSelector(userDataSelector);
  useEffect(() => {
    dispatch(setCurrentModule("round"));
  }, []);

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Competition</ManageUsersHeading>
            <Box>
              {/* <CustomSelect
                data={listSportData}
                listSportApi={listSportApi}
                sportData={sportData}
                teamListApi={listCompetitionApi}
                teamListData={listCompetitionData}
                userListSuccess={listCompetitionSuccess}
                // func={ dispatch(updateRoundList(listCompetitionData));}
                mode="round"
                func={() => dispatch(updateModalVisibility(false))}
              /> */}
              <AddSportBtn disableRipple onClick={handleOpen}>
                <AddIcon sx={{ mr: 1 }} />
                Reset All
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
                data={roundData?.data}
                columns={COMPETITION_TABLE_COLUMNS(openModal)}
                options={COMPETITION_OPTIONS(
                  roundData,
                  listCompetitionApi,
                  teamDataFetching
                )}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
              heading={"Delete Competition"}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageCompetition;
