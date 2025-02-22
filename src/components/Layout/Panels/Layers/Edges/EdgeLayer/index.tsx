import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Checkbox, Tooltip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  onSelectNode,
  updateNodeOrder,
  updateNodeData,
  updateEdgeData,
  deleteEdges,
  onSelectEdge,
} from "@/state/Chart/chartSlice";
import Styles from "./index.style";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import shapeMap from "@/map/shape-map";
import ShapeSVG from "@/components/Nodes/Shape/ShapeSVG";
import { deleteNodes } from "@/state/Chart/chartSlice";
import constrainText from "@/utils/constrainText";

const EdgeLayer = ({ edge, keyboardKeys, isDragging }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = Styles(theme);

  const handleSelected = () => {
    dispatch(onSelectEdge({ id: edge.id, keyboardKeys }));
  };

  const handleUpdateData = (evt, dataItem) => {
    evt.stopPropagation();
    dispatch(
      updateEdgeData({
        id: edge.id,
        data: dataItem,
      })
    );
  };

  const handleVisibility = (evt) => {
    handleUpdateData(evt, { visible: !edge.data.visible });
  };

  const handleLocking = (evt) => {
    handleUpdateData(evt, { locked: !edge.data.locked });
  };

  const handleDelete = (evt) => {
    evt.stopPropagation();
    if (edge.data.visible && !edge.data.locked) {
      dispatch(deleteEdges([edge]));
    }
  };

  return (
    <Box onClick={handleSelected} sx={{ ...styles.container(edge) }}>
      <Box sx={styles.left}>
        <ShapeSVG
          sx={styles.icon}
          component={shapeMap[edge.data.iconKey].icon}
        />
        <Tooltip
          title={
            !isDragging && edge.data.label.length > 17 ? edge.data.label : ""
          }
          placement="right"
          arrow
          enterDelay={700}
          leaveDelay={0}
        >
          <Typography variant="caption" sx={{ cursor: "default" }}>
            {constrainText(edge.data.label, 17)}
          </Typography>
        </Tooltip>
      </Box>
      <Box sx={styles.right}>
        <Box
          onClick={handleDelete}
          sx={{
            ...styles.iconContainer,
            ...(!edge.data.visible || edge.data.locked
              ? styles.disabled
              : styles.interactive),
          }}
        >
          {!edge.data.visible || edge.data.locked ? (
            <DeleteOutlineIcon sx={styles.icon} />
          ) : (
            <DeleteIcon sx={styles.icon} />
          )}
        </Box>
        <Box
          onClick={handleVisibility}
          sx={{ ...styles.iconContainer, ...styles.interactive }}
        >
          {edge.data.visible ? (
            <VisibilityIcon sx={styles.icon} />
          ) : (
            <VisibilityOffIcon sx={styles.icon} />
          )}
        </Box>
        <Box
          onClick={handleLocking}
          sx={{ ...styles.iconContainer, ...styles.interactive }}
        >
          {edge.data.locked ? (
            <LockIcon sx={styles.icon} />
          ) : (
            <LockOpenIcon sx={styles.icon} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EdgeLayer;
