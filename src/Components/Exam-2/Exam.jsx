import "../../examstyles/Exam.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Badge, Container } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { createRef, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";

import {
  useTotalScore,
  TotalScoreProvider,
} from "../Examresult/TotalScoreContext";
import Navbar from "../navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { ExamSubmitScore, getexamset } from "../../srcapi/Api";
import { Result } from "../Examresult/Result";

export const Exam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore, updateTotalScore } = useTotalScore();

  const [quizId, setQuizId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activeBadge, setActiveBadge] = useState(null);
  const [selectedData, setSelectedData] = useState([]); //pull all prams from one usestate
  const [examQuestion, setExamQuestion] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedQuizOptionId, setSelectedQuizOptionId] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  // const [subjectid, setSubjectid] = useState([]);
  // const [iscorrect, setIsCorrect] = useState([]);
  // const [option, setOption] = useState([]);
  // const [duration, setDuration] = useState([]);

  const [badgeStatus, setBadgeStatus] = useState(
    Array(examQuestion.length).fill(false)
  );
  const [selectedOptions, setSelectedOptions] = useState(
    Array(examQuestion.length).fill(null)
  );

  const open = Boolean(anchorEl);

  const useBadgeClick = () => {
    const questionRefs = useMemo(() => {
      if (examQuestion && examQuestion.length > 0) {
        return examQuestion.map(() => createRef(null));
      }
      return [];
    }, [examQuestion]);

    const scrollToQuestion = (index) => {
      if (questionRefs[index]?.current) {
        questionRefs[index].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    return { questionRefs, scrollToQuestion };
  };

  const searchParams = new URLSearchParams(location.search);
  const setid = searchParams.get("setid");

  useEffect(() => {
    console.log("setid inside useEffect:", setid);
  }, [setid]);

  const { questionRefs, scrollToQuestion } = useBadgeClick();
  const initialTimeInSeconds = 3 * 60 * 60;
  const [remainingTime, setRemainingTime] = useState(initialTimeInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleOptionClick = (questionIndex, optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[questionIndex] = optionIndex;
      return newSelectedOptions;
    });

    const selectedQuestion = examQuestion[questionIndex];
    const selectedOption = selectedQuestion.quizoptions[optionIndex];

    const selectedOptionData = {
      subjectid: selectedQuestion.subjectid,
      setid: selectedQuestion.setid,
      quizid: selectedQuestion.quizid,
      quizoptionid: selectedOption.quizoptionid,
      iscorrect: selectedOption.iscorrect,
      option: selectedOption.option,
      duration: selectedQuestion.duration,
    };

    setSelectedData((prevSelectedData) => {
      // Create a copy of the previous selected data

      const updatedSelectedData = [...prevSelectedData];

      // Check if data for the same question exists
      const existingQuestionDataIndex = updatedSelectedData.findIndex(
        (data) => data.quizid === selectedQuestion.quizid
      );

      if (existingQuestionDataIndex !== -1) {
        // If data for the same question exists, replace it with the new selected option data
        updatedSelectedData[existingQuestionDataIndex] = selectedOptionData;
      } else {
        // If no data for the same question exists, add the new selected option data
        updatedSelectedData.push(selectedOptionData);
      }
      console.log(updatedSelectedData, "hellll");
      return updatedSelectedData;
    });

    if (!answeredQuestions.includes(questionIndex)) {
      setAnsweredQuestions((prevAnswerQuestions) => [
        ...prevAnswerQuestions,
        questionIndex,
      ]);
    }

    setActiveBadge(questionIndex);
    setBadgeStatus((prevBadgeStatus) => {
      const newBadgeStatus = [...prevBadgeStatus];
      newBadgeStatus[questionIndex] = true;
      return newBadgeStatus;
    });
    console.log("Selected Quiz ID:", selectedQuizOptionId);
  };

  const badgeClick = (index) => {
    scrollToQuestion(index);
  };

  const getQuestionById = (questionId) => {
    const question = examQuestion.find((q) => q.id === questionId);
    return question || { question: "Question not found" };
  };

  const btnSubmit = async () => {
    try {
      console.log("quizId:", quizId);

      if (Array.isArray(selectedData)) {
        selectedData.forEach((data) => {
          if (data) {
            data.duration = 2000;
            data.quizid = Number(data.quizid);
            data.quizoptionid = Number(data.quizoptionid);
          }
        });
      }
      //  Transform the selectedData into the desired format
      const selectedIDs = selectedData.map((data) => {
        const selecteOption = {
          subjectid: data.subjectid,
          quizoptionid: data.quizoptionid,
          quizid: data.quizid,
          iscorrect: data.iscorrect,
          option: data.option,
          setid: data.setid,
        };

        if (data.duration) {
          selecteOption.duration = data.duration;
        } else {
          console.log("duration", data);
        }

        return selecteOption;
      });

      console.log("selectedData:", selectedData);
      console.log(JSON.stringify(selectedIDs));

      const updateScore = await ExamSubmitScore(selectedIDs);
      console.log("updateScore:", updateScore);

      const propsToPass = {
        updateScore,
      };
      console.log("propsToPass:", propsToPass);
      navigate(`/exam/result?setid=${setid}`, {
        state: { result: propsToPass },
      });
      const newTotalScore = examQuestion.reduce((total, question, index) => {
        const selectedOptionIndex = selectedOptions[index];
        const selectedOptionData = selectedData[index];

        if (
          question?.quizoptions &&
          question?.quizoptions[selectedOptionIndex - 1]
        ) {
          if (selectedOptionData?.iscorrect === "Y") {
            return total + 1;
          }
        }

        return total;
      }, 0);

      updateTotalScore(newTotalScore);
    } catch (err) {
      console.log("error:", err);
    }
    setSubmitted(true);
    setShowResult(true);
  };

  useEffect(() => {
    const fetchSetExamQuestion = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const setidParam = queryParams.get("setid");

        if (setidParam) {
          const updateQuestion = await getexamset(setidParam);
          console.log("update", updateQuestion);

          if (
            updateQuestion &&
            updateQuestion.response &&
            updateQuestion.response.quizzes
          ) {
            setExamQuestion(updateQuestion.response.quizzes);

            setSelectedQuestionIndex(null);
          }
        } else {
          setExamQuestion([]);
        }
      } catch (err) {
        console.log("fetchSetExamQuestion:", err);
      }
    };
    fetchSetExamQuestion();
  }, [location.search]);

  const selectQuestion = (index) => {
    setSelectedQuestionIndex(index);
  };

  return (
    <>
      <TotalScoreProvider>
        <div className="cl-exam2">
          <div className="colg-container">
            <Navbar />

            <div className="title-wrap mb-20">
              <h6 className="main-title">Practice 1</h6>
            </div>

            <div className="cl-question-wrap">
              <Container>
                <Row>
                  <Col md={8}>
                    <div className="question-container">
                      {examQuestion !== undefined && examQuestion.length > 0 ? (
                        selectedQuestionIndex !== null ? (
                          <div
                            className="question-wrap  box-wrap h-fit"
                            id="questionwrap"
                            key={selectedQuestionIndex}
                            ref={questionRefs[selectedQuestionIndex]}
                          >
                            <div className="title-wrap d-flex mb-20">
                              <Badge className="badge">
                                <QuestionMarkOutlinedIcon className="icon" />
                              </Badge>
                              <h5 className="title ml-10">
                                Question {selectedQuestionIndex + 1}.
                              </h5>
                            </div>
                            <div className="cl-question">
                              <h2 className="question">
                                {
                                  getQuestionById(
                                    examQuestion[selectedQuestionIndex]
                                  ).question
                                }
                              </h2>
                            </div>
                            <div className="cl-ans">
                              {getQuestionById(
                                examQuestion[selectedQuestionIndex].id
                              ).quizoptions.map((option, optionIndex) => (
                                <div
                                  className={`option-btn ${
                                    selectedOptions[selectedQuestionIndex] ===
                                    optionIndex
                                      ? "checked"
                                      : ""
                                  }`}
                                  key={optionIndex}
                                  onClick={() =>
                                    handleOptionClick(
                                      selectedQuestionIndex,
                                      optionIndex
                                    )
                                  }
                                >
                                  <span
                                    className={`custom-radio ${
                                      selectedOptions[selectedQuestionIndex] ===
                                      optionIndex 
                                        ? "selected"
                                        : ""
                                    }`}
                                  ></span>
                                  <span className="option-label">
                                    {option.option}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          examQuestion.map((quizData, i) => {
                            const questionIndex = i;
                            return (
                              <div
                                className="question-wrap  box-wrap h-fit"
                                id="questionwrap"
                                key={i}
                                ref={questionRefs[i]}
                              >
                                <div className="title-wrap d-flex mb-20">
                                  <Badge className="badge">
                                    <QuestionMarkOutlinedIcon className="icon" />
                                  </Badge>
                                  <h5 className="title ml-10">
                                    Question {i + 1}.
                                  </h5>
                                </div>
                                <div className="cl-question">
                                  <h2 className="question">
                                    {quizData.question}
                                  </h2>
                                </div>

                                <div className="cl-ans">
                                  {quizData.quizoptions.map(
                                    (option, optionIndex) => (
                                      <div
                                        className={`option-btn ${
                                          selectedOptions[questionIndex] ===
                                          optionIndex 
                                            ? "checked"
                                            : ""
                                        }`}
                                        key={optionIndex}
                                        onClick={() =>
                                          handleOptionClick(
                                            questionIndex,
                                            optionIndex
                                          )
                                        }
                                      >
                                        <span
                                          className={`custom-radio ${
                                            selectedOptions[questionIndex] ===
                                            optionIndex
                                              ? "selected"
                                              : ""
                                          }`}
                                        ></span>
                                        <span className="option-label">
                                          {option.option}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )
                      ) : (
                        <p>Loading question ...</p>
                      )}
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="attempt-question box-wrap">
                      <div className="title-wrap">
                        <h2 className="title">Attempted Question</h2>
                      </div>
                      <ul className="question-tag">
                        {examQuestion.map((quizData, i) => {
                          const isActive = badgeStatus[i];
                          return (
                            <li key={i}>
                              <span
                                className={`badge ${isActive ? "active" : ""}`}
                                onClick={() => badgeClick(i)}
                              >
                                {i + 1}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>

          <div className="cl-footer-section">
            <Container>
              <div className="footer-wrap d-flex">
                <div className="remaining-time d-flex">
                  <span className="icon">
                    <AccessTimeIcon />
                  </span>
                  <span className="time">{formatTime(remainingTime)}</span>
                </div>

                <button
                  className="ml-auto submit-button-exam "
                  variant="primary"
                  onClick={btnSubmit}
                >
                  Submit
                </button>
              </div>
            </Container>
          </div>
        </div>
      </TotalScoreProvider>
    </>
  );
};
