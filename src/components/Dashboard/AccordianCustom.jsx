import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MASTER_SUBHEADINGS } from "../../utils/constant";

const CustomAccordian = () => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
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
        <NavLink
          to={ele.route}
          className="drawer-routes drawer-nav"
          key={ele.label} // Ensure unique key
          onClick={(e) => e.stopPropagation()} // Prevent collapsing
        >
          <AccordionDetails
            className="master-subheadings"
            onClick={(e) => e.stopPropagation()} // Prevent collapsing
          >
            {ele.icon}
            {ele.label}
          </AccordionDetails>
        </NavLink>
      ))}
    </Accordion>
  );
};

export default CustomAccordian;
