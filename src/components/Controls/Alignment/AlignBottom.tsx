import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import { useTheme } from "@mui/material/styles";
import Styles from "../index.style";
import { Box, Tooltip, TooltipProps } from "@mui/material";
import { selectSelectedNodes, updateNodes } from "@/state/Chart/chartSlice";

interface Props {
  tooltipPlacement?: TooltipProps["placement"];
}

const AlignBottom = ({ tooltipPlacement = "top" }: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const nodes = useSelector(selectSelectedNodes);

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
