import { Box, Modal } from "@mui/material";
import {
  CustomCancelButton,
  CustomDeleteButton,
  DeleteContent,
  DeleteHeading,
} from "./reuseStyled";
import WarningIcon from "@mui/icons-material/Warning";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "10px",
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
          <Box
            sx={{
              height: 130,
              width: 550,
              display: "flex",
              alignItems: "center",
              gap: "20px",
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
              <WarningIcon sx={{ color: "#f15e5e", fontSize: "70px" }} />
            </Box>
            <Box>
              <DeleteHeading>{heading}</DeleteHeading>
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
