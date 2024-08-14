import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";

const CustomSelect = () => {
  const [listSportApi, { data, isLoading, error }] =
    useGetUserListSportApiByNameMutation();
  const [selectedSport, setSelectedSport] = useState("");
  console.log(selectedSport, "INSIDE selectedSport");

  const handleChange = (event) => {
    setSelectedSport(event.target.value);
  };
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await listSportApi({ count: 1000 }).unwrap();
        console.log(response?.data, "RESPONSE");
        {
          response?.data((ele) => setSelectedSport(ele?.sportname));
        }
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchSports();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sport-select-label">Sport</InputLabel>
        <Select
          labelId="sport-select-label"
          id="sport-select"
          value={selectedSport}
          label="Sport"
          onChange={handleChange}
        >
          {data?.data?.map((sport) => (
            // console.log(sport, "SPORT")
            <MenuItem key={sport.id} value={sport.id}>
              {sport?.sportname}
            </MenuItem>
          )) || <MenuItem disabled>No sports available</MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
