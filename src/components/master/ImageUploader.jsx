import { useState } from "react";
import { Box, Button, Card, CardMedia, Input, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StyledCard = styled(Card)({
  width: 150,
  height: 150,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledInput = styled(Input)({
  display: "none",
});

const StyledBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "grey",
});

const ImageUploader = ({ handleImageChange, image }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <StyledCard>
        {image ? (
          <CardMedia
            component="img"
            image={image}
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <StyledBox>No image selected</StyledBox>
        )}
      </StyledCard>
      <StyledInput
        accept="image/*"
        id="upload-image"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="upload-image">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ marginTop: 2 }}
        >
          Upload Image
        </Button>
      </label>
    </Box>
  );
};

export default ImageUploader;
