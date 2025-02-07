import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
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
    const minX = Math.min(...nodes.map((node) => node.position.x));
    const updatedNodes = nodes.map((node) => ({
      ...node,
      position: { ...node.position, x: minX },
    }));
    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Align Left" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <AlignHorizontalLeftIcon />
      </Box>
    </Tooltip>
  );
};

export default AlignTop;
