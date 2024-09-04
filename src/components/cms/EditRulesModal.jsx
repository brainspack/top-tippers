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
import { listContentDataSelector } from "../../slices/ListContentSlice/listContentSelector";
import {
  getEditRulesData,
  updateEditRulesModalVisible,
  updateModeForRulesEdit,
} from "../../slices/ListContentSlice/listContent";

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

export default function EditRulesModal({
  AddUpdateContentRules,
  AddContentRulesData,
  //   faqsListTopicData,
}) {
  const dispatch = useDispatch();
  const { isEditRulesModalVisible, setEditRulesData, setModeForRulesEdit } =
    useSelector(listContentDataSelector);
  console.log(setEditRulesData, "set");
  //   const questionIdFaqs = faqsListTopicData?.data?.filter((e) => {
  //     // console.log(e, "ee");
  //     if (e.topicname === "FAQs") {
  //       return e._id;
  //     }
  //   });
  //   console.log(questionIdFaqs, "sett");

  const handleFaqsClose = () => {
    // dispatch(getEditRulesData(""));
    dispatch(updateEditRulesModalVisible(false));
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
      title: userValue?.title,
      content: userValue?.content,
    });

    reset(result);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      console.log(data, "dataaaa");

      const result = await AddUpdateContentRules({
        ...data,
        contentId: setEditRulesData[0]?.id,
        // topicId: questionIdFaqs[0]._id,
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

        // reset({
        //   title: "",
        //   content: "",
        // });
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

      //   reset();
    } catch (err) {
      dispatch(
        handleNotification({
          state: true,
          message: AddContentRulesData?.message,
          severity: AddContentRulesData?.code,
        })
      );
    }
  };

  useEffect(() => {
    // console.log(setEditRulesData[0], "ss");

    if (setEditRulesData?.length && setModeForRulesEdit === "edit") {
      onReset(setEditRulesData[0]);
    }
  }, [setEditRulesData]);

  const formatInput = (value) => {
    if (!value) return value;
    return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
  };

  return (
    <>
      {/* <AddSportBtn disableRipple onClick={handleOpen}>
        <AddIcon sx={{ mr: 1 }} />
        Add FAQs
      </AddSportBtn>{" "} */}
      <Modal
        open={isEditRulesModalVisible}
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
              Rules
              <CloseIcon className="close-icon" onClick={handleFaqsClose} />
            </SportModalHeading>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              id="modal-modal-title"
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
                <CustomAddSportLabel requiredInput="*" inputLabel="Title" />
                <OutlinedInput
                  id="outlined-adornment-weight"
                  //   placeholder="Title"
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
                    setValueAs: (value) => formatInput(value),
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
                <CustomAddSportLabel requiredInput="*" inputLabel="Content" />
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
                  {...register("content", {
                    required: "Content is required",
                    setValueAs: (value) => formatInput(value),
                  })}
                />
              </div>
              <div className="errorMsgParent">
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.content?.message}
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
