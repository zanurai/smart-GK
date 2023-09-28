import React, { useContext, useEffect, useState } from "react";

import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ForgetpasswordPopup from "./popup/ForgetpasswordPopup";
import { Button, Checkbox, InputAdornment, TextField } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { getProfileUser, loginUser } from "../srcapi/Api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ProfileContext } from "../Components/Contexapi";

import "../styles/login.css";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgetPasswordLink, setShowForgetPasswordLink] = useState(true);
  const [showForgetPasswordPopup, setShowForgetPasswordPopup] = useState(false);

  const navigate = useNavigate();

  const {
    updateProfileName,
    updateProfileEmail,
    updateProfileNumber,
    updateProfileAddress,
  } = useContext(ProfileContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const toggledPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = (e) => {
    const newValue = e.target.checked;
    setRememberMe(newValue);
    console.log("RememberMe:", newValue);
  };

  const toggledForgetPassword = () => {
    setShowForgetPasswordPopup(!showForgetPasswordPopup);
  };

  const handlePasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleNewPasswordReset = (newPassword) => {
    console.log("newPassword:", newPassword);
    setLoginPassword(newPassword);
    setShowForgetPasswordPopup(false);
  };

  const handleSignIn = async (data) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
        source: "normal",
      });
      const userProfile = await getProfileUser();
      if (userProfile) {
        updateProfileName(userProfile.name);
        updateProfileEmail(userProfile.email);
        updateProfileNumber(userProfile.mobileno);
        updateProfileAddress(userProfile.address);
      }

      const successfulllogin = true;

      if (res.success) {
        toast.success("Login successful", { position: "top-right" });
        navigate("/");
      }
      if (successfulllogin) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err.res && err.res.data && err.res.data.errors) {
        setLoginError(err.res.data.errors);
      } else {
        setLoginError("Incorrect email or password");
      }
      toast.error("Login failed", { position: "top-right" });
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  //for hide
  /*const toggleForgetPassword = () => {
    setShowForgetPasswordLink(!showForgetPasswordLink);
  };*/
  return (
    <>
      <div className="main-container">
        <Container>
          <div className="login-container">
            <div className="header-login">
              <h1>Login</h1>

              <p>
                Don't have an account?
                <Link to="/signup">Register</Link>
              </p>
            </div>
            <form onSubmit={handleSubmitForm}>
              <div className="input-fields">
                <div className="email-field">
                  <p>Email</p>
                  <TextField
                    className="email-text-field "
                    id="outlined-basic"
                    {...register("email", {
                      required: "email is required",
                      // pattern: {
                      //   value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      //   message: "email is not valid",
                      // },
                    })}
                    variant="outlined"
                    placeholder="email"
                  />
                  {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                  <p style={{ color: "red" }}>{errors?.email?.message}</p>
                </div>
                <div className="password-field">
                  <p>Password</p>
                  {setShowForgetPasswordPopup ? (
                    <TextField
                      className="password-text-field"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: "password is required",
                      })}
                      label=""
                      variant="outlined"
                      placeholder="password"
                      value={loginPassword}
                      onChange={handlePasswordChange}
                      inputProps={{
                        autoComplete: "off",
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {showPassword ? (
                              <VisibilityOutlinedIcon
                                onClick={toggledPasswordVisibility}
                                style={{ color: "gray", cursor: "pointer" }}
                              />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                onClick={toggledPasswordVisibility}
                                style={{ color: "gray", cursor: "pointer" }}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <TextField
                      className="password-text-field"
                      type={showPassword ? "text" : "password"}
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      placeholder="password"
                      value={loginPassword}
                      onChange={handlePasswordChange}
                    />
                  )}
                </div>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                <span style={{ color: "red" }}>
                  {errors?.password?.message}
                </span>
              </div>
              <div className="password-set">
                <p>
                  <Checkbox
                    checked={rememberMe}
                    size="small"
                    onClick={handleRememberMe}
                  />
                  Remember me
                </p>
               
                 {/* <Link href="#" onClick={toggledForgetPassword}>
                  Forget Your Password?
                </Link>  */}
             
              </div>
              <div className="sign-in-box">
                <button
                  className="btn"
                  variant="contained"
                  onClick={handleSubmit(handleSignIn)}
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>
      {showForgetPasswordPopup && (
        <ForgetpasswordPopup
          onClose={() => setShowForgetPasswordPopup(false)}
          onPasswordReset={handleNewPasswordReset}
        />
      )}
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
};

export default Login;
