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
import { useGetAdminLoginByNameMutation } from "../../api/AdminLogin";
// import { LOGIN_DATA } from "../../utils/contant";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_DATA } from "../../utils/constant";
import { handleNotification } from "../../slices/Snackbar";

function Login(props) {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const [logIn, { data: responseData, isLoading, error, isSuccess }] =
    useGetAdminLoginByNameMutation();
  const navigate = useNavigate();
  console.log(location, "location");

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      if (path === "/admin") {
        navigate("/admin/dashboard");
      }
    }
  });
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

  const HandleSubmit = async (data) => {
    try {
      const result = await logIn({ body: data }).unwrap();
      console.log(result, "RESULT");
      if (result) {
        if (result.data) {
          let token = result.data.token;
          console.log(token, "token");

          localStorage.setItem("token", token);
          navigate("dashboard");
          dispatch(
            handleNotification({
              state: true,
              message: result?.message,
              severity: result?.code,
            })
          );
        } else {
          dispatch(
            handleNotification({
              state: true,
              message: result?.message,
              severity: result?.code,
            })
          );
        }
      }
      console.log(logIn(), "log");
    } catch (err) {}
    await responseData;
  };
  const onSubmit = (data) => {
    HandleSubmit(data);
  };

  return (
    <>
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
        </LoginContainerWrapper>
      </MainContainer>
      <Outlet />
    </>
  );
}

export default Login;
