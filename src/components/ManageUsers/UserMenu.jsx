import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DropDownBox } from "./ManangeUsersStyled";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useDownloadCsvByNameMutation } from "../../api/DownloadCsv";
import { Box } from "@mui/material";

export default function UserMenu({ disabledUserApi }) {
  const disabledUser = async () => {
    const response = await disabledUserApi();
    if (response === 200) {
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // export csv
  const [downloadCsvByName, { data: downloadCsvData }] =
    useDownloadCsvByNameMutation();

  const handleDownloadCsv = async () => {
    try {
      const response = await downloadCsvByName().unwrap();
      const csvData = response.data;

      if (Array.isArray(csvData)) {
        const filteredData = csvData.map(({ name, email }) => ({
          name,
          email,
        }));

        const csvString = convertArrayToCSV(filteredData);
        downloadCSVFile(csvString, "users_data.csv");
      } else {
        console.error("Expected data to be an array but got:", csvData);
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const convertArrayToCSV = (array) => {
    const headers = Object.keys(array[0]);

    const rows = array.map((obj) =>
      headers.map((header) => obj[header]).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  };

  const downloadCSVFile = (csvString, fileName) => {
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <DropDownBox onClick={handleClick}>
        <MenuOpenIcon />
      </DropDownBox>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="user-menu" onClick={disabledUser}>
          Disable User
        </MenuItem>
        <MenuItem className="user-menu" onClick={handleClose}>
          Sample File to Export{" "}
        </MenuItem>
        <MenuItem className="user-menu" onClick={handleClose}>
          Map Users to Top Sport{" "}
        </MenuItem>
        <MenuItem className="user-menu" onClick={handleDownloadCsv}>
          Export Csv{" "}
        </MenuItem>
      </Menu>
    </Box>
  );
}
