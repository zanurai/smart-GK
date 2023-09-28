import React, { useEffect, useState } from "react";

import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { getExamList } from "../../srcapi/Api";

import "../../examstyles/entranceexam.css";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import LoadingSpinner from "../LoadingSpinner";
import { Col, Row, Container } from "react-bootstrap";

const EntranceExam = () => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);
  const [displayQuestion, setDisplayQuestion] = useState([]);

  useEffect(() => {
    const fetchExamList = async () => {
      try {
        const ExamListData = await getExamList();

        setResponse(ExamListData.response);
        setDisplayQuestion(ExamListData.response);
        setLoading(false);
      } catch (err) {
        console.log("examList:", err);
        setLoading(false);
      }
    };
    fetchExamList();
  }, []);

  return (
    <>
      <Navbar />
      <Header />

      <div className="section2-entrance-exam section-exam-padding">
        <Container>
          <h2>Entrance Exam</h2>
          {loading ? (
            <div className="loading-message">
              <LoadingSpinner />
            </div>
          ) : Array.isArray(response) && response?.length > 0 ? (
            <Row>
              {response?.map((subject, index) => (
                <Col md={4}>
                  <div className="subject-section" key={index}>
                    <h3>{subject.coursename}</h3>
                    <p>
                      {subject.setstarttime
                        ? new Date(
                            subject.setstarttime * 1000
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Invalid Date"}
                    </p>

                    <span>
                      {new Date(subject.setendtime * 1000).toLocaleString()}
                    </span>
                    <div>
                      <h5 className="icon-arrow">
                        {subject.status === "ongoing" &&
                        subject.attempted === "true" ? (
                          <>
                            <span
                              style={{ color: "black" }}
                              className="attempt-already-question"
                            >
                              Attempt on:{subject.attemptedon}
                            </span>

                            <span style={{ color: "black" }}>
                              Already Attempt
                            </span>
                          </>
                        ) : subject.status === "ongoing" &&
                          subject.attempted === "false" ? (
                          <>
                            <p style={{ marginTop: "50px" }}>
                              <Link to={`/examroles/${subject.setid}`}>
                                {/* {subject.status}*/}
                                Attempt Now
                              </Link>

                              <ArrowForwardOutlinedIcon
                                className="icon"
                                style={{ fontSize: "20px" }}
                              />
                            </p>
                          </>
                        ) : (
                          <span
                            style={{
                              display: "block",
                              marginTop: "50px",
                              color:
                                subject.status === "ended"
                                  ? "black"
                                  : "initial",
                              cursor:
                                subject.status === "ended"
                                  ? "default"
                                  : "default",
                            }}
                          >
                            {subject.status === "ended" ? "Expired" : "Expired"}
                          </span>
                        )}
                      </h5>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="container-examempty">
              <img src="../../image/marks-image.png" alt="" />
              <h3>Exams not available at the moment</h3>
              <p>Please try again</p>
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EntranceExam;
