import { Box, Modal } from "@mui/material";
import {
  CustomCancelButton,
  CustomDeleteButton,
  DeleteContent,
  DeleteHeading,
} from "./reuseStyled";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteModalHeading } from "../master/masterStyled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: 170,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "4px",
};

const CustomModal = (props) => {
  const { modal, closeModal, content, action, heading } = props;

  return (
    <Box>
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{}}>
            <DeleteModalHeading
              id="modal-modal-title"
              variant="h6"
              component="h3"
            >
              Delete Confirmation
              <CloseIcon className="delete-close-icon" onClick={closeModal} />
            </DeleteModalHeading>
          </Box>
          <Box
            sx={{
              height: 45,
              width: 550,
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              gap: "20px",
              p: 2,
            }}
          >
            <Box>
              <DeleteContent>{content}</DeleteContent>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              width: "98%",
              height: 70,
            }}
          >
            <CustomCancelButton onClick={closeModal}>Cancel</CustomCancelButton>
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
      </Modal>
    </Box>
  );
};
export default CustomModal;
