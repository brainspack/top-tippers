import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import MUIDataTable from "mui-datatables";
import CustomPagination from "../reuse/CustomPagination";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import { useListAllUserApiByNameMutation } from "../../api/ListAllUser";
import {
  getFaqsDataForEdit,
  updateAddFaqsModalVisibility,
  updateModeForEdit,
} from "../../slices/FAQsSlice/faqs";
import { useSendMessageByNameMutation } from "../../api/SendMessage";
import { messagingSelector } from "../../slices/messaging/messagingSelector";
import {
  updateCurrentRowId,
  updateUserAllData,
} from "../../slices/messaging/messaging";
import { handleNotification } from "../../slices/Snackbar";
import { faqsDataSelector } from "../../slices/FAQsSlice/faqsSelectore";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import { Controller, useForm } from "react-hook-form";
import { updateAllTeamData } from "../../slices/manageGame/manageGame";
import { updateRoundList } from "../../slices/manageRound/manageRound";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { useTeamListByNameMutation } from "../../api/GetTeamList";
import { useListRoundsByNameMutation } from "../../api/ListRounds";
import { manageSportDataSelector } from "../../slices/manageSport/manageSportSelector";
import { updateSportData } from "../../slices/manageSport/manageSport";
import { manageGameSelector } from "../../slices/manageGame/manageGameSelector";
import { manageRoundSelector } from "../../slices/manageRound/manageRoundSelector";
import moment from "moment";
import { useLazyGetFilterGameRevelListApiByNameQuery } from "../../api/filterGameRevelList";
import { useLazyGetGameTippingCountApiByNameQuery } from "../../api/gametippingcount";
import { secretCompetitionSelector } from "../../slices/secretCompetition/secretCompetitionSelector";
import {
  updateActiveUsersData,
  updateFilterSecretAllData,
  updateSecretAllTeamData,
  updateTipDistributionData,
} from "../../slices/secretCompetition/secretCompetition";
import TipDistribution from "./TipDistributiion";
import adminTip from "../../images/tips_blank.png";
import question from "../../images/ant-design_question.svg";
import circle from "../../images/cil_check-circle.svg";
import close from "../../images/close-circle-outline.svg";
import { PROFILE_IMG_PATH } from "../../utils/constant";

const SecretCompetitionContent = () => {
  const dispatch = useDispatch();
  const { sportData } = useSelector(manageSportDataSelector);
  // const { secretAllTeamData } = useSelector(manageGameSelector);
  const { roundData } = useSelector(manageRoundSelector);
  const { tipDistributionData, activeUsersData, secretAllTeamData } =
    useSelector(secretCompetitionSelector);
  console.log(secretAllTeamData, "secretAllTeamData");

  /// LIST SPORT API
  const [
    listSportApi,
    { data: listSportData, error: listSportError, success: listSportSuccess },
  ] = useGetUserListSportApiByNameMutation();
  useEffect(() => {
    listSportApi({ count: 1000, isActive: true });
  }, []);
  useEffect(() => {
    if (listSportData?.data?.length > 0) {
      dispatch(updateSportData(listSportData));
    }
  }, [listSportData]);

  const [selectedSportId, setSelectedSportId] = useState("");

  const onHandleChange = (e) => {
    setSelectedSportId(e.target.value);
  };
  useEffect(() => {
    if (sportData?.data?.length > 0) {
      setSelectedSportId(sportData?.data[0]?._id);
    }
  }, [sportData]);
  /// TEAM LIST
  const [
    teamListApi,
    {
      data: teamListData,
      isLoading: teamDataFetching,
      isSuccess: userListSuccess,
    },
  ] = useTeamListByNameMutation();

  useEffect(() => {
    if (selectedSportId) {
      const fetchTeamList = async () => {
        try {
          const response = await teamListApi({
            count: 1000,
            sport: selectedSportId,
          }).unwrap();
          dispatch(updateSecretAllTeamData(response));
        } catch (err) {
          console.error("Error fetching sports data:", err);
        }
      };
      fetchTeamList();
    }
  }, [selectedSportId]);

  const [selectedTeamId, setSelectedTeamId] = useState("");
  console.log(selectedTeamId, "selectedTeamId");
  const [selectTeam, setSelectTeam] = useState([]);

  useEffect(() => {
    if (selectedSportId) {
      const filteredTeams = secretAllTeamData?.data?.filter(
        (team) => team?.sport?._id === selectedSportId
      );
      setSelectTeam(filteredTeams);
    }
  }, [selectedSportId, secretAllTeamData]);

  /// ROUND LIST

  const [
    listRoundsApi,
    {
      data: listRoundsData,
      isLoading: listRoundsLoading,
      error: listRoundsError,
      isSuccess: listRoundsSuccess,
    },
  ] = useListRoundsByNameMutation();
  useEffect(() => {
    if (selectedSportId) {
      const fetchRound = async () => {
        try {
          const response = await listRoundsApi({
            count: 50,
            sortOrder: 1,
            sortValue: "createdAt",
            sportId: selectedSportId,
          }).unwrap();
          dispatch(updateRoundList(response));
        } catch (err) {
          console.error("Error fetching sports data:", err);
        }
      };

      fetchRound();
    }
  }, [selectedSportId]);

  ///// Round data
  const [roundsState, setRoundsState] = useState({
    filteredRounds: [],
    selectedRound: "",
  });

  useEffect(() => {
    if (listRoundsSuccess && selectedSportId && roundData?.data?.length > 0) {
      const currentDate = moment().format("YYYY-MM-DD");

      const currentRound = roundData?.data?.find((round) => {
        const startDate = moment.utc(round?.startDate).format("YYYY-MM-DD");
        const endDate = moment.utc(round?.endDate).format("YYYY-MM-DD");

        return (
          round?.sport?._id === selectedSportId &&
          startDate <= currentDate &&
          currentDate <= endDate
        );
      });

      const allRounds = roundData?.data?.filter(
        (round) => round?.sport?._id === selectedSportId
      );

      let selectedRound = currentRound;
      if (!selectedRound && allRounds.length > 0) {
        selectedRound = allRounds.reduce((closest, round) => {
          const endDate = moment.utc(round?.endDate).format("YYYY-MM-DD");
          const daysDiff = Math.abs(moment(endDate).diff(currentDate, "days"));

          if (!closest || daysDiff < closest.daysDiff) {
            return { ...round, daysDiff };
          }

          return closest;
        }, null);
      }

      setRoundsState({
        filteredRounds: allRounds,
        selectedRound: selectedRound ? selectedRound?._id : "",
      });
    } else {
      setRoundsState({
        filteredRounds: [],
        selectedRound: "",
      });
    }
  }, [selectedSportId, roundData, listRoundsSuccess]);

  ///// useLazyGetFilterGameRevelListApiByNameQuery
  const [
    filterGameRevelListApi,
    { data: filterGameRevelListData, isLoading: isLoading },
  ] = useLazyGetFilterGameRevelListApiByNameQuery();

  useEffect(() => {
    if (filterGameRevelListData?.data?.docs?.length > 0) {
      dispatch(updateFilterSecretAllData(filterGameRevelListData));
    }
  }, [filterGameRevelListData]);

  useEffect(() => {
    if (listRoundsSuccess) {
      if (selectedSportId && roundsState?.selectedRound) {
        filterGameRevelListApi({
          round: roundsState?.selectedRound,
          sport: selectedSportId,
          teamId: selectedTeamId,
          limit: 30,
        });
      }
    }
  }, [
    selectedSportId,
    roundsState?.selectedRound,
    listRoundsSuccess,
    selectedTeamId,
  ]);

  ////////////////////////// gameTippingCountApi

  const [gameTippingCountApi, { data: gameTippingCountData }] =
    useLazyGetGameTippingCountApiByNameQuery();
  console.log(gameTippingCountData, "gameTippingCountData");
  useEffect(() => {
    if (gameTippingCountData?.data?.gameDetailAndTipping.length > 0) {
      dispatch(updateTipDistributionData(gameTippingCountData));
    }
  }, [gameTippingCountData]);

  useEffect(() => {
    if (listRoundsSuccess) {
      if (selectedSportId && roundsState?.selectedRound) {
        gameTippingCountApi({
          round: roundsState?.selectedRound,
          sport: selectedSportId,
        });
      }
    }
  }, [selectedSportId, roundsState?.selectedRound, listRoundsSuccess]);

  useEffect(() => {
    if (
      selectedSportId &&
      roundsState?.selectedRound &&
      tipDistributionData?.data?.usercount
    ) {
      dispatch(updateActiveUsersData(tipDistributionData?.data?.usercount));
    }
  }, [selectedSportId, tipDistributionData, roundsState?.selectedRound]);

  const columns = [
    {
      name: "userId",
      label: "User",
      options: {
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
        customBodyRender: (data) => {
          const user = filterGameRevelListData?.data?.docs?.find(
            (e) => e?.userId === data
          );

          return user ? (
            <Box sx={{ display: "flex", gap: "15px" }}>
              <Avatar src={PROFILE_IMG_PATH + user?.profilePhoto} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>{user?.name}</Typography>
              </Box>
            </Box>
          ) : null;
        },
      },
    },
    {
      name: "index",
      label: "Rank",
      options: {
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const currentPage = tableMeta.tableState.page;
          const rowsPerPage = tableMeta.tableState.rowsPerPage;
          const pageIndex = tableMeta.rowIndex + 1; // Row index on the current page
          const continuousIndex = currentPage * rowsPerPage + pageIndex;
          return continuousIndex;
        },
      },
    },
    {
      name: "roundpoint",
      label: "Round Point",
      options: {
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
        customBodyRender: (value) => {
          return value?.toFixed(2);
        },
      },
    },
    {
      name: "seasonPoints",
      label: "Session Point",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "black",
          },
        }),
      },
    },

    {
      name: "games",
      label: "Team Logos",
      options: {
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
        customBodyRender: (ele) => {
          return (
            <Box sx={{ display: "flex", gap: "5px" }}>
              {ele.map((game, index) => {
                const imgLogo = (game) => {
                  if (
                    game?.gameState === "started" ||
                    game?.gameState === "finished" ||
                    game?.gameState === "open"
                  ) {
                    let obj1 = {
                      home: game?.homeTeam?.teamLogo,
                      away: game?.awayTeam?.teamLogo,
                    };
                    return game?.tippingAddedBy === "admin"
                      ? adminTip
                      : obj1[game.tipping];
                  } else {
                    return question;
                  }
                };

                let winingLogo =
                  game?.winningTeam?.toLowerCase() ===
                  game?.tipping?.toLowerCase();

                return (
                  <Box key={index} className="secretCompLogoBox">
                    <img
                      src={imgLogo(game) || question}
                      alt="team logo"
                      className="logoImg"
                    />
                    {game.winningTeam !== "" && (
                      <span>
                        <img
                          src={winingLogo ? circle : close}
                          alt={winingLogo ? "correct" : "incorrect"}
                          className="verifiedImg"
                        />
                      </span>
                    )}
                  </Box>
                );
              })}
            </Box>
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
    pagination: true,
    rowsPerPage: filterGameRevelListData?.data?.limit,
    selectableRows: false,
    responsive: "standard",
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <>
          <CustomPagination
            total={filterGameRevelListData?.data?.totalDocs}
            page={filterGameRevelListData?.data?.page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={filterGameRevelListApi}
            isLoading={isLoading}
            round={roundsState?.selectedRound}
            sport={selectedSportId}
          />
        </>
      );
    },
  };

  useEffect(() => {
    dispatch(setCurrentModule("secretComp"));
  }, []);

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>SecretComp</ManageUsersHeading>

            <Box
              className="selectWrappper"
              style={{
                width: "20%",
              }}
            >
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSportId}
                  onChange={onHandleChange}
                >
                  {sportData?.data?.map((sport) => (
                    <MenuItem key={sport?._id} value={sport?._id}>
                      {sport?.sportname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              className="selectWrappper"
              style={{
                width: "20%",
              }}
            >
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={roundsState.selectedRound}
                  onChange={(e) =>
                    setRoundsState((prevState) => ({
                      ...prevState,
                      selectedRound: e.target.value,
                    }))
                  }
                >
                  {roundsState?.filteredRounds?.map((round) => (
                    <MenuItem key={round?._id} value={round?._id}>
                      {round?.roundname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              className="selectWrappper"
              style={{
                width: "20%",
              }}
            >
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                >
                  {selectTeam?.map((team) => (
                    <MenuItem key={team?._id} value={team?._id}>
                      {team?.teamname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Active Users : {activeUsersData}</Typography>
            </Box>
          </Box>
          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={filterGameRevelListData?.data?.docs}
                columns={columns}
                options={options}
              />

              <TipDistribution
                tipDistributionData={tipDistributionData}
                activeUsersData={activeUsersData}
              />
            </ManageUserTableWrapper>
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default SecretCompetitionContent;
