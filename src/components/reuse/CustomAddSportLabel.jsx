import { FormHelperText, Typography } from '@mui/material';
import React from 'react';

function CustomAddSportLabel({requiredInput, inputLabel}) {
    return (
        <>
            <FormHelperText sx={{color:"black", display:"flex", height:"12px"}} id="outlined-weight-helper-text">
                <Typography sx={{color:"red", mr:1}}>{requiredInput}</Typography>
                {inputLabel}</FormHelperText>
        </>
    );
}

export default CustomAddSportLabel;