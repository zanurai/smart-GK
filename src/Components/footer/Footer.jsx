import React from "react";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";

import "../../headerstyles/footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <div className="footer-content">
          <span>
            <CopyrightOutlinedIcon className="copyright-icon" />
          </span>
          <span>Copyright Intropros Technologies</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
