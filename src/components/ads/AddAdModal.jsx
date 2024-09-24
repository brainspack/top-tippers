import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import {
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import UploadIcon from "@mui/icons-material/Upload";

import {
  getUserDataForEdit,
  knowWhereHaveToOpenModal,
  updateModalVisibility,
} from "../../slices/userSlice/user";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { handleNotification } from "../../slices/Snackbar";
import { adDataSelector } from "../../slices/AdSlice/AdSelector";
import {
  getUserAdDataForEdit,
  updateAdModalVisibility,
} from "../../slices/AdSlice/Ad";
import {
  AddSportBtn,
  AddSportSubmitBtn,
  BackModalBtn,
  SportModalHeading,
} from "../master/masterStyled";
import { updateSportList } from "../../slices/manageTeam/manageTeam";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { manageSportDataSelector } from "../../slices/manageSport/manageSportSelector";
import TextInputBox from "../reuse/TextInputBox";
import CustomSelectInputBox from "../reuse/CustomSelectInputBox";
import {
  SELECT_MEDIA_TYPE,
  SELECT_PAGE_TYPE,
  SELECT_TYPE_ITEM,
  SELECT_USER_TYPE,
} from "../../utils/constant";
import { FormInputWrapper } from "./adStyled";

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
  overflow: "scroll",
  // p: 1,
};

export default function AddAdModal({
  success,
  addUpdateAdData,
  addUpdateAd,
  listSportData,
}) {
  const dispatch = useDispatch();
  const { sportData } = useSelector(manageSportDataSelector);

  const { isAdModalVisible, setEditDataForAd, buttonClickedForAdModal } =
    useSelector(adDataSelector);

  const [selectedType, setSelectedType] = useState("");
  const [showPageType, setShowPageType] = useState(false);

  const handleOpen = () => {
    reset({
      name: "",
      type: "",
      mediaType: "",
      userType: "",
      sport: "",
      pages: "",
      redirectUrl: "",
    });
    dispatch(knowWhereHaveToOpenModal("addAd"));
    dispatch(updateAdModalVisibility(true));
  };
  const handleClose = () => {
    dispatch(getUserAdDataForEdit(""));
    dispatch(updateAdModalVisibility(false));
    reset();
    setSelectedType("");
    setShowPageType(false);
  };

  //   // LIST SPORT API
  //   const [
  //     listSportApi,
  //     {
  //       data: listSportData,
  //       isLoading,
  //       error: listSportError,
  //       success: listSportSuccess,
  //     },
  //   ] = useGetUserListSportApiByNameMutation();

  //   // SPORT API
  //   useEffect(() => {
  //     if (listSportData && listSportData?.data)
  //       dispatch(updateSportList(listSportData));
  //   }, [listSportData]);

  // //   console.log(listSportApi);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },

    reset,
  } = useForm({
    mode: "onChange",

    defaultValues: {
      name: "",
      type: "",
      userType: "",
      pages: "",
      sport: "",
      mediaType: "",
      redirectUrl: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const onReset = async (userValue) => {
    try {
      console.log(userValue, "sjka");

      // Simulate a successful asynchronous operation
      let result = await Promise.resolve({
        name: userValue?.name,
        type: userValue?.type,
        mediaType: userValue?.mediaType,
        userType: userValue?.userType,
        sport: userValue?.sport,
        pages: userValue?.pages,
        redirectUrl: userValue?.redirectUrl,
      });

      setSelectedType(userValue?.type);
      setShowPageType(userValue?.type === "Topsport_banner");

      reset(result);
    } catch (error) {
      console.error("Error during reset:", error);

      dispatch(
        handleNotification({
          state: true,
          message:
            "An error occurred while resetting the form. Please try again.",
          severity: "error",
        })
      );
    }
  };

  ///// Image Uploader
  const [teamDetails, setTeamDetails] = useState({
    file: null,
  });

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      setTeamDetails((prevDetails) => ({
        ...prevDetails,
        file: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (setEditDataForAd?.length && buttonClickedForAdModal === "edit") {
      onReset(setEditDataForAd[0]);
    }
  }, [setEditDataForAd]);

  const onSubmit = async (data) => {
    console.log(data, "data");

    const formData = new FormData();
    formData.append("files", teamDetails?.file);
    formData.append("name", data?.name);
    formData.append("type", data?.type);
    formData.append("redirectUrl", data?.redirectUrl);
    formData.append("userType", data?.userType);
    formData.append("mediaType", data?.mediaType);
    formData.append("sport", data?.sport);
    formData.append("page", data?.page);
    formData.append(
      "adId",
      setEditDataForAd?.length ? setEditDataForAd[0].id : ""
    );

    try {
      const result = await addUpdateAd(formData).unwrap();

      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
        reset({
          name: "",
          type: "",
          mediaType: "",
          userType: "",
          sport: "",
          pages: "",
          redirectUrl: "",
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
          message: addUpdateAdData?.message,
          severity: addUpdateAdData?.code,
        })
      );
    }
  };

  const formatInput = (value) => {
    if (typeof value === "string") {
      if (!value) return value;
      return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
    }
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;

    setSelectedType(value);
    setShowPageType(value === "Topsport_banner");
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputWrapper id="modal-modal-description">
              <TextInputBox
                inputLabel={"Name:"}
                register={register}
                name={"name"}
                errors={errors}
                required={"Name is required"}
              />

              <CustomSelectInputBox
                inputLabel={"Select Type:"}
                register={register}
                name={"type"}
                required={"Type is required"}
                errors={errors}
                control={control}
                handleTypeChange={handleTypeChange}
                menuItems={SELECT_TYPE_ITEM}
                mode={"selectType"}
              />

              <CustomSelectInputBox
                inputLabel={"Select User Type:"}
                register={register}
                name={"userType"}
                required={"User Type is required"}
                errors={errors}
                control={control}
                menuItems={SELECT_USER_TYPE}
              />

              {selectedType === "topsport_banner" ? (
                <CustomSelectInputBox
                  inputLabel={"Select Page Type:"}
                  register={register}
                  name={"page"}
                  required={"Pages is required"}
                  errors={errors}
                  control={control}
                  menuItems={SELECT_PAGE_TYPE}
                />
              ) : (
                // <div
                //   style={{
                //     height: "auto",
                //     width: "100%",
                //     display: "flex",
                //     flexDirection: "column",
                //     gap: "10px",
                //   }}
                // >
                //   <CustomAddSportLabel
                //     requiredInput="*"
                //     inputLabel="Select Page Type:"
                //   />

                //   <FormControl
                //     sx={{ m: 1, minWidth: 353 }}
                //     {...register("page")}
                //   >
                //     <Controller
                //       name="page"
                //       control={control}
                //       rules={{ required: "Pages is required" }}
                //       render={({ field }) => (
                //         <Select
                //           displayEmpty
                //           sx={{
                //             fontSize: "14px",
                //             height: "40px",
                //           }}
                //           {...field}
                //           {...register("page")}
                //         >
                //           <MenuItem value="Tip" {...register("page")}>
                //             TIPPING PAGE
                //           </MenuItem>
                //           <MenuItem value="Scorecard" {...register("page")}>
                //             SCORECARD PAGE
                //           </MenuItem>
                //           <MenuItem value="every_page" {...register("page")}>
                //             EVERY PAGE
                //           </MenuItem>
                //         </Select>
                //       )}
                //     />
                //     <div className="errorMsgParent">
                //       <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                //         {errors.page?.message}
                //       </FormHelperText>
                //     </div>
                //   </FormControl>
                // </div>
                ""
              )}

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
                  inputLabel="Select Sports for team :"
                />
                <FormControl
                  fullWidth
                  error={!!errors.sport}
                  {...register("sport")}
                >
                  <Controller
                    name="sport"
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
                          height: "34px",
                        }}
                        {...register("sport")}
                      >
                        {listSportData?.data?.map((sport) => (
                          <MenuItem
                            key={sport?._id}
                            value={sport?._id}
                            {...register("sport")}
                          >
                            {sport?.sportname}
                          </MenuItem>
                        ))}
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

              <CustomSelectInputBox
                inputLabel={"Select Media Type:"}
                register={register}
                name={"mediaType"}
                required={"Media is required"}
                errors={errors}
                control={control}
                menuItems={SELECT_MEDIA_TYPE}
              />

              <TextInputBox
                inputLabel={"Redirect Url:"}
                register={register}
                name={"redirectUrl"}
                errors={errors}
                required={"Redirect Url is required"}
              />

              <div
                style={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <>
                  <input
                    accept="image/*"
                    id="upload-image"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="upload-image"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      height: "34px",
                      cursor: "pointer",
                      background: "white",
                      borderRadius: "4px",
                      textAlign: "center",
                      border: "1px black !important",
                    }}
                  >
                    <IconButton component="span">
                      <UploadIcon />
                    </IconButton>
                    <span style={{ marginLeft: "8px" }}>Click to upload</span>
                  </label>
                </>

                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.files?.message}
                  </FormHelperText>
                </div>
              </div>
            </FormInputWrapper>

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
