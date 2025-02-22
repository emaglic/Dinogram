import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignVerticalTopIcon from "@mui/icons-material/AlignVerticalTop";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";
import { Box, Tooltip, TooltipProps } from "@mui/material";
import {
  selectChart,
  selectSelectedNodes,
  updateNodes,
} from "@/state/Chart/chartSlice";

interface Props {
  tooltipPlacement?: TooltipProps["placement"];
}

const AlignTop = ({ tooltipPlacement = "top" }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

  const handleClick = () => {
    const minY = Math.min(...nodes.map((node) => node.position.y));
    const updatedNodes = nodes.map((node) => ({
      ...node,
      position: { ...node.position, y: minY },
    }));
    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Align Top" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <AlignVerticalTopIcon sx={styles.svg} />
      </Box>
    </Tooltip>
  );
};

export default AlignTop;
