import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Tooltip, Typography } from "@mui/material";
import SportControlledSwitches from "./SportSwitchComponent";
import CustomPagination from "../reuse/CustomPagination";
import ControlledSwitches from "../SwitchComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

// SPORT TABLE

export const SPORT_TABLE_COLUMNS = (
  handleEditClick,
  openModal,
  handleSendOpen,
  userSetInvite,
  setInviteButtonData
) => {
  const columns = [
    {
      name: "sportname",
      label: "Sport Name",

      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "bonus",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
        customBodyRender: (value) => (
          <Typography>{value ? "Open" : "Close"}</Typography>
        ),
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
            color: "white",
            fontWeight: "600",
          },
        }),
        customBodyRender: (value, rowData) => (
          <>
            <Box display="flex" gap="10px">
              <EditIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => handleEditClick(rowData)}
              ></EditIcon>
              <DeleteIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => openModal(value, "delete")}
              />
              <SendIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => handleSendOpen(rowData)}
              />
            </Box>
          </>
        ),
      },
    },

    {
      name: "isInviteCompButton",
      label: "Invite&Comp Button",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
          },
        }),
        customBodyRender: (value, rowData) => {
          return (
            <SportControlledSwitches
              value={value}
              rowData={rowData}
              statusChangeApi={userSetInvite}
              deactivateUserData={setInviteButtonData}
            />
          );
        },
      },
    },
  ];
  return columns;
};

export const SPORT_OPTIONS = (sportData, userListSport, sportDataFetching) => {
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
            total={sportData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userListSport}
            userData={sportData?.data}
            isLoading={sportDataFetching}
          />
        </>
      );
    },
  };

  return options;
};

// TEAM TABLE

export const TEAM_TABLE_COLUMNS = (
  teamData,
  openModal,
  deactivateUser,
  deactivateUserData
) => {
  const navigate = useNavigate();

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
  return columns;
};

export const TEAM_OPTIONS = (teamData, teamList, teamDataFetching) => {
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

  return options;
};

// ROUND TABLE

export const ROUND_TABLE_COLUMNS = (handleEditRound, openModal) => {
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
                <EditIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                  onClick={() => handleEditRound(value, rowData)}
                />
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
  return columns;
};

// export const ROUND_OPTIONS = (roundData, listRoundsApi, teamDataFetching) => {
//   const options = {
//     filter: false,
//     download: false,
//     search: false,
//     print: false,
//     viewColumns: false,
//     selectableRows: false,
//     pagination: true,
//     rowsPerPage: 10,
//     customFooter: (page, rowsPerPage, changeRowsPerPage, changePage) => {
//       return (
//         <>
//           <CustomPagination
//             total={roundData?.totalCount}
//             page={page}
//             rowsPerPage={rowsPerPage}
//             changeRowsPerPage={changeRowsPerPage}
//             changePage={changePage}
//             userList={listRoundsApi}
//             userData={roundData?.data}
//             isLoading={teamDataFetching}
//           />
//         </>
//       );
//     },
//   };

//   return options;
// };

// GAME TABLE

export const GAME_TABLE_COLUMNS = (
  onSendGameNotification,
  onOpenDeclareWinnerModal,
  openModal,
  gameData,
  onOpenGameModal,
  handleEditGame
) => {
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
  return columns;
};

export const GAME_OPTIONS = (gameData, listGameApi, teamDataFetching) => {
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

  return options;
};

// COMPETITION TABLE

export const COMPETITION_TABLE_COLUMNS = (openModal) => {
  const columns = [
    {
      name: "competitionname",
      label: "Competition Name ",
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
      name: "joinedUserCount",
      label: "Total Joined User",
      options: {
        filter: true,
        sort: true,
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
                <RestartAltIcon
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                />
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
  return columns;
};

export const COMPETITION_OPTIONS = (
  roundData,
  listCompetitionApi,
  teamDataFetching
) => {
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
            userList={listCompetitionApi}
            userData={roundData?.data}
            isLoading={teamDataFetching}
          />
        </>
      );
    },
  };

  return options;
};
