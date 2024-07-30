import React, { createContext, useContext, useReducer } from "react";

var initialData = {
  isChangeMenu: false,
  isInitialLoad: true,
  isRunning: false,
  isPause: false,
  isPomodoro: true,
  isShortBreak: false,
  isLongBreak: false,
  remainingTime: 0,
  remainingPomodoro: 0,
  pomodoro: 15 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  autoNext: false,
  autoPomodoro: false,
  autoShortBreak: false,
  iteratorLongBreak: 4,
  isSkip: false,
};

const pomoReducer = (state: any, action: any) => {
  switch (action.type) {
    case "normalEnd": {
      return {
        ...state,
        isChangeMenu: false,
      };
    }

    case "settingPomodoro": {
      return {
        ...state,
        pomodoro: action.payload.pomodoro,
        shortBreak: action.payload.shortBreak,
        longBreak: action.payload.longBreak,
        autoPomodoro: action.payload.autoPomodoro,
        autoShortBreak: action.payload.autoShortBreak,
        iteratorLongBreak: action.payload.iteratorLongBreak,
        isRunning: false,
      };
    }
    case "skip": {
      return {
        ...state,
        isSkip: action.payload,
      };
    }
    case "endCycle":
      return {
        ...state,
        remainingPomodoro: state.remainingPomodoro - 1,
      };

    case "resetRemainingPomodoro":
      return {
        ...state,
        remainingPomodoro: state.iteratorLongBreak,
      };

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
        isChangeMenu: true,
        isRunning: false,
        isPause: false,
      };
    case "selectShortBreak":
      return {
        ...state,
        isPomodoro: false,
        isShortBreak: true,
        isLongBreak: false,
        isChangeMenu: true,
        isRunning: false,
        isPause: false,
      };
    case "selectLongBreak":
      return {
        ...state,
        isPomodoro: false,
        isShortBreak: false,
        isLongBreak: true,
        isChangeMenu: true,
        isRunning: false,
        isPause: false,
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
      } else if (state.remainingPomodoro > 0 && state.isPomodoro === true) {
        return {
          ...state,
          isPomodoro: false,
          isRunning: false,
          isPause: false,
          isShortBreak: true,
          isLongBreak: false,
          remainingTime: state.shortBreak,
        };
      } else if (state.remainingPomodoro === 0 && state.isPomodoro === true) {
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
