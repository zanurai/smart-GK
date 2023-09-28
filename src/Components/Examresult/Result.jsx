import * as React from "react";
import Navbar from "../navbar/Navbar";
import { Container } from "@mui/system";
import { Col, Row } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTotalScore } from "./TotalScoreContext";
import { ResultSubjectWise } from "../../srcapi/Api";

import Footer from "../footer/Footer";
import "../../examstyles/Result.css";

export const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); //searchParam lai  linxa
  const setid = queryParams.get("setid");

  const { result } = location.state || {};
  const { updateScore } = result || {};
  const locationState = location.state || {};
  const extractedTotalScore = locationState.totalScore || 0;

  const { totalScore, updateTotalScore } = useTotalScore();
  //const [examQuestion, setExamQuestion] = React.useState([]);
  // const totalPossibleScore = examQuestion.length;
  // const scoreString = `${totalScore}/${totalPossibleScore}`;
  // const percentage = (totalScore / totalPossibleScore) * 100;
  const [subjectWiseResults, setsubjectWiseResults] = React.useState([]);

  const totalScoreProgress =
    updateScore?.response?.count && updateScore.response.count[0]
      ? (updateScore?.response?.count[0]?.correct /
          updateScore?.response?.count[0]?.totalques) *
        100
      : 0;

  const totalScoreProgressSubjectWise =
    updateScore?.response?.result && updateScore.response.result[0]
      ? (updateScore.response.result[0].correct /
          updateScore.response.result[0].marks) *
        100
      : 0;

  React.useEffect(() => {
    const fetchResultSubjectWise = async () => {
      try {
        const updateResultSubjectWise = await ResultSubjectWise(setid);
        console.log("updateResultSubjectWise:", updateResultSubjectWise);
        setsubjectWiseResults(updateResultSubjectWise.response.results);
      } catch (err) {}
    };
    fetchResultSubjectWise();
  }, [setid]);

  const resetScore = () => {
    console.log("Total Score before reset:", totalScore);
    updateTotalScore(0);
    console.log("Total Score after reset:", totalScore);
  };
  const handleClickDone = () => {
    resetScore();
    navigate("/");
  };

  return (
    <>
      <div className="result-section">
        <Navbar />

        <div className="title-wrap mb-20">
          <h6 className="main-title">Practice set 1</h6>
        </div>

        <div className="result-overview">
          <Container>
            <Row>
              <Col md={6}>
                <div className="left-wrap">
                  <h2 className="main-title">
                    {updateScore?.response?.text?.title}
                  </h2>
                  <p>{updateScore?.response?.text?.description}</p>
                  {updateScore?.response?.count?.length > 0 && (
                    <div className="d-flex">
                      <p className="text-left">
                        Your Total Score is:
                        {updateScore?.response?.count[0]?.correct}
                      </p>
                      <p className="text-right ml-auto">{`${updateScore?.response?.count[0]?.correct}/${updateScore?.response?.count[0]?.totalques}`}</p>
                    </div>
                  )}
                  <div className="progress-bar">
                    <span
                      className="progressbarfill"
                      style={{
                        width: `${totalScoreProgress}%`,
                        backgroundColor:
                          totalScoreProgress <= 50
                            ? "var(--progressbarlightcolor)"
                            : "var(--progressbardarkcolor)",
                      }}
                    ></span>
                  </div>
                  <button
                    style={{ borderRadius: "5px" }}
                    className="cl-button"
                    onClick={handleClickDone}
                  >
                    Done
                  </button>
                </div>
              </Col>

              <Col md={{ span: 5, offset: 1 }}>
                <div className="right-wrap subject-overview">
                  <h5 className="title">Subject Wise Result</h5>
                  <p>Check your results in subject wise format</p>
                  <ul>
                    {subjectWiseResults.map((subject, index) => (
                      <li key={index}>
                        <div className="d-flex">
                          <p className="text-left">{subject?.subjectname} </p>
                          <p
                            className="text-right ml-auto"
                            style={{
                              width: `${
                                (subject.correct / subject.marks) * 100
                              }%`,
                            }}
                          >
                            {/* {`${subject.correct}/${subject.marks}`} */}
                            {updateScore.response?.result?.length > 0
                              ? `${updateScore?.response?.result[0]?.correct}/
                            ${updateScore?.response?.result[0]?.marks}`
                              : "N/A"}
                          </p>
                        </div>
                        <div className="progress-bar">
                          <span
                            className="progressbarfill"
                            style={{
                              width: `${totalScoreProgressSubjectWise}%`,

                              backgroundColor:
                                totalScoreProgress <= 50
                                  ? "var(--progressbarlightcolor)"
                                  : "var(--progressbardarkcolor)",
                            }}
                          ></span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};
