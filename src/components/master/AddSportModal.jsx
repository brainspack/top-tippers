import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  AddSportBtn,
  AddSportSubmitBtn,
  BackModalBtn,
  SportModalHeading,
} from "./masterStyled";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

import {
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import {
  getUserDataForEdit,
  knowWhereHaveToOpenModal,
  updateModalVisibility,
} from "../../slices/userSlice/user";
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import DateRangePicker from "./DatePickerComponent";
import { useGetAddUpdateSportApiByNameMutation } from "../../api/AddUpdateSport";
import { Controller, useForm } from "react-hook-form";
import { ADD_SPORT_DATA } from "../../utils/constant";
import { handleNotification } from "../../slices/Snackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "600px",
  p: 1,
};

export default function AddSportModal({
  sportData,
  dataSupport,
  success,
  apiFunction,
}) {
  const dispatch = useDispatch();
  const { isModalVisible, setEditData, buttonClickedForModal } =
    useSelector(userDataSelector);

  const handleOpen = () => {
    reset({
      sportname: "",
      description: "",
      startDate: "",
      endDate: "",
      type: "",
      bonus: null,
      stack: "",
    });
    dispatch(knowWhereHaveToOpenModal("addSport"));
    dispatch(updateModalVisibility(true));
  };
  const handleClose = () => {
    dispatch(getUserDataForEdit(""));
    dispatch(updateModalVisibility(false));
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    result,
    reset,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      sportname: "",
      description: "",
      type: "",
      bonus: "",
      startDate: "",
      endDate: "",
      stack: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const onReset = async (userValue) => {
    let result = await Promise.resolve({
      sportname: userValue?.sportname,
      description: userValue?.description,
      startDate: userValue?.startDate,
      endDate: userValue?.endDate,
      type: userValue?.type,
      bonus: userValue?.bonus == true ? "True" : "False",
    });

    reset(result);
  };

  React.useEffect(() => {
    if (setEditData?.length && buttonClickedForModal === "edit") {
      onReset(setEditData[0]);
    }
  }, [setEditData]);

  const onSubmit = async (data) => {
    let updated = getValues();
    let finalPayload = {
      ...updated,
      bonus: updated.bonus == "True" ? true : false,
    };
    console.log(data, getValues(), finalPayload, "sjhdjkhs");

    // if (!data.startDate || !data.endDate) {
    //   setError("startDate", {
    //     type: "manual",
    //     message: "Both start and end dates are required",
    //   });
    //   setError("endDate", {
    //     type: "manual",
    //     message: "Both start and end dates are required",
    //   });
    //   return;
    // }
    // if (data.endDate < data.startDate) {
    //   setError("endDate", {
    //     type: "manual",
    //     message: "End date cannot be before start date",
    //   });
    //   return;
    // }
    try {
      console.log(data, "dataaaa");

      const result = await apiFunction({
        ...data,
        bonus: data.bonus === "True",
        id: sportData?._id,
      }).unwrap();
      // reset({
      //   sportname: "",
      //   description: "",
      //   startDate: "",
      //   endDate: "",
      //   type: "",
      //   bonus: null,
      //   stack: "",
      // });

      console.log(result, "RESULT_sport");
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: dataSupport?.message,
            severity: dataSupport?.code,
          })
        );
        reset({
          sportname: "",
          description: "",
          startDate: "",
          endDate: "",
          type: "",
          bonus: null,
          stack: "",
        });
        handleClose();
      }

      // onAddSport(result); // Call the callback with the new data
      reset();
    } catch (err) {
      dispatch(
        handleNotification({
          state: true,
          message: dataSupport?.message,
          severity: dataSupport?.code,
        })
      );
      console.log(err, "the errr");
    }
    // await addUpdateSportData;
  };

  return (
    <>
      <AddSportBtn disableRipple onClick={handleOpen}>
        <AddIcon sx={{ mr: 1 }} />
        Add Sport
      </AddSportBtn>{" "}
      <Modal
        open={isModalVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{}}>
            <SportModalHeading
              id="modal-modal-title"
              variant="h6"
              component="h3"
            >
              Sport
              <CloseIcon className="close-icon" onClick={handleClose} />
            </SportModalHeading>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              id="modal-modal-description"
              sx={{
                mt: 1,
                padding: "0 15px 12px",
                height: "490px",
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                  inputLabel="Sport Name:"
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
                  {...register("sportname", {
                    required: "Sport Name is required",
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.sportname?.message}
                </FormHelperText>
              </div>
              {/* )} */}

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
                  inputLabel="Description:"
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
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.description?.message}
                </FormHelperText>
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
                  <DateRangePicker
                    control={control}
                    name="startDate"
                    name2="endDate"
                    errors={errors}
                    register={register}
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
                  inputLabel="Sport Type:"
                />

                <FormControl
                  sx={{ m: 1 }}
                  fullWidth
                  error={Boolean(errors.type)}
                >
                  <Controller
                    name="type"
                    control={control}
                    // rules={{ required: "Sport Type is required" }}
                    render={({ field }) => (
                      <Select
                        displayEmpty
                        sx={{
                          fontSize: "14px",
                          height: "40px",
                        }}
                        {...field}
                        {...register("type")}
                        // onChange={handleChange}
                      >
                        <MenuItem disabled value="">
                          Sport Type
                        </MenuItem>
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Draw">Draw</MenuItem>
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
                  inputLabel="Round Bonus:"
                />

                <FormControl sx={{ m: 1, minWidth: 353 }}>
                  <Controller
                    name="bonus"
                    control={control}
                    // rules={{ required: "Round Bonus is required" }}
                    render={({ field }) => (
                      <Select
                        displayEmpty
                        sx={{
                          fontSize: "14px",
                          height: "40px",
                        }}
                        {...field}
                        {...register("bonus")}
                      >
                        <MenuItem disabled value="">
                          Bonus
                        </MenuItem>
                        <MenuItem value={"True"}>True</MenuItem>
                        <MenuItem value={"False"}>False</MenuItem>
                      </Select>
                    )}
                  />
                  <div className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.bonus?.message}
                    </FormHelperText>
                  </div>
                </FormControl>
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
                  inputLabel="MULTI CALCULATOR STAKE VALUE:"
                />

                <OutlinedInput
                  id="outlined-adornment-weight"
                  placeholder={"Stack Value"}
                  sx={{
                    width: "100%",
                    height: "40px",
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  {...register("stack", {
                    required: "Stack Value is required",
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.stack?.message}
                </FormHelperText>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "96%",
                height: "35px",
              }}
            >
              <BackModalBtn onClick={handleClose}>Back</BackModalBtn>
              <AddSportSubmitBtn type="submit">
                <SendIcon sx={{ mr: 1 }} />
                Submit
              </AddSportSubmitBtn>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
