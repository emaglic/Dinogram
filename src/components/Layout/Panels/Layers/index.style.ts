import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  node: {
    padding: "0.5rem 1rem",
    //cursor: "pointer",
  },
});

export const NodeStyles = (theme: Theme, node) => {
  return {
    backgroundColor: node.selected
      ? theme.palette.primary.main
      : theme.palette.background.default,
    color: node.selected
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  };
};

export default Styles;
