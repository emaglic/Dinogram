import { borderTop } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  layersGroup: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "hidden",
    overflowX: "hidden",
  },
  layerHeader: {
    padding: "0.5rem 0.5rem",
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
});

export default Styles;
