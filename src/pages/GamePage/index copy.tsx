import { Button, FormControl, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../contexts/MainContext";
import './BackgroundIndex.css'

const starPositions = Array.from({ length: 100 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 2 + 1,
}));

const StartPage = () => {
  const { setUser } = useMain();
  const navigate = useNavigate();

  return (
    <div className="space-background">
      <div className="start-game-page">
        <h1>WordGame</h1>
        <FormControl>
          <TextField
            label="Enter your name"
            variant="outlined"
            onChange={(e) => setUser(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
        </FormControl>
        <br />
        <br />
        <button className="start-button" onClick={() => 
        {navigate("/game");}}>
          Start
        </button>
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
