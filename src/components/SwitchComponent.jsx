import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { handleNotification } from "../slices/Snackbar";

export default function ControlledSwitches({
  statusChangeApi,
  value,
  rowData,
  deactivateUserData,
  userList,
}) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setChecked(event.target.checked);
    statusChangeApi({ userId: rowData.rowData[5] });
    if (deactivateUserData?.code === 200) {
      dispatch(
        handleNotification({
          state: true,
          message: deactivateUserData?.message,
          severity: deactivateUserData?.code,
        })
      );
    }
  };
  useEffect(() => {
    setChecked(value);
  }, [value]);
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
