import { boxSizing } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: (
    rotation: number,
    selected?: boolean,
    visible?: boolean,
    autoSize?: boolean
  ) => ({
    boxSizing: "border-box",
    display: visible ? "flex" : "none",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    outline: selected ? `5px solid ${theme.palette.primary.main}` : null,
    //overflow: "hidden",
    transform: `rotate(${rotation}deg)`,
    transformOrigin: "center center",
  }),
});

export default Styles;
