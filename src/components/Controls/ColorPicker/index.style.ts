import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "0.5rem",
    //justifyContent: "center",
    alignItems: "center",
  },
  swatch: (color: string) => ({
    width: "20px",
    height: "20px",
    //borderRadius: "50%",
    backgroundColor: color || "#000000",
    border: `1px solid ${theme.palette.text.primary}`,
    cursor: "pointer",
  }),
});

export default Styles;
