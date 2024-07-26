import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { increment } from "../../slices/Snackbar";

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
import { LOGIN_DATA } from "../../utils/constant";
import { useGetAdminLoginByNameMutation } from "../../api/AdminLogin";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage(props) {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const [logIn, { data, isLoading, error }] = useGetAdminLoginByNameMutation();
  console.log(data, "DATA");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
  const onHandleNavigate = () => {
    let token = localStorage.getItem("token");

    if (token) {
      if (path === "/") {
        navigate("/dashboard");
      }
    }
  };

  const onHandleSubmit = async (data) => {
    try {
      logIn({ body: data });
    } catch (err) {
      console.log(err, "ERROR");
    }
  };
  const onSubmit = (data) => {
    onHandleSubmit(data);
    onHandleNavigate();
    reset();
  };

  useEffect(() => {
    if (isLoading) return;
    if (data) {
      if (data?.token) {
        let token = data.token;
        let userId = data.userId;
        localStorage.setItem("token", token);
        localStorage.setItem("usesrId", userId);
        // navigate("/dashboard");

        dispatch(
          increment({
            state: true,
            message: data?.message,
            severity: data?.role,
          })
        );
      } else {
        dispatch(
          increment({
            state: true,
            message: data?.message,
            severity: data?.status,
          })
        );
      }
    }
  }, [data, isLoading]);

  return (
    <MainContainer>
      <Box
        sx={{
          position: "absolute",
          zIndex: "1",
          top: "-70px",
          left: "0px",
          width: "60%",
          height: "700px",
        }}
        component={"img"}
        src={loginArt}
      />
      <LoginContainerWrapper>
        <LoginContainer>
          <LoginContainerInnerWrapper>
            <form sm={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <LogoImageWrapper>
                <LogoImageBox></LogoImageBox>
              </LogoImageWrapper>
              <LoginHeadingWrapper>
                <LoginHeading>Login</LoginHeading>
              </LoginHeadingWrapper>
              <InputWrapper>
                <InputBox>
                  {LOGIN_DATA?.map((ele, index) => {
                    const options = {};

                    options.pattern = {
                      value: ele.REGEX,
                      message: ele.RXMESSAGE,
                    };
                    return (
                      <Box key={ele.NAME} height={"90px"}>
                        {ele.NAME === "password" ? (
                          <FormControl
                            sx={{ width: "100%" }}
                            variant="outlined"
                          >
                            <InputLabel htmlFor="outlined-adornment-password">
                              Password
                            </InputLabel>
                            <OutlinedInput
                              className="input"
                              fullWidth
                              id={ele.NAME}
                              label={ele.LABEL}
                              error={Boolean(errors?.[ele.NAME])}
                              name={ele.NAME}
                              {...register(`${ele.NAME}`, {
                                required: ele.RMESSAGE,
                                ...options,
                              })}
                              type={showPassword ? "text" : "password"}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              // label="Password"
                            />
                            {errors?.[ele.NAME]?.message ? (
                              <FormHelperText
                                sx={{
                                  color: "red",
                                  margin: "3px 0px !important",
                                }}
                              >
                                {errors?.[ele.NAME]?.message}
                              </FormHelperText>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        ) : (
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
                              <FormHelperText sx={{ color: "red" }}>
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
                </InputBox>
              </InputWrapper>
              <ForgotPasswordWrapper>
                <ForgotPassword>Forgot Password?</ForgotPassword>
              </ForgotPasswordWrapper>
              <LoginButton type="submit">Login</LoginButton>
            </form>
          </LoginContainerInnerWrapper>
        </LoginContainer>
        `
      </LoginContainerWrapper>
    </MainContainer>
  );
}

export default LoginPage;
