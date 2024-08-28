import { useEffect } from "react";
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

const AddRoundModal = (props) => {
  const {
    data,
    listSportApi,
    onClose,
    addRoundApi,
    initialData,
    updateData,
    updateRoundApi,
  } = props;
  const { updateEditData } = useSelector(manageRoundSelector);
  const dispatch = useDispatch();
  const { isModalVisible, modalSportName } = useSelector(userDataSelector);

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    clearErrors,
    getValues,
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
    const response = await addRoundApi({ body: data }).unwrap();
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
        Add Round
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            height: initialData ? "500px" : "530px",
            // border: "1px solid red",
          }}
        >
          <form
            onSubmit={handleSubmit(initialData ? onHandleUpdate : onSubmit)}
          >
            <Box>
              <Box sx={{ p: 1, height: "430px" }}>
                <Box>
                  <SportModalHeading
                    id="modal-modal-title"
                    variant="h6"
                    component="h3"
                  >
                    Round
                    <CloseIcon className="close-icon" onClick={onClose} />
                  </SportModalHeading>
                </Box>
                <Box
                  id="modal-modal-description"
                  sx={{
                    mt: 1,
                    padding: "0 15px 12px",
                    // border: "1px solid red",

                    height: initialData ? "367px" : "400px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
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
                      inputLabel="Selected Sports :"
                    />

                    <FormControl
                      sx={{ m: 1 }}
                      fullWidth
                      {...register("sportId")}
                    >
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
                              data.data.map((sport) => (
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
                        <div className="errorMsgParent">
                          <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                            {errors.sportId?.message}
                          </FormHelperText>
                        </div>
                      )}
                    </FormControl>
                  </div>

                  {/* /////////////////////////////////////////////////////////////////////////// */}
                  {/* <>

                    <CustomAddSportLabel
                      requiredInput="*"
                      inputLabel="Selected Sports :"
                    />
                    <FormControl
                      sx={{
                        m: 1,
                      }}
                      fullWidth
                    >
                      <Controller
                        name="sportId"
                        control={control}
                        defaultValue=""
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
                          >
                            {data?.data?.length > 0 ? (
                              data.data.map((sport) => (
                                <MenuItem key={sport._id} value={sport._id}>
                                  {sport.sportname}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>No sports available</MenuItem>
                            )}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </> */}

                  {/* /////////////////////////////////////////////////////////////////////// */}
                  {/* RoundNo. mine */}
                  {/* <CustomAddSportLabel
                    requiredInput="*"
                    inputLabel="Round No:"
                  />
                  <OutlinedInput
                    type="number"
                    sx={{
                      width: "100%",
                      height: "40px",
                    }}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    {...register("roundno", {
                      required: "Sport Name is required",
                    })}
                    disabled={Boolean(initialData)}
                  /> */}
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
                      inputLabel="Round No:"
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
                      {...register("roundno", {
                        required: "Round No. is required",
                        // validate: noSpaces,
                        // setValueAs: (value) => formatInput(value),
                      })}
                    />
                  </div>
                  {initialData ? (
                    ""
                  ) : (
                    <div className="errorMsgParent">
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {errors.roundno?.message}
                      </FormHelperText>
                    </div>
                  )}

                  {/* ////////////////////////////////////////////////////////////////////////                 */}
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
                      inputLabel="Round Name:"
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
                      {...register("roundname", {
                        required: "Round Name is required",
                        // validate: noSpaces,
                        setValueAs: (value) => formatInput(value),
                      })}
                    />
                  </div>
                  {initialData ? (
                    ""
                  ) : (
                    <div className="errorMsgParent">
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {errors.roundname?.message}
                      </FormHelperText>
                    </div>
                  )}

                  {/* <CustomAddSportLabel
                    requiredInput="*"
                    inputLabel="Round Name:"
                  />
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    name="roundname"
                    sx={{ width: "100%", height: "40px" }}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    {...register("roundname", {
                      required: "Sport Name is required",
                    })}
                  /> */}

                  {/* //////////////////////////////////////////////////////////////// */}
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
                      inputLabel="Select Type:"
                    />

                    <FormControl
                      sx={{ m: 1 }}
                      fullWidth
                      {...register("roundtype")}
                    >
                      <Controller
                        name="roundtype"
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
                            {...register("roundtype")}
                          >
                            <MenuItem disabled value="">
                              Sport Type
                            </MenuItem>
                            <MenuItem
                              value="Regular"
                              {...register("roundtype")}
                            >
                              Regular
                            </MenuItem>
                            <MenuItem
                              value="Playoffs"
                              {...register("roundtype")}
                            >
                              Playoffs
                            </MenuItem>
                          </Select>
                        )}
                      />
                      {initialData ? (
                        ""
                      ) : (
                        <div className="errorMsgParent">
                          <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                            {errors.roundtype?.message}
                          </FormHelperText>
                        </div>
                      )}
                    </FormControl>
                  </div>

                  {/* <div
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
                      inputLabel="Select Type:"
                    />

                    <FormControl
                      sx={{
                        m: 1,
                        "&.Mui-disabled": {
                          cursor: "not-allowed",
                        },
                      }}
                      fullWidth
                      error={Boolean(errors.type)}
                    >
                      <Controller
                        name="roundtype"
                        control={control}
                        render={({ field }) => (
                          <Select
                            displayEmpty
                            sx={{
                              fontSize: "14px",
                              height: "40px",
                            }}
                            {...field}
                            {...register("roundtype")}
                            disabled={Boolean(initialData)}
                          >
                            <MenuItem disabled value="">
                              Sport Type
                            </MenuItem>
                            <MenuItem value="Regular">Regular</MenuItem>
                            <MenuItem value="Playoffs">Playoffs</MenuItem>
                          </Select>
                        )}
                      />
                      <div className="errorMsgParent">
                        <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                          {errors.type?.message}
                        </FormHelperText>
                      </div>
                    </FormControl>
                  </div> */}
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
                      <DateRangePicker
                        control={control}
                        name="startDate"
                        name2="endDate"
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        clearErrors={clearErrors}
                        initialData={initialData}
                      />
                    </Box>
                  </div>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  width: "96%",
                  // height:,
                  height: initialData ? "65px" : "100px",
                  alignItems: "center",
                  // border: "1px solid red",
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
export default AddRoundModal;
