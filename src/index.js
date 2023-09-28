import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import ProfileImageProvider from "./Components/navbar/ProfileImageProvider";
import Contexapi from "./Components/Contexapi";
import { TotalScoreProvider } from "./Components/Examresult/TotalScoreContext";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//import DataProvider from "./Components/Examresult/DataProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TotalScoreProvider>
        <ProfileImageProvider>
          <Contexapi>
           
            <App />
           
          </Contexapi>
        </ProfileImageProvider>
      </TotalScoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
