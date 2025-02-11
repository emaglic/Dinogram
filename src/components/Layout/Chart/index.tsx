import { useCallback, useEffect } from "react";
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
import { setDragging } from "@/state/Chart/settingsSlice";
import { selectProject } from "@/state/Chart/projectSlice";
import { useMediaQuery } from "@mui/material";

function Chart() {
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);

  // For light / dark mode
  const mode = useSelector(selectProject).mode;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorMode = mode ? mode : prefersDarkMode.toString() ? "dark" : "light";

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
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
  );
}

export default Chart;
