import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Box,
  Modal,
  Divider,
  FormHelperText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import {
  AddSportBtn,
  AddSportSubmitBtn,
  BackModalBtn,
  SportModalHeading,
} from "./masterStyled";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import { updateModalVisibility } from "../../slices/userSlice/user";
import { handleNotification } from "../../slices/Snackbar";
import { Controller, useForm } from "react-hook-form";
import DateRangePicker from "./DatePickerComponent";
import { manageRoundSelector } from "../../slices/manageRound/manageRoundSelector";
import { setSelectedMode } from "../../slices/manageRound/manageRound";
import AddIcon from "@mui/icons-material/Add";
import { manageSportSelector } from "../../slices/manageTeam/manageTeamSelector";
import CustomTimePicker from "../reuse/CustomTimePicker";

const AddGameModal = (props) => {
  const {
    data,
    onClose,
    addRoundApi,
    initialData,
    updateRoundApi,
    gameData,
    teamData,
    allTeamData,
    addGameApi,
  } = props;
  const dispatch = useDispatch();
  const { isModalVisible, modalSportName } = useSelector(userDataSelector);
  const { sportData } = useSelector(manageSportSelector);

  const { roundData } = useSelector(manageRoundSelector);
  console.log(gameData, "GAMEDATA");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    clearErrors,
    result,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      roundno: "",
      roundname: "",
      roundtype: "",
      sportId: "",
      startDate: "",
      endDate: "",
      roundId: "",
    },
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });
  const onSubmit = async (data) => {
    const response = await addGameApi({ body: data }).unwrap();
    if (response?.code === 200) {
      dispatch(
        handleNotification({
          state: true,
          message: response?.message,
          severity: response?.code,
        })
      );
      dispatch(updateModalVisibility(false));
      reset();
    } else if (response?.code !== 200 || response?.code === 409) {
      dispatch(
        handleNotification({
          state: true,
          message: response?.message,
          severity: response?.code,
        })
      );
    } else {
      dispatch(
        handleNotification({
          state: true,
          message: response?.message,
          severity: response?.code,
        })
      );
    }
  };
  const onHandleUpdate = async (data) => {
    const body = {
      roundId: initialData[0]?.roundId ? initialData[0]?.roundId : "",
      startDate: data?.startDate,
      endDate: data?.endDate,
      roundname: data?.roundname,
    };
    const response = await updateRoundApi({
      body: body,
    }).unwrap();
    console.log(response, "RESPOSNE");
    if (response?.code === 200) {
      dispatch(
        handleNotification({
          state: true,
          message: response?.message,
          severity: response?.code,
        })
      );
      dispatch(updateModalVisibility(false));
    } else {
      dispatch(
        handleNotification({
          state: true,
          message: response?.message,
          severity: response?.code,
        })
      );
    }
  };

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
  const [homeTeamGames, setHomeTeamGames] = useState([]);
  const [awayTeamGames, setAwayTeamGames] = useState([]);

  // const selectedSportId = watch("sportId");
  const selectedHomeTeamId = watch("homeTeam");
  const selectedAwayTeamId = watch("awayTeam");

  useEffect(() => {
    if (selectedSportId) {
      // Filter teams by selected sport ID
      const filteredTeams = allTeamData?.data.filter(
        (team) => team?.sport?._id === selectedSportId
      );
      setSelectTeam(filteredTeams);

      // Reset homeTeam and awayTeam when sportId changes
      setValue("homeTeam", "");
      setValue("awayTeam", "");
    }
  }, [selectedSportId, allTeamData, setValue]);

  useEffect(() => {
    if (selectedHomeTeamId && gameData?.data) {
      const filteredHomeTeamGames = gameData.data.filter(
        (game) => game.homeTeam._id === selectedHomeTeamId
      );
      setHomeTeamGames(filteredHomeTeamGames);
    }
  }, [selectedHomeTeamId, gameData]);
  useEffect(() => {
    if (selectedAwayTeamId && gameData?.data) {
      const filteredAwayTeamGames = gameData.data.filter(
        (game) => game.awayTeam._id === selectedAwayTeamId
      );
      setAwayTeamGames(filteredAwayTeamGames);
    }
  }, [selectedAwayTeamId, gameData]);

  useEffect(() => {
    if (initialData) {
      setValue("roundno", initialData[0]?.roundno);
      setValue("roundname", initialData[0]?.roundname);
      setValue("roundtype", initialData[0]?.roundtype);
      setValue("sportId", initialData[0]?.sportId);
      setValue("startDate", initialData[0]?.startDate);
      setValue("endDate", initialData[0]?.endDate);
      setValue("roundId", initialData[0]?.roundId);
    } else {
      reset();
    }
  }, [initialData, setValue, reset]);
  const formatInput = (value) => {
    if (typeof value === "string") {
      if (!value) return value;
      return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
    }
  };
  const handleAddRound = () => {
    reset({
      roundno: "",
      roundname: "",
      roundtype: "",
      sportId: "",
      startDate: "",
      endDate: "",
      roundId: "",
    });
    dispatch(setSelectedMode("round"));
    dispatch(updateModalVisibility(true));
  };

  return (
    <>
      <AddSportBtn disableRipple onClick={handleAddRound}>
        <AddIcon sx={{ mr: 1 }} />
        Add Game
      </AddSportBtn>{" "}
      <Modal
        open={isModalVisible}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            overflowY: "auto",
            // border: "1px solid red",
          }}
        >
          <form
            onSubmit={handleSubmit(initialData ? onHandleUpdate : onSubmit)}
          >
            <Box sx={{ p: 1, height: "auto" }}>
              <Box>
                <SportModalHeading
                  id="modal-modal-title"
                  variant="h6"
                  component="h3"
                >
                  Add Game
                  <CloseIcon className="close-icon" onClick={onClose} />
                </SportModalHeading>
              </Box>
              <Box
                id="modal-modal-description"
                sx={{
                  mt: 1,
                  padding: "0 15px 12px",
                  height: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
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
                    inputLabel="Select Sports :"
                  />

                  <FormControl sx={{ m: 1 }} fullWidth {...register("sportId")}>
                    <Controller
                      name="sportId"
                      disabled={Boolean(initialData)}
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
                          disabled={Boolean(initialData)}
                          {...register("sportId")}
                        >
                          {data?.data?.length > 0 ? (
                            data?.data.map((sport) => (
                              <MenuItem
                                key={sport._id}
                                value={sport._id}
                                {...register("sportId")}
                              >
                                {sport.sportname}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No sports available</MenuItem>
                          )}
                        </Select>
                      )}
                    />
                    {initialData ? (
                      ""
                    ) : (
                      <Box className="errorMsgParent">
                        <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                          {errors.sportId?.message}
                        </FormHelperText>
                      </Box>
                    )}
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
                      disabled={Boolean(initialData)}
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
                          disabled={Boolean(initialData)}
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
                    {initialData ? (
                      ""
                    ) : (
                      <Box className="errorMsgParent">
                        <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                          {errors?.round?.message}
                        </FormHelperText>
                      </Box>
                    )}
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

                  <FormControl
                    sx={{ m: 1 }}
                    fullWidth
                    {...register("homeTeam")}
                  >
                    <Controller
                      name="homeTeam"
                      disabled={Boolean(initialData)}
                      control={control}
                      rules={{ required: "Select home team is required" }}
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
                          disabled={Boolean(initialData)}
                          {...register("homeTeam")}
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
                    {initialData ? (
                      ""
                    ) : (
                      <Box className="errorMsgParent">
                        <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                          {errors.homeTeam?.message}
                        </FormHelperText>
                      </Box>
                    )}
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
                    inputLabel="Select Away Team :"
                  />

                  <FormControl
                    sx={{ m: 1 }}
                    fullWidth
                    {...register("awayTeam")}
                  >
                    <Controller
                      name="awayTeam"
                      disabled={Boolean(initialData)}
                      control={control}
                      rules={{ required: "Select away team is required" }}
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
                          disabled={Boolean(initialData)}
                          {...register("awayTeam")}
                        >
                          {selectTeam.length > 0 ? (
                            selectTeam.map((team) => (
                              <MenuItem key={team._id} value={team._id}>
                                {team?.teamname}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No away team available</MenuItem>
                          )}
                        </Select>
                      )}
                    />
                    {initialData ? (
                      ""
                    ) : (
                      <Box className="errorMsgParent">
                        <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                          {errors.awayTeam?.message}
                        </FormHelperText>
                      </Box>
                    )}
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    style={{
                      height: "auto",
                      width: "47%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <CustomAddSportLabel
                      requiredInput="*"
                      inputLabel="Select start date and end date:"
                    />
                    <Box>
                      <DateRangePicker
                        control={control}
                        name="date"
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        clearErrors={clearErrors}
                        initialData={initialData}
                        mode="game"
                      />
                    </Box>
                  </Box>
                  <Box
                    style={{
                      height: "auto",
                      width: "47%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <CustomAddSportLabel
                      requiredInput="*"
                      inputLabel="Select Time :"
                    />
                    <Box sx={{ display: "flex" }}>
                      <CustomTimePicker control={control} />
                    </Box>
                  </Box>
                </Box>

                <Box
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
                    inputLabel="Home Team Points:"
                  />
                  <OutlinedInput
                    type="number"
                    disabled={Boolean(initialData)}
                    id="outlined-adornment-weight"
                    sx={{
                      width: "100%",
                      height: "34px",
                    }}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    {...register("homeTeamPoints", {
                      required: "Home Team points is required",
                    })}
                  />

                  {initialData ? (
                    ""
                  ) : (
                    <Box className="errorMsgParent">
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {errors.homeTeamPoints?.message}
                      </FormHelperText>
                    </Box>
                  )}
                </Box>

                <Box
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
                    inputLabel="Away Team Points:"
                  />
                  <OutlinedInput
                    type="number"
                    disabled={Boolean(initialData)}
                    id="outlined-adornment-weight"
                    sx={{
                      width: "100%",
                      height: "34px",
                    }}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    {...register("awayTeamPoints", {
                      required: "Away Team points is required",
                    })}
                  />

                  {initialData ? (
                    ""
                  ) : (
                    <Box className="errorMsgParent">
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {errors.awayTeamPoints?.message}
                      </FormHelperText>
                    </Box>
                  )}
                </Box>

                <Box
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
                    inputLabel="Event ID:"
                  />
                  <OutlinedInput
                    type="number"
                    disabled={Boolean(initialData)}
                    id="outlined-adornment-weight"
                    sx={{
                      width: "100%",
                      height: "34px",
                    }}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    {...register("eventId", {
                      required: "Away Team points is required",
                    })}
                  />

                  {initialData ? (
                    ""
                  ) : (
                    <Box className="errorMsgParent">
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {errors.eventId?.message}
                      </FormHelperText>
                    </Box>
                  )}
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
                    inputLabel="Kingbot Tipping:"
                  />

                  <FormControl
                    sx={{ m: 1 }}
                    fullWidth
                    {...register("kingbotTipping")}
                  >
                    <Controller
                      name="kingbotTipping"
                      disabled={Boolean(initialData)}
                      control={control}
                      rules={{ required: "Sport Type is required" }}
                      render={({ field }) => (
                        <Select
                          displayEmpty
                          sx={{
                            fontSize: "14px",
                            height: "40px",
                          }}
                          {...field}
                          {...register("kingbotTipping")}
                        >
                          {/* <MenuItem disabled value="">
                          Sport Type
                        </MenuItem> */}
                          <MenuItem
                            value="Regular"
                            {...register("kingbotTipping")}
                          >
                            Regular
                          </MenuItem>
                          <MenuItem
                            value="Playoffs"
                            {...register("kingbotTipping")}
                          >
                            Playoffs
                          </MenuItem>
                        </Select>
                      )}
                    />
                    {initialData ? (
                      ""
                    ) : (
                      <Box className="errorMsgParent">
                        <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                          {errors.kingbotTipping?.message}
                        </FormHelperText>
                      </Box>
                    )}
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  width: "96%",
                  // height: initialData ? "65px" : "100px",

                  alignItems: "center",
                }}
              >
                <BackModalBtn onClick={onClose}>Back</BackModalBtn>
                <AddSportSubmitBtn type="submit">
                  <SendIcon sx={{ mr: 1 }} />
                  Submit
                </AddSportSubmitBtn>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default AddGameModal;
