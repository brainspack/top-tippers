import GroupsIcon from "@mui/icons-material/Groups";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
export const BASE_URL = "http://54.201.160.69:3019/";
export const LOGIN_DATA = [
  {
    ID: 0,
    NAME: "email",
    LABEL: "Email",
    RMESSAGE: "Please  Enter the Email",
    REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    RXMESSAGE: "Please enter a valid email",
  },
  {
    ID: 1,
    NAME: "password",
    LABEL: "Password",
    RMESSAGE: "Please  Enter the Password",
    REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    // RXMESSAGE:
    //   "Password should be of at least  8 characters, one capital letter, and one number. and one special character.",
  },
];

export const adminList = [
  { label: "Dashboard", route: "dashboard" },
  { label: "Manage Users", route: "users" },
  { label: "Messaging", route: "messaging" },
  { label: "Master", route: "master" },
];

export const DASHBOARD_CARD_DATA = [
  {
    icons:<GroupsIcon sx={{fontSize:"40px"}} />,
    heading:"Total Users",
    countNumber:"",
    subHeading :"20% From last year"
  },
  {
    icons:<SportsSoccerIcon sx={{fontSize:"40px"}} />,
    heading:"Total Sports",
    countNumber:"",
    subHeading :"20% From last year"
  },{
    icons:<EmojiEventsIcon sx={{fontSize:"40px"}} />,
    heading:"Total Competitions",
    countNumber:"",
    subHeading :"20% From last year"
  }
]
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
