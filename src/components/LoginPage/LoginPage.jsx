import React from "react";
import {
    ForgotPassword,
    ForgotPasswordWrapper,
  InputBox,
  InputWrapper,
  LoginButton,
  LoginContainer,
  LoginContainerInnerWrapper,
  LoginContainerWrapper,
  LoginHeading,
  LoginHeadingWrapper,
  LogoImageBox,
  LogoImageWrapper,
  MainContainer,
} from "./loginStyled";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import loginArt from "../../images/login-art.f41b477f.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <MainContainer>
      <Box
        sx={{
          position: "absolute",
          zIndex: "1",
          top: "-80px",
          left: "0px",
          width: "60%",
          height: "790px",
        }}
        component={"img"}
        src={loginArt}
      />
      <LoginContainerWrapper>
        <LoginContainer>
          <LoginContainerInnerWrapper>
            <LogoImageWrapper>
              <LogoImageBox></LogoImageBox>
            </LogoImageWrapper>
            <LoginHeadingWrapper>
              <LoginHeading>Login</LoginHeading>
            </LoginHeadingWrapper>
            <InputWrapper>
              <InputBox>
                <TextField
                  disableUnderline={false}
                  className="email-input input"
                  id="outlined-multiline-flexible"
                  label="Email"
                  placeholder="Enter Email Address"
                />{" "}
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    className="input"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </InputBox>
            </InputWrapper>
            <ForgotPasswordWrapper>
                <ForgotPassword>Forgot Password?</ForgotPassword>
            </ForgotPasswordWrapper>
            <LoginButton>Login</LoginButton>
          </LoginContainerInnerWrapper>
        </LoginContainer>
        `
      </LoginContainerWrapper>
    </MainContainer>
  );
}

export default LoginPage;
