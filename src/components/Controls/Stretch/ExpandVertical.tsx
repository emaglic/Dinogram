import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandIcon from "@/assets/svg/expand.svg?react";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";

import { Box, SvgIcon, Tooltip } from "@mui/material";
import { selectSelectedNodes, updateNodes } from "@/state/Chart/chartSlice";

const ExpandVertical = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

  const handleClick = () => {
    const maxY = Math.max(...nodes.map((node) => node.height));
    const updatedNodes = nodes.map((node) => ({
      ...node,
      height: maxY,
    }));
    dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Expand Vertically" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <SvgIcon
          sx={styles.svg}
          component={ExpandIcon} // Pass component directly
          inheritViewBox // Ensures SVG retains its own viewBox
        />
      </Box>
    </Tooltip>
  );
};

export default ExpandVertical;
