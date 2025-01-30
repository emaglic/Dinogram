import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: (selected?: boolean, visible?: boolean) => ({
    display: visible ? "flex" : "none",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    border: selected
      ? `5px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.black}`,
  }),
});

export default Styles;
