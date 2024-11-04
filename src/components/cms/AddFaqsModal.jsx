import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  AddSportBtn,
  AddSportSubmitBtn,
  BackModalBtn,
  SportModalHeading,
} from "../master/masterStyled";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { FormHelperText, OutlinedInput } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { handleNotification } from "../../slices/Snackbar";
import {
  getFaqsDataForEdit,
  updateAddFaqsModalVisibility,
  updateModeForEdit,
} from "../../slices/FAQsSlice/faqs";
import { faqsDataSelector } from "../../slices/FAQsSlice/faqsSelectore";
import { messagingSelector } from "../../slices/messaging/messagingSelector";

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

export default function AddFaqsModal(props) {
  const {
    CustomBtnOne,
    CustomBtnTwo,
    heading,
    labelOneTitle,
    labelTwoTitle,
    placeHolderOne,
    placeHolderTwo,
    onSubmit,
    formatInput,
    handleFaqsClose,
    RequiredFirst,
    RequiredSecond,
    registerFirst,
    registerSecond,
    buttonTitle,
    modeName,
    mode,
  } = props;
  const dispatch = useDispatch();
  const { isAddFaqsModalVisible, setEditFaqsData, setModeForFaqsEdit } =
    useSelector(faqsDataSelector);
  const { multipleRowId } = useSelector(messagingSelector);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const handleOpen = () => {
    reset({
      [registerFirst]: "",
      [registerSecond]: "",
    });
    dispatch(updateModeForEdit(`${modeName}`));

    dispatch(updateAddFaqsModalVisibility(true));
  };
  useEffect(() => {
    if (setModeForFaqsEdit === "edit") {
      setValue(registerFirst, setEditFaqsData[0]?.question);
      setValue(registerSecond, setEditFaqsData[0]?.answer);
    }
  }, [setModeForFaqsEdit, setValue]);

  return (
    <>
      <AddSportBtn
        disableRipple
        onClick={handleOpen}
        disabled={mode === "messaging" && multipleRowId?.length === 0}
      >
        <AddIcon sx={{ mr: 1 }} />
        {buttonTitle}
      </AddSportBtn>{" "}
      <Modal
        open={isAddFaqsModalVisible}
        onClose={handleFaqsClose}
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
              {heading}
              <CloseIcon className="close-icon" onClick={handleFaqsClose} />
            </SportModalHeading>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              id="modal-modal-description"
              sx={{
                mt: 1,
                padding: "0 15px 0px",
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
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel={labelOneTitle}
                />
                <OutlinedInput
                  id="outlined-adornment-weight"
                  placeholder={placeHolderOne}
                  sx={{
                    width: "100%",
                    height: "34px",
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  {...register(`${registerFirst}`, {
                    required: `${RequiredFirst} is required`,
                    setValueAs: (value) => formatInput(value),
                  })}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors?.[registerFirst]?.message}
                  </FormHelperText>
                </div>
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
                  inputLabel={labelTwoTitle}
                />
                <textarea
                  style={{
                    width: "100%",
                    resize: "vertical",
                    padding: "5px 0px 0px 13px",
                    outline: "none",
                    fontFamily: "Roboto, sans-serif ",
                    fontSize: "14px",
                    borderRadius: "4px",
                  }}
                  placeholder={placeHolderTwo}
                  sx={{
                    "--Textarea-focused": 1,
                  }}
                  {...register(`${registerSecond}`, {
                    required: `${RequiredSecond} is required`,
                    setValueAs: (value) => formatInput(value),
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors?.[registerSecond]?.message}
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
              <BackModalBtn onClick={handleFaqsClose}>
                {CustomBtnOne}
              </BackModalBtn>
              <AddSportSubmitBtn type="submit">
                <SendIcon sx={{ mr: 1 }} />
                {CustomBtnTwo}
              </AddSportSubmitBtn>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
