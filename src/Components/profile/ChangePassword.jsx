import React, { useContext, useEffect, useRef, useState } from "react";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Avatar, Grid, TextField } from "@mui/material";

import Footer from "../footer/Footer";
import EditImagePopup from "./EditImagePopup";
import { ProfileContext } from "../Contexapi";
import { changePassword } from "../../srcapi/Api";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../navbar/Navbar";
import "../../editprofile/editprofile.css";

const Changepassword = () => {
  const formRef = useRef(null);

  const { profile } = useContext(ProfileContext);
  const Item = styled(Paper)(({ theme }) => ({}));

  const [isPopup, setIsPopup] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [profileName, setProfileName] = useState(profile.name);
  const [profileEmail, setProfileEmail] = useState(profile.email);
  const [profileNumber, setProfileNumber] = useState(profile.mobileno);

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSaveImage = (newImage) => {
    setSelectImage(newImage);
    setIsPopup(false);
    localStorage.setItem("selectImage", newImage);
  };

  const handlePasswordSave = async () => {
    try {
      console.log("currentPassword:", password);
      console.log("newPassword:", newPassword);
      console.log("passwordConfirmation:", passwordConfirmation);

      if (newPassword !== passwordConfirmation) {
        setError("New password and password confirmation do not match.");
        return;
      }
      const updatePasswordConfirmation = await changePassword({
        password,
        newPassword,
        passwordConfirmation,
      });

      toast.success("password change successful", { position: "top-right" });
      console.log("Password change request sent successfully");
      setPassword("");
      setNewPassword("");
      setPasswordConfirmation("");
      setError("");

      console.log("updatePasswordConfirmation:", updatePasswordConfirmation);
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Password change failed. Please check your current password.");
    }
  };

  useEffect(() => {
    const saveImage = localStorage.getItem("selectImage");
    if (saveImage) {
      setSelectImage(saveImage);
    }
  }, []);

  useEffect(() => {
    const fetchChangePassword = async () => {
      try {
        setProfileName(profile.name);
        setProfileEmail(profile.email);
        setProfileNumber(profile.mobileno);
      } catch (err) {
        console.log("updateprofile:", err);
      }
    };
    fetchChangePassword();
  }, [profile]);

  const handleReset = () => {
    formRef.current?.reset();
    setNewPassword("");
    setPasswordConfirmation("");
    toast.success(" reset successfully ", { position: "top-right" });
  };
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="editprofile-container">
        <Container>
          <div className="profile-image">
            <Grid container spacing={2}>
              <Grid item lg={4}>
                <Item>
                  <div className="container-1">
                    <Stack alignItems="center">
                      <Avatar sx={{ width: 70, height: 70 }}>
                        <img
                          src={selectImage ? selectImage : "image/student.jpg"}
                          alt="student profile"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Avatar>

                      <Stack
                        spacing={1}
                        alignItems="center"
                        className="email-name"
                      >
                        <span>{profileName}</span>
                        <p>{profileEmail}</p>
                      </Stack>
                    </Stack>
                    <Stack spacing={3}>
                      <div className="contact-container">
                        <p>Phone Number</p>
                        <h6>{profileNumber}</h6>
                        <div className="address-container">
                          <p>Address</p>
                          <h6>Boudha, NayaBasti</h6>
                        </div>
                      </div>
                    </Stack>
                  </div>
                </Item>
              </Grid>

              <Grid item lg={8}>
                <div className="text-container">
                  <h3>Change Password</h3>
                  {error && <div className="error">{error}</div>}

                  <form>
                    <div className="profile-textField">
                      <p>Current Password*</p>
                      <TextField
                        className="text-field"
                        type="password"
                        id="text"
                        label=""
                        variant="outlined"
                        placeholder="Enter old Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="profile-textField">
                      <p>New Password*</p>
                      <TextField
                        className="text-field"
                        type="password"
                        id="newpassword"
                        label=""
                        variant="outlined"
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="profile-textField">
                      <p>Password Confirmation*</p>
                      <TextField
                        className="text-field"
                        type="password"
                        id="confirmpassword"
                        label=""
                        variant="outlined"
                        placeholder="Enter Password Confirmation"
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                      />
                    </div>
                  </form>
                  <Stack spacing={2} direction="row" mt={3}>
                    <Button
                      className="button-save"
                      onClick={handlePasswordSave}
                    >
                      Save
                    </Button>
                    <Button
                      className="reset-button"
                      variant="outlined"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Stack>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Footer />

      <EditImagePopup
        open={isPopup}
        onClose={() => setIsPopup(false)}
        onSave={handleSaveImage}
      />
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
};

export default Changepassword;
