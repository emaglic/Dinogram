import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  tabContainer: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
});

export default Styles;
