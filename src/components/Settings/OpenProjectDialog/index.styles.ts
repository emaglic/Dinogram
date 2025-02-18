import { display } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem 0",
  },
});

export default Styles;
