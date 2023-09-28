import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import "../../styles/popup.css";

const ForgetpasswordPopup = ({ onClose, onPasswordReset }) => {
  const [email, setEmail] = useState(""); //for email token
  const [newPassword, setNewPassword] = useState(""); //directly password change on here

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordSet = () => {
    console.log(
      "password reset request for email:",
      email,
      "newPassword:",
      newPassword
    );
    onPasswordReset(newPassword);
    onClose();
  };

  const handleNewPasswordSet = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <div>
      <div className="popup-container">
        <Dialog open={true} maxWidth="sm" onClose={onClose}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <p>Please Enter your email to reset password: </p>
            <TextField
              type="email"
              value={email}
              label="Email"
              onChange={handleEmail}
              fullWidth
              variant="outlined"
              sx={{ marginTop: "25px" }}
            />
            <TextField
              type="password"
              value={newPassword}
              label="New-Password"
              onChange={handleNewPasswordSet}
              fullWidth
              variant="outlined"
              sx={{ marginTop: "25px" }}
            />
          </DialogContent>

          <div className="button-btn">
            <button className="forget-btn" onClick={handlePasswordSet}>
              reset password
            </button>

            <button
              className="forget-btn"
               onClick={onClose}
              sx={{ marginLeft: " auto" }}
            >
              close
            </button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ForgetpasswordPopup;
