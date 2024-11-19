import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import useTimer from "./assets/hooks/useTimer";
import { useRef, useState } from "react";
import { getFormattedTime, getTotalSeconds } from "./assets/utiils/helper";
import { useEffect } from "react";

function App() {
  const { timer, setTimer, running, setRunning, edit, setEdit } = useTimer();
  const [editTableTimeString, setEditTableTimeString] = useState("");
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
      setEditTableTimeString(timeString);
    }

    if (edit) {
      setCursorAtStart();
    }
  };

  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/:/g, "");

    if (inputValue.length > 6) {
      inputValue = inputValue.slice(-6);
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
            // width: "30vw",
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
                  {`${timer % 60 < 10 ? `${timer % 60}` : timer % 60}`}
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
                        border: "none", // Remove the border from the fieldset
                      },
                      "&:hover fieldset": {
                        border: "none", // Prevent hover border
                      },
                      "&.Mui-focused fieldset": {
                        border: "none", // Prevent border when focused
                      },
                    },
                  }}
                />
              )}
            </Typography>
          </Box>

          <Stack flexDirection={"row"} columnGap={2}>
            {timer !== 0 && (
              <Button variant="contained" onClick={handleTimerStatus}>
                {running ? "STOP" : "START"}
              </Button>
            )}

            <Button variant="contained" onClick={() => setTimer(2 * 60)}>
              RESTART
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default App;
