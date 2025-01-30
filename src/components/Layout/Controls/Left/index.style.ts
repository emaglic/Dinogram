import { color } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "0.5rem 0.25rem",
    height: "100%",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  icon: {
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
});

export default Styles;
