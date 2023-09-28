import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "@mui/material";

import { editProfile } from "../../srcapi/Api";
import { ProfileImageContext } from "../navbar/ProfileImageProvider";

import "../../editprofile/popupimage.css";

const EditImagePopup = ({ onSave, onClose, open, onPhotoUpdate }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectImage, setSelectImage] = useState(null);

  // const [selectedImage, setSelectedImage] = useState(null);
  const { updateProfileImage } = useContext(ProfileImageContext);

  const handleImageChange = (event) => {
    const selectFile = event.target.files[0];
    if (selectFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setSelectImage(imageData);
        // setSelectedImage(file);
      };
      console.log("file", selectFile);
      reader.readAsDataURL(selectFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    console.log("handle drop", file);

    setSelectImage(file);
  };

  const handleDropOver = (event) => {
    event.preventDefault();
  };

  const handleSave = () => {
    if (selectImage) {
      updateProfileImage(selectImage);
      onSave(selectImage);
      onClose();
    }
  };

  // const handleSave = async () => {
  //   if (selectImage) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("photo", selectImage);
  //       const UpdateImage = await editProfile(formData);

  //       onPhotoUpdate(UpdateImage.photo);
  //       updateProfileImage(UpdateImage.photo);
  //       onClose();
  //     } catch (err) {
  //       console.log("updatePhoto:", err);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   // Update the profile image in the component state when it changes in the context
  //   setSelectImage(userProfileImage);
  // }, [userProfileImage]);

  return (
    <div className="main-popup-container">
      <Modal open={open} onClose={onClose}>
        <div className="popup-container">
          <div
            className={`drop-container${isDragOver ? " drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDropOver}
          >
            <p>Drag and drop an image here</p>
          </div>

          <div className="image-drag-input">
            <input type="file" onChange={handleImageChange} accept="photo/*" />

            <div className="button-popup-profile">
              <button className="popup-imagebtn" onClick={handleSave}>
                save
              </button>

              <Button
                className="pupup-cancle-button"
                variant="outlined"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditImagePopup;
