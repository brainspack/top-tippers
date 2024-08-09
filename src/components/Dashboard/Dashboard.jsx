import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoImage from "../../images/toptippers.svg";
import BasicMenu from "./ProfileMenu";
import { ADMIN_LIST, MASTER_SUBHEADINGS } from "../../utils/constant";
import DashboardContent from "../DashboardContent/DashboardContent";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ListItem, useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import useWindowWidth from "./useWindowWidth";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardComponent({ content }) {
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm")); // Checks if the screen width is >= 'sm'

  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (windowWidth < 899) {
      setOpen(false);
    }
  }, [windowWidth]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // ============== left ===================

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setOpen(false);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250, backgroundColor:"#383434" }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      elevation={0}
    >
      <List>
      <Box
            sx={{
              width: "95%",
              height: "44px",
              backgroundImage: `url(${LogoImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "90%",
              display: "flex",
              marginLeft:"10px",
              alignItems: "center",
            }}
          ></Box>
        {ADMIN_LIST.map((text, index) => (
          <NavLink
          className={"drawer-routes"}
          to={text.route}
          key={text}
          disablePadding
        >
          <ListItemButton disableRipple className={"drawer-nav"}>
            <ListItemIcon>{text.icon}</ListItemIcon>

            <ListItemText primary={text.label} />
            {text.label === "Master" ? <KeyboardArrowDownIcon /> : ""}
          </ListItemButton>
        </NavLink>
        ))}
        <Accordion className="accordion-master" elevation={0}>
            <AccordionSummary
              className="accordion-master"
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <SpaceDashboardIcon
                sx={{ color: "white", marginRight: "32px" }}
              />
              Master
            </AccordionSummary>
            {MASTER_SUBHEADINGS.map((ele) => (
              <>
                <NavLink to={ele.route} className={"drawer-routes drawer-nav"}>
                  <AccordionDetails className="master-subheadings">
                    {ele.icon}

                    {ele.label}
                  </AccordionDetails>
                </NavLink>
              </>
            ))}
          </Accordion>
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", position: "relative", zIndex: "1" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Box sx={{ display: "flex", padding: "0px 20px !important" }}>
          <>
            {windowWidth < 899 ? (
              <>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      {anchor}
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <IconButton
                // style={{color:"green"}}
                className="icon-bar"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </>

          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div" />
            <BasicMenu />
          </Toolbar>
        </Box>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box
            sx={{
              width: "100%",
              height: "30px",
              backgroundImage: `url(${LogoImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              display: "flex",
              alignItems: "center",
            }}
          ></Box>
          <IconButton className="drawer-icon-left" onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {ADMIN_LIST.map((text, index) => (
            <NavLink
              className={"drawer-routes"}
              to={text.route}
              key={text}
              disablePadding
            >
              <ListItemButton disableRipple className={"drawer-nav"}>
                <ListItemIcon>{text.icon}</ListItemIcon>

                <ListItemText primary={text.label} />
                {text.label === "Master" ? <KeyboardArrowDownIcon /> : ""}
              </ListItemButton>
            </NavLink>
          ))}
          <Accordion className="accordion-master" elevation={0}>
            <AccordionSummary
              className="accordion-master"
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <SpaceDashboardIcon
                sx={{ color: "white", marginRight: "32px" }}
              />
              Master
            </AccordionSummary>
            {MASTER_SUBHEADINGS.map((ele) => (
              <>
                <NavLink to={ele.route} className={"drawer-routes drawer-nav"}>
                  <AccordionDetails className="master-subheadings">
                    {ele.icon}

                    {ele.label}
                  </AccordionDetails>
                </NavLink>
              </>
            ))}
          </Accordion>
        </List>
      </Drawer>
      <Main sx={{ backgroundColor: "#fafafb" }} open={open}>
        <DrawerHeader />

        {/* <DashboardContent /> */}
        {content}
      </Main>
    </Box>
  );
}
