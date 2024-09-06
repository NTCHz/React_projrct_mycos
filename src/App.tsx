import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartGamePage from './compontents/StartGamePage';
import GamePage from './compontents/GamePage';
import ScoreBoardPage from './compontents/ScoreBoardPage';
import './App.css'


const App = () => {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<StartGamePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/scoreboard" element={<ScoreBoardPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
