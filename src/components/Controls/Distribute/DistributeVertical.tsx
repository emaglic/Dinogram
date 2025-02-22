import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";
import { Box, Tooltip, TooltipProps } from "@mui/material";
import { selectSelectedNodes, updateNodes } from "@/state/Chart/chartSlice";
import DistributeVerticalIcon from "@/assets/svg/distribute-vertical.svg?react";
import SvgIcon from "@mui/material/SvgIcon";
import { ChartNode } from "@/types/chart/nodes";

interface Props {
  tooltipPlacement?: TooltipProps["placement"];
}

const DistributeVertical = ({ tooltipPlacement = "top" }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

  const handleClick = () => {
    const minY = Math.min(...nodes.map((node) => node.position.y));
    const maxY = Math.max(
      ...nodes.map((node) => node.position.y + node.height)
    );

    const vertSpace = maxY - minY;

    const occupiedSpace = nodes.reduce((acc, node) => acc + node.height, 0);
    const spaceBetween = vertSpace - occupiedSpace;
    const spaceBetweenEach = spaceBetween / (nodes.length - 1);

    const updatedNodes: ChartNode[] = [];

    let currentY = minY;
    [...nodes]
      .sort((a, b) => a.position.y - b.position.y)
      .forEach((node, index) => {
        updatedNodes.push({
          ...node,
          position: {
            ...node.position,
            y: currentY + spaceBetweenEach * index,
          },
        });
        currentY += node.height;
      });

    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Distribute Horizontally" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <SvgIcon
          sx={styles.svg}
          component={DistributeVerticalIcon} // Pass component directly
          inheritViewBox // Ensures SVG retains its own viewBox
        />
      </Box>
    </Tooltip>
  );
};

export default DistributeVertical;
