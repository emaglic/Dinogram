import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  noSource: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  noSourceInner: {
    padding: "1rem",
    width: "100",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Styles;
