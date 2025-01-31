import { display } from "@mui/system";
import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: {
    with: "50vw",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

export default Styles;
