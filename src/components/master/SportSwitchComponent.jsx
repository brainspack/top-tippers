import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { handleNotification } from "../../slices/Snackbar";
const SportControlledSwitches = ({
  statusChangeApi,
  value,
  rowData,
  deactivateUserData,
}) => {
  const [checked, setChecked] = useState(false);
  console.log(checked, "CHECKED");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const sportsInviteId = rowData.rowData[6];
    console.log(sportsInviteId, "INSIDE SPORTS ID");
    setChecked(event.target.checked);

    if (sportsInviteId) {
      statusChangeApi({
        sportId: sportsInviteId,
        isInviteCompButton: event.target.checked,
      });
      console.log(deactivateUserData?.message, "deactivateUserData?.message");
    }
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
export default SportControlledSwitches;
