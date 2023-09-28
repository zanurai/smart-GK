import React from "react";
import "../../global.css";


export const TestResult = (props) => {
  return (
    <>
      <div className="testresult">
        <button
          variant="contained"
          className="cl-button mt-20"
          color="primary"
          onClick={props.tryAgain}
        >
          Try Another Question
        </button>
      </div>
    </>
  );
};
