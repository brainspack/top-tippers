import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Tooltip } from "@mui/material";
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
  getGameDataForEdit,
  setSelectedGameMode,
  updateAllTeamData,
  updateDeclareWinnerData,
  updateDeclareWinnerModalState,
  updateFilteredGameData,
  updateGameList,
  updateGameModalData,
  updateGameModalState,
} from "../../slices/manageGame/manageGame";
import AddGameModal from "./AddGameModal";
import { useAddGameByNameMutation } from "../../api/AddNewGame";
import { useUpdateGameByNameMutation } from "../../api/UpdateGame";
import { useSendGameNotificationApiByNameMutation } from "../../api/SendGameStartNotification";
import { isDayjs } from "dayjs";
import GameDetailsModal from "./GameDetailsModal";
import { FILTERED_PAYLOAD } from "../../utils/constant";
import DeclareWinnerModal from "./manageGame/DeclareWinnerModal";

const ManageGame = () => {
  const dispatch = useDispatch();
  const { roundData } = useSelector(manageRoundSelector);
  const { gameData, allTeamData, editGameData, selectedGameMode } =
    useSelector(manageGameSelector);
  // console.log(gameData, "GAME DATA");

  console.log(gameData, "sjajas");

  const { sportData } = useSelector(manageSportSelector);
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

  // Update Game Api
  const [
    updateGameApi,
    {
      data: updateGameData,
      isLoading: updateGameLoading,
      isSuccess: updateGameSuccess,
    },
  ] = useUpdateGameByNameMutation();

  // GAME NOTICATION API
  const [startGameNotificationApi, { data: startGameData }] =
    useSendGameNotificationApiByNameMutation();

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
  }, [userDeleteSuccess, addGameSuccess, updateGameSuccess]);

  const handleEditGame = (value) => {
    const filterData = gameData?.data?.filter((ele) => {
      return ele?._id === value;
    });
    console.log(filterData, "filterData");
    dispatch(getGameDataForEdit(filterData));
    dispatch(setSelectedGameMode("editGame"));
    dispatch(updateModalVisibility(true));
  };

  const onSendGameNotification = async (value) => {
    const response = await startGameNotificationApi({
      gameId: value,
      selectedSeason: "current",
    }).unwrap();
  };
  const onOpenDeclareWinnerModal = (value) => {
    const filterUpdateGameResultData = listGamesData?.data?.filter((ele) => {
      return ele?._id === value;
    });
    dispatch(updateDeclareWinnerData(filterUpdateGameResultData));

    dispatch(updateDeclareWinnerModalState(true));
  };
  const onOpenGameModal = (value) => {
    const filterGameData = listGamesData?.data?.filter((ele) => {
      return ele?._id === value;
    });
    dispatch(updateFilteredGameData(filterGameData));
    console.log(filterGameData, "HELLO");
    const formattedRoundStartDate = moment(
      filterGameData[0].round.startDate
    ).format("ddd MMM DD YYYY");
    const formattedRoundEndDate = moment(
      filterGameData[0].round.endDate
    ).format("ddd MMM DD YYYY");
    const formattedGameDate = moment(filterGameData[0].gameDate).format(
      "ddd MMM DD YYYY"
    );
    const formattedGameTime = moment(filterGameData[0].gameTime).format(
      "HH:mm"
    );
    console.log(formattedGameTime, "formattedGameTime");

    const payload = [
      {
        id: 1,
        title: "Sports:",
        content: filterGameData[0]?.sport.sportname,
      },
      {
        id: 2,
        title: "Season:",
        content: filterGameData[0]?.season,
      },
      {
        id: 3,
        title: "Round No:",
        content: filterGameData[0]?.round.roundno,
      },
      {
        id: 4,
        title: "Round Name:",
        content: filterGameData[0]?.round.roundname,
      },
      {
        id: 5,
        title: "Round Start Date:",
        content: formattedRoundStartDate,
      },
      {
        id: 6,
        title: "Round End Date:",
        content: formattedRoundEndDate,
      },
      {
        id: 7,
        title: "Home Team:",
        content: filterGameData[0]?.homeTeam.teamname,
      },
      {
        id: 8,
        title: "Away Team:",
        content: filterGameData[0]?.awayTeam.teamname,
      },
      {
        id: 9,
        title: "Home Team Points:",
        content: filterGameData[0]?.homeTeamPoints,
      },
      {
        id: 10,
        title: "Away Team Points:",
        content: filterGameData[0]?.awayTeamPoints,
      },
      {
        id: 11,
        title: "Date:",
        content: formattedGameDate,
      },
      {
        id: 12,
        title: "Time:",
        content: formattedGameTime,
      },
      {
        id: 13,
        title: "Winner:",
        content: filterGameData[0]?.winningTeam,
      },
      {
        id: 14,
        title: "Home Topsport Odds:",
        content: filterGameData[0]?.homeTopTipperPoints,
      },
      {
        id: 15,
        title: "	Away Topsport Odds:",
        content: filterGameData[0]?.awayTopTipperPoints,
      },
      {
        id: 16,
        title: "Draw Point:",
        content: filterGameData[0]?.drawPoints,
      },
      {
        id: 17,
        title: "Event ID:",
        content: filterGameData[0]?.eventId,
      },
      {
        id: 18,
        title: "Kingbot Tipping:",
        content: filterGameData[0]?.kingbotTipping,
      },
    ];
    dispatch(updateGameModalData(payload));
    dispatch(updateGameModalState(true));
  };
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
                <Tooltip title="View Details" placement="top" arrow>
                  <VisibilityIcon
                    sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                    onClick={() => onOpenGameModal(value)}
                  />
                </Tooltip>

                {gameData?.data?.map((e) => {
                  if (e._id === value) {
                    return e.gameState === "open" ? (
                      <>
                        <Tooltip title="Declare Winner" placement="top" arrow>
                          <CheckCircleIcon
                            sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                            onClick={() => onOpenDeclareWinnerModal(value)}
                          />
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip
                        title="Winner Already Declared"
                        placement="top"
                        arrow
                      >
                        <CheckCircleIcon
                          sx={{ cursor: "not-allowed", color: "#d3d3d3" }}
                        />
                      </Tooltip>
                    );
                  }
                })}

                <Tooltip title="Delete" placement="top" arrow>
                  <DeleteIcon
                    sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                    onClick={() => openModal(value, "delete")}
                  />
                </Tooltip>
                <Tooltip title="Edit" placement="top" arrow>
                  <EditIcon
                    sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                    onClick={() => handleEditGame(value, rowData)}
                  />
                </Tooltip>

                {gameData?.data?.map((e) => {
                  if (e._id === value) {
                    return e.winningTeam === "" ? (
                      <>
                        <Tooltip
                          title="Send Game Start Notification"
                          placement="top"
                          arrow
                        >
                          <SendIcon
                            sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                            onClick={() => onSendGameNotification(value)}
                          />
                        </Tooltip>
                        <Tooltip title="Start Game" placement="top" arrow>
                          <HourglassTopIcon
                            onClick={() => openModal(value, "started", rowData)}
                            sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                          />
                        </Tooltip>
                      </>
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
                updateGameApi={updateGameApi}
                initialData={
                  selectedGameMode === "editGame" ? editGameData : ""
                }
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
            <GameDetailsModal
              onClose={() => dispatch(updateGameModalState(false))}
              handleOpen={onOpenGameModal}
            />
            <DeclareWinnerModal
              onClose={() => dispatch(updateDeclareWinnerModalState(false))}
              addGameApi={addGameApi}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageGame;
