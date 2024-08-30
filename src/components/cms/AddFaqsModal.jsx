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

export default function AddFaqsModal({
  AddUpdateQuestionFaqs,
  AddFaqsData,
  faqsListTopicData,
}) {
  const dispatch = useDispatch();
  const { isAddFaqsModalVisible, setEditFaqsData, setModeForFaqsEdit } =
    useSelector(faqsDataSelector);
  console.log(setEditFaqsData, "set");
  const questionIdFaqs = faqsListTopicData?.data?.filter((e) => {
    // console.log(e, "ee");
    if (e.topicname === "FAQs") {
      return e._id;
    }
  });
  console.log(questionIdFaqs, "sett");

  const handleOpen = () => {
    reset({
      question: "",
      answer: "",
    });
    dispatch(updateModeForEdit("addFaqs"));

    dispatch(updateAddFaqsModalVisibility(true));
  };

  const handleFaqsClose = () => {
    dispatch(getFaqsDataForEdit(""));
    dispatch(updateAddFaqsModalVisibility(false));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onReset = async (userValue) => {
    console.log(userValue, "sjkaj");

    let result = await Promise.resolve({
      question: userValue?.question,
      answer: userValue?.answer,
    });

    reset(result);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      console.log(data, "dataaaa");

      const result = await AddUpdateQuestionFaqs({
        ...data,
        questionId: setEditFaqsData?.length ? setEditFaqsData[0]?.id : "",
        topicId: questionIdFaqs[0]._id,
      }).unwrap();
      console.log(result, "RESULT_sport");
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
        dispatch(updateModeForEdit("addFaqs"));
        // setEditFaqsData([]);
        reset({
          question: "",
          answer: "",
        });
        handleFaqsClose();
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      }

      reset();
    } catch (err) {
      dispatch(
        handleNotification({
          state: true,
          message: AddFaqsData?.message,
          severity: AddFaqsData?.code,
        })
      );
    }
  };

  useEffect(() => {
    if (setEditFaqsData?.length && setModeForFaqsEdit === "edit") {
      onReset(setEditFaqsData[0]);
    }
  }, [setEditFaqsData]);

  const formatInput = (value) => {
    if (!value) return value;
    return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
  };

  return (
    <>
      <AddSportBtn disableRipple onClick={handleOpen}>
        <AddIcon sx={{ mr: 1 }} />
        Add FAQs
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
              FAQs
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
                <CustomAddSportLabel requiredInput="*" inputLabel="FAQs" />
                <OutlinedInput
                  id="outlined-adornment-weight"
                  placeholder="FAQs"
                  sx={{
                    width: "100%",
                    height: "34px",
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  {...register("question", {
                    required: "Question is required",
                    setValueAs: (value) => formatInput(value),
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.question?.message}
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
                <CustomAddSportLabel requiredInput="*" inputLabel="Answer" />
                <textarea
                  style={{
                    width: "100%",
                    // maxHeight: "300px",
                    resize: "vertical",
                    padding: "5px 0px 0px 13px",
                    outline: "none",
                    fontFamily: "Roboto, sans-serif ",
                    fontSize: "14px",
                    borderRadius: "4px",
                  }}
                  placeholder="Answer"
                  sx={{
                    "--Textarea-focused": 1,
                  }}
                  {...register("answer", {
                    required: "Answer is required",
                    setValueAs: (value) => formatInput(value),
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.answer?.message}
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
              <BackModalBtn onClick={handleFaqsClose}>Back</BackModalBtn>
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
