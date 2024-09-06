import { Route, Routes, NavLink, Link } from "react-router-dom";
import { Box, Container } from "@mui/material"; // Import the Box component
import StartPage from "./StartPage";
import GamePage from "./GamePage";
import ScorePage from "./ScorePage";

const MainPage = () => {
  return (
    <div>
      {/* Top Navigation Bar */}
      <Box
        sx={{
          typography: "body1",
          "& > :not(style) ~ :not(style)": {
            ml: 2,
          },
        }}
        onClick={(e) => e.preventDefault()}
      ></Box>
      <NavLink
        to={"/"}
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            textDecoration: isActive ? "underline" : "none",
            color: isActive ? "primary.main" : "text.secondary",
            padding: "10px",
          };
        }}
      >
        Home
      </NavLink>
      <NavLink
        to={"/score"}
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            textDecoration: isActive ? "underline" : "none",
            color: isActive ? "primary.main" : "text.secondary",
          };
        }}
      >
        Score Board
      </NavLink>

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </div>
  );
};

export default MainPage;
