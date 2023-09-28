import React, { createContext, useEffect, useReducer, useState } from "react";
import {
  getProfileUser,
  getTokenFromStorage,
  isAuthenticated,
} from "../srcapi/Api";

export const ProfileContext = createContext();

const actionTypes = {
  FETCH_PROFILE: "FETCH_PROFILE",
  UPDATE_PROFILE_NAME: "UPDATE_PROFILE_NAME",
  UPDATE_PROFILE_EMAIL: "UPDATE_PROFILE_EMAIL",
  UPDATE_PROFILE_MOBILENO: "UPDATE_PROFILE_MOBILENO",
  UPDATE_PROFILE_ADDRESS: "UPDATE_PROFILE_ADDRESS",
  SET_LOADING: "SET_LOADING",
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case actionTypes.UPDATE_PROFILE_NAME:
      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.payload,
        },
      };
    case actionTypes.UPDATE_PROFILE_EMAIL:
      return {
        ...state,
        profile: {
          ...state.profile,
          email: action.payload,
        },
      };
    case actionTypes.UPDATE_PROFILE_MOBILENO:
      return {
        ...state,
        profile: {
          ...state.profile,
          mobileno: action.payload,
        },
      };
    case actionTypes.UPDATE_PROFILE_ADDRESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          address: action.payload,
        },
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  profile: {},
  isLoading: false,
};

const Contexapi = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  // const [profile, setProfile] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        const userProfile = await getProfileUser();
        console.log("User Profile:", userProfile);

        if (userProfile) {
          dispatch({ type: actionTypes.FETCH_PROFILE, payload: userProfile });
        } else {
          console.warn("recevied valid data .....", userProfile);
        }
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      } catch (error) {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const updateProfileName = (newProfileName) => {
    console.log(`Updating profile name `, newProfileName);
    dispatch({
      type: actionTypes.UPDATE_PROFILE_NAME,
      payload: newProfileName,
    });
  };

  const updateProfileEmail = (newProfileEmail) => {
    console.log(`Updating profile name `, newProfileEmail);
    dispatch({
      type: actionTypes.UPDATE_PROFILE_EMAIL,
      payload: newProfileEmail,
    });
  };

  const updateProfileNumber = (newProfileNumber) => {
    console.log(`Updating profile name `, newProfileNumber);
    dispatch({
      type: actionTypes.UPDATE_PROFILE_MOBILENO,
      payload: newProfileNumber,
    });
  };

  const updateProfileAddress = (newProfileAddress) => {
    console.log(`Updating profile name `, newProfileAddress);
    dispatch({
      type: actionTypes.UPDATE_PROFILE_ADDRESS,
      payload: newProfileAddress,
    });
  };

  return (
    <div>
      <ProfileContext.Provider
        value={{
          profile: state.profile,
          updateProfileName,
          updateProfileEmail,
          updateProfileNumber,
          updateProfileAddress,
          isLoading: state.isLoading,
        }}
      >
        {children}
      </ProfileContext.Provider>
    </div>
  );
};

export default Contexapi;
