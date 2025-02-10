import { useMemo, useState } from "react";
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
import { selectProject } from "./state/Chart/projectSlice";
import { useMediaQuery } from "@mui/material";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  console.log("prefersDarkMode: ", prefersDarkMode.toString());
  const mode = useSelector(selectProject).mode;
  console.log("mode: ", mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? mode : prefersDarkMode.toString() ? "dark" : "light",
        },
      }),
    [mode]
  );

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
