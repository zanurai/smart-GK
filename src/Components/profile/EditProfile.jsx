import React, { useContext, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Link, Navigate } from "react-router-dom";
import { Avatar, Grid, TextField } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import Footer from "../footer/Footer";
import EditImagePopup from "./EditImagePopup";
import { ProfileContext } from "../Contexapi";
import { editProfile } from "../../srcapi/Api";
import { ProfileImageContext } from "../navbar/ProfileImageProvider";

import Navbar from "../navbar/Navbar";
import "../../editprofile/editprofile.css";

const EditProfile = () => {
  const formRef = useRef(null);
  const {
    profile,
    updateProfileName,
    updateProfileEmail,
    updateProfileNumber,
    updateProfileAddress,
  } = useContext(ProfileContext);

  const Item = styled(Paper)(({ theme }) => ({}));

  const [isPopup, setIsPopup] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [profileName, setProfileName] = useState(profile.name);
  const [profileEmail, setProfileEmail] = useState(profile.email);
  const [profileNumber, setProfileNumber] = useState(profile.mobileno);
  const [profileAddress, setProfileAddress] = useState(profile.address);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(profile.photourl);

  const { updateProfileImage } = useContext(ProfileImageContext);

  const handleSaveImage = (newImage) => {
    console.log("Updating image:", newImage);
    setSelectImage(newImage);
    updateProfileImage(newImage);
    setIsPopup(false);
    localStorage.setItem("selectImage", newImage);

    // setProfilePhoto(newImage);
  };

  useEffect(() => {
    const saveImage = localStorage.getItem("selectImage");
    if (saveImage) {
      setSelectImage(saveImage);
    }
  }, []);

  const handleUpdateProfilePhoto = (newPhoto) => {
    setProfilePhotoUrl(newPhoto);
  };

  useEffect(() => {
    setProfileName(profile?.name);
    setProfileEmail(profile?.email);
    setProfileNumber(profile?.mobileno);
    setProfilePhotoUrl(profile?.photourl);
    setProfileAddress(profile?.address);
  }, [profile]);

  const handleEditProfileSave = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: profileName,
        email: profileEmail,
        mobileno: profileNumber,
        address: profileAddress,
      }; // Include any other updated fields if needed

      const updatedProfile = await editProfile(updatedData);

      updateProfileName(updatedProfile?.name);
      updateProfileEmail(updatedProfile?.email);
      updateProfileNumber(updatedProfile?.mobileno);
      updateProfileAddress(updatedProfile?.address);
      console.log("Current profileName:", profileName);
      console.log("update profile:", updatedProfile);
      toast.success(" Profile has been updated", { position: "top-right" });

      // setProfileName(updatedData.name);
    } catch (err) {
      console.log("profileedit:", err);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
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
                      <div className="person-image">
                        <Avatar sx={{ width: 82, height: 82 }}>
                          {console.log("Image URL:", profilePhotoUrl)}
                          {/* <img
                          src={profilePhotoUrl}
                          alt="student profile"
                          // src={selectImage ? selectImage : ""}
                          // alt="student profile"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        /> */}
                          <img
                            src={selectImage ? selectImage : ""}
                            alt="student profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Avatar>

                        <Stack ml={5} mt={0} className="icon-wrap">
                          <ModeEditOutlineOutlinedIcon
                            className="icon-profile-edit icon"
                            onClick={() => setIsPopup(true)}
                          />
                        </Stack>
                      </div>

                      <Stack
                        spacing={1}
                        alignItems="center"
                        className="email-name"
                      >
                        <span>{profileName}</span>
                        <p>{profileEmail}</p>
                      </Stack>

                      <Link to="/changepassword">
                        <button className="btn-change-password">
                          Change Password
                        </button>
                      </Link>
                    </Stack>

                    <Stack spacing={3}>
                      <div className="contact-container">
                        <p>Phone Number</p>
                        <h6>{profileNumber}</h6>
                        <div className="address-container">
                          <p>Address</p>
                          <h6>{profileAddress}</h6>
                        </div>
                      </div>
                    </Stack>
                  </div>
                </Item>
              </Grid>

              <Grid item lg={8}>
                <form ref={formRef} onSubmit={handleEditProfileSave}>
                  <div className="text-container">
                    <h3>Basic Information</h3>
                    <div className="profile-textField">
                      <p>Full Name*</p>
                      <TextField
                        className="text-field"
                        type="text"
                        id="name"
                        variant="outlined"
                        placeholder="name"
                        defaultValue={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                      />

                      <p>Email*</p>
                      <TextField
                        className="text-field"
                        type="text"
                        id="email"
                        label=""
                        variant="outlined"
                        placeholder="email"
                        defaultValue={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                      />

                      <p>Number*</p>
                      <TextField
                        className="text-field"
                        type="number"
                        id="number"
                        label=""
                        variant="outlined"
                        placeholder="number"
                        defaultValue={profileNumber}
                        onChange={(e) => setProfileNumber(e.target.value)}
                      />

                      <p>Address*</p>
                      <TextField
                        className="text-field"
                        type="address"
                        id="address"
                        label=""
                        variant="outlined"
                        placeholder="address"
                        value={profileAddress}
                        onChange={(e) => setProfileAddress(e.target.value)}
                      />
                    </div>

                    <Stack spacing={2} direction="row" mt={3}>
                      <button className="button-save" type="submit">
                        Save
                      </button>
                      <Button
                        className="reset-button"
                        variant="outlined"
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </Stack>
                  </div>
                </form>
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
        // onSave={(newImage) => {
        //   handleSaveImage(newImage);
        //   setIsPopup(false);
        // }}
        onPhotoUpdate={handleUpdateProfilePhoto}
      />
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default EditProfile;
