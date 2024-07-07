import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import "./UserDataTable.scss";
import { useMyTheme } from "../../Context/ThemeContext";
import { useEffect } from "react";

function UserDataTable({ userData }) {
  const { theme } = useMyTheme();

  const tableStyles = {
    color: theme.textColor,
    fontFamily: ["Kode Mono", "monospace"].join(","),
    textAlign: "center",
    fontSize: "2rem",
  };

  console.log(...userData);

  return (
    <div className="user-table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={tableStyles}>WPM</TableCell>
              <TableCell style={tableStyles}>Accuracy</TableCell>
              <TableCell style={tableStyles}>Characters</TableCell>
              <TableCell style={tableStyles}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((d) => {
              return (
                <TableRow key={d.id}>
                  <TableCell style={tableStyles}>
                    {
                      <Tooltip title={`Raw WPM: ${d.rawWpm}`}>
                        {Math.round(d.wpm)}
                      </Tooltip>
                    }
                  </TableCell>
                  <TableCell style={tableStyles}>
                    {
                      <Tooltip title={`${d.accuracy}%`}>
                        {Math.round(d.accuracy)}%
                      </Tooltip>
                    }
                  </TableCell>
                  <TableCell style={tableStyles}>
                    {<Tooltip title={`Correct`}>{d.correctChars}</Tooltip>}|
                    {<Tooltip title={`Incorrect`}>{d.incorrectChars}</Tooltip>}|
                    {<Tooltip title={`Missed`}>{d.missedChars}</Tooltip>}|
                    {<Tooltip title={`Extra`}>{d.extraChars}</Tooltip>}
                  </TableCell>
                  <TableCell style={tableStyles}>
                    {d.timeStamp.toDate().toLocaleString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* {userData.map((data) => {
        return (
          <>
            <p>{data.id}</p>
            <p>{data.missedChars}</p>
          </>
        );
      })} */}
    </div>
  );
}

export default UserDataTable;
