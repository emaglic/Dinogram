import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "@/state/Chart/projectSlice";

const Header = () => {
  const project = useSelector(selectProject);
  return (
    <AppBar position="relative">
      <Toolbar>
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
