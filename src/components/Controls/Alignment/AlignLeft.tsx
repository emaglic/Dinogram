import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";
import { Box, Tooltip, TooltipProps } from "@mui/material";
import { selectSelectedNodes, updateNodes } from "@/state/Chart/chartSlice";

interface Props {
  tooltipPlacement?: TooltipProps["placement"];
}

const AlignTop = ({ tooltipPlacement = "top" }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

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
        <AlignHorizontalLeftIcon sx={styles.svg} />
      </Box>
    </Tooltip>
  );
};

export default AlignTop;
