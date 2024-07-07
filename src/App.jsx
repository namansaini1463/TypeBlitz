import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/GlobalStyles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import { useMyTheme } from "./Context/ThemeContext";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import User from "./Pages/User/User";

function App() {
  const { theme } = useMyTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
