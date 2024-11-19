import { useEffect, useState } from "react";

const useTimer = () => {
  const [timer, setTimer] = useState(2 * 60);
  const [running, setRunning] = useState(true);
  const [edit, setEdit] = useState(false);
  

  useEffect(() => {
    let timerId;
    if (running && timer > 0) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer === 0) {
        setRunning(false);
      }
    }

    return () => {
      clearInterval(timerId);
    };
  }, [running, timer]);

  return { timer, setTimer, running, setRunning, edit, setEdit };
};

export default useTimer;
