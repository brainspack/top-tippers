import { Box, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

const DateRangePicker = ({ control, name, name2, errors }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Effect to update the end date's minimum date when start date changes
  useEffect(() => {
    if (startDate && startDate > endDate) {
      setEndDate(null); // Reset end date if it's before the new start date
    }
  }, [startDate]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "6px",
        width: "100%",
      }}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: "Start date is required" }} // Add validation rules here
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <DatePicker
                sx={{
                  width: "100%",
                  height: "34px",
                  marginTop: errors.description?.message ? "10px" : "0px",
                }}
                selected={value}
                onChange={(date) => {
                  setStartDate(date);
                  onChange(date);
                }}
                onBlur={onBlur}
                selectsStart
                startDate={value}
                endDate={null}
                placeholderText="Start date"
                className="customize-date-picker"
              />
              {/* {errors[name] && ( */}
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors[name]?.message}
                </FormHelperText>
              </div>
              {/* )} */}
            </Box>
          </>
        )}
      />
      <Controller
        name={name2}
        control={control}
        rules={{ required: "End date is required" }} // Add validation rules here
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <DatePicker
                sx={{
                  width: "100%",
                  height: "34px",
                  marginTop: errors.description?.message ? "10px" : "0px",
                }}
                selected={value}
                onChange={(date) => {
                  setEndDate(date);
                  onChange(date);
                }}
                onBlur={onBlur}
                selectsEnd
                startDate={null}
                endDate={value}
                // minDate={null}
                minDate={startDate} // Disable dates before the start date
                placeholderText="End date"
                className="customize-date-picker"
              />
              {/* {errors[name2] && ( */}
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors[name2]?.message}
                </FormHelperText>
              </div>
              {/* )} */}
            </Box>
          </>
        )}
      />
    </Box>
  );
};

export default DateRangePicker;
