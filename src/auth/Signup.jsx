import { useEffect } from "react";
import React, { useContext, useState } from "react";

import styled from "@emotion/styled";
import { Container } from "react-bootstrap";
import { FlashOnOutlined } from "@mui/icons-material";
import { Button, Checkbox, InputAdornment, TextField } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import TermsPopup from "./popup/TermsPopup";
import { ProfileContext } from "../Components/Contexapi";
import { getProfileUser, registerUser } from "../srcapi/Api";

import "../styles/register.css";

const Signup = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [isFormValid, setIsFormValid] = useState(FlashOnOutlined);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    updateProfileName,
    updateProfileEmail,
    updateProfileNumber,
    updateProfileAddress,
  } = useContext(ProfileContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  console.log(errors);

  const toggledPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggledConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async (data) => {
    if (isFormValid) {
      try {
        const res = await registerUser({
          name: data.name,
          mobileno: data.mobile,
          email: data.email,
          password: data.password,
          address: data.address,
          source: "normal",
        });
        const userProfile = await getProfileUser();
        if (userProfile) {
          updateProfileName(userProfile.name);
          updateProfileEmail(userProfile.email);
          updateProfileNumber(userProfile.mobileno);
          updateProfileAddress(userProfile.address);
        }
        console.log("Registration response:", res);
        const successfullRegister = true;
        if (res.success) {
          console.log("here");
          navigate("/");
        }
        if (successfullRegister) {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const handleAgree = (e) => {
    const newValue = e.target.checked;
    setAgree(newValue);
    console.log("Agree:", newValue);
  };

  const handleTerms = () => {
    setShowTermsPopup(!showTermsPopup);
  };

  const handleClosePopup = () => {
    setShowTermsPopup(false);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleRegister();
  };
  return (
    <>
      <div>
        <div className="register-main-container">
          <Container>
            <div className="register-container">
              <div className="header-register">
                <h1>Register</h1>

                <p>
                  Already have an account?<Link to="/login">login</Link>
                </p>
              </div>
              <div>
                <form onSubmit={handleSubmitForm}>
                  <div className="input-register">
                    <div className="name-field">
                      <p>Full Name*</p>
                      <TextField
                        className="name-text-field input"
                        type="name"
                        id="name"
                        {...register("name", {
                          required: "name is required",
                          pattern: {
                            // value: /^[A-Z][a-z]*$/,
                            message: "fullname is required ",
                          },
                        })}
                        label=""
                        variant="outlined"
                        placeholder="name"
                      />
                      <p className="text-red-500" style={{ color: "red" }}>
                        {errors?.name?.message}
                      </p>
                    </div>

                    <div className="mobilenum-field">
                      <p>Mobileno*</p>
                      <TextField
                        className="mobile-text-field input"
                        type="number"
                        id="number"
                        {...register("mobile", {
                          required: "mobile is required",
                          pattern: {
                            message: "mobile is not valid",
                          },
                        })}
                        label=""
                        variant="outlined"
                        placeholder="number"
                      />
                      <p className="text-red-500" style={{ color: "red" }}>
                        {errors?.mobileno?.message}
                      </p>
                    </div>

                    <div className="email">
                      <p>Email*</p>
                      <TextField
                        className="email-text input"
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "email is required",
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: "email is not valid",
                          },
                        })}
                        variant="outlined"
                        placeholder="email"
                      />
                      <p className="text-red-500" style={{ color: "red" }}>
                        {errors?.email?.message}
                      </p>
                    </div>

                    <div className="password">
                      <p>password*</p>
                      <TextField
                        className="email-text input"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password", {
                          required: "password is required",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: `- at least 8 characters\n
                                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                - Can contain special characters\n`,
                          },
                        })}
                        label=""
                        variant="outlined"
                        placeholder="password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {/*put eye icon inside textfield */}
                              {showPassword ? (
                                <VisibilityOutlinedIcon
                                  onClick={toggledPasswordVisibility}
                                  style={{ color: "gray", cursor: "pointer" }}
                                  className="visibility"
                                />
                              ) : (
                                <VisibilityOffOutlinedIcon
                                  onClick={toggledPasswordVisibility}
                                  style={{ color: "gray", cursor: "pointer" }}
                                  className="visibility"
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {errors?.password?.message}
                      </p>
                    </div>

                    <div className="confirm-field">
                      <p>Confirm-password*</p>
                      <TextField
                        className="confirm-text-field input"
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmpassword"
                        {...register("confirmpassword", {
                          required: "confirmpassword is required",
                          validate: (value, formValues) =>
                            value === formValues.password ||
                            "password not matching",
                        })}
                        label=""
                        variant="outlined"
                        placeholder="confirm-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {showConfirmPassword ? (
                                <VisibilityOutlinedIcon
                                  onClick={toggledConfirmPasswordVisibility}
                                  style={{ color: "gray", cursor: "pointer" }}
                                />
                              ) : (
                                <VisibilityOffOutlinedIcon
                                  onClick={toggledConfirmPasswordVisibility}
                                  style={{ color: "gray", cursor: "pointer" }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {errors?.confirmpassword?.message}
                      </p>
                    </div>
                    <div className="mobilenum-field">
                      <p>Address*</p>
                      <TextField
                        className="mobile-text-field input"
                        type="text"
                        id="address"
                        {...register("address", {
                          required: "address is required",
                          pattern: {
                            message: "address is not valid",
                          },
                        })}
                        label=""
                        variant="outlined"
                        placeholder="address"
                      />
                      <p className="text-red-500" style={{ color: "red" }}>
                        {errors?.mobileno?.message}
                      </p>
                    </div>
                  </div>

                  <div className="check-condition">
                    <p>
                      <Checkbox
                        defaultChecked
                        size="small"
                        onClick={handleAgree}
                      />
                      Agree to all
                      {/* <Link
                        href="#"
                        onClick={handleTerms}
                        style={{ marginLeft: "5px" }}
                      >
                        Terms and Conditions
                      </Link> */}
                    </p>
                  </div>

                  <div className="sign-up-register">
                    <button
                      className="button"
                      variant="contained"
                      type="submit"
                      onClick={handleSubmit(handleRegister)}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </div>
      </div>
      {showTermsPopup && <TermsPopup onClose={handleClosePopup} />}
    </>
  );
};

export default Signup;
