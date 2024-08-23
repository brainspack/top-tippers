import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import { updateSendModalVisibility } from "../../slices/userSlice/user";
import {
  AddSportSubmitBtn,
  BackModalBtn,
  SportModalHeading,
} from "./masterStyled";
import CloseIcon from "@mui/icons-material/Close";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import { FormHelperText, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";
import Textarea from "@mui/joy/Textarea";
import { useGetSendSportNotificaticationApiByNameMutation } from "../../api/SendSportNotificatication";
import { handleNotification } from "../../slices/Snackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "270px",
  p: 1,
};

export default function SendSportModal({ sportDataId, sportDataName }) {
  console.log(sportDataId, "iddd");

  const dispatch = useDispatch();
  const { isSendModalVisible } = useSelector(userDataSelector);
  const handleSendOpen = () => {
    dispatch(updateSendModalVisibility(true));
  };
  const handleSendClose = () => {
    dispatch(updateSendModalVisibility(false));
    reset();
  };

  console.log("insendSport Modal");
  const [
    sendSportNotify,
    { data: sendSportData, isSuccess: sendSportSuccess },
  ] = useGetSendSportNotificaticationApiByNameMutation();

  // const SendSportData = async (data) => {
  //     try {
  //       const result = await sendSportNotify({ body: data }).unwrap();
  //       console.log(result, "RESULT");

  //       setListSportData(result.data);
  //     } catch (err) {
  //       console.log(err, "the errr");
  //     }
  //     await sendSportData;
  //   };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data);
    try {
      console.log(data, "dataaaa");

      const result = await sendSportNotify({
        ...data,
        sportId: sportDataId,
      }).unwrap();
      console.log(result, "RESULT_sport");
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: sendSportData?.message,
            severity: sendSportData?.code,
          })
        );
        handleSendClose();
      }

      // onAddSport(result); // Call the callback with the new data
      reset();
    } catch (err) {
      dispatch(
        handleNotification({
          state: true,
          message: sendSportData?.message,
          severity: sendSportData?.code,
        })
      );
      console.log(err, "the errr");
    }
    // await addUpdateSportData;
  };
  return (
    <div>
      <Modal
        open={isSendModalVisible}
        onClose={handleSendClose}
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
              {sportDataName}
              <CloseIcon className="close-icon" onClick={handleSendClose} />
            </SportModalHeading>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              id="modal-modal-description"
              sx={{
                mt: 1,
                padding: "0 15px 12px",
                height: "160px",
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
                  inputLabel="Message Title:"
                />
                <OutlinedInput
                  id="outlined-adornment-weight"
                  placeholder="Title"
                  sx={{
                    width: "100%",
                    height: "34px",
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  {...register("title", {
                    required: "title is required",
                  })}
                  // value={userDetails?.sportname}
                  // onChange={handleChange}
                />
                {/*  defaultValues.sportname ? defaultValues.sportname : "" */}
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
                  inputLabel="Message Description:"
                />
                <textarea
                  style={{
                    paddingLeft: "10px",
                  }}
                  placeholder="Description"
                  sx={{
                    "--Textarea-focused": 1,
                  }}
                  {...register("message", {
                    required: "description is required",
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.message?.message}
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
              <BackModalBtn onClick={handleSendClose}>Back</BackModalBtn>
              <AddSportSubmitBtn type="submit">
                <SendIcon sx={{ mr: 1 }} />
                Submit
              </AddSportSubmitBtn>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
