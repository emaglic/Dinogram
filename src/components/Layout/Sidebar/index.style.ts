import { Theme } from "@mui/system/createTheme";

const Styles = (theme: Theme) => ({
  container: (side: "left" | "right", expanded: boolean) => ({
    position: "relative",
    width: expanded ? "350px" : "calc(24px + 2rem)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "hidden",
    borderLeft: side === "right" && `1px solid ${theme.palette.divider}`,
    borderRight: side === "left" && `1px solid ${theme.palette.divider}`,
    transition: "width 0.3s ease-in-out",
  }),
  expandButton: (side) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: side === "left" ? "flex-end" : "flex-start",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  }),
});

export default Styles;
