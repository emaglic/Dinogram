import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Checkbox, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  onSelectNode,
  updateNodeOrder,
  updateNodeData,
} from "@/state/Chart/chartSlice";
import Styles, { NodeStyles } from "./index.style";
import { NodeIconMap } from "@/map/icon-map";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import shapeMap from "@/map/shape-map";
import ShapeSVG from "@/components/Nodes/Shape/ShapeSVG";
import { deleteNodes } from "@/state/Chart/chartSlice";

const NodeLayer = ({ node, modifierKeys }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = Styles(theme);

  const handleSelected = () => {
    dispatch(onSelectNode({ id: node.id, modifierKeys }));
  };

  const handleUpdateData = (evt, dataItem) => {
    evt.stopPropagation();
    dispatch(
      updateNodeData({
        id: node.id,
        data: dataItem,
      })
    );
  };

  const handleVisibility = (evt) => {
    handleUpdateData(evt, { visible: !node.data.visible });
  };

  const handleLocking = (evt) => {
    handleUpdateData(evt, { locked: !node.data.locked });
  };

  const handleDelete = (evt) => {
    evt.stopPropagation();
    if (node.data.visible && !node.data.locked) {
      dispatch(deleteNodes([node]));
    }
  };

  return (
    <Box onClick={handleSelected} sx={{ ...styles.container(node) }}>
      {/* <Checkbox checked={node.selected} onChange={handleClicked} /> */}
      <Box sx={styles.left}>
        <ShapeSVG
          sx={styles.icon}
          component={shapeMap[node.data.iconKey].icon}
        />
        <Typography variant="caption">{node.data.label}</Typography>
      </Box>
      <Box sx={styles.right}>
        <Box
          onClick={handleDelete}
          sx={{
            ...styles.iconContainer,
            ...(!node.data.visible || node.data.locked
              ? styles.disabled
              : styles.interactive),
          }}
        >
          {!node.data.visible || node.data.locked ? (
            <DeleteOutlineIcon sx={styles.icon} />
          ) : (
            <DeleteIcon sx={styles.icon} />
          )}
        </Box>
        <Box
          onClick={handleVisibility}
          sx={{ ...styles.iconContainer, ...styles.interactive }}
        >
          {node.data.visible ? (
            <VisibilityIcon sx={styles.icon} />
          ) : (
            <VisibilityOffIcon sx={styles.icon} />
          )}
        </Box>
        <Box
          onClick={handleLocking}
          sx={{ ...styles.iconContainer, ...styles.interactive }}
        >
          {node.data.locked ? (
            <LockIcon sx={styles.icon} />
          ) : (
            <LockOpenIcon sx={styles.icon} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NodeLayer;
