import { Theme } from "@mui/system/createTheme";
import { alpha } from "@mui/system";

const Styles = (theme: Theme) => ({
  controlContainer: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
    backgroundColor: alpha(theme.palette.primary.main, 1),
    padding: "0.5rem",
    position: "absolute",
    boxSizing: "border-box",
  },
  controlContainerInner: {
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
  },
});

export default Styles;
