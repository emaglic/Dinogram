import { boxSizing } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: (selected?: boolean, visible?: boolean, autoSize?: boolean) => ({
    boxSizing: "border-box",
    display: visible ? "flex" : "none",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    border: selected ? `5px solid ${theme.palette.primary.main}` : null,
    overflow: "hidden",
  }),
  handle: {
    width: "10px",
    height: "10px",
  },
});

export default Styles;
