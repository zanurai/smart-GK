// import * as React from "react";
// import "../../examstyles/Exam.css";
// import { Badge, Container } from "@mui/material";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
// // import { ExamData } from "../../Data/ExamData";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import Navbar from "../navbar/Navbar.jsx";
// import {
//   TotalScoreProvider,
//   useTotalScore,
// } from "../Examresult/TotalScoreContext";
// import { getexamset } from "../../srcapi/Api";
// // import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// //end custom hook
// export const Exam = () => {
//   const navigate = useNavigate(); // Add this line to get access to the navigation history
//   // const { updateTotalScore } = useTotalScore(); // Assuming you have an updateTotalScore function in your context

//   const [examQuestion, setExamQuestion] = React.useState([]);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [answeredQuestions, setAnsweredQuestions] = React.useState([]);
//   const [currentQuestion, setCurrentQuestion] = React.useState(0);
//   const [score, setScore] = React.useState(0);
//   const { totalScore, updateTotalScore } = useTotalScore();
//   const [showResult, setShowResult] = React.useState(false);
//   const [submitted, setSubmitted] = React.useState(false);
//   const [activeBadge, setActiveBadge] = React.useState(null);
//   const [badgeStatus, setBadgeStatus] = React.useState(
//     Array(examQuestion.length).fill(false)
//   );
//   const [selectedOptions, setSelectedOptions] = React.useState(
//     Array(examQuestion.length).fill(0)
//   );
//   const open = Boolean(anchorEl);

//   const useBadgeClick = () => {
//     const questionRefs = React.useMemo(() => {
//       if (examQuestion && examQuestion.length > 0) {
//         return examQuestion.map(() => React.createRef(null));
//       }
//       return [];
//     }, [examQuestion]);

//     const scrollToQuestion = (index) => {
//       if (questionRefs[index]?.current) {
//         questionRefs[index].current.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//     };

//     return { questionRefs, scrollToQuestion };
//   };
//   const { questionRefs, scrollToQuestion } = useBadgeClick();
//   const initialTimeInSeconds = 3 * 60 * 60; //3hours in seconds that will be 10800s
//   const [remainingTime, setRemainingTime] =
//     React.useState(initialTimeInSeconds);
//   // 3 hours time set code  start
//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       if (remainingTime > 0) {
//         setRemainingTime((prevTime) => prevTime - 1);
//       }
//     }, 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, [remainingTime]);
//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600); //60* 60 = 3600
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:
//     ${seconds.toString().padStart(2, "0")}`;
//   };
//   //  3 hours time set end
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleOptionClick = (questionIndex, optionIndex) => {
//     // updateScore(); // Call the updateScore function here
//     setSelectedOptions((prevSelectedOptions) => {
//       const newSelectedOptions = [...prevSelectedOptions];
//       newSelectedOptions[questionIndex] = optionIndex;
//       return newSelectedOptions;
//     });
//     // updateScore();
//     if (!answeredQuestions.includes(questionIndex)) {
//       setAnsweredQuestions((prevAnswerQuestions) => [
//         ...prevAnswerQuestions,
//         // optionIndex,
//         questionIndex,
//       ]);
//     }

//     setActiveBadge(questionIndex);
//     setBadgeStatus((prevBadgeStatus) => {
//       const newBadgeStatus = [...prevBadgeStatus];
//       newBadgeStatus[questionIndex] = true;
//       return newBadgeStatus;
//     });
//     // setActiveBadge(questionIndex);
//     // setBadgeStatus((prevBadgeStatus) => {
//     //   const newBadgeStatus = prevBadgeStatus.map(
//     //     (status, index) => index === questionIndex || status
//     //   );
//     //   return newBadgeStatus;
//     // });
//   };

//   // const updateScore = () => {
//   //   const currentQuestionData = examQuestion[currentQuestion];
//   //   if (selectedOptions[currentQuestion] === currentQuestionData.quizoptions.findIndex((option) =>
//   //   option.iscorrect === "Y") + 1)
//   //   {
//   //     setScore((prevScore) => prevScore + 1);
//   //     // console.log("Total Score:", score + 1);
//   //   }
//   // };
//   // Calculate total score based on the correct answers from selected options
//   // React.useEffect(() => {
//   //   const newTotalScore = selectedOptions.reduce(
//   //     (total, selectedOption, index) => {
//   //       const questionData = examQuestion[index];
//   //       if (questionData.quizoptions  && selectedOption  === questionData.quizoptions.findIndex((option) =>
//   //         option.iscorrect=== "Y")+ 1) {
//   //         return total + 1;
//   //       }
//   //       return total;
//   //     },
//   //     0
//   //   );
//   //   updateTotalScore(newTotalScore);
//   //   // console.log("Current Score:", score + 1);
//   //   console.log("newTotal Score:", newTotalScore);
//   // }, [selectedOptions, examQuestion]);

//   // React.useEffect(() => {
//   //   if (examQuestion.length > 0) {
//   //     const newTotalScore = selectedOptions.reduce(
//   //       (total, selectedOption, index) => {
//   //         const questionData = examQuestion[index];
//   //         if (selectedOption === questionData.answer) {
//   //           return total + 1;
//   //         }
//   //         return total;
//   //       },
//   //       0
//   //     );
//   //     updateTotalScore(newTotalScore);
//   //   }
//   // }, [selectedOptions, examQuestion]);

//   const badgeClick = (index) => {
//     scrollToQuestion(index);
//     // setBadgeStatus((prevBadgeStatus) => {
//     //   const newBadgeStatus = [...prevBadgeStatus];
//     //   newBadgeStatus[index] = false;
//     //   return newBadgeStatus;
//     // });
//   };
//   const btnSubmit = () => {
//     setSubmitted(true);
//     setShowResult(true);
//     // Calculate the total score
//     const newTotalScore = selectedOptions.reduce(
//       (total, selectedOption, index) => {
//         const questionData = examQuestion[index];
//         if (
//           questionData.quizoptions &&
//           selectedOption ===
//             questionData.quizoptions.findIndex(
//               (option) => option.iscorrect === "Y"
//             ) +
//               1
//         ) {
//           return total + 1;
//         }
//         return total;
//       },
//       0
//     );
//     updateTotalScore(newTotalScore);
//     navigate("/result", { state: { examQuestion } });
//   };
//   // console.log("currentQuestion:", currentQuestion);

//   React.useEffect(() => {
//     const fetchSetExamQuestion = async () => {
//       try {
//         const setid = 6;
//         const updateQuestion = await getexamset(setid);
//         console.log(updateQuestion);

//         if (
//           updateQuestion &&
//           updateQuestion.response &&
//           updateQuestion.response.quizzes
//         ) {
//           setExamQuestion(updateQuestion.response.quizzes);
//         }
//       } catch (err) {
//         console.log("fetchSetExamQuestion:", err);
//       }
//     };
//     fetchSetExamQuestion();
//   }, []);
//   return (
//     <>
//       <TotalScoreProvider>
//         <div className="cl-exam2">
//           <div className="colg-container">
//             <Navbar />

//             <div className="title-wrap mb-20">
//               <h6 className="main-title">Practice 1</h6>
//             </div>
//             <div className="cl-question-wrap">
//               <Container>
//                 <Row>
//                   <Col md={8}>
//                     <div className="question-container">
//                       {examQuestion !== undefined && examQuestion.length > 0 ? (
//                         examQuestion.map((quizData, i) => {
//                           const questionIndex = i; // Save the question index
//                           return (
//                             <>
//                               <div
//                                 className="question-wrap  box-wrap h-fit"
//                                 id="questionwrap"
//                                 key={i}
//                                 ref={questionRefs[i]} // Assign ref to the question element
//                               >
//                                 <div className="title-wrap d-flex mb-20">
//                                   <Badge className="badge">
//                                     <QuestionMarkOutlinedIcon className="icon"></QuestionMarkOutlinedIcon>
//                                   </Badge>
//                                   <h5 className="title ml-10">
//                                     Question {i + 1}.
//                                   </h5>
//                                 </div>
//                                 <div className="cl-question">
//                                   <h2 className="question">
//                                     {quizData.question}
//                                   </h2>
//                                 </div>
//                                 <div className="cl-ans">
//                                   {quizData.quizoptions.map(
//                                     (option, optionIndex) => (
//                                       <div
//                                         className={`option-btn ${
//                                           selectedOptions[questionIndex] ===
//                                           optionIndex + 1
//                                             ? "checked"
//                                             : ""
//                                         }`}
//                                         key={optionIndex}
//                                         onClick={() =>
//                                           handleOptionClick(
//                                             questionIndex,
//                                             optionIndex
//                                           )
//                                         }
//                                       >
//                                         <span
//                                           className={`custom-radio ${
//                                             selectedOptions[questionIndex] ===
//                                             optionIndex + 1
//                                               ? "selected"
//                                               : ""
//                                           }`}
//                                         ></span>
//                                         <span className="option-label">
//                                           {option.option}
//                                         </span>
//                                       </div>
//                                     )
//                                   )}
//                                 </div>
//                               </div>
//                             </>
//                           );
//                         })
//                       ) : (
//                         <p>Loading question ...</p>
//                       )}
//                     </div>
//                   </Col>
//                   {/* <AttemptedQuestion/> */}
//                   <Col md={4}>
//                     <div className="attempt-question box-wrap">
//                       <div className="title-wrap">
//                         <h2 className="title">Attempted Question</h2>
//                       </div>
//                       <ul className="question-tag">
//                         {examQuestion.map((quizData, i) => {
//                           const isActive = badgeStatus[i];
//                           return (
//                             <>
//                               <li key={i}>
//                                 <span //className='badge'
//                                   className={`badge ${
//                                     isActive ? "active" : ""
//                                   }`}
//                                   onClick={() => badgeClick(i)}
//                                 >
//                                   {i + 1}
//                                 </span>
//                               </li>
//                             </>
//                           );
//                         })}
//                       </ul>
//                     </div>
//                   </Col>
//                 </Row>
//               </Container>
//             </div>
//           </div>
//           <div className="cl-footer-section">
//             <Container>
//               <div className="footer-wrap d-flex">
//                 <div className="remaining-time d-flex">
//                   <span className="icon">
//                     <AccessTimeIcon></AccessTimeIcon>
//                   </span>
//                   <span className="time">{formatTime(remainingTime)}</span>
//                 </div>

//                 <Link to="/result" className="ml-auto">
//                   <Button
//                     variant="primary"
//                     className="cl-button"
//                     onClick={btnSubmit}
//                   >
//                     Submit
//                   </Button>
//                 </Link>
//               </div>
//             </Container>
//           </div>
//         </div>
//       </TotalScoreProvider>
//     </>
//   );
// };

//examrole.....
 // const location = useLocation();

  // useEffect(() => {
  //   const pathname = location.pathname;
  //   const idFromPath = pathname.substring(pathname.lastIndexOf("/") + 1);

  //   setId(idFromPath);
  // }, [location]);