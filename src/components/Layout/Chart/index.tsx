import { useCallback, useEffect } from "react";
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

function Chart() {
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);

  // const [nodes, setNodes, onNodesChange] = useNodesState(chartState.nodes);
  //const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={(evt) => dispatch(onNodesChange(evt))}
      onEdgesChange={(evt) => dispatch(onEdgesChange(evt))}
      onNodeDragStart={(evt) => console.log("drag start", evt)}
      onNodeDragStop={(evt) => console.log("drag end", evt)}
      onConnect={(evt) => dispatch(onConnect(evt))}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default Chart;
