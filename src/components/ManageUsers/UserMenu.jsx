import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DropDownBox } from "./ManangeUsersStyled";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useDisabledUserByNameMutation } from "../../api/UserDisabled";
import { useDownlaodCsvByNameMutation } from "../../api/DownloadCsv";

export default function UserMenu() {
  const [disabledUserApi, { data, isLoading, error }] =
    useDisabledUserByNameMutation();

  const disabledUser = async () => {
    const result = await disabledUserApi();
    console.log(result, "DISABLED USER");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <DropDownBox onClick={handleClick}>
        <MenuOpenIcon />
      </DropDownBox>
      <Menu
        id="basic-menu"
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
        <MenuItem className="user-menu">Export Csv </MenuItem>
      </Menu>
    </div>
  );
}
