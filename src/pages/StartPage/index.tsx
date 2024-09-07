import { Button, FormControl, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../contexts/MainContext";
import '../BackgroundIndex.css'
import { useEffect, useState} from "react";
import MusicPlayer from './../../components/MusicPlayer';

const starPositions = Array.from({ length: 100 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 2 + 1,
}));

const StartPage = () => {
  const { user,setUser } = useMain();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
  }, [setUser]);

  // console.log(user);
  return (
    <div className="space-background">
      <div className="start-game-page">
        <h1>WordGame</h1>
        <FormControl>
          <TextField
            label="Enter your name"
            variant="outlined"
            style={{ width: '300px', marginBottom: '20px' }}
            onChange={(e) => setUser(e.target.value)}
            InputLabelProps={{
              style: { color: 'white', fontFamily: 'Pixelify Sans', fontSize: '16px' }, // Change the font here
            }}
            InputProps={{
              style: { color: 'white', fontFamily: 'Pixelify Sans', fontSize: '16px' }, // Change the input font here
            }}
          />
        </FormControl>
        <br />
        <button className="start-button" disabled={user === null} onClick={() => 
        {navigate("/game");}}>
          Start
        </button>
        <button className="score-button" style={{marginLeft: '10px'}} onClick={() => 
        {navigate("/score");}}>
          Scoreboard
        </button>
        {/* <MusicPlayer /> */}
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

export default StartPage;
