import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { handleNotification } from "../slices/Snackbar";

const ControlledSwitches = ({
  statusChangeApi,
  value,
  rowData,
  deactivateUserData,
  content,
}) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const userId = rowData.rowData[5];
    // const teamId = rowData.rowData[4]
    setChecked(event.target.checked);
    statusChangeApi({ userId: userId });
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
};
export default ControlledSwitches;
