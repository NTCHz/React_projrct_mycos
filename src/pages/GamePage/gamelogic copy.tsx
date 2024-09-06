import React, { useState, useEffect } from "react";
import data from "./word.json";
import {
  // Box,
  Button,
  FormControl,
  Grid,
  TextField,
  // Typography,
} from "@mui/material";
const Gamelogic = () => {
  const [word, setWordData] = useState("");
  const [status, setStatus] = useState(false);
  const [statussame, setStatussame] = useState(false);
  const [wordlist, setWordlist] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  const Callll = () => {
    if (
      data.find((item: string) => item === word) &&
      word.length === randomWordLength
    ) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  const showSame = () => {
    return <h1>SameWord</h1>;
  };

  const randomWord = () => {
    return data[Math.floor(Math.random() * data.length)].length;
  };

  const [randomWordLength, setRandomWordLength] = useState(randomWord());
  return (
    <>
      <h1>Word Game</h1>
      <h1>Count: {count}</h1>
      <h1>RandomWord: {randomWordLength}</h1>
      {statussame ? showSame() : <h1></h1>}

      <FormControl>
        {/* Create textfield for input channel name that need to create new. */}
        <TextField
          label="Insertword"
          variant="outlined"
          value={word}
          onChange={(e) => {
            setWordData(e.target.value.toLowerCase());
            setStatus(false);
            setStatussame(false);
          }}
        />
        <br />
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (
                wordlist.find((item) => item === word) &&
                word.length === randomWordLength
              ) {
                setStatussame(true);
              } else {
                setStatus(true);
                Callll();
                setStatussame(false);
                setWordlist([...wordlist, word]);
              }
              setWordData("");
              setRandomWordLength(randomWord());
            }}
          >
            Summit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setWordlist([]);
              setCount(0);
              setRandomWordLength(randomWord());
            }}
          >
            reset
          </Button>
        </Grid>
      </FormControl>
    </>
  );
};

export default Gamelogic;
