import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { handleNotification } from "../slices/Snackbar";

const ControlledSwitches = ({ statusChangeApi, value, rowData }) => {
  const [checked, setChecked] = useState(value);
  const dispatch = useDispatch();
  const handleChange = async (event) => {
    const isChecked = event.target.checked;
    const userId = rowData.rowData[5];
    const teamId = rowData.rowData[4];
    const articleId = rowData.rowData[2];
    if (articleId) {
      const response = await statusChangeApi({
        _id: articleId,
        isActive: isChecked,
      }).unwrap();
      dispatch(
        handleNotification({
          state: true,
          message: response?.message,
          severity: response?.code,
        })
      );
    }
    // if (userId) {
    //
    //   if (response?.code === 200) {
    //     dispatch(
    //       handleNotification({
    //         state: true,
    //         message: response?.message,
    //         severity: response?.code,
    //       })
    //     );
    //   } else {
    //     dispatch(
    //       handleNotification({
    //         state: true,
    //         message: response?.message,
    //         severity: response?.code,
    //       })
    //     );
    //   }
    // }
    // else if (teamId) {
    //   const response = await statusChangeApi({ teamId: teamId }).unwrap();
    //   if (response?.code === 200) {
    //     dispatch(
    //       handleNotification({
    //         state: true,
    //         message: response?.message,
    //         severity: response?.code,
    //       })
    //     );
    //   } else {
    //     dispatch(
    //       handleNotification({
    //         state: true,
    //         message: response?.message,
    //         severity: response?.code,
    //       })
    //     );
    //   }
    // }
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
