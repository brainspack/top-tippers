// import * as React from "react";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { Box, FormHelperText, TextField } from "@mui/material";
// import { Controller } from "react-hook-form";
// import moment from "moment";

// const CustomTimePicker = ({ control, errors }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterMoment}>
//       <Controller
//         name="time"
//         control={control}
//         defaultValue={null}
//         rules={{ required: "Please enter time" }}
//         render={({ field }) => {
//           return (
//             <>
//               <TimePicker
//                 label="Time"
//                 minutesStep={1}
//                 value={field.value ? moment(field.value) : null}
//                 onChange={(newValue) => {
//                   if (newValue && moment(newValue).isValid()) {
//                     field.onChange(newValue.toISOString());
//                   } else {
//                     field.onChange(null);
//                   }
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     value={
//                       field.value ? moment(field.value).format("H.mm") : ""
//                     }
//                   />
//                 )}
//               />

//               <Box className="errorMsgParent">
//                 <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
//                   {errors.time?.message || "Please enter time"}
//                 </FormHelperText>
//               </Box>
//             </>
//           );
//         }}
//       />
//     </LocalizationProvider>
//   );
// };

// export default CustomTimePicker;

////////////////
import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField, Box, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import moment from "moment";

const CustomTimePicker = ({ control, errors, initialData }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        name="time"
        control={control}
        defaultValue={null}
        rules={{ required: "Please enter time" }}
        render={({ field }) => {
          return (
            <>
              <TimePicker
                label="Time"
                minutesStep={1}
                value={field.value ? moment(field.value) : null}
                onChange={(newValue) => {
                  if (newValue && moment(newValue).isValid()) {
                    field.onChange(newValue.toISOString());
                  } else {
                    field.onChange(null);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={
                      field.value ? moment(field.value).format("H.mm") : ""
                    }
                    error={!!errors.time}
                    helperText={errors.time ? errors.time.message : null}
                  />
                )}
              />

              {errors.time && (
                <Box className="errorMsgParent">
                  {initialData ? (
                    ""
                  ) : (
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.time?.message || "Please enter time"}
                    </FormHelperText>
                  )}
                </Box>
              )}
            </>
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
