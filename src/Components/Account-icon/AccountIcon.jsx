import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";

import { useMyTheme } from "../../Context/ThemeContext";

import "./AccountIcon.scss";
import { Modal, AppBar, Tabs, Tab, Tooltip, Zoom } from "@mui/material";
import { useState } from "react";

import LoginForm from "../Login-form/LoginForm";
import SignUpForm from "../SignUp-form/SignUpForm";
import GoogleButton from "react-google-button";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  browserPopupRedirectResolver,
} from "firebase/auth";

import { toast, Bounce } from "react-toastify";

import ErrorMappings from "../../Utils/Errors";
import { useNavigate } from "react-router-dom";

function AccountIcon() {
  const theme = useMyTheme();

  const [modalOpen, setModelOpen] = useState(false);
  const [currentModalValue, setCurrentModalValue] = useState(0);

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const handleModalOpen = () => {
    if (user) {
      //go to the user page
      navigate("/user");
    } else {
      setModelOpen(true);
    }
  };
  const handleModalClose = () => {
    setModelOpen(false);
  };

  const handleModalChange = (e, v) => {
    setCurrentModalValue(v);
  };

  const googleAuthProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider, browserPopupRedirectResolver)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        toast.success("Logged In Successfully!", {
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
        handleModalClose();
      })
      .catch((error) => {
        toast.error(
          ErrorMappings[error.code] || "Invalid Credentials. Please try again!",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          }
        );
      });
  };

  const logoutUser = () => {
    auth
      .signOut()
      .then((res) => {
        toast.success("Logged Out Successfully!", {
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
      .catch((error) => {
        toast.error("Unable to logout. Please try again!", {
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

  return (
    <div>
      <div className="username-wrapper">
        <IconButton onClick={handleModalOpen}>
          <AccountCircleIcon
            sx={{
              fontSize: "3rem",
              color: theme.theme.textColor,
            }}
          />
        </IconButton>
        <h4
          onClick={handleModalOpen}
          style={{ marginRight: "1rem", cursor: "pointer" }}
        >
          {user ? "Username" : "LOGIN"}
        </h4>
        {user && (
          <Tooltip
            arrow
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 400 }}
            title={<h2 style={{ color: "lightblue" }}>Logout</h2>}
          >
            <IconButton onClick={logoutUser}>
              <LogoutIcon
                sx={{
                  fontSize: "2rem",
                  color: theme.theme.textColor,
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
          textAlign: "center",
        }}
      >
        <div className="account-modal">
          <AppBar position="static" style={{ background: "transparent" }}>
            <Tabs
              value={currentModalValue}
              variant="fullWidth"
              onChange={handleModalChange}
            >
              <Tab label="Login" style={{ color: theme.theme.textColor }}></Tab>
              <Tab
                label="Sign Up"
                style={{ color: theme.theme.textColor }}
              ></Tab>
            </Tabs>
          </AppBar>
          {currentModalValue === 0 && (
            <LoginForm handleModalClose={handleModalClose} />
          )}
          {currentModalValue === 1 && (
            <SignUpForm handleModalClose={handleModalClose} />
          )}
          <Box>
            <h3>OR</h3>
            <GoogleButton
              style={{ width: "100%", marginTop: ".6rem" }}
              onClick={handleGoogleSignIn}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default AccountIcon;
