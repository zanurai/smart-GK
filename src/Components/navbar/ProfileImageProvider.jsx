import React, { createContext, useState } from "react";

export const ProfileImageContext = createContext();

const ProfileImageProvider = ({ children }) => {
  const [profileImage, setPofileImage] = useState(
    localStorage.getItem("profileImage") || "image/student.jpg"
  );

  const updateProfileImage = (newImage) => {
    setPofileImage(newImage);
    localStorage.setItem("profileImage", newImage);
  };

  const contextValue = {
    profileImage,
    updateProfileImage,
  };
  
  return (
    <div>
      <ProfileImageContext.Provider value={contextValue}>
        {children}
      </ProfileImageContext.Provider>
    </div>
  );
};

export default ProfileImageProvider;
