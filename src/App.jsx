import { GlobalStyles } from "./Styles/GlobalStyles";

import Header from "./Components/Header/Header";
import Typingbox from "./Components/Typing-box/Typingbox";
import Footer from "./Components/Footer/Footer";

import "./App.scss";
import { ThemeProvider } from "styled-components";
import { useMyTheme } from "./Context/ThemeContext";

function App() {
  const { theme } = useMyTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header />
        <Typingbox />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
