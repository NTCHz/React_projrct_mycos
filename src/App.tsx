import "./App.css";

import MainPage from "./pages";
// import { ThemeProvider } from "@mui/material/styles";/
import { MainProvider } from "./contexts/MainContext";
// import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import React from "react";

const starPositions = Array.from({ length: 100 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 2 + 1,
}));

function App() {
  return (
      <BrowserRouter>
        <MainProvider>
          {/* <ThemeProvider theme={theme}> */}
          <div className="space-background" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}>
            <MainPage />
            <MusicPlayer />
          </div>
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
          {/* <ToastContainer /> */}
          {/* </ThemeProvider> */}
        </MainProvider>
      </BrowserRouter>
    );
}

export default App;
