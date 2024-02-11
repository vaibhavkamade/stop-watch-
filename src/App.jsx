import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"


function App() {

  const [isRunning , setIsRunning] = useState(false);
  const [elapsedTime,setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(()=>{

    if(isRunning){
      intervalIdRef.current =  setInterval(()=>{
        setElapsedTime(Date.now() - startTimeRef.current);
      },10)
    }

    return ()=>{
      clearInterval(intervalIdRef.current);
    }

  },[isRunning])

  function start(){
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop(){
    setIsRunning(false);
  }

  function reset(){
    setIsRunning(false);
    setElapsedTime(0);
  }

  function formatTime(){
    let hours = Math.floor(elapsedTime / (1000*60*60));
    let minutes = Math.floor(elapsedTime / (1000*60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
  }

  function padZero(number){
    return number < 10 ? '0'+ number : number;
  }

  return (
    <>
      <div className="stopwatch">
          <div className="display">
            {formatTime()}
          </div>
          <div className="controls">
            <button onClick={start} className="start-btn">Start</button>
            <button onClick={stop} className="stop-btn">Stop</button>
            <button onClick={reset} className="reset-btn">Reset</button>
          </div>
      </div>
    </>
  )
}

export default App
