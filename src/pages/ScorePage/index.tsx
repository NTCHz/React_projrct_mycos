import { Button } from "@mui/material";
import { ref, get, child } from "firebase/database";
import { database } from "../GamePage/core/firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ScorePage = () => {
  var datajson: { [key: string]: any } = { Round: 0 };

  get(child(ref(database), "users/"))
    .then((snapshot) => {
      datajson = snapshot.val();
      localStorage.setItem("datajson", JSON.stringify(datajson));
    })
    .catch((err) => {
      alert(err);
    });

  datajson = JSON.parse(localStorage.getItem("datajson") as string);
  console.log(datajson);

  // Convert datajson to an array of entries and sort by score
  const sortedData = Object.entries(datajson)
    .filter(([key, value]) => value.name && value.score !== undefined) // Optional: filter to ensure valid data
    .sort(([, a], [, b]) => b.score - a.score); // Sort by score descending

  return (
    <>
      <h1>Word game</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map(([key, value]) => (
              <TableRow
                key={value.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.name}
                </TableCell>
                <TableCell align="right">{value.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button
        style={{ marginLeft: "10px" }}
        variant="contained"
        color="primary"
        onClick={() => {
          location.reload();
        }}
      >
        Reload
      </Button>
    </>
  );
};

export default ScorePage;
