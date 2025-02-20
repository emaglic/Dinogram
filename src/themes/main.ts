import { createTheme } from "@mui/material";

const mainTheme = (mode: "dark" | "light", prefersDarkMode: boolean) => {
  return createTheme({
    palette: {
      mode: mode ? mode : prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#7cb342",
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#ffc400",
        light: "#ffcf33",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#47008F",
      },
    },
  });
};

export default mainTheme;
