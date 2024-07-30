import { CounterContext } from "./CounterProvider";
import { Button, ButtonLarge, PomoButton } from "./component/button";
import { useState, useEffect } from "react";
import { useContext } from "react";
import NextButton from "./component/nextButton";

export function Counter() {
  var convert = require("convert-seconds");
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { state, dispatch } = useContext(CounterContext);
  let intervalId: NodeJS.Timeout;
  let timeout: NodeJS.Timeout;
  const [theme, setTheme] = useState("red");
  const audio = new Audio("/bip.mp3");
  const alarm = new Audio("/alarm.mp3");
  const tick = new Audio("/tik.mp3");

  useEffect(() => {
    if (state.isPomodoro === true) {
      setTheme("bg-red-500");
    } else if (state.isShortBreak === true) {
      setTheme("bg-green-500");
    } else if (state.isLongBreak === true) {
      setTheme("bg-blue-500");
    }
    dispatch({ type: "resetCountdown" });
    setTime(convert(state.pomodoro));
  }, [state.isPomodoro, state.isShortBreak, state.isLongBreak]);

  useEffect(() => {
    setTime(convert(state.remainingTime));
  }, [state.remainingTime]);

  useEffect(() => {
    if (state.isRunning && state.remainingTime === 0) {
      dispatch({ type: "resetCountdown" });
      setTime(convert(state.pomodoro));
    }
    if (state.isRunning && state.pomodoro !== 0) {
      intervalId = setInterval(() => {
        dispatch({ type: "countDown" });
      }, 1000);
      timeout = setTimeout(() => {
        clearInterval(intervalId);
        if (state.isInitialLoad === true) {
          dispatch({ type: "initialLoad" });
        }
        alarm.play();
        dispatch({ type: "stopPomodoro" });

        if (state.isShortBreak === true && state.autoPomodoro === true) {
          dispatch({ type: "toggleAutoNext", payload: true });
        } else if (state.isPomodoro === true && state.autoShortBreak === true) {
          dispatch({ type: "toggleAutoNext", payload: true });
        } else dispatch({ type: "toggleAutoNext", payload: false });
      }, state.remainingTime * 1000 + 1000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeout);
    };
  }, [state.isRunning]);

  useEffect(() => {
    var timeoutAuto: any;
    console.log("DEBUG");
    if (state.autoNext === true) {
      console.log("Trigger auto next true");
      console.log("isInitialLoad", state.isInitialLoad);
      console.log("autoPomodoro", state.autoPomodoro);
      console.log("isPomodoro", state.isPomodoro);
      if (state.autoShortBreak === true && state.isShortBreak === true) {
        timeoutAuto = setTimeout(() => {
          dispatch({ type: "continuePomodoro" });
          audio.play();
        }, 2000);
      } else if (
        state.isInitialLoad === false &&
        state.autoPomodoro === true &&
        state.isPomodoro === true
      ) {
        timeoutAuto = setTimeout(() => {
          dispatch({ type: "continuePomodoro" });
          audio.play();
        }, 2000);
      }
    }

    return () => {
      clearTimeout(timeoutAuto);
    };
  }, [state.isPomodoro, state.isShortBreak]);

  return (
    <div
      id="pomo-container"
      className={`${theme} min-h-[25rem] m-20 rounded-lg`}
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
            {time.seconds == 0
              ? "00"
              : time.seconds < 10
              ? "0" + time.seconds
              : time.seconds}
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
              <NextButton />
            </span>
          ) : !state.isRunning && state.isPause ? (
            <span
              onClick={() => {
                dispatch({ type: "startPomodoro" });
                audio.play();
              }}
            >
              <ButtonLarge color="orange">RESUME</ButtonLarge>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
