import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: theme.palette.divider,
    border: `1px solid ${theme.palette.divider}`,
    cursor: "move",
    padding: "0 0.5rem",
  },
  label: {
    color: theme.palette.text.primary,
    textAlign: "center",
  },
});

export default Styles;
