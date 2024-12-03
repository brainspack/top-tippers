import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useGetAdminLoginByNameMutation } from "../../api/AdminLogin";

export default function BasicMenu() {
  // const [logIn, { data: responseData, isLoading, error, isSuccess }] =
  //   useGetAdminLoginByNameMutation();

  // console.log(responseData, "RESPONSEDATA");
  // console.log(responseData, "RESPONSEDATA");

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/admin/");
  };

  // const adminName = async (data) => {
  //   try {
  //     const result = await logIn({ body: data }).unwrap();
  //     console.log(result, "RESULT");
  //   } catch (err) {
  //     console.log(err, "the err");
  //   }
  //   await responseData;
  // };
  // console.log(responseData, "sjakj");

  // useEffect(() => {
  //   adminName();
  // }, []);
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 34, height: 34, marginRight: "7px" }}
        />{" "}
        {/* {responseData?.name} */}
        John Doe
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
