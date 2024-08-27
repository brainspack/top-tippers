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
  initialData,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
        disabled={Boolean(initialData)}
        rules={{ required: "Start date is required" }}
        render={({ field }) => {
          const isDisabled = Boolean(initialData);
          return (
            <>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <DatePicker
                  selected={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  sx={{
                    width: "100%",
                    height: "34px",
                    marginTop: errors.description?.message ? "10px" : "0px",
                    cursor: Boolean(initialData) ? "not-allowed" : "pointer",
                  }}
                  disabled={isDisabled}
                  selectsStart
                  dateFormat="MM/dd/yyyy"
                  endDate={field.value ? field.value : null}
                  minDate={field.value ? new Date(field.value) : null}
                  placeholderText="Start date"
                  className={`customize-date-picker ${
                    isDisabled ? "date-picker-disabled" : ""
                  }`}
                  {...register(name)}
                  {...field}
                />
                {/* {errors[name] && ( */}
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#D32F2F" }}>
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
        disabled={Boolean(initialData)}
        rules={{ required: "End date is required", validate: validateEndDate }}
        render={({ field }) => {
          const isDisabled = Boolean(initialData);
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
                    cursor: Boolean(initialData) ? "not-allowed" : "pointer",
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
                  className={`customize-date-picker ${
                    isDisabled ? "date-picker-disabled" : ""
                  }`}
                  {...register(name2)}
                  {...field}
                />
                {/* {errors[name2] && ( */}
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#D32F2F" }}>
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
