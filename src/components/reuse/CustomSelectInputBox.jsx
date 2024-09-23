import React from "react";
import CustomAddSportLabel from "./CustomAddSportLabel";
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

function CustomSelectInputBox({
  inputLabel,
  register,
  control,
  name,
  required,
  handleTypeChange,
  errors,
  value1,
  value2,
  menuItems,
  mode,
}) {
  return (
    <>
      <div
        style={{
          height: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <CustomAddSportLabel requiredInput="*" inputLabel={inputLabel} />

        <FormControl sx={{ m: 1 }} fullWidth error={!!errors[name]}>
          <Controller
            name={name}
            control={control}
            rules={{ required: required }}
            render={({ field }) => (
              <Select
                displayEmpty
                sx={{
                  fontSize: "14px",
                  height: "40px",
                }}
                {...field}
                onChange={(event) => {
                  if (mode === "selectType") {
                    handleTypeChange(event);
                  }
                  field.onChange(event);
                }}
                value={field.value}
              >
                {menuItems.map((item) => (
                  <MenuItem value={item.value}>{item.itemName}</MenuItem>
                ))}
              </Select>
            )}
          />
          <div className="errorMsgParent">
            <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
              {errors[name]?.message}
            </FormHelperText>
          </div>
        </FormControl>
      </div>
    </>
  );
}

export default CustomSelectInputBox;
