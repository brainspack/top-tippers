import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { manageGameSelector } from "../../../slices/manageGame/manageGameSelector";
import {
  AddSportSubmitBtn,
  BackModalBtn,
  GameDetailContent,
  GameDetailsHeading,
  GameDetailsTitle,
  SportModalHeading,
} from "../masterStyled";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { handleNotification } from "../../../slices/Snackbar";

const DeclareWinnerModal = ({ onClose, handleOpen, addGameApi }) => {
  const [options, setOptions] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setOptions(event.target.value);
  };

  const { openDeclareWinnerModal, declareWinnerData } =
    useSelector(manageGameSelector);
  console.log(declareWinnerData, "declareWinnerData");
  const onHandleSumbit = async () => {
    const data = {
      gameId: declareWinnerData[0]._id,
      gameState: "finished",
      selectedSeason: "current",
      sportId: declareWinnerData[0].sport._id,
      winningTeam: options,
      gameEndDateTime: declareWinnerData[0].gameEndDateTime,
    };
    const response = await addGameApi(data).unwrap();
    if (response?.code === 200) {
      dispatch(
        handleNotification({
          state: true,
          message: response?.message,
          severity: response?.code,
        })
      );
      onClose();
    } else {
      dispatch(
        handleNotification({
          state: true,
          message: response?.message,
          severity: response?.code,
        })
      );
    }
  };
  return (
    <div>
      <Modal
        open={openDeclareWinnerModal}
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
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            height: 400,
          }}
        >
          <Box>
            <SportModalHeading
              id="modal-modal-title"
              variant="h6"
              component="h3"
            >
              Update Game Result
              <CloseIcon className="close-icon" onClick={onClose} />
            </SportModalHeading>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "300px",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "200px",
                justifyContent: "space-between",
                // p: 2,
              }}
            >
              <Card sx={{ width: "48%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100"
                    image={declareWinnerData[0]?.homeTeam?.teamLogo}
                    //   image="alt"
                    //   objectFit={"contain"}
                    //   alt={data?.data?.teamname || "Team Image"}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <GameDetailsHeading>Home Team :</GameDetailsHeading>
                      <GameDetailContent>
                        {declareWinnerData[0]?.homeTeam?.teamname}
                      </GameDetailContent>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ width: "48%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100"
                    image={declareWinnerData[0]?.awayTeam?.teamLogo}
                    //   image="alt"
                    //   objectFit={"contain"}
                    //   alt={data?.data?.teamname || "Team Image"}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <GameDetailsHeading>Away Team:</GameDetailsHeading>
                      <GameDetailContent>
                        {" "}
                        {declareWinnerData[0]?.awayTeam?.teamname}
                      </GameDetailContent>
                    </Box>
                    <Box></Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>

            <Box className="winnerSelect" sx={{ width: "48%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Winner
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={options}
                  label="Select Winner"
                  onChange={handleChange}
                >
                  <MenuItem value={"Home"}>Home</MenuItem>
                  <MenuItem value={"Away"}>Away</MenuItem>
                  <MenuItem value={"Draw"}>Draw</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "96%",
              alignItems: "center",
            }}
          >
            <BackModalBtn onClick={onClose}>Back</BackModalBtn>
            <AddSportSubmitBtn onClick={onHandleSumbit}>
              <SendIcon sx={{ mr: 1 }} />
              Submit
            </AddSportSubmitBtn>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default DeclareWinnerModal;
