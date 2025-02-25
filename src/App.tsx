import { useMemo, useState, useEffect } from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Main from "./components/Layout/Main";
import { Provider, useSelector } from "react-redux";
import { store } from "./state/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { selectProject } from "./state/Project/projectSlice";
import { useMediaQuery } from "@mui/material";
import { getMuiThemeMode, setMuiThemeMode } from "./themeMode"; // Import global functions
import mainTheme from "./themes/main";

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
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
