import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  currentMetric: 'injValveOpen',
};
// Create Context
export const GlobalContext = createContext(initialState);
// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  //Actions
  function clickedMetric(data) {
    dispatch({
      type: 'CLICKED_METRIC',
      payload: data,
    });
  }
  return (
    <GlobalContext.Provider value={{ metric: state.currentMetric, click: clickedMetric }}>
      {children}
    </GlobalContext.Provider>
  );
};
