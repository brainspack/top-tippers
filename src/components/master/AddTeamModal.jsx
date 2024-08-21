import { useEffect } from "react";
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
import { setModalSportName } from "../../slices/userSlice/user";

const AddTeamModal = (props) => {
  const {
    data,
    listSportApi,
    open,
    onClose,
    initialSportName,
    mode,
    onHandleUpdate,
  } = props;
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
          {mode === "edit" ? "" : <ImageUploader />}

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
              value={mode === "edit" ? initialSportName : ""}
              // onChange={onHandle}
              onChange={mode === "edit" ? onHandleChange : undefined}
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
                  >
                    {data?.data?.map((sport) => (
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
            <AddSportSubmitBtn onClick={onHandleUpdate}>
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
