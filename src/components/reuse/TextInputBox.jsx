import React from "react";
import CustomAddSportLabel from "./CustomAddSportLabel";
import { FormHelperText, OutlinedInput } from "@mui/material";

function TextInputBox({
  inputLabel,
  register,
  errors,
  required,
  name,
  mode,
  placeholder,
  patternValue,
}) {
  console.log(name, "nn");

  const formatInput = (value) => {
    if (typeof value === "string") {
      if (!value) return value;
      return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
    }
  };

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
        <OutlinedInput
          id={`outlined-adornment-${name}`}
          placeholder={mode === "stack" ? placeholder : ""}
          sx={{
            width: "100%",
            height: "34px",
          }}
          aria-describedby={`outlined-weight-helper-text-${name}`}
          inputProps={{
            "aria-label": "weight",
          }}
          {...register(name, {
            required: required,
            pattern: patternValue
              ? {
                  value: new RegExp(patternValue),
                  message: "Stack Value must be a number",
                }
              : undefined,

            setValueAs: (value) => {
              if (name !== "stack") {
                return formatInput(value);
              }
              return value;
            },
          })}
        />
      </div>
      <div className="errorMsgParent">
        <FormHelperText sx={{ color: "#d32f2f" }}>
          {errors[name]?.message}
        </FormHelperText>
      </div>
    </>
  );
}

export default TextInputBox;
