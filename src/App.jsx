import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import useTimer from "./hooks/useTimer";
import { useRef, useState } from "react";
import { getFormattedTime, getTotalSeconds } from "./utiils/helper";
import { useEffect } from "react";

function App() {
  const { timer, setTimer, running, setRunning, edit, setEdit } = useTimer();
  const [editTableTimeString, setEditTableTimeString] = useState("");
  const [isFirst, setIsFirst] = useState();
  const inputRef = useRef(null);

  const setCursorAtStart = () => {
    const input = inputRef.current;
    const length = input.value.length;
    input.setSelectionRange(length, length);
    input.focus();
  };

  useEffect(() => {
    if (edit && inputRef.current) {
      setCursorAtStart;
    }
  }, [edit]);

  const handleTimeOnClick = () => {
    if (running) {
      setRunning(false);
    }
    if (!running && !edit) {
      setEdit(true);
      const timeString = getFormattedTime(timer);
      setIsFirst(true);
      setEditTableTimeString(timeString);
    }

    if (edit) {
      setCursorAtStart();
    }
  };

  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/:/g, "");

    if (inputValue.length > 6) {
      if (isFirst) {
        const newNumber = inputValue[6];
        if (newNumber === "0") {
          inputValue = "000000";
        } else {
          inputValue = `00000${newNumber}`;
        }
        setIsFirst(false);
      } else {
        inputValue = inputValue.slice(-6);
      }
    } else {
      inputValue = inputValue.padStart(6, "0");
    }
    setEditTableTimeString(
      `${inputValue.slice(0, 2)}:${inputValue.slice(2, 4)}:${inputValue.slice(
        4,
        6
      )}`
    );
  };

  const handleTimerStatus = () => {
    setRunning(!running);

    if (edit) {
      const totalSeconds = getTotalSeconds(editTableTimeString);
      setTimer(totalSeconds);
      setEdit(false);
    }
  };

  const changeTimer = (label) => {
    switch (label) {
      case "30": {
        const totalSecond = getTotalSeconds(editTableTimeString) + 30;
        const newString = getFormattedTime(totalSecond);
        setEditTableTimeString(newString);

        break;
      }

      case "01": {
        const totalSecond = getTotalSeconds(editTableTimeString) + 60;
        const newString = getFormattedTime(totalSecond);
        setEditTableTimeString(newString);

        break;
      }

      default:
        console.log("deafult added");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Stack
          rowGap={4}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            border: "1px solid black",
            borderRadius: "5px",
            padding: "4rem",
            boxSizing: "content-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderBottom: "2px solid grey",
            }}
          >
            <Typography variant="h4" onClick={handleTimeOnClick}>
              {!edit ? (
                <>
                  {Math.floor(timer / 3600) > 0 &&
                    `${Math.floor(timer / 3600)}:`}
                  {Math.floor(timer / 60) % 60 > 0 &&
                    `${
                      Math.floor(timer / 60) % 60 < 10
                        ? `0${Math.floor(timer / 60) % 60}`
                        : Math.floor(timer / 60) % 60
                    }:`}
                  {`${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}
                </>
              ) : (
                <TextField
                  variant="outlined"
                  value={editTableTimeString}
                  onChange={(e) => handleChange(e)}
                  onClick={() => handleTimeOnClick()}
                  inputRef={inputRef}
                  inputProps={{
                    style: {
                      fontSize: "2rem",
                      border: "none",
                      textAlign: "center",
                      userSelect: "none",
                    },
                  }}
                  sx={{
                    border: "none",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              )}
            </Typography>
          </Box>
          {!running && edit && (
            <>
              <Stack flexDirection={"row"} columnGap={2}>
                <Button variant="contained" onClick={() => changeTimer("30")}>
                  +0:30
                </Button>
                <Button variant="contained" onClick={() => changeTimer("01")}>
                  +1:00
                </Button>
              </Stack>
            </>
          )}

          <Stack flexDirection={"row"} columnGap={2}>
            {timer !== 0 && (
              <Button variant="contained" onClick={handleTimerStatus}>
                {running ? "STOP" : "START"}
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => {
                setTimer(2 * 60);
                setEdit(false);
              }}
            >
              RESTART
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default App;
