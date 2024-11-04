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
  console.log(deactivateUserData?.message, "deactivateUserData?.message");
  const [checked, setChecked] = useState(value);
  console.log(checked, "CHECKED");
  const dispatch = useDispatch();
  const handleChange = async (event) => {
    const isChecked = event.target.checked;
    const sportsInviteId = rowData.rowData[6];

    if (sportsInviteId) {
      try {
        const response = await statusChangeApi({
          sportId: sportsInviteId,
          isInviteCompButton: isChecked,
        }).unwrap();

        console.log(response, "res");

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
      } catch (error) {
        dispatch(
          handleNotification({
            state: true,
            message: "An error occurred",
            severity: "error",
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
export default SportControlledSwitches;
