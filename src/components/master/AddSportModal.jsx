import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AddSportBtn, SportModalHeading } from "./masterStyled";
import AddIcon from '@mui/icons-material/Add';
import { FormControl, FormHelperText, MenuItem, OutlinedInput, Select } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
//   border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export default function AddSportModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  return (
    <div>
      <AddSportBtn disableRipple onClick={handleOpen}>
        <AddIcon sx={{ mr: 1 }} />
        Add Sport
      </AddSportBtn>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box sx={{}}>

          <SportModalHeading id="modal-modal-title" variant="h6" component="h3">
            Sport
          <CloseIcon className="close-icon" onClick={handleClose}/>
          </SportModalHeading>
            </Box>
          <Box id="modal-modal-description" sx={{ mt: 2,padding:"0 15px" }}>
              <FormHelperText sx={{color:"black", display:"flex"}} id="outlined-weight-helper-text">
                <Typography sx={{color:"red", mr:1}}>*</Typography>
                Sport Name:</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            sx={{width:"100%", height:"40px"}}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
              <FormHelperText sx={{color:"black", display:"flex"}} id="outlined-weight-helper-text">
                <Typography sx={{color:"red", mr:1}}>*</Typography>
                Description:</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            sx={{width:"100%", height:"40px"}}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText sx={{color:"black", display:"flex"}} id="outlined-weight-helper-text">
                <Typography sx={{color:"red", mr:1}}>*</Typography>
                Sport Type:</FormHelperText>
          <FormControl sx={{ m: 1,  }} fullWidth>
                  <Select
                    // value={sportType}
                    // onChange={handleChangeSport}
                    defaultValue={"Sport Type"}

                    displayEmpty
                    sx={{ fontSize: "14px", height:"40px"}}
                  >
                    <MenuItem value={"selectRole"}  disabled>
                            Sport Type{" "}
                          </MenuItem>
                    <MenuItem className="calender" value="">
                      
                        Regular
                    </MenuItem>
                    
                        {/* <MenuItem className="calender" value={30}>
                        Regular
                        </MenuItem> */}
                    <MenuItem className="calender" value={30}>
                      Draw
                    </MenuItem>
                  </Select>
                </FormControl>
          <FormHelperText sx={{color:"black", display:"flex"}} id="outlined-weight-helper-text">
                <Typography sx={{color:"red", mr:1}}>*</Typography>
                Round Bonus:</FormHelperText>
          <FormControl sx={{ m: 1, minWidth: 353 }}>
                  <Select
                    // value={roundBonus}
                    // onChange={handleChangeRound}
                    defaultValue={"Bonus"}
                    sx={{ fontSize: "14px", height:"40px"}}
                  >
                     <MenuItem value={"selectRole"}  disabled>
                            Bonus{" "}
                          </MenuItem>
                    <MenuItem className="calender" value="">
                        True
                    </MenuItem>
                    
                        {/* <MenuItem className="calender" value={30}>
                        Regular
                        </MenuItem> */}
                    <MenuItem className="calender" value={30}>
                      False
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText sx={{color:"black", display:"flex"}} id="outlined-weight-helper-text">
                <Typography sx={{color:"red", mr:1}}>*</Typography>
                MULTI CALCULATOR STAKE VALUE:</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            placeholder={"Stack Value"}
            sx={{width:"100%", height:"40px"}}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
