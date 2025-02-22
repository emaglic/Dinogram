import React from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import RedoIcon from "@mui/icons-material/Redo";
import Styles from "../index.style";

import { Box, Tooltip, TooltipProps } from "@mui/material";
import { redo } from "@/state/Chart/chartSlice";

interface Props {
  tooltipPlacement?: TooltipProps["placement"];
}

const Redo = ({ tooltipPlacement = "top" }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(redo());
  };

  return (
    <Tooltip title="Redo" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <RedoIcon sx={styles.svg} />
      </Box>
    </Tooltip>
  );
};

export default Redo;
