import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    width: "100%",
    height: "100%",
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowY: "hidden",
  },
});

export default Styles;
