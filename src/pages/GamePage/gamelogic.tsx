import React, { useState, useEffect, useRef } from "react";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../contexts/MainContext";
// import { firebase } from "@react-native-firebase/database";
import { ref, set, get } from "firebase/database";
import { database } from "./core/firebase";
import data from "./word.json";
import '../BackgroundIndex.css'

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

  // console.log(user);
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
      setScore(prevScore => Math.max(prevScore + randomWordLength, 0));
    } else {
      setHp(prevHp => prevHp - 20);
      // setScore(prevScore => Math.max(prevScore - randomWordLength, 0));
    }
  };
  

  const showSame = () => {
    setHp(hp - 10);
    setStatussame(false);
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
      setWordlist(prevList => [...prevList, currentWord]);
    }
    setWordArray(new Array(randomWordLength).fill(""));
    setRandomWordLength(randomWord());
  };
  

  useEffect(() => {
    // Reset wordArray to match the randomWordLength when it changes
    setWordArray(new Array(randomWordLength).fill(""));
    // Reset focus refs
    textFieldRefs.current = new Array(randomWordLength).fill(null);
  }, [randomWordLength]);

  useEffect(() => {
    if (textFieldRefs.current.length > 0) {
      textFieldRefs.current[0]?.focus();
    }
  }, [wordArray.length]);

  console.log(wordlist);
  const saveScore = () => {
    const userScoreRef = ref(database, `users/${user}/score`);
  
    get(userScoreRef)
      .then((snapshot) => {
        const data = snapshot.val();
  
        if (data === null) {
          // User does not exist, create a new record with the score
          set(ref(database, `users/${user}`), {
            name: user,
            score: Score,
          });
        } else if (data < Score) {
          // User exists, but the new score is higher
          set(ref(database, `users/${user}/score`), Score);
        }
      })
      .catch((error) => {
        console.error("Error saving score:", error);
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
            <div>
            <button className="start-button" onClick={() => 
        {navigate("/");}}>
          Home
        </button>
            <button className="score-button" style={{marginLeft: '10px'}} onClick={() => 
        {navigate("/score");}}>
          Scoreboard
        </button>
        
        </div>
          </>
        ) : (
          <>
            <h1>WordGame</h1>
            <h1>
              Score: {Score} Hp: {hp}
            </h1>
            {statussame ? showSame() : <h1></h1>}
            <FormControl>
              <Grid container justifyContent="center" spacing={1}>
                {wordArray.map((char, index) => (
                  <Grid item key={index}>
                    <TextField 
                      autoFocus // Focus on the first input
                      style={{ width: "50px", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "5px", marginBottom: "20px" }}
                      variant="outlined"
                      value={char}
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", color: "white"},
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
              <button className="score-button" style={{marginLeft: '10px'}} onClick={() => 
         {handleSubmit();}}>
          Submit
        </button>
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  // disabled={wordArray.some((char) => char === "")} // Disable if any input is empty
                >
                  Submit
                </Button> */}
                {/* <Button
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
                    setScore(prevScore => Math.max(prevScore - randomWordLength, 0));
                    setWordArray(new Array(randomWordLength).fill(""));
                  }}
                >
                  NewRandom
                </Button> */}

                {/* <Button
                  style={{ marginLeft: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Home
                </Button> */}
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
