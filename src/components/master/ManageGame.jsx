import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import EditIcon from "@mui/icons-material/Edit";
import { manageRoundSelector } from "../../slices/manageRound/manageRoundSelector";
import {
  getRoundsDataForEdit,
  setSelectedMode,
  updateRoundList,
} from "../../slices/manageRound/manageRound";
import { useDeleteGameByNameMutation } from "../../api/DeleteGame";
import { useListGamesByNameMutation } from "../../api/ListGames";
import { useTeamListByNameMutation } from "../../api/GetTeamList";
import moment from "moment";
import { manageGameSelector } from "../../slices/manageGame/manageGameSelector";
import {
  updateAllTeamData,
  updateGameList,
} from "../../slices/manageGame/manageGame";
import AddGameModal from "./AddGameModal";
import { useAddGameByNameMutation } from "../../api/AddNewGame";
const ManageGame = () => {
  const dispatch = useDispatch();
  // const { sportData } = useSelector(manageSportSelector);
  const { roundData } = useSelector(manageRoundSelector);
  console.log(roundData, "ROUNDData");
  const { gameData, allTeamData } = useSelector(manageGameSelector);
  const { teamData, sportData } = useSelector(manageSportSelector);
  console.log(allTeamData, "allTeamData");
  console.log(gameData, "INSIDE GAME DATA");
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const openModal = (id, type, rowData) => {
    if (type === "delete") {
      setModalContent(
        "Are you sure you want to delete this game. If these teams already played, then this may cause issues. If you need to make a change to this game, then edit it (don't delete it)"
      );
      setAction(() => async () => {
        try {
          const response = await userDeleteApi({
            gameId: id,
            selectedSeason: "current",
          }).unwrap();

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
    } else if (type === "started") {
      setModalContent("Are you sure you want to start this game");
      setAction(() => async () => {
        try {
          const response = await addGameApi({
            gameId: id,
            selectedSeason: "current",
            gameState: "started",
            sportId: rowData?.rowData[0]._id,
          }).unwrap();

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

  // ROUND API
  const [
    listRoundsApi,
    {
      data: listRoundsData,
      isLoading: listRoundsLoading,
      error: listRoundsError,
      isSuccess: listRoundsSuccess,
    },
  ] = useListRoundsByNameMutation();

  // ADD GAME API
  const [
    addGameApi,
    {
      data: addGameData,
      isLoading: addGameLoading,
      isSuccess: addGameSuccess,
      isError: addGameError,
    },
  ] = useAddGameByNameMutation();

  // TEAM LIST API
  const [
    teamListApi,
    { data, isLoading: teamDataFetching, isSuccess: userListSuccess },
  ] = useTeamListByNameMutation();

  // GAME LIST API
  const [
    listGameApi,
    {
      data: listGamesData,
      isLoading: teamGameFetching,
      error,
      isSuccess: listGameSuccess,
    },
  ] = useListGamesByNameMutation();

  // DELETE GAME API
  const [
    userDeleteApi,
    {
      data: userDeleteData,
      isLoading: userDeleteLoading,
      error: userDeleteError,
      isSuccess: userDeleteSuccess,
    },
  ] = useDeleteGameByNameMutation();
  // LIST SPORT API
  const [
    listSportApi,
    {
      data: listSportData,
      isLoading,
      error: listSportError,
      success: listSportSuccess,
    },
  ] = useGetUserListSportApiByNameMutation();

  // TEAM LIST
  useEffect(() => {
    const fetchTeamList = async () => {
      try {
        const response = await teamListApi({
          count: 1000,
          season: "current",
        }).unwrap();
        console.log(response, "FETCH TEAM LIST");
        // dispatch(updateTeamList(response));
        dispatch(updateAllTeamData(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchTeamList();
  }, []);

  // ROUND API
  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await listRoundsApi({
          count: 1000,
          season: "current",
        }).unwrap();
        dispatch(updateRoundList(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchRound();
  }, []);

  // SPORT API
  useEffect(() => {
    if (listSportData && listSportData?.data)
      dispatch(updateSportList(listSportData));
  }, [listSportData]);

  // LIST GAME API
  useEffect(() => {
    if (listGamesData && listGamesData?.data)
      dispatch(updateGameList(listGamesData));
  }, [listGamesData, listGameSuccess]);

  useEffect(() => {
    const reqParams = {
      page: 0,
      season: "current",
      sortValue: "",
      sortOrder: "",
    };
    listGameApi(reqParams);
  }, [userDeleteSuccess]);

  // const handleEditRound = (value, rowData) => {
  //   console.log(rowData?.rowData, "ROWDATA");
  //   console.log(rowData?.rowData[2], "ROUNDTYPE");
  //   dispatch(setSelectedMode("edit"));

  //   const formattedStartDate = moment(rowData?.rowData[3].startDate).format(
  //     "L"
  //   );
  //   const formattedEndDate = moment(rowData?.rowData[3].endDate).format("L");
  //   const payload = [
  //     {
  //       roundno: rowData?.rowData[0],
  //       roundname: rowData?.rowData[1],
  //       roundtype: rowData?.rowData[2],
  //       sportId: rowData?.rowData[3]._id,
  //       startDate: formattedStartDate,
  //       endDate: formattedEndDate,
  //       roundId: rowData?.rowData[4],
  //     },
  //   ];
  //   dispatch(getRoundsDataForEdit(payload));
  //   dispatch(updateModalVisibility(true));
  // };

  const columns = [
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
      name: "round",
      label: "Round No",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.roundno}</Box>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "round",
      label: "Round ",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.roundname}</Box>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },

    {
      name: "homeTeam",
      label: "Home Team",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.teamname}</Box>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "awayTeam",
      label: "Away Team",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.teamname}</Box>
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
                <VisibilityIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                />
                <CheckCircleIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                />

                <DeleteIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                  onClick={() => openModal(value, "delete")}
                />
                <EditIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                  // onClick={() => handleEditRound(value, rowData)}
                />
                <SendIcon sx={{ cursor: "pointer", color: "#9f8e8ede" }} />
                <HourglassTopIcon
                  onClick={() => openModal(value, "started", rowData)}
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
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
            total={gameData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={listGameApi}
            userData={gameData?.data}
            isLoading={teamDataFetching}
          />
        </>
      );
    },
  };
  useEffect(() => {
    dispatch(setCurrentModule("game"));
  }, []);

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Game</ManageUsersHeading>
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
                teamListApi={listGameApi}
                teamListData={listGamesData}
                userListSuccess={listGameSuccess}
                mode="game"
              />

              <AddGameModal
                data={listSportData}
                listSportApi={listSportApi}
                listRoundsApi={listRoundsApi}
                onClose={() => dispatch(updateModalVisibility(false))}
                roundData={roundData}
                gameData={gameData}
                allTeamData={allTeamData}
                addGameApi={addGameApi}
              />
            </Box>
          </Box>
          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={gameData?.data}
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
export default ManageGame;
