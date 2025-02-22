import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CompressIcon from "@/assets/svg/compress.svg?react";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";

import { Box, SvgIcon, Tooltip, TooltipProps } from "@mui/material";
import { selectSelectedNodes, updateNodes } from "@/state/Chart/chartSlice";

interface Props {
  tooltipPlacement?: TooltipProps["placement"];
}

const CompressHorizontal = ({ tooltipPlacement = "top" }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

  const handleClick = () => {
    const minX = Math.min(...nodes.map((node) => node.width));
    const updatedNodes = nodes.map((node) => ({
      ...node,
      width: minX,
    }));
    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Compress Horizontally" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <SvgIcon
          sx={{ ...styles.svg, transform: "rotate(90deg)" }}
          component={CompressIcon} // Pass component directly
          inheritViewBox // Ensures SVG retains its own viewBox
        />
      </Box>
    </Tooltip>
  );
};

export default CompressHorizontal;
