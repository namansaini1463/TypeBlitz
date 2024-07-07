import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useMyTheme } from "../../Context/ThemeContext";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";

import { auth } from "../../firebaseConfig";
import ErrorMappings from "../../Utils/Errors";

export default function SignUpForm({ handleModalClose }) {
  const theme = useMyTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.warning("Please fill all the fields!", {
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

    if (password !== confirmPassword) {
      toast.warning("Passwords dont match!", {
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

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("User Created Successfully", {
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
      .catch((err) => {
        toast.error(
          ErrorMappings[err.code] || "Unable to create user. Please try again",
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
        console.log(err);
      });
  };

  return (
    <Box>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoFocus
          sx={{
            input: { color: `${theme.theme.textColor}` },
            label: { color: `${theme.theme.textColor}` },
            outline: "none",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          sx={{
            input: { color: `${theme.theme.textColor}` },
            label: { color: `${theme.theme.textColor}` },
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="confirm password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          sx={{
            input: { color: `${theme.theme.textColor}` },
            label: { color: `${theme.theme.textColor}` },
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            background: `${theme.theme.cursor}`,
            color: `${theme.theme.textColor}`,
          }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
