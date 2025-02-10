import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  icon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.25rem",
    cursor: "pointer",
    borderRadius: "4px",
    backgroundColor: theme.palette.divider,
    //border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      //border: `1px solid ${theme.palette.secondary.main}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  svg: {
    width: "1rem",
    height: "1rem",
  },
});

export default Styles;
