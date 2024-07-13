/* eslint-disable react/prop-types */
import { Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

import "./Stats.scss";
import Graph from "../Graph/Graph";

import { toast, Bounce } from "react-toastify";

import { auth, db } from "../../firebaseConfig";
import { useEffect } from "react";

function Stats({
  wpm,
  rawWpm,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  accuracy,
  graphData,
}) {
  let timeSet = new Set();
  const updatedGraphData = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushDataToDatabase = () => {
    const resultsReference = db.collection("Results");
    const { uid } = auth.currentUser;

    if (!accuracy) {
      toast.error("Invalid accuracy", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      return;
    }

    resultsReference
      .add({
        wpm,
        rawWpm,
        correctChars,
        incorrectChars,
        missedChars,
        extraChars,
        accuracy: accuracy.toFixed(2),
        timeStamp: new Date(),
        userId: uid,
      })
      .then((res) => {
        toast.info("Result saved to database!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch((err) => {
        toast.error("Unable to save result", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      pushDataToDatabase();
    } else {
      toast.warning("Login to save result!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, []);

  return (
    <div className="stats">
      <div className="left-stats">
        <div className="wpm-container">
          <div className="box-container">
            <h3>WPM</h3>
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title={<h2 style={{ color: "lightblue" }}>{wpm}</h2>}
            >
              <h4>{Math.round(wpm)}</h4>
            </Tooltip>
          </div>
          <div className="box-container">
            <h3>Raw WPM</h3>
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title={<h2 style={{ color: "lightblue" }}>{rawWpm}</h2>}
            >
              <h4>{Math.round(rawWpm)}</h4>
            </Tooltip>
          </div>
        </div>
        <div className="accuracy-container box-container">
          <h3>Accuracy</h3>
          <Tooltip
            arrow
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 400 }}
            title={
              <h2 style={{ color: "lightblue" }}>{accuracy.toFixed(2)}%</h2>
            }
          >
            <h4>{Math.round(accuracy)}% </h4>
          </Tooltip>
        </div>
        <div className="characters-container box-container">
          <h3>Characters</h3>
          <div className="all-chars-container">
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title={<h2 style={{ color: "lightblue" }}>Correct </h2>}
            >
              <div className="correct-chars">{correctChars}</div>
            </Tooltip>
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title={<h2 style={{ color: "lightblue" }}>Incorrect </h2>}
            >
              <div className="incorrect-chars">{incorrectChars}</div>
            </Tooltip>
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title={<h2 style={{ color: "lightblue" }}>Missed </h2>}
            >
              <div className="missed-chars">{missedChars}</div>
            </Tooltip>
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title={<h2 style={{ color: "lightblue" }}>Extra </h2>}
            >
              <div className="extra-chars">{extraChars}</div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="right-stats">
        <Graph graphData={updatedGraphData} />
      </div>
    </div>
  );
}

export default Stats;
