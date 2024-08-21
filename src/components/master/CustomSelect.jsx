import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTeamListByNameMutation } from "../../api/GetTeamList";
import { useDispatch } from "react-redux";
import { updateListSport } from "../../slices/manageTeam/manageTeam";

const CustomSelect = ({ data, listSportApi }) => {
  const [teamListApi, { data: teamListData, userListSuccess }] =
    useTeamListByNameMutation();
  const [selectedSport, setSelectedSport] = useState("");
  const dispatch = useDispatch();
  const handlesportChange = (event) => {
    setSelectedSport(event.target.value);
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
      sport: event.target.value,
    };
    teamListApi(reqParams);
  };

  useEffect(() => {
    if (teamListData && teamListData?.data)
      dispatch(updateListSport(teamListData));
  }, [teamListData, userListSuccess]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await listSportApi({ count: 1000 }).unwrap();
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchSports();
  }, []);

  return (
    <Box sx={{ width: "180px" }}>
      <FormControl fullWidth>
        <InputLabel id="sport-select-label">Sport</InputLabel>
        <Select
          labelId="sport-select-label"
          id="sport-select"
          value={selectedSport}
          label="Sport"
          onChange={handlesportChange}
        >
          {data?.data?.map((sport) => (
            <MenuItem key={sport._id} value={sport._id}>
              {sport?.sportname}
            </MenuItem>
          )) || <MenuItem disabled>No sports available</MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
