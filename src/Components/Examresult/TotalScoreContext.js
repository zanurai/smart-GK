import React, { createContext, useContext, useState } from 'react';

const TotalScoreContext =  createContext();

export const TotalScoreProvider  = ({children}) => {
    const [totalScore, setTotalScore] = useState(0);

    const updateTotalScore = (newScore) => {
     setTotalScore(newScore);
    }
    
    return(
        <>
        <TotalScoreContext.Provider value={{totalScore, updateTotalScore }}>
            {children}
        </TotalScoreContext.Provider>
        </>
    )

}
export const useTotalScore = () => {
  return useContext(TotalScoreContext);
};