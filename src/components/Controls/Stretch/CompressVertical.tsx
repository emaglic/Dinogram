import HeightIcon from "@mui/icons-material/Height";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CompressIcon from "@/assets/svg/compress.svg?react";
import useSelectedChartElements from "@/hooks/useGetSelected";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";

import { Box, SvgIcon, Tooltip } from "@mui/material";
import { selectChart, updateNodes } from "@/state/Chart/chartSlice";

const CompressHorizontal = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const chart = useSelector(selectChart);
  const { nodes } = useSelectedChartElements(chart);

  const handleClick = () => {
    const minY = Math.min(...nodes.map((node) => node.height));
    const updatedNodes = nodes.map((node) => ({
      ...node,
      height: minY,
    }));
    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Compress Vertically" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <SvgIcon
          component={CompressIcon} // Pass component directly
          inheritViewBox // Ensures SVG retains its own viewBox
        />
      </Box>
    </Tooltip>
  );
};

export default CompressHorizontal;
