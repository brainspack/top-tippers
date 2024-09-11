import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import {
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import {
  getUserDataForEdit,
  knowWhereHaveToOpenModal,
  updateModalVisibility,
} from "../../slices/userSlice/user";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { handleNotification } from "../../slices/Snackbar";
import { adDataSelector } from "../../slices/AdSlice/AdSelector";
import { updateAdModalVisibility } from "../../slices/AdSlice/Ad";
import {
  AddSportBtn,
  AddSportSubmitBtn,
  BackModalBtn,
  SportModalHeading,
} from "../master/masterStyled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "584px",
  outline: "none",
  // p: 1,
};

export default function AddAdModal({ success, dataSupport, apiFunction }) {
  const dispatch = useDispatch();
  const { isAdModalVisible, setEditData, buttonClickedForModal } =
    useSelector(adDataSelector);

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
    // dispatch(knowWhereHaveToOpenModal("addSport"));
    dispatch(updateAdModalVisibility(true));
  };
  const handleClose = () => {
    // dispatch(getUserDataForEdit(""));
    dispatch(updateAdModalVisibility(false));
  };

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

  //   const onReset = async (userValue) => {
  //     console.log(userValue, "sjka");

  //     let result = await Promise.resolve({
  //       sportname: userValue?.sportname,
  //       description: userValue?.description,
  //       startDate: userValue?.startDate,
  //       endDate: userValue?.endDate,
  //       type: userValue?.type,
  //       bonus: userValue?.bonus == true ? "True" : "False",
  //       stack: userValue?.stack,
  //     });

  //     reset(result);
  //   };

  //   const onSubmit = async (data) => {
  //     let updated = getValues();

  //     try {
  //       const result = await apiFunction({
  //         ...data,
  //         bonus: data.bonus === "True",
  //         sportId: setEditData?.length ? setEditData[0]?.id : "",
  //       }).unwrap();

  //       if (result?.code === 200) {
  //         dispatch(
  //           handleNotification({
  //             state: true,
  //             message: result?.message,
  //             severity: result?.code,
  //           })
  //         );
  //         reset({
  //           sportname: "",
  //           description: "",
  //           startDate: "",
  //           endDate: "",
  //           type: "",
  //           bonus: null,
  //           stack: "",
  //         });
  //         handleClose();
  //       } else {
  //         dispatch(
  //           handleNotification({
  //             state: true,
  //             message: result?.message,
  //             severity: result?.code,
  //           })
  //         );
  //       }
  //     } catch (err) {
  //       dispatch(
  //         handleNotification({
  //           state: true,
  //           message: dataSupport?.message,
  //           severity: dataSupport?.code,
  //         })
  //       );
  //     }
  //   };

  //   useEffect(() => {
  //     if (setEditData?.length && buttonClickedForModal === "edit") {
  //       onReset(setEditData[0]);
  //     }
  //   }, [setEditData]);

  const formatInput = (value) => {
    if (typeof value === "string") {
      if (!value) return value;
      return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
    }
  };

  return (
    <>
      <AddSportBtn disableRipple onClick={handleOpen}>
        <AddIcon sx={{ mr: 1 }} />
        Add Ad
      </AddSportBtn>{" "}
      <Modal
        open={isAdModalVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <SportModalHeading
              id="modal-modal-title"
              variant="h6"
              component="h3"
            >
              Ad
              <CloseIcon className="close-icon" onClick={handleClose} />
            </SportModalHeading>
          </Box>
          <form onSubmit={handleSubmit()}>
            <Box
              id="modal-modal-description"
              sx={{
                mt: 1,
                padding: "0 15px 12px",
                height: "475px",
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
                <CustomAddSportLabel requiredInput="*" inputLabel="Name:" />
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
                  {...register("name", {
                    required: "Name is required",
                    setValueAs: (value) => formatInput(value),
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.name?.message}
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
                  inputLabel="Select Type:"
                />

                <FormControl sx={{ m: 1 }} fullWidth {...register("type")}>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: "Type is required" }}
                    render={({ field }) => (
                      <Select
                        displayEmpty
                        sx={{
                          fontSize: "14px",
                          height: "40px",
                        }}
                        {...field}
                        {...register("type")}
                      >
                        <MenuItem value="TopSport Banner" {...register("type")}>
                          TopSport Banner
                        </MenuItem>
                        <MenuItem value="Tipping Success" {...register("type")}>
                          Tipping Success
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
                  inputLabel="Select User Type"
                />

                <FormControl
                  sx={{ m: 1, minWidth: 353 }}
                  {...register("userType")}
                >
                  <Controller
                    name="userType"
                    control={control}
                    rules={{ required: "User Type is required" }}
                    render={({ field }) => (
                      <Select
                        displayEmpty
                        sx={{
                          fontSize: "14px",
                          height: "40px",
                        }}
                        {...field}
                        {...register("userType")}
                      >
                        <MenuItem value={"TopSport"} {...register("userType")}>
                          TopSport
                        </MenuItem>
                        <MenuItem
                          value={"TopTippers"}
                          {...register("userType")}
                        >
                          TopTippers
                        </MenuItem>
                      </Select>
                    )}
                  />
                  <div className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.userType?.message}
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
                  inputLabel="Select Page Type:"
                />

                <FormControl
                  sx={{ m: 1, minWidth: 353 }}
                  {...register("pages")}
                >
                  <Controller
                    name="pages"
                    control={control}
                    rules={{ required: "Pages is required" }}
                    render={({ field }) => (
                      <Select
                        displayEmpty
                        sx={{
                          fontSize: "14px",
                          height: "40px",
                        }}
                        {...field}
                        {...register("pages")}
                      >
                        <MenuItem value={"True"} {...register("pages")}>
                          TIPPING PAGE
                        </MenuItem>
                        <MenuItem value={"False"} {...register("pages")}>
                          SCORECARD PAGE
                        </MenuItem>
                      </Select>
                    )}
                  />
                  <div className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.pages?.message}
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
                  inputLabel="Select Sports Name:"
                />

                <FormControl
                  sx={{ m: 1, minWidth: 353 }}
                  {...register("sport")}
                >
                  <Controller
                    name="sport"
                    control={control}
                    rules={{ required: "Sport Name is required" }}
                    render={({ field }) => (
                      <Select
                        displayEmpty
                        sx={{
                          fontSize: "14px",
                          height: "40px",
                        }}
                        {...field}
                        {...register("sport")}
                      >
                        <MenuItem value={"True"} {...register("sport")}>
                          True
                        </MenuItem>
                        <MenuItem value={"False"} {...register("sport")}>
                          False
                        </MenuItem>
                      </Select>
                    )}
                  />
                  <div className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.sport?.message}
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
                  inputLabel="Select Media Type:"
                />

                <FormControl
                  sx={{ m: 1, minWidth: 353 }}
                  {...register("mediaType")}
                >
                  <Controller
                    name="mediaType"
                    control={control}
                    rules={{ required: "Round Bonus is required" }}
                    render={({ field }) => (
                      <Select
                        displayEmpty
                        sx={{
                          fontSize: "14px",
                          height: "40px",
                        }}
                        {...field}
                        {...register("mediaType")}
                      >
                        <MenuItem value={"True"} {...register("mediaType")}>
                          image
                        </MenuItem>
                        <MenuItem value={"False"} {...register("mediaType")}>
                          gif
                        </MenuItem>
                        <MenuItem value={"False"} {...register("mediaType")}>
                          html
                        </MenuItem>
                        <MenuItem value={"False"} {...register("mediaType")}>
                          json
                        </MenuItem>
                      </Select>
                    )}
                  />
                  <div className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.mediaType?.message}
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
                  inputLabel="Redirect Url:"
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
                  {...register("redirectUrl", {
                    required: "Redirect Url is required",
                    pattern: {
                      value: /^\d+$/,
                    },
                    message: "Stack Value must be a number",
                    // setValueAs: (value) => formatInput(value),
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.redirectUrl?.message}
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
