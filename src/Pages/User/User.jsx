import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";
import UserDataTable from "../../Components/User-data-table/UserDataTable";
import Graph from "../../Components/Graph/Graph";
import UserInfo from "../../Components/User-info/UserInfo";
import Footer from "../../Components/Footer/Footer";

import "./User.scss";

function User() {
  const [userData, setUserData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultsReference = db.collection("Results");
    const { uid } = auth.currentUser;

    let tempData = [];
    let tempGraphData = [];

    resultsReference
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            doc.data().wpm,
          ]);
        });
        setUserData(tempData);
        setGraphData(tempGraphData.reverse());
      });
  };

  const effectFunction = async () => {
    if (loading) {
      return <CircularProgress />;
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }

    if (!loading && !user) {
      navigate("/");
    }

    effectFunction();
  }, [loading]);

  //`Calculate Avg WPM
  const calculateAvgWPM = () => {
    let totalWPM = 0;
    userData.map((data) => {
      totalWPM += data.wpm;
    });

    return totalWPM / userData.length;
  };
  //`Calculate Avg Accuracy
  const calculateAvgAccuracy = () => {
    let totalAccuracy = 0;
    userData.map((data) => {
      totalAccuracy += Math.round(data.accuracy);
    });

    return totalAccuracy / userData.length;
  };

  calculateAvgWPM();

  return (
    <div className="user-page">
      <UserInfo
        totalTestsTaken={userData.length}
        avgWPM={calculateAvgWPM()}
        avgAccuracy={calculateAvgAccuracy()}
      />
      <Graph graphData={graphData}></Graph>
      <UserDataTable userData={userData} />
      <Footer />
    </div>
  );
}

export default User;
