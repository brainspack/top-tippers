import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Box,
  Modal,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import {
  AddSportSubmitBtn,
  BackModalBtn,
  SportModalHeading,
} from "./masterStyled";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import ImageUploader from "./ImageUploader";
import {
  setModalSportName,
  updateModalVisibility,
} from "../../slices/userSlice/user";
import { useAddTeamByNameMutation } from "../../api/AddNewTeam";
import { handleNotification } from "../../slices/Snackbar";

const AddTeamModal = (props) => {
  const {
    data,
    listSportApi,
    open,
    onClose,
    initialSportName,
    mode,
    onHandleUpdate,
    sportData,
    addTeamApi,
  } = props;
  console.log(sportData, "SPORTSDATA");

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
  const onHandleChange = (e) => {
    dispatch(setModalSportName(e.target.value));
  };

  ////////////////////////////////////////////////////////////////////////////
  const [teamDetails, setTeamDetails] = useState({
    teamname: "",
    file: null,
    sportid: "",
  });
  const [image, setImage] = useState(null);
  console.log(image, "INSIDE TEAM IMAGE");

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

  const onHandleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onHandleSportChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue, "SELECTED VALUE");

    setTeamDetails((prevDetails) => ({
      ...prevDetails,
      sportid: selectedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("teamname", teamDetails?.teamname);
    formData.append("file", teamDetails?.file);
    formData.append("sportId", teamDetails?.sportid);

    try {
      const result = await addTeamApi(formData).unwrap();
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
        dispatch(updateModalVisibility(false));
        setTeamDetails({
          teamname: "",
          file: null,
          sportid: "",
        });
        setImage(null);
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      }
    } catch (error) {
      console.error("Failed to add team:", error);
    }
  };

  return (
    <>
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
            height: mode === "edit" ? "200px" : "500px",
            p: 1,
          }}
        >
          <Box>
            <SportModalHeading
              id="modal-modal-title"
              variant="h6"
              component="h3"
            >
              {mode === "edit" ? "Team Details" : "Team"}
              <CloseIcon className="close-icon" onClick={onClose} />
            </SportModalHeading>
          </Box>
          {mode === "edit" ? (
            ""
          ) : (
            <ImageUploader
              handleImageChange={handleImageChange}
              image={image}
            />
          )}

          <Box
            id="modal-modal-description"
            sx={{
              mt: 1,
              padding: "0 15px 12px",
              height: mode === "edit" ? "85px" : "150px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <CustomAddSportLabel requiredInput="*" inputLabel="Team Name:" />
            <OutlinedInput
              id="outlined-adornment-weight"
              name="teamname"
              value={
                mode === "edit" ? initialSportName : teamDetails?.teamname || ""
              }
              onChange={mode === "edit" ? onHandleChange : onHandleTeamChange}
              sx={{ width: "100%", height: "40px" }}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            {mode === "edit" ? (
              ""
            ) : (
              <>
                <CustomAddSportLabel requiredInput="*" inputLabel="Sports :" />

                <FormControl sx={{ m: 1 }} fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    displayEmpty
                    sx={{ fontSize: "14px", height: "40px" }}
                    value={teamDetails?.sportid}
                    onChange={onHandleSportChange}
                  >
                    {sportData?.data?.map((sport) => (
                      <MenuItem key={sport._id} value={sport._id}>
                        {sport?.sportname}
                      </MenuItem>
                    )) || <MenuItem disabled>No sports available</MenuItem>}
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "96%",
              height: "35px",
            }}
          >
            <BackModalBtn onClick={onClose}>Back</BackModalBtn>
            <AddSportSubmitBtn
              onClick={mode === "edit" ? onHandleUpdate : handleSubmit}
            >
              <SendIcon sx={{ mr: 1 }} />
              Submit
            </AddSportSubmitBtn>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default AddTeamModal;
