import React from "react";

import { Container } from "@mui/material";
import "../../headerstyles/header.css";

const Header = () => {
  return (
    <>
      <div className="coustom-breadcrumb">
        <div className="circle"></div>
        <div className="small-circle"></div>

        <div className="section-exam">
          <Container>
            <div className="exam-desc">
              <h3>Exam</h3>
              <p>Exam title 1</p>
            </div>    
          </Container>
        </div>
      </div>
    </>
  );
};

export default Header;
