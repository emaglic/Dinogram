import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  controlContainer: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[300],
    padding: "0.5rem",
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
