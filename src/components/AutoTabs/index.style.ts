import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  tabContainer: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tabContentContainer: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    marginBottom: "1rem",
  },
});

export default Styles;
