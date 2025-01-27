import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  lowerContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "350px 1fr",
  },
});

export default Styles;
