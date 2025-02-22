import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";
import { Box, Tooltip } from "@mui/material";
import { selectSelectedNodes, updateNodes } from "@/state/Chart/chartSlice";
import DistributeHorizontalIcon from "@/assets/svg/distribute-horizontal.svg?react";
import SvgIcon from "@mui/material/SvgIcon";

const DistributeHorizontal = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

  const handleClick = () => {
    const minX = Math.min(...nodes.map((node) => node.position.x));
    const maxX = Math.max(...nodes.map((node) => node.position.x + node.width));

    const horzSpace = maxX - minX;

    const occupiedSpace = nodes.reduce((acc, node) => acc + node.width, 0);
    const spaceBetween = horzSpace - occupiedSpace;
    const spaceBetweenEach = spaceBetween / (nodes.length - 1);

    const updatedNodes = [];

    let currentX = minX;
    [...nodes]
      .sort((a, b) => a.position.x - b.position.x)
      .forEach((node, index) => {
        updatedNodes.push({
          ...node,
          position: {
            ...node.position,
            x: currentX + spaceBetweenEach * index,
          },
        });
        currentX += node.width;
      });

    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Distribute Horizontally" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <SvgIcon
          sx={styles.svg}
          component={DistributeHorizontalIcon} // Pass component directly
          inheritViewBox // Ensures SVG retains its own viewBox
        />
      </Box>
    </Tooltip>
  );
};

export default DistributeHorizontal;
