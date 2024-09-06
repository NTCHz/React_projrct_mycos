// import { Button } from "@mui/material";
import { ref, get, child } from "firebase/database";
import { database } from "../GamePage/core/firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../BackgroundIndex.css'
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import React from "react";
import { useNavigate } from "react-router-dom";


const starPositions = Array.from({ length: 100 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 2 + 1,
}));


const ScorePage = () => {
  var datajson: { [key: string]: any } = { Round: 0 };
  const navigate = useNavigate();


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

  const VirtuosoTableComponents: TableComponents<any> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        <TableCell align="center" sx={{ backgroundColor: 'background.paper', fontSize: "23px", fontFamily: "'Pixelify Sans', sans-serif;" }}>No.</TableCell>
        <TableCell align="center" sx={{ backgroundColor: 'background.paper', fontSize: "23px", fontFamily: "'Pixelify Sans', sans-serif;"}}>Name</TableCell>
        <TableCell align="center" sx={{ backgroundColor: 'background.paper', fontSize: "23px", fontFamily: "'Pixelify Sans', sans-serif;"}}>Score</TableCell>
      </TableRow>
    );
  }

  function rowContent(index: number, row: any) {
    const [key, value] = sortedData[index];
    return (
      <>
        <TableCell align="center" sx={{fontSize: "18px",fontFamily: "'Pixelify Sans', sans-serif;"}}>{index + 1}</TableCell>
        <TableCell component="th" scope="row" align="center" sx={{fontSize: "18px",fontFamily: "'Pixelify Sans', sans-serif;"}}>
          {value.name}
        </TableCell>
        <TableCell align="center" sx={{fontSize: "18px",fontFamily: "'Pixelify Sans', sans-serif;"}}>{value.score}</TableCell>
      </>
    );
  }

  return (
    <div className="space-background">

      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1>WordGame</h1>
        <Paper style={{ height: 400, width: 400, marginBottom: '20px'}}>
      <TableVirtuoso
        style={{ height: '100%', width: '100%' }}
        data={sortedData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
        {/* <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'hidden', color: 'white'}}>
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
        </TableContainer> */}
        <br />
        <div>
        <button className="score-button" onClick={() => 
        {location.reload();}}>
          Reload
        </button>
        <button className="start-button" style={{marginLeft: '10px'}} onClick={() => 
        {navigate("/");}}>
          Home
        </button>
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
        </div>
    </div>
  );
};

export default ScorePage;
