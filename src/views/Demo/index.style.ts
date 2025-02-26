import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowY: "hidden",
  },
  lowerContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    overflowY: "hidden",
  },
});

export default Styles;
