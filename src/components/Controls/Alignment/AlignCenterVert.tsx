import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";
import useSelectedChartElements from "@/hooks/useGetSelected";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";

import { Box, Tooltip } from "@mui/material";
import { selectChart, updateNodes } from "@/state/Chart/chartSlice";

const AlignCenterVert = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const chart = useSelector(selectChart);
  const { nodes } = useSelectedChartElements(chart);

  const handleClick = () => {
    const minY = Math.min(...nodes.map((node) => node.position.y));
    const maxY = Math.max(
      ...nodes.map((node) => node.position.y + node.height)
    );
    const midY = (minY + maxY) / 2;
    const updatedNodes = nodes.map((node) => ({
      ...node,
      position: {
        ...node.position,
        y: midY - node.height / 2,
      },
    }));

    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Align Center Vertical" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <AlignVerticalCenterIcon />
      </Box>
    </Tooltip>
  );
};

export default AlignCenterVert;
