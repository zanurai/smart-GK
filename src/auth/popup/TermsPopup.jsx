import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../../styles/popup.css";
const TermsPopup = ({ onClose }) => {
  const [showTermsPopup, setShowTermsPopup] = useState(false);

  const toggleTermsPopup = () => {
    setShowTermsPopup(!showTermsPopup);
    onClose();
  };
  return (
    <>
      <div>
        <Dialog open={true} maxWidth="sm" fullWidth onClose={onClose}>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogContent>
            <p>Agree the Terms and Condation </p>
          </DialogContent>
          <button className="term-button" onClick={onClose}>
            close
          </button>
        </Dialog>
      </div>
    </>
  );
};

export default TermsPopup;
