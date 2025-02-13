import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: (node) => ({
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.25rem",
    boxSizing: "border-box",
    padding: "0.55rem 0.5rem",
    outline: `1px solid ${theme.palette.divider}`,
    backgroundColor: node.selected
      ? theme.palette.primary.main
      : theme.palette.background.default,
    color: node.selected
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    //cursor: "pointer",
  }),
  left: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "0.5rem",
    width: "100%",
  },
  right: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.35rem",
  },
  icon: {
    fontSize: "1rem",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  interactive: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "auto",
  },
});

export default Styles;
