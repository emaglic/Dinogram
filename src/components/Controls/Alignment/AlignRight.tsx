import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";

import { Box, Tooltip } from "@mui/material";
import { selectSelectedNodes, updateNodes } from "@/state/Chart/chartSlice";

const AlignRight = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

  const handleClick = () => {
    const maxX = Math.max(...nodes.map((node) => node.position.x + node.width));
    const updatedNodes = nodes.map((node) => ({
      ...node,
      position: {
        ...node.position,
        x:
          node.position.x + node.width === maxX
            ? node.position.x
            : maxX - +node.width,
      },
    }));
    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Align Right" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <AlignHorizontalRightIcon sx={styles.svg} />
      </Box>
    </Tooltip>
  );
};

export default AlignRight;
