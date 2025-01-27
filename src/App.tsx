import { useState } from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Main from "./components/Layout/Main";
import { Provider } from "react-redux";
import { store } from "./state/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        <Main />
      </Provider>
    </>
  );
}

export default App;
