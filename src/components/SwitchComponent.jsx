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
  const [checked, setChecked] = useState(false);
  console.log(checked, "CHECKED");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const userId = rowData.rowData[5];
    const teamId = rowData.rowData[4];
    const sportsInviteId = rowData.rowData[6];
    console.log(sportsInviteId, "INSIDE SPORTS ID");
    setChecked(event.target.checked);
    if (userId) {
      statusChangeApi({ userId: userId });
    } else if (teamId) {
      statusChangeApi({ teamId: teamId });
    }
    // if (sportsInviteId) {
    //   statusChangeApi({
    //     sportId: sportsInviteId,
    //     isInviteCompButton: event.target.checked,
    //   });
    //   console.log(deactivateUserData?.message, "deactivateUserData?.message");
    // }

    if (deactivateUserData?.code === 200) {
      dispatch(
        handleNotification({
          state: true,
          message: deactivateUserData?.message,
          severity: deactivateUserData?.code,
        })
      );
    } else {
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
