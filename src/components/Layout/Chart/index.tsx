import { useState, useCallback, useEffect, MouseEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { ReactFlow, MiniMap, Controls, Background } from "@xyflow/react";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  selectNodes,
  selectEdges,
  handleNodesChange,
} from "@/state/Chart/chartSlice";

import "@xyflow/react/dist/style.css";
import { nodeTypes } from "@/components/Nodes";
import { edgeTypes } from "@/components/Edges";
import {
  selectDragLockAxis,
  setDragging,
  setDragLockAxis,
} from "@/state/Settings/settingsSlice";
import { selectProject } from "@/state/Project/projectSlice";
import { Box, useMediaQuery } from "@mui/material";
import useContextMenu from "@/hooks/useContextMenu";
import ContextMenu from "@/components/Controls/ContextMenu";

function Chart() {
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);

  // For light / dark mode
  const mode = useSelector(selectProject).mode;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorMode = mode ? mode : prefersDarkMode.toString() ? "dark" : "light";
  const dragLockAxis = useSelector(selectDragLockAxis);

  const [
    handleContextMenuOpen,
    handleContextMenuClose,
    contextMenuPosition,
    contextMenuPayload,
  ] = useContextMenu();

  const onNodeDragStart = (event) => {
    if (event.shiftKey) {
      // Lock axis based on initial drag movement
      dispatch(setDragLockAxis(null)); // Reset previous lock
    }
  };

  const onNodeDrag = (evt, node) => {
    if (!evt.shiftKey) {
      dispatch(setDragLockAxis(null));
      return;
    }

    const originalNode = nodes.find((n) => n.id === node.id);
    if (!originalNode) return;

    // Determine initial drag direction
    if (dragLockAxis === null) {
      if (
        Math.abs(node.position.x - originalNode.position.x) >
        Math.abs(node.position.y - originalNode.position.y)
      ) {
        dispatch(setDragLockAxis("x"));
      } else {
        dispatch(setDragLockAxis("y"));
      }
    }
  };

  const onNodeDragStop = () => {
    dispatch(setDragLockAxis(null));
  };

  return (
    <>
      <Box
        onContextMenu={(evt: MouseEvent<HTMLElement>): void => {
          handleContextMenuOpen(evt);
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          colorMode={colorMode}
          onNodesChange={(evt) => dispatch(handleNodesChange(evt))}
          onEdgesChange={(evt) => dispatch(onEdgesChange(evt))}
          onNodeDragStart={(evt) => {
            onNodeDragStart(evt);
            dispatch(setDragging(true));
          }}
          onNodeDrag={(evt, node) => {
            onNodeDrag(evt, node);
          }}
          onNodeDragStop={() => {
            onNodeDragStop();
            dispatch(setDragging(false));
          }}
          onConnect={(evt) => dispatch(onConnect(evt))}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </Box>
      <ContextMenu
        position={contextMenuPosition}
        handleClose={handleContextMenuClose}
        payload={contextMenuPayload}
      />
    </>
  );
}

export default Chart;
