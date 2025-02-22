import { useCallback, useEffect, MouseEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { ReactFlow, MiniMap, Controls, Background } from "@xyflow/react";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  selectNodes,
  selectEdges,
} from "@/state/Chart/chartSlice";

import "@xyflow/react/dist/style.css";
import { nodeTypes } from "@/components/Nodes";
import { edgeTypes } from "@/components/Edges";
import { setDragging } from "@/state/Chart/settingsSlice";
import { selectProject } from "@/state/Chart/projectSlice";
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

  const [
    handleContextMenuOpen,
    handleContextMenuClose,
    contextMenuPosition,
    contextMenuPayload,
  ] = useContextMenu();

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
          onNodesChange={(evt) => dispatch(onNodesChange(evt))}
          onEdgesChange={(evt) => dispatch(onEdgesChange(evt))}
          onNodeDragStart={() => dispatch(setDragging(true))}
          onNodeDragStop={() => dispatch(setDragging(false))}
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
