import { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoImage from "../../images/toptippers.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import useWindowWidth from "./useWindowWidth";
import BasicMenu from "./ProfileMenu";
import {
  ADMIN_LIST,
  ADMIN_LIST_TWO,
  MASTER_SUBHEADINGS,
} from "../../utils/constant";
import { useMediaQuery } from "@mui/material";
import CustomAccordion from "../reuse/CustomAccordian";
// import CustomAccordian from "./AccordianCustom";

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

const DashboardComponent = ({ content }) => {
  // const [expanded, setExpanded] = useState(false);
  // const handleAccordionToggle = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  // const location = useLocation();
  // useEffect(() => {
  //   if (MASTER_SUBHEADINGS.some((ele) => ele.route === location.pathname)) {
  //     setExpanded("masterPanel");
  //   } else {
  //     setExpanded(false);
  //   }
  // }, [location.pathname]);

  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  useEffect(() => {
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

  const [state, setState] = useState({
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
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "#383434",
        // border: "1px solid red",
      }}
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
            marginLeft: "10px",
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
        {/* <Accordion
          className="accordion-master"
          elevation={0}
          expanded={expanded === "masterPanel"} // Control expansion based on state
          onChange={handleAccordionToggle("masterPanel")} // Handle accordion expansion
        >
          <AccordionSummary
            className="accordion-master"
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <SpaceDashboardIcon sx={{ color: "white", marginRight: "32px" }} />
            Master
          </AccordionSummary>
          {MASTER_SUBHEADINGS.map((ele) => (
            <>
              <NavLink
                to={ele.route}
                className={"drawer-routes drawer-nav"}
                key={ele.label} // Ensure unique key
                onClick={(e) => e.stopPropagation()}
                // onClick={() => setExpanded("masterPanel")} // Keep accordion open on click
              >
                <AccordionDetails
                  className="master-subheadings"
                  onClick={(e) => e.stopPropagation()}
                >
                  {ele.icon}

                  {ele.label}
                </AccordionDetails>
              </NavLink>
            </>
          ))}
        </Accordion> */}
        {/* <CustomAccordian /> */}
        {/* <CustomAccordion /> */}
      </List>
      <Divider />
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
                  <Fragment key={anchor}>
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
                  </Fragment>
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
        {/* sx={{ border: "1px solid red" }} */}
        {/* drawer-nav */}
        <List>
          {ADMIN_LIST.map((text, index) => (
            <NavLink
              className={"drawer-routes drawer-nav"}
              to={text.route}
              key={text}
              disablePadding
            >
              <ListItemButton disableRipple>
                <ListItemIcon>{text.icon}</ListItemIcon>

                <ListItemText primary={text.label} />
                {text.label === "Master" ? <KeyboardArrowDownIcon /> : ""}
              </ListItemButton>
            </NavLink>
          ))}
          {/* <Accordion
            className="accordion-master"
            elevation={0}
            expanded={expanded === "masterPanel"} // Control expansion based on state
            onChange={handleAccordionToggle("masterPanel")} // Handle accordion expansion
          >
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
                <NavLink
                  to={ele.route}
                  className={"drawer-routes drawer-nav"}
                  key={ele.label}
                  // onClick={(e) => e.stopPropagation()}
                  onClick={() => setExpanded("masterPanel")}
                >
                  <AccordionDetails
                    className="master-subheadings"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {ele.icon}

                    {ele.label}
                  </AccordionDetails>
                </NavLink>
              </>
            ))}
          </Accordion> */}
          {/* <CustomAccordian /> */}
          <CustomAccordion data={MASTER_SUBHEADINGS} />
          {/* <CustomAccordion data={ADMIN_LIST_TWO} /> */}
          {ADMIN_LIST_TWO.map((text, index) => (
            <NavLink
              className={"drawer-routes drawer-nav"}
              to={text.route}
              key={text}
              disablePadding
            >
              <ListItemButton disableRipple>
                <ListItemIcon>{text.icon}</ListItemIcon>

                <ListItemText primary={text.label} />
                {text.label === "Master" ? <KeyboardArrowDownIcon /> : ""}
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <Main sx={{ backgroundColor: "#fafafb" }} open={open}>
        <DrawerHeader />
        {content}
      </Main>
    </Box>
  );
};

export default DashboardComponent;
