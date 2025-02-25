import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "@/state/Project/projectSlice";
import ShapeSVG from "@/components/Nodes/Shape/ShapeSVG";
import logo from "@/assets/logo.svg?react";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

const Header = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const project = useSelector(selectProject);
  return (
    <AppBar position="relative">
      <Toolbar>
        <ShapeSVG
          sx={styles.logo}
          component={logo}
          fill={{ color: theme.palette.text.primary }}
          width="2rem"
          height="2rem"
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dinogram
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {project.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
