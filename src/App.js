import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";

import ExamPage from "./pages/ExamPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import { ResultPage } from "./pages/ResultPage";
import ExamRolesPage from "./pages/ExamRolesPage";
import EditProfilePage from "./pages/EditProfilePage";
import EntranceExamPage from "./pages/EntranceExamPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import { Result } from "./Components/Examresult/Result";

import "./global.css";

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignupPage />,
//   },

//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <EntranceExamPage />
//       </ProtectedRoute>
//     ),
//   },

//   {
//     path: "/examroles/:setid",
//     element: (
//       <ProtectedRoute>
//         <ExamRolesPage />,
//       </ProtectedRoute>
//     ),
//   },

//   {
//     path: "/editprofile",
//     element: (
//       <ProtectedRoute>
//         <EditProfilePage />,
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/exam/:setid",
//     element: (
//       <ProtectedRoute>
//         <ExamPage />,
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/changepassword",
//     element: (
//       <ProtectedRoute>
//         <ChangePasswordPage />,
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/exam/result",
//     element: (
//       <ProtectedRoute>
//         <ResultPage />,
//       </ProtectedRoute>
//     ),
//   },
// ]);

const App = () => {
  const isauthenticated = !!localStorage.getItem("api_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isauthenticated) {
      navigate("/login");
    }
  }, [isauthenticated]);

  useEffect(() => {
    if (isauthenticated && window.location.pathname === "/login") {
      navigate("/");
    }
    if (isauthenticated && window.location.pathname === "/signup") {
      navigate("/");
    }
  }, [isauthenticated]);
  return (
    <div className="App">
      <Routes>
        {isauthenticated ? (
          <>
            <Route
              path="/"
              element={<ProtectedRoute Cmp={EntranceExamPage} />}
            ></Route>
            <Route
              path="/examroles/:setid"
              element={<ProtectedRoute Cmp={ExamRolesPage} />}
            ></Route>

            <Route
              path="/editprofile"
              element={<ProtectedRoute Cmp={EditProfilePage} />}
            ></Route>
            <Route path="/exam/:setid" element={<ExamPage />}></Route>
            <Route
              path="/changepassword"
              element={<ProtectedRoute Cmp={ChangePasswordPage} />}
            ></Route>
            <Route
              path="/exam/result"
              element={<ProtectedRoute Cmp={ResultPage} />}
            ></Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </>
        )}
      </Routes>

      {/* <AuthProvider> */}
      {/* <TotalScoreProvider>
        <ProfileImageProvider>
          <Contexapi>
            <RouterProvider router={router} />
          </Contexapi>
        </ProfileImageProvider>
      </TotalScoreProvider> */}
      {/* </AuthProvider>*/}
    </div>
  );
};

export default App;
