import React, { forwardRef, useRef } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Cloud from "@mui/icons-material/Cloud";
import { Menu } from "@mui/material";
import { getToDuplicate } from "@/utils/context-menu";
import { useReactFlow } from "@xyflow/react";

import {
  deleteNodes,
  duplicateNodes,
  pasteNodes,
  selectSelectedEdges,
  selectSelectedNodes,
} from "@/state/Chart/chartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectClipboard, setClipboard } from "@/state/Chart/settingsSlice";

const ContextMenu = ({ position, handleClose, payload }) => {
  const dispatch = useDispatch();
  const nodes = useSelector(selectSelectedNodes);
  const edges = useSelector(selectSelectedEdges);
  const clipboard = useSelector(selectClipboard);
  const reactFlow = useReactFlow();

  const handleDuplicate = () => {
    const [dupNodes] = getToDuplicate(nodes, edges, payload);
    dispatch(duplicateNodes(dupNodes));
    handleClose();
  };

  const handleCopy = () => {
    const [dupNodes] = getToDuplicate(nodes, edges, payload);
    dispatch(setClipboard({ nodes: dupNodes, edges: [] }));
    handleClose();
  };

  const handlePaste = () => {
    if (!clipboard.nodes.length) return;
    const flowPosition = reactFlow.screenToFlowPosition({
      x: position.left,
      y: position.top,
    });
    console.log(flowPosition);
    dispatch(
      pasteNodes({
        nodes: clipboard.nodes,
        position: flowPosition,
      })
    );
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteNodes());
    handleClose();
  };

  return (
    <Menu
      className="dinogram-context-menu"
      sx={{ width: 420, maxWidth: "100%" }}
      open={Boolean(position)}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        position ? { top: position.top, left: position.left } : undefined
      }
    >
      <MenuList>
        {nodes.length ? (
          <MenuItem onClick={handleCopy}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘C
          </Typography> */}
          </MenuItem>
        ) : null}

        {clipboard.nodes.length ? (
          <MenuItem onClick={handlePaste}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘C
          </Typography> */}
          </MenuItem>
        ) : null}

        {nodes.length ? (
          <MenuItem onClick={handleDuplicate}>
            <ListItemIcon>
              <ControlPointDuplicateIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Duplicate</ListItemText>
            {/* <Typography
            variant="body2"
            sx={{ color: "text.secondary", marginLeft: "0.5rem" }}
          >
            CTRL + D
          </Typography> */}
          </MenuItem>
        ) : null}

        {nodes.length || edges.length ? (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
            {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘C
          </Typography> */}
          </MenuItem>
        ) : null}
      </MenuList>
    </Menu>
  );
};

export default ContextMenu;
