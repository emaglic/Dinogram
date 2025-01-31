import { border, display, minWidth } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",

    marginBottom: "1rem",
  },
  item: {
    padding: "1rem",
    width: "100%",
    border: "1px solid #ccc",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
});

export default Styles;
