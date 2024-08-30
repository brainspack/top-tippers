import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomTimePicker = ({ control }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <TimePicker
            label="Time"
            minutesStep={1}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};
export default CustomTimePicker;
