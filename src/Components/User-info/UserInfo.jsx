import { AccountCircle, KeyboardBackspace } from "@mui/icons-material";
import "./UserInfo.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMyTheme } from "../../Context/ThemeContext";

function UserInfo({ totalTestsTaken, avgWPM, avgAccuracy }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useMyTheme();

  const getDisplayName = () => {
    const email = user.email;
    let i = 0;
    for (; i < email.length; i++) {
      if (email[i] === "@") {
        break;
      }
    }

    const username = email.slice(0, 1).toUpperCase() + email.slice(1, i);
    return username;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="goto">
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <KeyboardBackspace
            sx={{
              fontSize: "2rem",
              color: theme.theme.textColor,
            }}
          />
        </IconButton>
      </div>
      <div className="user-card">
        <div className="user-profile">
          <div className="user-icon">
            <AccountCircle sx={{ fontSize: "6rem" }} />
          </div>
          <div className="user-info">
            <div className="user-username">{getDisplayName()}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
        <div className="user-tests">
          <div className="user-totalTests">
            <h6>Tests Taken</h6>
            <h5>{totalTestsTaken}</h5>
          </div>
          <div className="user-avgWPM">
            <h6>Average WPM</h6>
            <h5>{avgWPM.toFixed(2)}</h5>
          </div>
          <div className="user-avgAccuracy">
            <h6>Average Accuracy</h6>
            <h5>{avgAccuracy.toFixed(2)}%</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
