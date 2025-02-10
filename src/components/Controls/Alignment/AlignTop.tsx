import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignVerticalTopIcon from "@mui/icons-material/AlignVerticalTop";
import useSelectedChartElements from "@/hooks/useGetSelected";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";

import { Box, Tooltip } from "@mui/material";
import { selectChart, updateNodes } from "@/state/Chart/chartSlice";

const AlignTop = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const chart = useSelector(selectChart);
  const { nodes } = useSelectedChartElements(chart);

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
