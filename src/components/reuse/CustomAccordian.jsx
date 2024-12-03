import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { MASTER_SUBHEADINGS } from "../../utils/constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
const CustomAccordion = ({ data, accordianHeading }) => {
  const location = useLocation();
  const initialExpanded = data.some((ele) => ele.route === location.pathname)
    ? "masterPanel"
    : false;

  const [expanded, setExpanded] = useState(initialExpanded);
  //   const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (data.some((ele) => ele.route === location.pathname)) {
      setExpanded("masterPanel");
    } else {
      setExpanded(false);
    }
  }, [location.pathname]);

  return (
    <Accordion
      className={`accordion-master ${
        expanded === "masterPanel" ? "expanded" : "collapsed"
      }`}
      elevation={0}
      expanded={expanded === "masterPanel"}
      onChange={handleAccordionToggle("masterPanel")}
    >
      <AccordionSummary
        className="accordion-master"
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <SpaceDashboardIcon sx={{ color: "white", marginRight: "32px" }} />
        <Typography sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {accordianHeading}
        </Typography>
      </AccordionSummary>
      {data.map((ele) => (
        <NavLink
          to={ele.route}
          className="drawer-routes drawer-nav"
          //   className={({ isActive }) =>
          //     isActive
          //       ? "drawer-routes drawer-nav active"
          //       : "drawer-routes drawer-nav"
          //   }
          key={ele.label}
          //   onClick={(e) => e.stopPropagation()}
        >
          <AccordionDetails className="master-subheadings">
            {ele.icon}
            {ele.label}
          </AccordionDetails>
        </NavLink>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
