import React, { createContext, useContext, useReducer } from "react";

var initialData = {
  isInitialLoad: true,
  isRunning: false,
  isPause: false,
  isPomodoro: true,
  isShortBreak: false,
  isLongBreak: false,
  remainingTime: 0,
  remainingShortBreak: 0,
  pomodoro: 3,
  shortBreak: 4,
  longBreak: 5,
  autoNext: false,
  autoPomodoro: true,
  autoShortBreak: true,
  iteratorLongBreak: 2,
};

const pomoReducer = (state: any, action: any) => {
  switch (action.type) {
    case "toggleAutoNext":
      return {
        ...state,
        autoNext: action.payload,
      };

    case "initialLoad":
      return {
        ...state,
        isInitialLoad: false,
      };
    case "selectPomodoro":
      return {
        ...state,
        isPomodoro: true,
        isShortBreak: false,
        isLongBreak: false,
      };
    case "selectShortBreak":
      return {
        ...state,
        isPomodoro: false,
        isShortBreak: true,
        isLongBreak: false,
      };
    case "selectLongBreak":
      return {
        ...state,
        isPomodoro: false,
        isShortBreak: false,
        isLongBreak: true,
      };

    case "resetCountdown":
      if (state.isPomodoro === true) {
        return {
          ...state,
          remainingTime: state.pomodoro,
        };
      } else if (state.isShortBreak === true) {
        return {
          ...state,
          remainingTime: state.shortBreak,
        };
      } else if (state.isLongBreak === true) {
        return {
          ...state,
          remainingTime: state.longBreak,
        };
      }

    case "countDown":
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
      };
    case "startPomodoro":
      return {
        ...state,
        isRunning: true,
        isPause: false,
      };

    case "stopPomodoro":
      if (state.isShortBreak === true) {
        return {
          ...state,
          isPomodoro: true,
          isRunning: false,
          isPause: false,
          isShortBreak: false,
          isLongBreak: false,
          remainingTime: state.pomodoro,
        };
      } else if (state.isLongBreak === true) {
        return {
          ...state,
          isPomodoro: true,
          isRunning: false,
          isPause: false,
          isShortBreak: false,
          isLongBreak: false,
          remainingTime: state.pomodoro,
        };
      } else if (state.iteratorLongBreak > 0 && state.isPomodoro === true) {
        return {
          ...state,
          isPomodoro: false,
          isRunning: false,
          isPause: false,
          isShortBreak: true,
          isLongBreak: false,
          remainingTime: state.shortBreak,
        };
      } else if (state.iteratorLongBreak === 0 && state.isPomodoro === true) {
        return {
          ...state,
          isPomodoro: false,
          isRunning: false,
          isPause: false,
          isShortBreak: false,
          isLongBreak: true,
          remainingTime: state.longBreak,
        };
      }

    case "pausePomodoro":
      return {
        ...state,
        isRunning: false,
        isPause: true,
      };

    case "continuePomodoro":
      return {
        ...state,
        isRunning: true,
        isPause: false,
      };

    case "timerPomodoro":
      return {
        ...state,
        pomodoro: action.payload,
      };

    case "timerShortBreak":
      return {
        ...state,
        shortBreak: action.payload,
      };

    case "timerLongBreak":
      return {
        ...state,
        longBreak: action.payload,
      };

    case "autoPomodoro":
      return {
        ...state,
        autoPomodoro: action.payload,
      };

    case "autoShortBreak":
      return {
        ...state,
        autoShortBreak: action.payload,
      };

    case "iteratorLongBreak":
      return {
        ...state,
        iteratorLongBreak: action.payload,
      };

    default:
      return state;
  }
};

export const CounterContext = createContext({} as any);

function CounterProvider({ children }: any) {
  const [state, dispatch] = useReducer(pomoReducer, initialData);

  return (
    <CounterContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export default CounterProvider;
