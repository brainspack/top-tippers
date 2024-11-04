import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import { manageGameSelector } from "../../slices/manageGame/manageGameSelector";
import {
  AddSportSubmitBtn,
  BackModalBtn,
  GameDetailContent,
  GameDetailsHeading,
  GameDetailsTitle,
  SportModalHeading,
} from "./masterStyled";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const GameDetailsModal = ({ onClose, handleOpen }) => {
  const { openGameModal, gameModalData, filterdGameData } =
    useSelector(manageGameSelector);
 

  return (
    <div>
      <Modal
        open={openGameModal}
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
            width: 570,
            bgcolor: "background.paper",
            boxShadow: 24,
            height: 550,
          }}
        >
          <Box>
            <SportModalHeading
              id="modal-modal-title"
              variant="h6"
              component="h3"
            >
              View Game Details
              <CloseIcon className="close-icon" onClick={onClose} />
            </SportModalHeading>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 450,
              p: 2,
            }}
          >
            <Box sx={{ height: "50px" }}>
              <GameDetailsHeading>
                Game Details (State: {filterdGameData[0]?.gameState})
              </GameDetailsHeading>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                flexWrap: "wrap",
                height: 450,
              }}
            >
              {gameModalData.map((data) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "32%",
                  }}
                >
                  <GameDetailsTitle>{data?.title}</GameDetailsTitle>
                  <GameDetailContent>{data?.content}</GameDetailContent>
                </Box>
              ))}
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
            <AddSportSubmitBtn onClick={onClose}>
              <SendIcon sx={{ mr: 1 }} />
              OK
            </AddSportSubmitBtn>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default GameDetailsModal;
