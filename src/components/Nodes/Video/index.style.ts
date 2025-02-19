import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    "& > div:first-of-type": {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: "100% !important",
      height: "100% !important",
      zIndex: 0,
    },
  },
  video: { width: "100%", height: "100%" },
  noSource: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "1rem",
  },
});

export default Styles;
