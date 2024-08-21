import GroupsIcon from "@mui/icons-material/Groups";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// =============  dashboad Icons ====================================

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuIcon from "@mui/icons-material/Menu";

// ================= URL ==================

export const BASE_URL = "http://localhost:3019/";

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
    label: "Manage Sports",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/sport",
  },
  {
    label: "Manage Team",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/team",
  },
  {
    label: "Manage Round",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/round",
  },
  {
    label: "Manage Game",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/game",
  },
  {
    label: "Manage Comp...",
    icon: <NavigateNextIcon sx={{ color: "white" }} />,
    route: "/admin/competition",
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
