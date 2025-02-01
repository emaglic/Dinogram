import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    marginTop: "1rem",
  },
});

export default Styles;
