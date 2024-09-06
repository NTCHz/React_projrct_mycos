import Game from "../../animetion game/Game";
import './index.css'

import Gamelogic from "./gamelogic";
const GamePage = () => {
  return (
    <div className="game-container">
      <div className="gamelogic">
        <Gamelogic />
      </div>
      <div className="game">
        <Game />
      </div>
    </div>
  );
};

export default GamePage;
