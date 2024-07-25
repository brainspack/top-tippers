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
import { useForm } from "react-hook-form";

import {
  Box,
  FormControl,
  FormHelperText,
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
import { LOGIN_DATA } from "../../utils/contant";

function LoginPage(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

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
              <form sm={{ width: "100%" }}>
              {LOGIN_DATA?.map((ele, index) => {
        const options = {};

        options.pattern = {
          value: ele.REGEX,
          message: ele.RXMESSAGE,
        };
        return (
          <Box key={ele.NAME} height={"90px"}>
            {ele.NAME === "password"?(
                
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    className="input"
                    fullWidth
                  id={ele.NAME}
                  label={ele.LABEL}
                //   variant="standard"
                  error={Boolean(errors?.[ele.NAME])}
                  name={ele.NAME}
                  {...register(`${ele.NAME}`, {
                    required: ele.RMESSAGE,
                    ...options,
                })}
                    // id="outlined-adornment-password"
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
                    // label="Password"
                    />
                    {errors?.[ele.NAME]?.message ? (
                  <FormHelperText sx={{color:"red", margin:"3px 0px !important"}}>
                    {errors?.[ele.NAME]?.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
                </FormControl>

            ):(
                <>
                <TextField

                className="email-input"
                  fullWidth
                  id={ele.NAME}
                  label={ele.LABEL}
                //   variant="standard"
                  error={Boolean(errors?.[ele.NAME])}
                  name={ele.NAME}
                  {...register(`${ele.NAME}`, {
                    required: ele.RMESSAGE,
                    ...options,
                })}
                />
                {errors?.[ele.NAME]?.message ? (
                  <FormHelperText sx={{color:"red"}}>
                    {errors?.[ele.NAME]?.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
                </>

            )}
          </Box>
        );
      })}



              
                    </form>
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
