import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import WebNode from "../../Nodes/Web";
import RichTextNode from "../../Nodes/RichText";

const nodeTypes = {
  web: WebNode,
  richText: RichTextNode,
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Web", src: "https://www.nintendo.com" },
    type: "web",
  },
  {
    id: "2",
    position: { x: 500, y: 0 },
    data: { label: "Web" },
    type: "richText",
  },
];

const initialEdges = [
  /* { id: "e1-2", source: "1", target: "2" } */
];

function Chart({ chartState }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(chartState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    console.log("chartState", chartState);
  }, [chartState]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default Chart;
