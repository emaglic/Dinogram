import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  lowerContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "350px auto 1fr 350px",
  },
});

export default Styles;
