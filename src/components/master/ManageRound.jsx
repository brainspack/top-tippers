import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
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
import CustomPagination from "../reuse/CustomPagination";
import CustomSelect from "./CustomSelect";
import { manageSportSelector } from "../../slices/manageTeam/manageTeamSelector";
import {
  setCurrentModule,
  updateSportList,
  updateTeamList,
} from "../../slices/manageTeam/manageTeam";
import { useListRoundsByNameMutation } from "../../api/ListRounds";
import { useDeleteRoundByNameMutation } from "../../api/DeleteRound";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { AddSportBtn } from "./masterStyled";
import EditIcon from "@mui/icons-material/Edit";
import { manageRoundSelector } from "../../slices/manageRound/manageRoundSelector";
import {
  getRoundsDataForEdit,
  getUpdateDataForEdit,
  setSelectedMode,
  updateRoundList,
} from "../../slices/manageRound/manageRound";
import AddRoundModal from "./AddRoundModal";
import { useAddRoundByNameMutation } from "../../api/AddNewRound";
import { useUpdateRoundByNameMutation } from "../../api/UpdateRound";
import { format } from "date-fns";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ROUND_OPTIONS, ROUND_TABLE_COLUMNS } from "./masterTableColumns";
const ManageRound = () => {
  // const { reset } = useForm();
  const dispatch = useDispatch();
  const { sportData } = useSelector(manageSportSelector);
  const { roundData, isSelectedMode, roundsEditData, updateEditData } =
    useSelector(manageRoundSelector);

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await userDeleteApi({ roundId: id }).unwrap();

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

  const [addRoundApi, { data: addRoundData, isSuccess: addRoundSuccess }] =
    useAddRoundByNameMutation();

  const [
    listRoundsApi,
    {
      data: listRoundsData,
      isLoading: teamDataFetching,
      error,
      isSuccess: listRoundsSuccess,
    },
  ] = useListRoundsByNameMutation();

  const [
    userDeleteApi,
    {
      data: userDeleteData,
      isLoading: userDeleteLoading,
      error: userDeleteError,
      isSuccess: userDeleteSuccess,
    },
  ] = useDeleteRoundByNameMutation();
  const [
    listSportApi,
    {
      data: listSportData,
      isLoading,
      error: listSportError,
      success: listSportSuccess,
    },
  ] = useGetUserListSportApiByNameMutation();
  const [
    updateRoundApi,
    {
      data: updateRoundData,
      isLoading: updateRoundLoading,
      isSuccess: updateRoundSuccess,
    },
  ] = useUpdateRoundByNameMutation();

  useEffect(() => {
    if (listSportData && listSportData?.data)
      dispatch(updateSportList(listSportData));
  }, [listSportData]);

  useEffect(() => {
    if (listRoundsData && listRoundsData?.data)
      dispatch(updateRoundList(listRoundsData));
  }, [listRoundsData, listRoundsSuccess]);

  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    listRoundsApi(reqParams);
  }, [userDeleteSuccess, addRoundSuccess, updateRoundSuccess]);

  const handleEditRound = (value, rowData) => {
    dispatch(setSelectedMode("edit"));

    const formattedStartDate = moment(rowData?.rowData[3].startDate).format(
      "L"
    );
    const formattedEndDate = moment(rowData?.rowData[3].endDate).format("L");
    const payload = [
      {
        roundno: rowData?.rowData[0],
        roundname: rowData?.rowData[1],
        roundtype: rowData?.rowData[2],
        sportId: rowData?.rowData[3]._id,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        roundId: rowData?.rowData[4],
      },
    ];
    dispatch(getRoundsDataForEdit(payload));
    dispatch(updateModalVisibility(true));
  };

  useEffect(() => {
    dispatch(setCurrentModule("round"));
  }, []);

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Round</ManageUsersHeading>
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
                teamListApi={listRoundsApi}
                teamListData={listRoundsData}
                userListSuccess={listRoundsSuccess}
                mode="round"
                func={() => dispatch(updateModalVisibility(false))}
              />

              <AddRoundModal
                data={listSportData}
                listSportApi={listSportApi}
                onClose={() => dispatch(updateModalVisibility(false))}
                addRoundApi={addRoundApi}
                initialData={isSelectedMode === "edit" ? roundsEditData : ""}
                updateRoundApi={updateRoundApi}
              />
            </Box>
          </Box>
          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={roundData?.data}
                columns={ROUND_TABLE_COLUMNS(handleEditRound, openModal)}
                options={ROUND_OPTIONS(
                  roundData,
                  listRoundsApi,
                  teamDataFetching
                )}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
              heading={"Delete Round"}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageRound;
