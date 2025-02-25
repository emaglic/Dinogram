import React, { MouseEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Tooltip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { onSelectNode, updateNodeData } from "@/state/Chart/chartSlice";
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
import { ChartNode } from "@/types/chart/nodes";
import { KeyboardKeysType } from "@/state/Settings/settingsSlice";

interface Props {
  node: ChartNode;
  keyboardKeys: KeyboardKeysType;
  isDragging: boolean;
  onContextMenu: (evt: MouseEvent<HTMLElement>) => void;
}

const NodeLayer = ({
  node,
  keyboardKeys,
  isDragging,
  onContextMenu,
}: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = Styles(theme);

  const handleSelected = () => {
    dispatch(onSelectNode({ id: node.id, keyboardKeys }));
  };

  const handleUpdateData = (
    evt: MouseEvent,
    dataItem: Partial<ChartNode["data"]>
  ) => {
    evt.stopPropagation();
    dispatch(
      updateNodeData({
        id: node.id,
        data: dataItem,
      })
    );
  };

  const handleVisibility = (evt: MouseEvent) => {
    handleUpdateData(evt, { visible: !node.data.visible });
  };

  const handleLocking = (evt: MouseEvent) => {
    handleUpdateData(evt, { locked: !node.data.locked });
  };

  const handleDelete = (evt: MouseEvent) => {
    evt.stopPropagation();
    if (node.data.visible && !node.data.locked) {
      dispatch(deleteNodes([node]));
    }
  };

  return (
    <>
      <Box
        onClick={handleSelected}
        onContextMenu={onContextMenu}
        sx={{ ...styles.container(node) }}
      >
        {/* <Checkbox checked={node.selected} onChange={handleClicked} /> */}
        <Box sx={styles.left}>
          <ShapeSVG
            sx={styles.icon}
            component={
              shapeMap[node.data.iconKey as keyof typeof shapeMap].icon
            }
          />
          <Tooltip
            title={
              !isDragging && node.data.label.length > 17 ? node.data.label : ""
            }
            placement="right"
            arrow
            enterDelay={700}
            leaveDelay={0}
          >
            <Typography variant="caption" sx={{ cursor: "default" }}>
              {constrainText(node.data.label, 17)}
            </Typography>
          </Tooltip>
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
    </>
  );
};

export default NodeLayer;
