import { borderTop } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: "flex 0.3s ease-in-out",
    overflowY: "hidden",
    overflowX: "hidden",
    "&.MuiPaper-root": {
      backgroundColor: `${theme.palette.background.default} !important`,
      boxShadow: "none !important",
      backgroundImage: "none !important",
    },
    "&.Mui-expanded": {
      backgroundColor: `${theme.palette.background.default} !important`, // Different color when expanded
      boxShadow: "none !important",
      backgroundImage: "none !important",
    },
  },
  accordionDetails: {
    //height: "100%",
    overflowY: "hidden",
    padding: "0px",
    flexGrow: 1, // Allows it to take available space
    overflow: "auto", // Enables scrolling when content overflows
    maxHeight: "100%", // Prevents it from growing beyond allowed space
  },
});

export default Styles;
