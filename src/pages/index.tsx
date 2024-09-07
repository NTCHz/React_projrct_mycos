import { Route, Routes, NavLink, Link } from "react-router-dom";
import { Box, Container } from "@mui/material"; // Import the Box component
import StartPage from "./StartPage";
import GamePage from "./GamePage";
import ScorePage from "./ScorePage";

const MainPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </div>
  );
};

export default MainPage;
