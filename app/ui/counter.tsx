import { CounterContext } from "./CounterProvider";
import { Button, ButtonLarge, PomoButton } from "./component/button";
import { useState, useEffect } from "react";
import { useContext } from "react";
import NextButton from "./component/nextButton";

export function Counter() {
  var convert = require("convert-seconds");
  const initialTime = { hours: 0, minutes: 0, seconds: 0 };
  const [time, setTime] = useState(initialTime);
  const { state, dispatch } = useContext(CounterContext);
  let intervalId: NodeJS.Timeout;
  let timeout: NodeJS.Timeout;
  const [theme, setTheme] = useState("red");
  const audio = new Audio("/bip.mp3");
  const alarm = new Audio("/alarm.mp3");
  const tiktok = new Audio("/tiktok.mp3");

  useEffect(() => {
    if (state.isPomodoro === true && state.remainingPomodoro === 0) {
      dispatch({ type: "resetRemainingPomodoro" });
    }
  }, [state.isPomodoro]);

  useEffect(() => {
    if (state.isPomodoro === true) {
      setTheme("bg-red-500");
      setTime(convert(state.pomodoro));
    } else if (state.isShortBreak === true) {
      setTheme("bg-green-500");
      setTime(convert(state.shortBreak));
    } else if (state.isLongBreak === true) {
      setTheme("bg-blue-500");
      setTime(convert(state.longBreak));
    }
    dispatch({ type: "resetCountdown" });

    if (state.autoPomodoro === true) {
      dispatch({ type: "toggleAutoNext", payload: true });
    } else if (state.autoShortBreak === true) {
      dispatch({ type: "toggleAutoNext", payload: true });
    } else dispatch({ type: "toggleAutoNext", payload: false });
  }, [
    state.pomodoro,
    state.shortBreak,
    state.longBreak,
    state.isPomodoro,
    state.isShortBreak,
    state.isLongBreak,
    state.autoPomodoro,
    state.autoShortBreak,
  ]);

  useEffect(() => {
    setTime(convert(state.remainingTime));
  }, [state.remainingTime]);

  useEffect(() => {
    const endFunction = () => {
      if (state.isInitialLoad === true) {
        dispatch({ type: "initialLoad" });
      }
      alarm.play();
      if (state.isPomodoro === true) {
        dispatch({ type: "endCycle" });
      }
      dispatch({ type: "stopPomodoro" });
      setTime(initialTime);
      dispatch({ type: "normalEnd" });
    };

    if (state.isRunning && state.remainingTime === 0) {
      dispatch({ type: "resetCountdown" });
      setTime(convert(state.pomodoro));
    }
    if (state.isRunning && state.pomodoro !== 0) {
      intervalId = setInterval(() => {
        tiktok.play();
        dispatch({ type: "countDown" });
      }, 1000);
      timeout = setTimeout(() => {
        clearInterval(intervalId);
        endFunction();
      }, state.remainingTime * 1000 + 1000);
    }
    if (state.isSkip === true) {
      dispatch({ type: "skip", payload: false });
      endFunction();
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeout);
    };
  }, [state.isRunning, state.skip]);

  useEffect(() => {
    var timeoutAuto: any;
    if (!state.isChangeMenu) {
      if (state.autoShortBreak === true)
        if (state.isLongBreak === true || state.isShortBreak === true) {
          timeoutAuto = setTimeout(() => {
            dispatch({ type: "continuePomodoro" });
            audio.play();
          }, 3000);
        }
      if (
        state.isInitialLoad === false &&
        state.autoPomodoro === true &&
        state.isPomodoro === true
      ) {
        timeoutAuto = setTimeout(() => {
          dispatch({ type: "continuePomodoro" });
          audio.play();
        }, 3000);
      }
    }

    return () => {
      clearTimeout(timeoutAuto);
    };
  }, [state.isPomodoro, state.isShortBreak]);

  return (
    <div
      id="pomo-container"
      className={`${theme} h-[calc(100vh)] p-15 grid content-center rounded-md`}
    >
      <div id="pomo-menu" className="p-8">
        <div className="flex justify-around">
          <div className="">
            <PomoButton
              size="medium"
              isActive={state.isPomodoro}
              onClick={() => dispatch({ type: "selectPomodoro" })}
            >
              Pomodoro
            </PomoButton>
          </div>
          <div className="">
            <PomoButton
              size="medium"
              isActive={state.isShortBreak}
              onClick={() => dispatch({ type: "selectShortBreak" })}
            >
              Short Break
            </PomoButton>
          </div>
          <div className="">
            <PomoButton
              size="medium"
              isActive={state.isLongBreak}
              onClick={() => dispatch({ type: "selectLongBreak" })}
            >
              Long Break
            </PomoButton>
          </div>
        </div>
      </div>
      <div id="pomo-counter">
        <div className="text-[8rem] text-center font-bold text-white">
          <p className="font-Play">
            {time.minutes == 0
              ? "00"
              : time.minutes < 10
              ? "0" + time.minutes
              : time.minutes}
            :
            {state.remainingPomodoro >= 0 ? (
              <>
                {time.seconds == 0
                  ? "00"
                  : time.seconds < 10
                  ? "0" + time.seconds
                  : time.seconds}
              </>
            ) : (
              "00"
            )}
          </p>
        </div>
      </div>
      <div id="pomo-button" className="flex justify-center relative">
        <div id="start-button">
          {!state.isRunning && !state.isPause ? (
            <span
              onClick={() => {
                dispatch({ type: "startPomodoro" });
                audio.play();
              }}
            >
              <ButtonLarge color="orange">START</ButtonLarge>
            </span>
          ) : state.isRunning && !state.isPause ? (
            <span
              onClick={() => {
                dispatch({ type: "pausePomodoro" });
                audio.play();
              }}
            >
              <ButtonLarge color="orange">PAUSE</ButtonLarge>
              <NextButton
                onClick={() => dispatch({ type: "skip", payload: true })}
              />
            </span>
          ) : !state.isRunning && state.isPause ? (
            <span
              onClick={() => {
                dispatch({ type: "startPomodoro" });
                audio.play();
              }}
            >
              <ButtonLarge color="orange">RESUME</ButtonLarge>
              <NextButton
                onClick={() => dispatch({ type: "skip", payload: true })}
              />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
