import { borderBottom } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    gap: "2rem",
    padding: "0.5rem 0.5rem",
    overflowX: "auto",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    gap: "0.25rem",
  },
});

export default Styles;
