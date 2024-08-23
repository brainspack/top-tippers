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

import AddIcon from "@mui/icons-material/Add";

import CustomSelect from "./CustomSelect";
import { manageSportSelector } from "../../slices/manageTeam/manageTeamSelector";
import {
  setCurrentModule,
  updateSportList,
  updateTeamList,
} from "../../slices/manageTeam/manageTeam";
import AddTeamModal from "./AddTeamModal";
// import { useTeamListByNameMutation } from "../../api/GetTeamList";
import { useListRoundsByNameMutation } from "../../api/ListRounds";
import { useDeleteRoundByNameMutation } from "../../api/DeleteRound";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { useAddTeamByNameMutation } from "../../api/AddNewTeam";
import { AddSportBtn } from "./masterStyled";
import EditIcon from "@mui/icons-material/Edit";
import { manageRoundSelector } from "../../slices/manageRound/manageRoundSelector";
import { updateRoundList } from "../../slices/manageRound/manageRound";
const ManageRound = () => {
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
  const handleOpen = () => {
    dispatch(updateModalVisibility(true));
  };

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

  useEffect(() => {
    if (listSportData && listSportData?.data)
      dispatch(updateSportList(listSportData));
  }, [listSportData]);
  const [addTeamApi, { data: addTeamData, isSuccess: addTeamSuccess }] =
    useAddTeamByNameMutation();
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
  }, [userDeleteSuccess, addTeamSuccess]);

  const columns = [
    {
      name: "roundno",
      label: "Round No.",
      options: {
        filter: true,
        sort: true,

        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "roundname",
      label: "Round Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "roundtype",
      label: "Type",
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
      label: "Sports",
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
                <EditIcon sx={{ cursor: "pointer" }} />
                <DeleteIcon
                  sx={{ cursor: "pointer" }}
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
            total={roundData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={listRoundsApi}
            userData={roundData?.data}
            isLoading={teamDataFetching}
          />
        </>
      );
    },
  };
  const { isModalVisible, modalSportName } = useSelector(userDataSelector);
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
                // func={ dispatch(updateRoundList(listRoundsData));}
                mode="round"
                func={() => dispatch(updateModalVisibility(false))}
              />
              <AddSportBtn disableRipple onClick={handleOpen}>
                <AddIcon sx={{ mr: 1 }} />
                Add Round
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
export default ManageRound;
