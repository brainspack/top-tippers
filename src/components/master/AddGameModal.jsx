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
import { setSelectedGameMode } from "../../slices/manageGame/manageGame";
import { manageGameSelector } from "../../slices/manageGame/manageGameSelector";
import moment from "moment";

const AddGameModal = (props) => {
  const {
    data,
    onClose,
    initialData,
    gameData,
    teamData,
    allTeamData,
    addGameApi,
    updateGameApi,
  } = props;

  const dispatch = useDispatch();
  const { isModalVisible, modalSportName } = useSelector(userDataSelector);
  const { sportData } = useSelector(manageSportSelector);
  const { selectedGameMode } = useSelector(manageGameSelector);
  console.log(selectedGameMode, "selectedGameMode");
  const { roundData } = useSelector(manageRoundSelector);

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
    getValues,
  } = useForm({
    defaultValues: {
      awayTeam: "",
      awayTeamPoints: null,
      date: "",
      drawPoints: null,
      eventId: null,
      gameState: "",
      homeTeam: "",
      homeTeamPoints: "",
      kingbotTipping: "",
      round: "",
      season: "",
      selectedSeason: "",
      sportId: "",
      time: null,
      winningTeam: "",
    },
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });
  const onSubmit = async (data) => {
    const response = await addGameApi({
      ...data,
      drawPoints: null,
      gameState: "open",
      season: "current",
      selectedSeason: "current",
    }).unwrap();
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
      // roundId: initialData[0]?.roundId ? initialData[0]?.roundId : "",
      // startDate: data?.startDate,
      // endDate: data?.endDate,
      // roundname: data?.roundname,
    };
    const response = await updateGameApi({
      body: data,
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
    console.log("🚀 ~ AddGameModal ~ selectedSportId:", selectedSportId);
    if (selectedSportId) {
      const filtered = roundData?.data.filter(
        (round) => round?.sport?._id === selectedSportId
      );
      setFilteredRounds(filtered);
      setValue("round", "");
    } else {
      setFilteredRounds([]);
    }
  }, [selectedSportId, roundData, setValue]);

  const [selectTeam, setSelectTeam] = useState([]);
  useEffect(() => {
    if (selectedSportId) {
      const filteredTeams = allTeamData?.data.filter(
        (team) => team?.sport?._id === selectedSportId
      );
      setSelectTeam(filteredTeams);

      setValue("homeTeam", "");
      setValue("awayTeam", "");
    }
  }, [selectedSportId, allTeamData, setValue]);

  console.log(initialData, "INITIAL");
  useEffect(() => {
    if (initialData) {
      setValue("awayTeam", initialData[0]?.awayTeam);
      setValue("awayTeamPoints", initialData[0]?.awayTeamPoints);
      setValue("date", initialData[0]?.date);
      setValue("eventId", initialData[0]?.eventId);
      setValue("homeTeam", initialData[0]?.homeTeam);
      setValue("homeTeamPoints", initialData[0]?.homeTeamPoints);
      setValue("kingbotTipping", initialData[0]?.kingbotTipping);
      setValue("round", initialData[0]?.round);
      setValue("sportId", initialData[0]?.sportId);
      // setValue("time", initialData[0]?.time);
    } else {
      reset();
    }
  }, [initialData, setValue, reset]);
  // const formatInput = (value) => {
  //   if (typeof value === "string") {
  //     if (!value) return value;
  //     return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
  //   }
  // };
  const handleAddRound = () => {
    // reset({
    //   roundno: "",
    //   roundname: "",
    //   roundtype: "",
    //   sportId: "",
    //   startDate: "",
    //   endDate: "",
    //   roundId: "",
    // });
    dispatch(setSelectedGameMode("addGame"));
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
                  {initialData ? "Edit Game" : "Add Game"}
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
                          {data?.data?.map((sport) => (
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
                      <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
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
                          {...register("round")}
                        >
                          {filteredRounds.length > 0 ? (
                            filteredRounds.map((rounds) => (
                              <MenuItem
                                key={rounds._id}
                                value={rounds._id}
                                {...register("round")}
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
                        {errors?.round?.message}
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

                  <FormControl
                    sx={{ m: 1 }}
                    fullWidth
                    {...register("homeTeam")}
                  >
                    <Controller
                      name="homeTeam"
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
                          {...register("homeTeam")}
                        >
                          {selectTeam.length > 0 ? (
                            selectTeam.map((team) => (
                              <MenuItem
                                key={team._id}
                                value={team._id}
                                {...register("homeTeam")}
                              >
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
                    inputLabel="Select Away Team :"
                  />

                  <FormControl
                    sx={{ m: 1 }}
                    fullWidth
                    {...register("awayTeam")}
                  >
                    <Controller
                      name="awayTeam"
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
                          {...register("awayTeam")}
                        >
                          {selectTeam.length > 0 ? (
                            selectTeam.map((team) => (
                              <MenuItem
                                key={team._id}
                                value={team._id}
                                {...register("awayTeam")}
                              >
                                {team?.teamname}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No away team available</MenuItem>
                          )}
                        </Select>
                      )}
                    />

                    <Box className="errorMsgParent">
                      <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                        {errors.awayTeam?.message}
                      </FormHelperText>
                    </Box>
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
                    <CustomAddSportLabel requiredInput="*" inputLabel="Date" />
                    <Box>
                      <DateRangePicker
                        control={control}
                        name="date"
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        clearErrors={clearErrors}
                        // initialData={initialData}
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
                      <CustomTimePicker control={control} setValue={setValue} />
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
                    // type="number"
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

                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      {errors.homeTeamPoints?.message}
                    </FormHelperText>
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
                    inputLabel="Away Team Points:"
                  />
                  <OutlinedInput
                    // type="number"
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

                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      {errors.awayTeamPoints?.message}
                    </FormHelperText>
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
                    inputLabel="Event ID:"
                  />
                  <OutlinedInput
                    type="number"
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

                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      {errors.eventId?.message}
                    </FormHelperText>
                  </Box>
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
                      control={control}
                      rules={{ required: "Please select Kingbot Tipping" }}
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
                            value="Home"
                            {...register("kingbotTipping")}
                          >
                            Home
                          </MenuItem>
                          <MenuItem
                            value="Away"
                            {...register("kingbotTipping")}
                          >
                            Away
                          </MenuItem>
                          <MenuItem
                            value="Draw"
                            {...register("kingbotTipping")}
                          >
                            Draw
                          </MenuItem>
                        </Select>
                      )}
                    />

                    <Box className="errorMsgParent">
                      <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                        {errors.kingbotTipping?.message}
                      </FormHelperText>
                    </Box>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  width: "96%",
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
