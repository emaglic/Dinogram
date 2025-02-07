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
    //border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      //border: `1px solid ${theme.palette.secondary.main}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
});

export default Styles;
