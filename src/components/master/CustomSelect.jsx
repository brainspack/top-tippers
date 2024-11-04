import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  updateSelectedSport,
  updateSportList,
  updateTeamList,
} from "../../slices/manageTeam/manageTeam";
import { updateRoundList } from "../../slices/manageRound/manageRound";

const CustomSelect = (props) => {
  const {
    data,
    listSportApi,
    sportData,
    teamListApi,
    teamListData,
    userListSuccess,
    mode,
  } = props;
  const dispatch = useDispatch();

  const [selectedSport, setSelectedSport] = useState("");

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
    const thirdApiPayload = {
      sport: selectedValue === "all" ? "" : selectedValue,
      season: "current",
    };
    if (mode === "round") {
      teamListApi(secondApiPayload);
    } else if (mode === "game") {
      teamListApi(thirdApiPayload);
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
