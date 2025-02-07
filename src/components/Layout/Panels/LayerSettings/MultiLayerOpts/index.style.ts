import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
  },
  toolRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    marginBottom: "1rem",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "0.5rem",
    width: "100%",
  },
});

export default Styles;
