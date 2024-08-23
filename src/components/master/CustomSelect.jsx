// import { useState, useEffect } from "react";
// import { Box } from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { useTeamListByNameMutation } from "../../api/GetTeamList";
// import { useDispatch } from "react-redux";
// import {
//   updateSportList,
//   updateTeamList,
// } from "../../slices/manageTeam/manageTeam";

// const CustomSelect = ({ data, listSportApi, sportData }) => {
//   console.log(sportData, "SPORTDATA");

//   const [teamListApi, { data: teamListData, userListSuccess }] =
//     useTeamListByNameMutation();
//   const [selectedSport, setSelectedSport] = useState("");
//   console.log(selectedSport, "SELECTED STATE");
//   const dispatch = useDispatch();
//   const handlesportChange = (event) => {
//     console.log(event.target.value, "VALUE");
//     setSelectedSport(event.target.value);
//     const reqParams = {
//       page: 0,
//       sortValue: "",
//       sortOrder: "",
//       sport: event.target.value,
//       // sport: selectedSport,
//     };
//     teamListApi(reqParams);
//   };

//   useEffect(() => {
//     if (teamListData && teamListData?.data)
//       dispatch(updateTeamList(teamListData));
//   }, [teamListData, userListSuccess]);

//   useEffect(() => {
//     const fetchSports = async () => {
//       try {
//         const response = await listSportApi({ count: 1000 }).unwrap();
//       } catch (err) {
//         console.error("Error fetching sports data:", err);
//       }
//     };

//     fetchSports();
//   }, []);

//   return (
//     <Box sx={{ width: "180px" }}>
//       <FormControl fullWidth>
//         <InputLabel id="sport-select-label">Sport</InputLabel>
//         <Select
//           labelId="sport-select-label"
//           id="sport-select"
//           value={selectedSport}
//           label="Sport"
//           onChange={handlesportChange}
//         >
//           {sportData?.data?.map((sport) => (
//             <MenuItem key={sport._id} value={sport._id}>
//               {sport?.sportname}
//             </MenuItem>
//           )) || <MenuItem disabled>No sports available</MenuItem>}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default CustomSelect;

//////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTeamListByNameMutation } from "../../api/GetTeamList";
import {
  updateSelectedSport,
  updateSportList,
  updateTeamList,
} from "../../slices/manageTeam/manageTeam";
import { updateRoundList } from "../../slices/manageRound/manageRound";

const CustomSelect = ({
  data,
  listSportApi,
  sportData,
  teamListApi,
  teamListData,
  userListSuccess,
  mode,
}) => {
  const [selectedSport, setSelectedSport] = useState("");
  console.log(selectedSport);
  const dispatch = useDispatch();

  const handleSportChange = (event) => {
    const selectedValue = event.target.value;
    dispatch(updateSelectedSport(event.target.value));
    setSelectedSport(selectedValue);
    const firstApiPayload = {
      page: 0,
      sortValue: "",
      sortOrder: "",
      sport: selectedValue === "all" ? "" : selectedValue,
    };

    const secondApiPayload = {
      sportId: selectedValue === "all" ? "" : selectedValue,
    };
    if (mode === "round") {
      teamListApi(secondApiPayload);
    } else {
      teamListApi(firstApiPayload);
    }
  };

  useEffect(() => {
    if (teamListData && teamListData.data) {
      if (mode === "round") {
        dispatch(updateRoundList(teamListData));
      } else {
        dispatch(updateTeamList(teamListData));
      }
    }
  }, [teamListData, userListSuccess]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await listSportApi({ count: 1000 }).unwrap();
        dispatch(updateSportList(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchSports();
  }, [listSportApi]);

  return (
    <Box sx={{ width: "180px" }}>
      <FormControl fullWidth>
        <InputLabel id="sport-select-label">Sport</InputLabel>
        <Select
          labelId="sport-select-label"
          id="sport-select"
          value={selectedSport}
          label="Sport"
          onChange={handleSportChange}
        >
          {sportData?.data?.length > 0 ? (
            sportData.data.map((sport) => (
              <MenuItem key={sport._id} value={sport._id}>
                {sport?.sportname}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No sports available</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
