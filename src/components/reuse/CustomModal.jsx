import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { CustomCancelButton, CustomDeleteButton } from "./reuseStyled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 370,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "10px",
};

const CustomModal = (props) => {
  const { modal, closeModal, content, action } = props;

  return (
    <div>
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              // border: "1px solid red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <CancelIcon sx={{ color: "#f15e5e", fontSize: "90px" }} />
            </Box>
            <Box>
              <Typography>Are You Sure ?</Typography>
            </Box>
            <Box>
              <Typography>{content}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <CustomCancelButton onClick={closeModal}>
                Cancel
              </CustomCancelButton>
              <CustomDeleteButton
                variant="contained"
                color="error"
                onClick={() => {
                  action();
                  closeModal();
                }}
              >
                Delete
              </CustomDeleteButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default CustomModal;
