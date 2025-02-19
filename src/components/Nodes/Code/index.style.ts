import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
  },
});

export default Styles;
