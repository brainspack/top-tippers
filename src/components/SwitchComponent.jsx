import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { handleNotification } from "../slices/Snackbar";

const ControlledSwitches = ({
  statusChangeApi,
  value,
  rowData,
  deactivateUserData,
}) => {
  const [checked, setChecked] = useState(value);
  const dispatch = useDispatch();
  const handleChange = async (event) => {
    const userId = rowData.rowData[5];
    const teamId = rowData.rowData[4];
    if (userId) {
      const response = await statusChangeApi({ userId: userId }).unwrap();
      if (response?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: response?.message,
            severity: response?.code,
          })
        );
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: response?.message,
            severity: response?.code,
          })
        );
      }
    } else if (teamId) {
      const response = await statusChangeApi({ teamId: teamId }).unwrap();
      if (response?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: response?.message,
            severity: response?.code,
          })
        );
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: response?.message,
            severity: response?.code,
          })
        );
      }
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
