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
  register,
  initialData,
  watch,
  clearErrors,
  setValue,
  mode,
}) => {
  const [startDate, setStartDate] = useState(null);
  const watchValue = watch(name);

  console.log(watchValue, "watchh");

  console.log(startDate, control?._formValues, "control");

  const validateEndDate = (value) => {
    if (startDate && value && new Date(value) <= new Date(startDate)) {
      return "End date must be after start date";
    }
    return true;
  };
  useEffect(() => {
    console.log(control?._formValues, "EFFECY");
    if (watchValue) {
      setStartDate(watchValue);
    }
  }, [watchValue]);
  console.log(startDate, "DO DO DO");
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
        {...register(name, { required: "Start date is required" })}
        render={({ field }) => {
          console.log(field.value, "HJ");

          const isDisabled = Boolean(initialData);
          const handleChangeDate = (date) => {
            console.log(name, "namm");

            if (errors[name]) {
              clearErrors(name);
            }
            setValue(name, date);
          };
          return (
            <>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <DatePicker
                  selected={field.value}
                  onSelect={(date) => handleChangeDate(date)}
                  sx={{
                    width: "100%",
                    height: "34px",
                    marginTop: errors.description?.message ? "10px" : "0px",
                    cursor: Boolean(initialData) ? "not-allowed" : "pointer",
                  }}
                  disabled={isDisabled}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Start date"
                  className={`customize-date-picker ${
                    isDisabled ? "date-picker-disabled" : ""
                  }`}
                  {...register(name, { required: "Start date is required" })}
                  {...field}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[name]?.message}
                  </FormHelperText>
                </div>
              </Box>
            </>
          );
        }}
      />
      {mode === "game" ? (
        ""
      ) : (
        <Controller
          name={name2}
          control={control}
          disabled={Boolean(initialData)}
          rules={{
            required: "End date is required",
            validate: validateEndDate,
          }}
          render={({ field }) => {
            const isDisabled = Boolean(initialData);
            const handleChangeDate = (date) => {
              console.log(name2, "namm");
              if (errors[name2]) {
                clearErrors(name2);
              }
              setValue(name2, date);
            };
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <DatePicker
                    sx={{
                      width: "100%",
                      height: "34px",
                      marginTop: errors.description?.message ? "10px" : "0px",
                      cursor: Boolean(initialData) ? "not-allowed" : "pointer",
                    }}
                    selected={field.value}
                    onSelect={(date) => handleChangeDate(date)}
                    minDate={startDate}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="End date"
                    className={`customize-date-picker ${
                      isDisabled ? "date-picker-disabled" : ""
                    }`}
                    {...register(name2)}
                    {...field}
                  />
                  <div className="errorMsgParent">
                    <FormHelperText sx={{ color: "#D32F2F" }}>
                      {errors[name2]?.message}
                    </FormHelperText>
                  </div>
                </Box>
              </>
            );
          }}
        />
      )}
    </Box>
  );
};
export default DateRangePicker;
