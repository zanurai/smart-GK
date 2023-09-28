import React from "react";
import "../styles/loadingspainner.css";
import { TailSpin } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="Loader-container">
      <TailSpin
        height="50"
        width="50"
        ariaLabel="tail-spin-loading"
        radius="1"
        alignItem="center"
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
