import { useState } from "react";

import { toast, Bounce } from "react-toastify";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useMyTheme } from "../../Context/ThemeContext";
import { auth } from "../../firebaseConfig";

import ErrorMappings from "../../Utils/Errors";

export default function LoginForm({ handleModalClose }) {
  const theme = useMyTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
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

    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
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
      .catch((err) => {
        toast.error(
          ErrorMappings[err.code] || "Invalid Credentials. Please try again!",
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

  return (
    <Box>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoFocus
          sx={{
            input: { color: `${theme.theme.textColor}` },
            label: { color: `${theme.theme.textColor}` },
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
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
          Login
        </Button>
      </Box>
    </Box>
  );
}
