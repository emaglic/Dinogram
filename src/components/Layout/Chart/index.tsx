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
import WebNode from "../../Nodes/Web";
import RichTextNode from "../../Nodes/RichText";

const nodeTypes = {
  web: WebNode,
  richText: RichTextNode,
};

const initialEdges = [
  /* { id: "e1-2", source: "1", target: "2" } */
];

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
      onConnect={(evt) => dispatch(onConnect(evt))}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default Chart;
