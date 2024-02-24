import { createContext, useReducer } from "react";

const initialState = {
  message: "",
  duration: 5000,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        message: action.payload,
      };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState);

  return(
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
