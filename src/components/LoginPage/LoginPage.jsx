import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useGetAdminLoginByNameMutation } from "../../api/AdminLogin";
import {
  ForgotPassword,
  ForgotPasswordWrapper,
  InputBox,
  InputWrapper,
  LoginButton,
  LoginContainer,
  LoginContainerBox,
  LoginContainerInnerWrapper,
  LoginContainerWrapper,
  LoginHeading,
  LoginHeadingWrapper,
  LogoImageBox,
  LogoImageWrapper,
  MainContainer,
} from "./loginStyled";
import { LOGIN_DATA } from "../../utils/constant";
import { handleNotification } from "../../slices/Snackbar";

const Login = (props) => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [logIn, { data: responseData, isLoading, error, isSuccess }] =
    useGetAdminLoginByNameMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const HandleSubmit = async (data) => {
    try {
      const result = await logIn({ body: data }).unwrap();
      if (result) {
        if (result.data) {
          let token = result.data.token;

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
    } catch (err) {}
    await responseData;
  };
  const onSubmit = (data) => {
    HandleSubmit(data);
  };
  const onHandleNavigate = () => {
    const token = localStorage?.getItem("token");
    if ((token && path === "/admin") || (token && path === "/admin/")) {
      navigate("/admin/dashboard");
    }
  };

  useEffect(() => {
    onHandleNavigate();
  }, [navigate, path]);

  return (
    <>
      <MainContainer>
        <LoginContainerBox></LoginContainerBox>
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
                <LoginButton type="submit" disabled={isLoading}>
                  {isLoading ? <LoadingButton loading /> : "LogIn"}
                </LoginButton>
              </form>
            </LoginContainerInnerWrapper>
          </LoginContainer>
        </LoginContainerWrapper>
      </MainContainer>
      <Outlet />
    </>
  );
};

export default Login;
