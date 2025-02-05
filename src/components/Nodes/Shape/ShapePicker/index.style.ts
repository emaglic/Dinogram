import { color } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
  },
});

export default Styles;
