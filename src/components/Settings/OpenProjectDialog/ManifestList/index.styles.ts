import { border, display, minWidth } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",

    marginBottom: "1rem",
  },
  itemHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyItems: "center",
    gap: "1rem",
    padding: "1rem",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  item: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    padding: "1rem",
    width: "100%",
    cursor: "pointer",
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  itemContents: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
});

export default Styles;
