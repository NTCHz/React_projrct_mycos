import { Button, FormControl, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../contexts/MainContext";

const StartPage = () => {
  const { setUser } = useMain();
  const navigate = useNavigate();
  return (
    <>
      <h1>KillGuy</h1>
      <FormControl>
        <TextField
          label="Enter your name"
          variant="outlined"
          onChange={(e) => setUser(e.target.value)}
        />
      </FormControl>
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/game");
        }}
      >
        Start
      </Button>
    </>
  );
};

export default StartPage;
