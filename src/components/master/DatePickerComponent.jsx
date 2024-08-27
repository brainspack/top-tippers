import { Box, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

const DateRangePicker = ({
  control,
  name,
  name2,
  errors,
  defaultStart,
  defaultEnd,
  register,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // useEffect(() => {
  //   if (control) {
  //     console.log(control, "CONTROL");
  //     // setStartDate()
  //   }
  // }, [control]);

  // // Effect to update the end date's minimum date when start date changes
  // useEffect(() => {
  //   if (startDate && startDate > endDate) {
  //     setEndDate(null); // Reset end date if it's before the new start date
  //   }
  // }, [startDate]);

  const validateEndDate = (value) => {
    if (startDate && value && new Date(value) <= new Date(startDate)) {
      return "End date must be after start date";
    }
    return true;
  };

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
        rules={{ required: "Start date is required" }}
        render={({ field }) => {
          return (
            <>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <DatePicker
                  sx={{
                    width: "100%",
                    height: "34px",
                    marginTop: errors.description?.message ? "10px" : "0px",
                  }}
                  selected={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  // onBlur={onBlur}
                  selectsStart
                  dateFormat="MM/dd/yyyy"
                  // startDate={value}
                  endDate={field.value ? field.value : null}
                  minDate={field.value ? new Date(field.value) : null}
                  placeholderText="Start date"
                  className="customize-date-picker"
                  {...register(name)}
                  {...field}
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
          );
        }}
      />
      <Controller
        name={name2}
        control={control}
        rules={{ required: "End date is required", validate: validateEndDate }}
        render={({ field }) => {
          return (
            <>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <DatePicker
                  sx={{
                    width: "100%",
                    height: "34px",
                    marginTop: errors.description?.message ? "10px" : "0px",
                  }}
                  // value={endDate}
                  selected={field.value}
                  onChange={(date) => {
                    setEndDate(date);
                    field.onChange(date);
                    console.log(date, "VAl");
                    // setEndDate(date);
                    // onChange(date);
                  }}
                  // onChange={handleChange}
                  // onBlur={onBlur}
                  selectsEnd
                  startDate={startDate}
                  // startDate={field.value ? field.value : null}
                  // endDate={value}
                  // minDate={null}
                  minDate={startDate}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="End date"
                  className="customize-date-picker"
                  {...register(name2)}
                  {...field}
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
          );
        }}
      />
    </Box>
  );
};

export default DateRangePicker;
