import React, { useEffect, useState } from "react";
import {
  ArticleFormContainer,
  ArticleFormWrapper,
  FormInner,
} from "./ArticleFormStyle";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
// import { DateRangePicker } from "@mui/x-date-pickers-pro";
import DateRangePicker from "../../components/master/DatePickerComponent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useTeamListByNameMutation } from "../../api/GetTeamList";
import { useListGamesByNameMutation } from "../../api/ListGames";
import { useAddGameByNameMutation } from "../../api/AddNewGame";
import { useListRoundsByNameMutation } from "../../api/ListRounds";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAllTeamData,
  updateGameList,
} from "../../slices/manageGame/manageGame";
import { updateRoundList } from "../../slices/manageRound/manageRound";
import { updateSportList } from "../../slices/manageTeam/manageTeam";
import { manageRoundSelector } from "../../slices/manageRound/manageRoundSelector";
import { manageGameSelector } from "../../slices/manageGame/manageGameSelector";

function AddArticleForm(props) {
  const dispatch = useDispatch();
  const { roundData } = useSelector(manageRoundSelector);
  const { allTeamData } = useSelector(manageGameSelector);
  // ROUND API
  const [
    listRoundsApi,
    {
      data: listRoundsData,
      isLoading: listRoundsLoading,
      error: listRoundsError,
      isSuccess: listRoundsSuccess,
    },
  ] = useListRoundsByNameMutation();

  // LIST SPORT API
  const [
    listSportApi,
    {
      data: listSportData,
      isLoading,
      error: listSportError,
      success: listSportSuccess,
    },
  ] = useGetUserListSportApiByNameMutation();

  // TEAM LIST API
  const [
    teamListApi,
    { data, isLoading: teamDataFetching, isSuccess: userListSuccess },
  ] = useTeamListByNameMutation();

  // GAME LIST API
  const [
    listGameApi,
    {
      data: listGamesData,
      isLoading: teamGameFetching,
      error,
      isSuccess: listGameSuccess,
    },
  ] = useListGamesByNameMutation();

  // TEAM LIST
  useEffect(() => {
    const fetchTeamList = async () => {
      try {
        const response = await teamListApi({
          count: 1000,
        }).unwrap();
        console.log(response, "FETCH TEAM LIST");
        // dispatch(updateTeamList(response));
        dispatch(updateAllTeamData(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchTeamList();
  }, []);

  // ROUND API
  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await listRoundsApi({
          count: 1000,
          season: "current",
        }).unwrap();
        dispatch(updateRoundList(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchRound();
  }, []);

  // SPORT API
  useEffect(() => {
    if (listSportData && listSportData?.data)
      dispatch(updateSportList(listSportData));
  }, [listSportData]);

  // LIST GAME API
  useEffect(() => {
    if (listGamesData && listGamesData?.data)
      dispatch(updateGameList(listGamesData));
  }, []);

  useEffect(() => {
    const reqParams = {
      count: 1000,
      season: "current",
    };
    listGameApi(reqParams);
  }, []);
  useEffect(() => {
    const reqParams = {
      count: 1000,
      season: "current",
    };
    listSportApi(reqParams);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    reset,
    clearErrors,
    watch,
  } = useForm({
    mode: "onChange",

    // defaultValues: {
    //   sportname: "",
    //   description: "",
    //   type: "",
    //   bonus: "",
    //   startDate: "",
    //   endDate: "",
    //   stack: "",
    // },
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const [filteredRounds, setFilteredRounds] = useState([]);
  const selectedSportId = watch("sportId");
  useEffect(() => {
    if (selectedSportId) {
      const filtered = roundData?.data.filter(
        (round) => round?.sport?._id === selectedSportId
      );
      setFilteredRounds(filtered);
      setValue("roundId", "");
    } else {
      setFilteredRounds([]);
    }
  }, [selectedSportId, roundData, setValue]);

  const [selectTeam, setSelectTeam] = useState([]);
  console.log(selectTeam, "SELECT TEAM");

  useEffect(() => {
    if (selectedSportId) {
      // Filter teams by selected sport ID
      const filteredTeams = allTeamData?.data.filter(
        (team) => team?.sport?._id === selectedSportId
      );
      setSelectTeam(filteredTeams);

      // Reset homeTeam and awayTeam when sportId changes
      setValue("team", "");
    }
  }, [selectedSportId, allTeamData, setValue]);
  return (
    <ArticleFormContainer>
      <ArticleFormWrapper>
        <form>
          <FormInner>
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "13px",
              }}
            >
              <CustomAddSportLabel requiredInput="*" inputLabel="Title:" />
              <OutlinedInput
                id="outlined-adornment-weight"
                sx={{
                  width: "100%",
                  height: "34px",
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                {...register("title", {
                  required: "Title is required",
                  //   setValueAs: (value) => formatInput(value),
                })}
              />
            </div>
            <div className="errorMsgParent">
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.title?.message}
              </FormHelperText>
            </div>
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "13px",
              }}
            >
              <CustomAddSportLabel requiredInput="*" inputLabel="Writter:" />
              <OutlinedInput
                id="outlined-adornment-weight"
                sx={{
                  width: "100%",
                  height: "34px",
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                {...register("addedby", {
                  required: "Writter Name is required",
                  //   setValueAs: (value) => formatInput(value),
                })}
              />
            </div>
            <div className="errorMsgParent">
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.addedby?.message}
              </FormHelperText>
            </div>
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "13px",
              }}
            >
              <CustomAddSportLabel
                requiredInput="*"
                inputLabel="Redairect url:"
              />
              <OutlinedInput
                id="outlined-adornment-weight"
                sx={{
                  width: "100%",
                  height: "34px",
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                {...register("url", {
                  required: "Url is required",
                  //   setValueAs: (value) => formatInput(value),
                })}
              />
            </div>
            <div className="errorMsgParent">
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.url?.message}
              </FormHelperText>
            </div>
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <CustomAddSportLabel
                requiredInput="*"
                inputLabel="Select Article Type:"
              />

              <FormControl sx={{ m: 1 }} fullWidth {...register("articleType")}>
                <Controller
                  name="articleType"
                  control={control}
                  rules={{ required: "Article Type is required" }}
                  render={({ field }) => (
                    <Select
                      displayEmpty
                      sx={{
                        fontSize: "14px",
                        height: "34px",
                      }}
                      {...field}
                      {...register("articleType")}
                    >
                      <MenuItem disabled>Article Type</MenuItem>
                      <MenuItem value="Regular" {...register("articleType")}>
                        NRL
                      </MenuItem>
                      <MenuItem value="Draw" {...register("articleType")}>
                        ALF
                      </MenuItem>
                      <MenuItem value="Draw" {...register("articleType")}>
                        Cricket
                      </MenuItem>
                      <MenuItem value="Draw" {...register("articleType")}>
                        other
                      </MenuItem>
                    </Select>
                  )}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                    {errors.articleType?.message}
                  </FormHelperText>
                </div>
              </FormControl>
            </div>
          </FormInner>
          <FormInner>
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <CustomAddSportLabel requiredInput="*" inputLabel="Date:" />
              <Box sx={{ display: "flex" }}>
                <DateRangePicker
                  control={control}
                  name="publishDateTime"
                  errors={errors}
                  register={register}
                  watch={watch}
                  clearErrors={clearErrors}
                  mode={"gameArticle"}
                  setValue={setValue}
                />
              </Box>
            </div>
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <CustomAddSportLabel
                requiredInput="*"
                inputLabel="Select start date and end date:"
              />
              <Box sx={{ display: "flex" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker label="Basic time picker" />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </div>
            {/* <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "13px",
              }}
            >
              <CustomAddSportLabel requiredInput="*" inputLabel="Title:" />
              <OutlinedInput
                id="outlined-adornment-weight"
                sx={{
                  width: "100%",
                  height: "34px",
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                {...register("title", {
                  required: "Sport Name is required",
                  //   setValueAs: (value) => formatInput(value),
                })}
              />
            </div>
            <div className="errorMsgParent">
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.sportname?.message}
              </FormHelperText>
            </div> */}
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "13px",
              }}
            >
              <CustomAddSportLabel
                requiredInput="*"
                inputLabel="Article Image/Video:"
              />
              <OutlinedInput
                id="outlined-adornment-weight"
                sx={{
                  width: "100%",
                  height: "34px",
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                {...register("title", {
                  required: "Sport Name is required",
                  //   setValueAs: (value) => formatInput(value),
                })}
              />
            </div>
            <div className="errorMsgParent">
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.sportname?.message}
              </FormHelperText>
            </div>
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <CustomAddSportLabel requiredInput="*" inputLabel="Sport Type:" />

              <FormControl sx={{ m: 1 }} fullWidth {...register("type")}>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Sport Type is required" }}
                  render={({ field }) => (
                    <Select
                      displayEmpty
                      sx={{
                        fontSize: "14px",
                        height: "34px",
                      }}
                      {...field}
                      {...register("type")}
                    >
                      <MenuItem disabled value="">
                        Sport Type
                      </MenuItem>
                      <MenuItem value="Regular" {...register("type")}>
                        Regular
                      </MenuItem>
                      <MenuItem value="Draw" {...register("type")}>
                        Draw
                      </MenuItem>
                    </Select>
                  )}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                    {errors.type?.message}
                  </FormHelperText>
                </div>
              </FormControl>
            </div>
          </FormInner>
          <FormInner>
            <Box
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <CustomAddSportLabel
                requiredInput="*"
                inputLabel="Select Sports for team :"
              />
              <FormControl sx={{ m: 1 }} fullWidth {...register("sportId")}>
                <Controller
                  name="sportId"
                  control={control}
                  rules={{ required: "Select Sport is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      sx={{
                        fontSize: "14px",
                        height: "40px",
                      }}
                      {...register("sportId")}
                    >
                      {listSportData?.data?.map((sport) => (
                        <MenuItem
                          key={sport?._id}
                          value={sport?._id}
                          {...register("sportId")}
                        >
                          {sport?.sportname}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Box className="errorMsgParent">
                  <FormHelperText sx={{ ml: 0, color: "#D32F2F" }}>
                    {errors.sportId?.message}
                  </FormHelperText>
                </Box>
              </FormControl>
            </Box>
            <Box
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <CustomAddSportLabel
                requiredInput="*"
                inputLabel="Select Home Team :"
              />

              <FormControl sx={{ m: 1 }} fullWidth {...register("team")}>
                <Controller
                  name="team"
                  control={control}
                  rules={{ required: "Select team is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      sx={{
                        fontSize: "14px",
                        height: "40px",
                      }}
                      {...register("team")}
                    >
                      {selectTeam.length > 0 ? (
                        selectTeam.map((team) => (
                          <MenuItem key={team._id} value={team._id}>
                            {team?.teamname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No home team available</MenuItem>
                      )}
                    </Select>
                  )}
                />

                <Box className="errorMsgParent">
                  <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                    {errors.homeTeam?.message}
                  </FormHelperText>
                </Box>
              </FormControl>
            </Box>
            <Box
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <CustomAddSportLabel
                requiredInput="*"
                inputLabel="Select Sports for team :"
              />
              <FormControl sx={{ m: 1 }} fullWidth {...register("sportId")}>
                <Controller
                  name="sportId"
                  control={control}
                  rules={{ required: "Select Sport is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      sx={{
                        fontSize: "14px",
                        height: "40px",
                      }}
                      {...register("sportId")}
                    >
                      {listSportData?.data?.map((sport) => (
                        <MenuItem
                          key={sport?._id}
                          value={sport?._id}
                          {...register("sportId")}
                        >
                          {sport?.sportname}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Box className="errorMsgParent">
                  <FormHelperText sx={{ ml: 0, color: "#D32F2F" }}>
                    {errors.sportId?.message}
                  </FormHelperText>
                </Box>
              </FormControl>
            </Box>
            <Box
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <CustomAddSportLabel
                requiredInput="*"
                inputLabel="Select Round :"
              />

              <FormControl sx={{ m: 1 }} fullWidth {...register("round")}>
                <Controller
                  name="round"
                  //   disabled={Boolean(initialData)}
                  control={control}
                  rules={{ required: "Select Round is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      sx={{
                        fontSize: "14px",
                        height: "40px",
                      }}
                      //   disabled={Boolean(initialData)}
                      {...register("round")}
                    >
                      {filteredRounds.length > 0 ? (
                        filteredRounds.map((rounds) => (
                          <MenuItem key={rounds._id} value={rounds._id}>
                            {rounds?.roundname}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No rounds available</MenuItem>
                      )}
                    </Select>
                  )}
                />

                <Box className="errorMsgParent">
                  <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                    {errors?.round?.message}
                  </FormHelperText>
                </Box>
              </FormControl>
            </Box>
            <div
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <CustomAddSportLabel requiredInput="*" inputLabel="Sport Type:" />

              <FormControl sx={{ m: 1 }} fullWidth {...register("type")}>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Sport Type is required" }}
                  render={({ field }) => (
                    <Select
                      displayEmpty
                      sx={{
                        fontSize: "14px",
                        height: "34px",
                      }}
                      {...field}
                      {...register("type")}
                    >
                      <MenuItem disabled value="">
                        Sport Type
                      </MenuItem>
                      <MenuItem value="Regular" {...register("type")}>
                        Regular
                      </MenuItem>
                      <MenuItem value="Draw" {...register("type")}>
                        Draw
                      </MenuItem>
                    </Select>
                  )}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                    {errors.type?.message}
                  </FormHelperText>
                </div>
              </FormControl>
            </div>
          </FormInner>
        </form>
      </ArticleFormWrapper>
    </ArticleFormContainer>
  );
}

export default AddArticleForm;
