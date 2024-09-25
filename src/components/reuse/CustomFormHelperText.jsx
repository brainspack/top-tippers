import { FormHelperText } from "@mui/material";
import React from "react";

function CustomFormHelperText({ errors, name }) {
  return (
    <div className="errorMsgParent">
      <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
        {errors[name]?.message}
      </FormHelperText>
    </div>
  );
}

export default CustomFormHelperText;
