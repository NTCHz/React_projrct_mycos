import React, { useState, useEffect, useRef } from "react";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../contexts/MainContext";
// import { firebase } from "@react-native-firebase/database";
import { ref, set } from "firebase/database";
import { database } from "./core/firebase";
import data from "./word.json";
import './BackgroundIndex.css'

const starPositions = Array.from({ length: 100 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 2 + 1,
}));

const Gamelogic = () => {
  const [wordArray, setWordArray] = useState<string[]>([]);
  const [status, setStatus] = useState(false);
  const [statussame, setStatussame] = useState(false);
  const [wordlist, setWordlist] = useState<string[]>([]);
  const [Score, setScore] = useState(0);
  const textFieldRefs = useRef<(HTMLInputElement | null)[]>([]); // Array of refs for each input
  const [hp, setHp] = useState(100);
  const navigate = useNavigate();
  const { user } = useMain();

  const randomWord = () => {
    return data[Math.floor(Math.random() * data.length)].length;
  };

  const [randomWordLength, setRandomWordLength] = useState(randomWord());

  // Update word from array
  const getWordFromArray = (arr: string[]) => arr.join("");

  const Callll = () => {
    const currentWord = getWordFromArray(wordArray);
    if (
      data.find((item: string) => item === currentWord) &&
      currentWord.length === randomWordLength
    ) {
      setScore(Score + randomWordLength);
    } else {
      setHp(hp - 20);
      setScore(Score - randomWordLength);
    }
  };

  const showSame = () => {
    setHp(hp - 10);
    return <h1>SameWord</h1>;
  };

  const handleCharacterChange = (index: number, value: string) => {
    const updatedWord = [...wordArray];
    updatedWord[index] = value.toLowerCase().charAt(0) || ""; // Ensure single char input
    setWordArray(updatedWord);

    // Move to the next input if the user types a character and there are more inputs
    if (value && index < wordArray.length - 1) {
      textFieldRefs.current[index + 1]?.focus();
    }

    setStatus(false);
    setStatussame(false);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle Backspace key
    if (e.key === "Backspace" && !wordArray[index] && index > 0) {
      textFieldRefs.current[index - 1]?.focus();
    }

    // Handle Enter key
    if (e.key === "Enter") {
      if (wordArray.every((char) => char !== "")) {
        handleSubmit(); // Call submit function if all fields are filled
      }
    }
  };

  const handleSubmit = () => {
    const currentWord = getWordFromArray(wordArray);
    if (
      wordlist.find((item) => item === currentWord) &&
      currentWord.length === randomWordLength
    ) {
      setStatussame(true);
    } else {
      setStatus(true);
      Callll();
      setStatussame(false);
      setWordlist([...wordlist, currentWord]);
    }
    setWordArray(new Array(randomWordLength).fill("")); // Clear inputs
    setRandomWordLength(randomWord()); // Generate new random length
  };

  useEffect(() => {
    // Reset wordArray to match the randomWordLength when it changes
    setWordArray(new Array(randomWordLength).fill(""));
    // Reset focus refs
    textFieldRefs.current = new Array(randomWordLength).fill(null);
  }, [randomWordLength]);

  const saveScore = () => {
    set(ref(database, `users/${user}`), {
      name: user,
      score: Score,
    });
  };

  return (
    <div className="space-background">
      <div>
        {hp <= 0 ? (
          <>
            <h1>Game Over</h1>
            <h1>Score : {Score}</h1>
            {saveScore()}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/score");
              }}
            >
              ScoreBoard
            </Button>
          </>
        ) : (
          <>
            <h1>Word Game</h1>
            <h1>
              Score: {Score} Hp: {hp}
            </h1>
            {statussame ? showSame() : <h1></h1>}
            <FormControl>
              <Grid container justifyContent="center" spacing={1}>
                {wordArray.map((char, index) => (
                  <Grid item key={index}>
                    <TextField
                      style={{ width: "50px" }}
                      label={`${index + 1}`}
                      variant="outlined"
                      value={char}
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center" },
                      }} // Center-align text
                      onChange={(e) =>
                        handleCharacterChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)} // Handle backspace and enter
                      inputRef={(el) => (textFieldRefs.current[index] = el)} // Assign refs to each input
                    />
                  </Grid>
                ))}
              </Grid>
              <br />
              <Grid container justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={wordArray.some((char) => char === "")} // Disable if any input is empty
                >
                  Submit
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setWordlist([]);
                    setScore(0);
                    setRandomWordLength(randomWord());
                    setWordArray(new Array(randomWordLength).fill(""));
                  }}
                >
                  Reset
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setRandomWordLength(randomWord());
                    setScore(Score - randomWordLength);
                    setWordArray(new Array(randomWordLength).fill(""));
                  }}
                >
                  NewRandom
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Home
                </Button>
              </Grid>
            </FormControl>
          </>
        )}
        {starPositions.map((pos, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${pos.top}vh`,
              left: `${pos.left}vw`,
              animationDuration: `${pos.duration}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Gamelogic;
