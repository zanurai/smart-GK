import React, { useEffect, useState } from "react";

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";

import "../../examstyles/examroles.css";
import { getExamList } from "../../srcapi/Api";
import { Button, Container } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

const ExamRoles = () => {
  const [ulContent, setUlContent] = useState("");
  const { setid } = useParams();//useParams le path matra pull garxa 
 
  useEffect(() => {
    const ExamRolesApi = async () => {
      try {
        const response = await getExamList();
        console.log(response);
        setUlContent(response.response[0].setnote);
      } catch (err) {
        console.log("error:", err);
      }
    };
    ExamRolesApi();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <Container>
        <div className="section-padding">
          <div className="examroles-container">
            <h1>Please read carefully before starting </h1>
            <div className="examroles-header">
              {/*ul li vitra ko api bata display garauna yesko use hunxa */}
              <ul dangerouslySetInnerHTML={{ __html: ulContent }}></ul>
            </div>
            <div className="btn-container">
              <Link to={`/exam/set?setid=${setid}`}>
                <button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  className="examrole-botton"
                >
                  Start Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ExamRoles;
