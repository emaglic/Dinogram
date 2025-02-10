import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import useSelectedChartElements from "@/hooks/useGetSelected";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";

import { Box, Tooltip } from "@mui/material";
import { selectChart, updateNodes } from "@/state/Chart/chartSlice";

const AlignBottom = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const chart = useSelector(selectChart);
  const { nodes } = useSelectedChartElements(chart);

  const handleClick = () => {
    const maxY = Math.max(
      ...nodes.map((node) => node.position.y + node.height)
    );
    const updatedNodes = nodes.map((node) => ({
      ...node,
      position: {
        ...node.position,
        y:
          node.position.y + node.height === maxY
            ? node.position.y
            : maxY - node.height,
      },
    }));
    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Align Bottom" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <AlignVerticalBottomIcon sx={styles.svg} />
      </Box>
    </Tooltip>
  );
};

export default AlignBottom;
