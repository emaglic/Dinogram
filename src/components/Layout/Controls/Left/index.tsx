import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import getNodesTypes from "@/base/nodes";
import { useSelector, useDispatch } from "react-redux";
import { createNode } from "@/state/Chart/chartSlice";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { RootState } from "@/state/store";

const FloatingControlBar = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.chart.nodes);

  const handleCreateNode = (nodeType) => {
    dispatch(createNode(nodeType.defaultData(nodes, nodeType)));
  };

  return (
    <Box sx={styles.container}>
      {getNodesTypes().map((nodeType) => (
        <Tooltip
          placement="right"
          arrow
          title={`Create ${nodeType.label} Node`}
          key={`${nodeType.type}-${nodeType.label}`}
        >
          <nodeType.icon
            sx={styles.icon}
            onClick={() => handleCreateNode(nodeType)}
          />
        </Tooltip>
      ))}
    </Box>
  );
};

export default FloatingControlBar;
