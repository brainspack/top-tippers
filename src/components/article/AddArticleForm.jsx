import React, { useEffect, useState } from "react";
import {
  ArticleFormContainer,
  ArticleFormWrapper,
  FormInner,
} from "./ArticleFormStyle";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
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
import UploadIcon from "@mui/icons-material/Upload";
import CustomTimePicker from "../reuse/CustomTimePicker";
import JoditEditor from "jodit-react";
import TextEditor from "./TextEditor";
import { useAddArticleByNameMutation } from "../../api/AddArticle";
import { handleNotification } from "../../slices/Snackbar";

function AddArticleForm() {
  const dispatch = useDispatch();
  const { roundData } = useSelector(manageRoundSelector);
  const { allTeamData, gameData } = useSelector(manageGameSelector);
  const [content, setContent] = useState("");

  console.log(gameData, "sjakj");

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

  //  // ADD ARTICLE API
  const [addArticleApi, { data: addArticleData }] =
    useAddArticleByNameMutation();

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

    defaultValues: {
      sportId: "",
      sportIdd: "",
      game: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const [filteredRounds, setFilteredRounds] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  console.log(filteredGames, "ff");

  const selectedSportId = watch("sportId");
  const selectedSportIdd = watch("sportIdd");
  const selectedRoundId = watch("roundId");

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

  useEffect(() => {
    if (selectedSportIdd) {
      const filteredTeams = allTeamData?.data.filter(
        (team) => team?.sport?._id === selectedSportIdd
      );
      setSelectTeam(filteredTeams);

      setValue("team", "");
    }
  }, [selectedSportIdd, allTeamData, setValue]);

  // Filter games based on selected round
  useEffect(() => {
    if (selectedRoundId) {
      const games = listGamesData?.data.filter(
        (game) => game?.round?._id === selectedRoundId
      );
      setFilteredGames(games || []);
    } else {
      setFilteredGames([]);
    }
  }, [selectedRoundId, gameData]);

  const onhandleSubmit = async (data) => {
    // e.preventDefault();

    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("content", content);
    formData.append("addedby", data?.addedby);
    formData.append("files", data?.title);
    formData.append("htmlFiles", data?.title);
    formData.append("game", data?.game);
    formData.append("url", data?.url);
    formData.append("isActive", true);
    formData.append("publishDateTime", data?.publishDateTime);
    formData.append("teamId", data?.team);
    formData.append("articleType", data?.title);

    try {
      const result = await addArticleApi(formData).unwrap();
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      }
    } catch (error) {
      console.error("Failed to add Article:", error);
    }
  };

  return (
    <ArticleFormContainer>
      <ArticleFormWrapper>
        <form onSubmit={handleSubmit(onhandleSubmit)}>
          <Box
            sx={{
              width: "100%",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FormInner>
              <div
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
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
                  })}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.title?.message}
                  </FormHelperText>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
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
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.addedby?.message}
                  </FormHelperText>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
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
                  })}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.url?.message}
                  </FormHelperText>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Article Type:"
                />

                <FormControl fullWidth {...register("articleType")}>
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
                        <MenuItem value="NRL" {...register("articleType")}>
                          NRL
                        </MenuItem>
                        <MenuItem value="ALF" {...register("articleType")}>
                          ALF
                        </MenuItem>
                        <MenuItem value="Cricket" {...register("articleType")}>
                          Cricket
                        </MenuItem>
                        <MenuItem value="other" {...register("articleType")}>
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
                  // width: "100%",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
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
                    mode={"game"}
                    setValue={setValue}
                  />
                </Box>
              </div>
              <div
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel requiredInput="*" inputLabel="Time:" />
                <Box
                  className="articleTimePicker"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <CustomTimePicker
                    control={control}
                    setValue={setValue}
                    errors={errors}
                  />
                </Box>
              </div>

              <div
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Article Image/Video:"
                />
                <Controller
                  name="file"
                  control={control}
                  // rules={{ required: "File is required" }}
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                        {...field}
                      />
                      <label
                        htmlFor="file-upload"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          height: "34px",
                          cursor: "pointer",
                          background: "white",
                          borderRadius: "4px",
                          textAlign: "center",
                          border: "1px black !important",
                          // "&:hover": {
                          //   borderColor: "black",
                          // },
                        }}
                      >
                        <IconButton component="span">
                          <UploadIcon />
                        </IconButton>
                        <span style={{ marginLeft: "8px" }}>
                          Click to upload
                        </span>
                      </label>
                    </>
                  )}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.file?.message}
                  </FormHelperText>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="TopSport HTML Banner:"
                />

                <Controller
                  name="htmlFiles"
                  control={control}
                  // rules={{ required: "File is required" }}
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                        {...field}
                      />
                      <label
                        htmlFor="file-upload"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          height: "34px",
                          cursor: "pointer",
                          background: "white",
                          borderRadius: "4px",
                          textAlign: "center",
                          border: "1px black !important",
                          // "&:hover": {
                          //   borderColor: "black",
                          // },
                        }}
                      >
                        <IconButton component="span">
                          <UploadIcon />
                        </IconButton>
                        <span style={{ marginLeft: "8px" }}>
                          Click to upload
                        </span>
                      </label>
                    </>
                  )}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.htmlFiles?.message}
                  </FormHelperText>
                </div>
              </div>
            </FormInner>
            <FormInner>
              <Box
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Sports for team :"
                />
                <FormControl
                  fullWidth
                  error={!!errors.sportId}
                  {...register("sportIdd")}
                >
                  <Controller
                    name="sportIdd"
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
                          height: "34px",
                        }}
                        {...register("sportIdd")}
                      >
                        <MenuItem sx={{ color: "grey !important" }} disabled>
                          Select a sport
                        </MenuItem>
                        {listSportData?.data?.map((sport) => (
                          <MenuItem
                            key={sport?._id}
                            value={sport?._id}
                            {...register("sportIdd")}
                          >
                            {sport?.sportname}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#D32F2F" }}>
                      {errors.sportIdd?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Team :"
                />

                <FormControl fullWidth {...register("team")}>
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
                          height: "34px",
                        }}
                        {...register("team")}
                      >
                        {selectTeam.length > 0 ? (
                          selectTeam.map((team) => (
                            <MenuItem
                              key={team._id}
                              value={team._id}
                              {...register("team")}
                            >
                              {team?.teamname}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No team available</MenuItem>
                        )}
                      </Select>
                    )}
                  />

                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.team?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Sports:"
                />
                <FormControl fullWidth {...register("sportId")}>
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
                          height: "34px",
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
                  // width: "100%",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Round :"
                />

                <FormControl fullWidth {...register("roundId")}>
                  <Controller
                    name="roundId"
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
                          height: "34px",
                        }}
                        //   disabled={Boolean(initialData)}
                        {...register("roundId")}
                      >
                        {filteredRounds.length > 0 ? (
                          filteredRounds.map((rounds) => (
                            <MenuItem
                              key={rounds._id}
                              value={rounds._id}
                              {...register("roundId")}
                            >
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
                      {errors?.roundId?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  // width: "100%",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Game :"
                />

                <FormControl fullWidth {...register("game")}>
                  <Controller
                    name="game"
                    //   disabled={Boolean(initialData)}
                    control={control}
                    rules={{ required: "Select game is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          fontSize: "14px",
                          height: "34px",
                        }}
                        //   disabled={Boolean(initialData)}
                        {...register("game")}
                      >
                        {filteredGames.length > 0 ? (
                          filteredGames.map((game) => {
                            console.log(game, "game");

                            return (
                              <MenuItem
                                key={game._id}
                                value={game._id}
                                {...register("game")}
                              >
                                {`${game?.homeTeam?.teamname} vs ${game?.awayTeam?.teamname}`}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem disabled>No game available</MenuItem>
                        )}
                      </Select>
                    )}
                  />

                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors?.game?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>
            </FormInner>
          </Box>
          <Box sx={{ height: "300px" }}>
            <TextEditor content={content} setContent={setContent} />
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button variant="contained">Draft</Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </ArticleFormWrapper>
    </ArticleFormContainer>
  );
}

export default AddArticleForm;
