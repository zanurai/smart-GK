import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const storeToken = (newToken) => {
  console.log("Token stored in localStorage:", newToken);
  localStorage.setItem("api_token", newToken);
};

const getTokenFromStorage = () => {
  // return localStorage.getItem("api_token");
  const api_token = localStorage.getItem("api_token");
  console.log("Token retrieved from localStorage:", api_token);
  return api_token;
};

export const removeTokenFormStorage = () => {
  localStorage.removeItem("api_token"); //remove token form local storage if user log out
};



axiosInstance.interceptors.request.use(
  (config) => {
    const api_token = getTokenFromStorage();
    console.log("Token in interceptor:", api_token);
    if (api_token) {
      config.headers["Authorization"] = `Bearer ${api_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export { storeToken, getTokenFromStorage };

export const registerUser = async (userData) => {
  console.log("user data", userData);
  const params = new URLSearchParams();
  params.set("name", userData?.name);
  params.set("email", userData?.email);
  params.set("password", userData?.password);
  params.set("mobileno", userData?.mobileno);
  params.set("address", userData?.address);
  params.set("source", "normal");

  try {
    const res = await axiosInstance.put(`/register?${params?.toString()}`);
    const newToken = res.data.response.api_token; // Extracting token from the response
    storeToken(newToken); // Storing the token in local storage

    console.log(res);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await axiosInstance.post(`/login`, userData);
    const newToken = res.data.response.api_token;
    storeToken(newToken);
    console.log(res);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProfileUser = async () => {
 
  try {
    const api_token = getTokenFromStorage();
    console.log("Token being used for getProfileUser:", api_token);

    const response = await axiosInstance.get(`/user/me`);

    console.log("profile", response.data);

    return await response.data.response;
  } catch (err) {
    console.log("profile api call error", err);
    return null;
  }
};

export const editProfile = async (updateData) => {
  try {
    const api_token = getTokenFromStorage();
    console.log("profile", api_token);

    const response = await axiosInstance.post(`/user/edit-profile`, updateData);
    console.log("editProfile:", response);
    return response.data.response;
  } catch (err) {
    console.log("editProfile:", err);
  }
};

export const getExamList = async () => {
  try {
    const api_token = getTokenFromStorage();
    console.log("exam list token", api_token, "examlist");

    const response = await axiosInstance.get("/exam/list");
    return response.data;
  } catch (err) {
    console.error("getExamList", err);
  }
};

export const getexamset = async (setid) => {
  try {
    const api_token = getTokenFromStorage();
    console.log("exam set token", api_token, "examset");
    const response = await axiosInstance.post(`/exam/set?setid=${setid}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log("setexamquestion:", err);
  }
};

export const changePassword = async (userData) => {
  console.log("userData:", userData);
  const params = new URLSearchParams();
  params.set("password", userData?.password);
  params.set("new_password", userData?.newPassword);
  params.set("password_confirmation", userData?.passwordConfirmation);

  console.log("params:", params.toString());
  try {
    const api_token = getTokenFromStorage();
    console.log("Changepassword:", api_token, "changepassword");
    const response = await axiosInstance.patch(
      `/user/change-password?${params?.toString()}`
    );
    console.log(response);

    if (response.status === 200) {
      console.log("Password change successful");
      return response.data;
    } else {
      console.error("Password change failed. Server returned an error.");
      throw new Error("Password change failed. Server returned an error.");
    }
  } catch (err) {
    console.error("errooo:", err);
  }
};

// params.set(
//   "jsondata",
//   JSON.stringify([
//     {
//       subjectid: "3",
//       setid: "6",
//       quizid: 6,
//       quizoptionid: 10,
//       iscorrect: "Y",
//       option: "Joe Biden",
//       duration: 2000,
//     }
//   ])
// );
export const ExamSubmitScore = async (submitData) => {
  console.log(submitData, "here");

  const params = new URLSearchParams();

  // if (Array.isArray(submitData)) {

  //   submitData.forEach((data) => {
  //     if (data) {

  //       data.duration = 2000;
  //       data.quizid = Number(data.quizid);
  //       data.quizoptionid = Number(data.quizoptionid);
  //     }
  //   });
  // }
  //submitData.quizid = Number(submitData.quizid);

  //submitData.quizoptionid = Number(submitData.quizoptionid);

  console.log("data", submitData);

  const stringifedSubmitData = JSON.stringify(submitData);

  params.set("jsondata", stringifedSubmitData);

  try {
    const api_token = getTokenFromStorage();
    const response = await axiosInstance.post(
      `/exam/submit?${params?.toString()}`
    );
    console.log("submit token", api_token);
    // const response = await axiosInstance.post();

    console.log("api response:", response);

    return response.data;
  } catch (err) {
    console.log("Error submited data", err);
  }
};

export const ResultSubjectWise = async (setid) => {
  try {
    const api_token = getTokenFromStorage();
    console.log("result subject:", api_token);
    const response = await axiosInstance.post(`/exam/result?setid=${setid}`);
    console.log("response", response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
