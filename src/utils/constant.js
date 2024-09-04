import GroupsIcon from "@mui/icons-material/Groups";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// =============  dashboad Icons ====================================

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { manageGameSelector } from "../slices/manageGame/manageGameSelector";
import moment from "moment";

// ================= URL ==================

export const BASE_URL = "http://localhost:3019/";
// const { filteredGameData } = useSelector(manageGameSelector);
// const formattedRoundStartDate = moment(
//   filteredGameData[0].round.startDate
// ).format("ddd MMM DD YYYY");
// const formattedRoundEndDate = moment(filteredGameData[0].round.endDate).format(
//   "ddd MMM DD YYYY"
// );
// const formattedGameDate = moment(filteredGameData[0].gameDate).format(
//   "ddd MMM DD YYYY"
// );
// const formattedGameTime = moment(filteredGameData[0].gameDate).format("HH:mm");

export const LOGIN_DATA = [
  {
    ID: 0,
    NAME: "email",
    LABEL: "Email",
    RMESSAGE: "Email is required",
    REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    RXMESSAGE: "Please enter a valid email",
  },
  {
    ID: 1,
    NAME: "password",
    LABEL: "Password",
    RMESSAGE: "Password is required",
    REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
];

export const ADMIN_LIST = [
  {
    label: "Dashboard",
    route: "/admin/dashboard",
    icon: <DashboardIcon sx={{ color: "white" }} />,
  },
  {
    label: "Manage Users",
    route: "/admin/users",
    icon: <PersonIcon sx={{ color: "white" }} />,
  },
  {
    label: "Messaging",
    route: "/admin/messaging",
    icon: <EmailIcon sx={{ color: "white" }} />,
  },
];
export const MASTER_SUBHEADINGS = [
  {
    id: 1,
    label: "Manage Sports",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/sport",
  },
  {
    id: 2,
    label: "Manage Team",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/team",
  },
  {
    id: 3,
    label: "Manage Round",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/round",
  },
  {
    id: 4,
    label: "Manage Game",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/game",
  },
  {
    id: 5,
    label: "Manage Comp...",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/competition",
  },
];

export const ADMIN_LIST_TWO = [
  {
    label: "Article",
    route: "/admin/ladder",
    icon: <DashboardIcon sx={{ color: "white" }} />,
  },
  {
    label: "Banter",
    route: "/admin/banter",
    icon: <PersonIcon sx={{ color: "white" }} />,
  },
];
export const CMS_LIST = [
  {
    label: "FAQs",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/questions",
  },
  {
    label: "Rules",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/content",
  },
];
export const ADS_LIST = [
  {
    label: "Ads",
    route: "/admin/ads",
    icon: <DashboardIcon sx={{ color: "white" }} />,
  },
  {
    label: "Report",
    route: "/admin/adreport",
    icon: <PersonIcon sx={{ color: "white" }} />,
  },
];
export const ADMIN_LIST_THREE = [
  {
    label: "Manage Ver...",
    route: "/admin/version",
    icon: <DashboardIcon sx={{ color: "white" }} />,
  },
  {
    label: "Secret Comp",
    route: "/admin/secretcomp",
    icon: <PersonIcon sx={{ color: "white" }} />,
  },
];

export const DASHBOARD_CARD_DATA = [
  {
    icons: <GroupsIcon sx={{ fontSize: "40px" }} />,
    heading: "Total Users",
    countNumber: "0",
    subHeading: "20% From last year",
  },
  {
    icons: <SportsSoccerIcon sx={{ fontSize: "40px" }} />,
    heading: "Total Sports",
    countNumber: "0",
    subHeading: "20% From last year",
  },
  {
    icons: <EmojiEventsIcon sx={{ fontSize: "40px" }} />,
    heading: "Total Competitions",
    countNumber: "0",
    subHeading: "20% From last year",
  },
];
export const ANALYSIS_CARD_DATA = [
  {
    icons: <SportsSoccerIcon sx={{ fontSize: "40px" }} />,
    heading: "Total Sports",
    countNumber: "24,895",
    subHeading: "20% From last year",
  },
  {
    icons: <EmojiEventsIcon sx={{ fontSize: "40px" }} />,
    heading: "Total Competitions",
    countNumber: "24,895",
    subHeading: "20% From last year",
  },
];

export const menu_icon = [
  {
    iconss: <MenuIcon />,
  },
];

export const ADD_SPORT_DATA = [
  {
    ID: 0,
    NAME: "sportname",
    LABEL: "Sport Name",
    RMESSAGE: "Please enter sport",
    category: "inputTop",
    // REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    // RXMESSAGE: "Please enter a valid email",
  },
  {
    ID: 1,
    NAME: "description",
    LABEL: "Description",
    RMESSAGE: "Please enter description",
    category: "inputTop",
    // REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  {
    ID: 3,
    NAME: "startDate",
    LABEL: "Select start date and end date",
    RMESSAGE: "Please enter date range",
    category: "date",
    // REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  {
    ID: 4,
    NAME: "type",
    LABEL: "Sport Type",
    RMESSAGE: "Please enter sport type",
    category: "select",
    // REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  {
    ID: 5,
    NAME: "bonus",
    LABEL: "Round Bonus",
    RMESSAGE: "Please select Bounus type",
    category: "select",
    // REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  {
    ID: 6,
    NAME: "stack",
    LABEL: "MULTI CALCULATOR STAKE VALUE",
    RMESSAGE: "Please select Bounus type",
    category: "inputDown",
    // REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
];

///////////////////////////// filtered game data
// export const FILTERED_PAYLOAD = [
//   {
//     id: 1,
//     title: "Sports:",
//     content: filteredGameData[0].sport.sportname,
//   },
//   {
//     id: 2,
//     title: "Season:",
//     content: filteredGameData[0].season,
//   },
//   {
//     id: 3,
//     title: "Round No:",
//     content: filteredGameData[0].round.roundno,
//   },
//   {
//     id: 4,
//     title: "Round Name:",
//     content: filteredGameData[0].round.roundname,
//   },
//   {
//     id: 5,
//     title: "Round Start Date:",
//     content: formattedRoundStartDate,
//   },
//   {
//     id: 6,
//     title: "Round End Date:",
//     content: formattedRoundEndDate,
//   },
//   {
//     id: 7,
//     title: "Home Team:",
//     content: filteredGameData[0].homeTeam.teamname,
//   },
//   {
//     id: 8,
//     title: "Away Team:",
//     content: filteredGameData[0].awayTeam.teamname,
//   },
//   {
//     id: 9,
//     title: "Home Team Points:",
//     content: filteredGameData[0].homeTeamPoints,
//   },
//   {
//     id: 10,
//     title: "Away Team Points:",
//     content: filteredGameData[0].awayTeamPoints,
//   },
//   {
//     id: 11,
//     title: "Date:",
//     content: formattedGameDate,
//   },
//   {
//     id: 12,
//     title: "Time:",
//     content: formattedGameTime,
//   },
//   {
//     id: 13,
//     title: "Winner:",
//     content: filteredGameData[0].winningTeam,
//   },
//   {
//     id: 14,
//     title: "Home Topsport Odds:",
//     content: filteredGameData[0].homeTopTipperPoints,
//   },
//   {
//     id: 15,
//     title: "	Away Topsport Odds:",
//     content: filteredGameData[0].awayTopTipperPoints,
//   },
//   {
//     id: 16,
//     title: "Draw Point:",
//     content: filteredGameData[0].drawPoints,
//   },
//   {
//     id: 17,
//     title: "Event ID:",
//     content: filteredGameData[0].eventId,
//   },
//   {
//     id: 18,
//     title: "Kingbot Tipping:",
//     content: filteredGameData[0].kingbotTipping,
//   },
// ];
