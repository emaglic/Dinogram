import { color } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  iconContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridAutoRows: "1fr",
    gap: "1rem",
  },
  icon: {
    display: "flex",
    cursor: "pointer",
    textAlign: "center",
    flex: "1 1 0px",
    flexDirection: "column",
    gap: "0.5rem",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
});

export default Styles;
