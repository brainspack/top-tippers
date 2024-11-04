import React from "react";
import CustomAddSportLabel from "./CustomAddSportLabel";
import { OutlinedInput } from "@mui/material";
import { InputWrapperBox } from "./reuseStyled";
import CustomFormHelperText from "./CustomFormHelperText";

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
      <InputWrapperBox>
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
      </InputWrapperBox>
      <CustomFormHelperText errors={errors} name={name} />
    </>
  );
}

export default TextInputBox;
