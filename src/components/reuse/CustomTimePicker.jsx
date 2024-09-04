// import * as React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { Box, TextField } from "@mui/material";
// import { Controller } from "react-hook-form";

// const CustomTimePicker = ({ control }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Controller
//         name="time"
//         control={control}
//         render={({ field }) => (
//           <TimePicker
//             label="Time"
//             minutesStep={1}
//             value={field.value}
//             onChange={(newValue) => field.onChange(newValue)}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         )}
//       />
//     </LocalizationProvider>
//   );
// };
// export default CustomTimePicker;
///////////////////////
// import * as React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { Box, TextField } from "@mui/material";
// import { Controller } from "react-hook-form";
// import dayjs from "dayjs";

// const CustomTimePicker = ({ control }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Controller
//         name="time"
//         control={control}
//         defaultValue={null} // Ensure default value is null or a Dayjs object
//         render={({ field }) => (
//           <TimePicker
//             label="Time"
//             minutesStep={1}
//             value={field.value || null} // Ensure value is Dayjs or null
//             onChange={(newValue) => {
//               // Convert newValue to Dayjs if necessary
//               field.onChange(newValue ? dayjs(newValue) : null);
//             }}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         )}
//       />
//     </LocalizationProvider>
//   );
// };
// export default CustomTimePicker;

///////////////////////////////////////////////////////////////////////////
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

const CustomTimePicker = ({ control, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="time"
        control={control}
        defaultValue={null}
        render={({ field }) => {
          console.log(field, "fields");
          return (
            <TimePicker
              label="Time"
              minutesStep={1}
              value={field.value || null}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;

///////////////////////////////////////////////////////////////////////
