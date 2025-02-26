import { useMemo, useState, useEffect } from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Main from "./views/Main";
import Demo from "./views/Demo";
import { Provider, useSelector } from "react-redux";
import { store } from "./state/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { selectProject } from "./state/Project/projectSlice";
import { useMediaQuery } from "@mui/material";
import { getMuiThemeMode, setMuiThemeMode } from "./themeMode"; // Import global functions
import mainTheme from "./themes/main";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import CreateView from "@/views/Create";
import DemoView from "@/views/Demo";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode = useSelector(selectProject).mode;

  const theme = useMemo(
    () =>
      /* createTheme({
        palette: {
          mode: mode ? mode : prefersDarkMode.toString() ? "dark" : "light",
        },
      }), */
      mainTheme(mode, prefersDarkMode),
    [mode]
  );

  useEffect(() => {
    setMuiThemeMode(mode);
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<CreateView />} />
            <Route path="/:demo" element={<DemoView />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
