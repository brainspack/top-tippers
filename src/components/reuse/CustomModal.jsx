import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDeleteUserByNameMutation } from "../../api/DeleteUser";
import { handleNotification } from "../../slices/Snackbar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = (props) => {
  const { modal, closeModal, permanentDelete } = props;

  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography variant="h6">
              Are you sure you want to delete?
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              marginTop={"10px"}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={permanentDelete}
              >
                Ok
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default CustomModal;
