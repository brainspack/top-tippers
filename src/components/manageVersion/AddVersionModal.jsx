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
import { versionDataSelector } from "../../slices/VersionListSlice/versionListSelector";
import {
  getVersionDataForEdit,
  knowWhereHaveToOpenModalForVersion,
  updateVersionModalVisibility,
} from "../../slices/VersionListSlice/versionListSlice";
import {
  AddSportBtn,
  AddSportSubmitBtn,
  BackModalBtn,
  SportModalHeading,
} from "../master/masterStyled";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "auto",
  outline: "none",
  p: 1,
};

export default function AddVersionModal({ addVersionData, addVersionApi }) {
  const dispatch = useDispatch();
  const {
    isVersionModalVisible,
    setEditVersionData,
    buttonClickedForVersionModal,
  } = useSelector(versionDataSelector);

  const handleOpen = () => {
    reset({
      title: "",
      description: "",
      version: "",
      platform: "",
      isRequired: null,
    });
    dispatch(knowWhereHaveToOpenModalForVersion("addSport"));
    dispatch(updateVersionModalVisibility(true));
  };
  const handleClose = () => {
    dispatch(getVersionDataForEdit(""));
    dispatch(updateVersionModalVisibility(false));
    reset();
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },

    reset,
  } = useForm({
    mode: "onChange",

    defaultValues: {
      title: "",
      description: "",
      version: "",
      platform: "",
      isRequired: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const onReset = async (userValue) => {
    let result = await Promise.resolve({
      title: userValue?.title,
      description: userValue?.description,
      version: userValue?.version,
      platform: userValue?.platform,
      isRequired: userValue?.isRequired,
    });

    reset(result);
  };

  const onSubmit = async (data) => {
    try {
      const result = await addVersionApi({
        ...data,
        isRequired: data?.isRequired === "true",
        versionId: setEditVersionData?.length ? setEditVersionData[0]?.id : "",
      }).unwrap();

      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
        reset({
          title: "",
          description: "",
          version: "",
          platform: "",
          isRequired: "",
        });
        handleClose();
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      }
    } catch (err) {
      dispatch(
        handleNotification({
          state: true,
          message: addVersionData?.message,
          severity: addVersionData?.code,
        })
      );
    }
  };

  useEffect(() => {
    if (setEditVersionData?.length && buttonClickedForVersionModal === "edit") {
      onReset(setEditVersionData[0]);
    }
  }, [setEditVersionData]);

  return (
    <>
      <AddSportBtn disableRipple onClick={handleOpen}>
        <AddIcon sx={{ mr: 1 }} />
        Add Version
      </AddSportBtn>{" "}
      <Modal
        open={isVersionModalVisible}
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
                height: "auto",
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
                  gap: "5px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Description"
                />
                <textarea
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    resize: "vertical",
                    padding: "5px 0px 0px 13px",
                    outline: "none",
                    fontFamily: "Roboto, sans-serif ",
                    fontSize: "14px",
                    borderRadius: "4px",
                  }}
                  placeholder="Description"
                  sx={{
                    "--Textarea-focused": 1,
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
                  gap: "5px",
                }}
              >
                <CustomAddSportLabel requiredInput="*" inputLabel="Version:" />
                <input
                  type="number"
                  step="0.01"
                  id="version"
                  {...register("version", {
                    required: "Version is required",
                  })}
                  style={{
                    width: "100%",
                    height: "34px",
                    padding: "0 12px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.version?.message}
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
                <CustomAddSportLabel requiredInput="*" inputLabel="Platform:" />
                <Controller
                  name="platform"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="platform-radio-buttons-group-label"
                        {...field}
                      >
                        <FormControlLabel
                          value="Android"
                          control={<Radio />}
                          label="Android"
                        />
                        <FormControlLabel
                          value="iOS"
                          control={<Radio />}
                          label="iOS"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
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
                  inputLabel="Allow force update?:"
                />
                <Controller
                  name="isRequired"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="platform-radio-buttons-group-label"
                        {...field}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Required"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Not Required"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
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
