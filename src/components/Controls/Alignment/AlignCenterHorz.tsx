import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignHorizontalCenterIcon from "@mui/icons-material/AlignHorizontalCenter";
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

const AlignCenterHorz = ({ tooltipPlacement = "top" }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

  const handleClick = () => {
    const minX = Math.min(...nodes.map((node) => node.position.x));
    const maxX = Math.max(...nodes.map((node) => node.position.x + node.width));
    const midX = (minX + maxX) / 2;
    const updatedNodes = nodes.map((node) => ({
      ...node,
      position: {
        ...node.position,
        x: midX - node.width / 2,
      },
    }));

    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Align Center Horziontal" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <AlignHorizontalCenterIcon sx={styles.svg} />
      </Box>
    </Tooltip>
  );
};

export default AlignCenterHorz;
