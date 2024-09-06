import { useNavigate } from 'react-router-dom';
import './BackgroundIndex.css'

const StartGamePage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');

  };

  const scoreBoard = () => {
    navigate('/scoreBoard');

  }

  const stars = Array.from({ length: 100 }, (_, i) => (
    <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 2 + 1}s`
          }}
        ></div>
      ));

  return (
    <div className="space-background">
      <div className="start-game-page">
        <h1 style={
          {
            fontSize: 150
          }
        }>
          QGuy
        </h1>
        <p>Click the button below to start your adventure!</p>
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
        <button onClick={scoreBoard} className="score-button">
          Scoreboard
        </button>
        {stars}
      </div>
    </div>
  );
};

export default StartGamePage;
