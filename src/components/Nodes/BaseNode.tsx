import React from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";

interface Props {
  children: React.ReactNode;
  minWidth: number;
  minHeight: number;
}

const BaseNode = ({ children, minWidth = 100, minHeight = 100 }: Props) => {
  return (
    <>
      <NodeResizer minWidth={minWidth} minHeight={minHeight} />

      <Handle type="target" position={Position.Top} id="top-handle-target" />
      <Handle
        type="target"
        position={Position.Right}
        id="right-handle-target"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-handle-target"
      />
      <Handle type="target" position={Position.Left} id="left-handle-target" />

      <Handle type="source" position={Position.Top} id="top-handle-source" />
      <Handle
        type="source"
        position={Position.Right}
        id="right-handle-source"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-handle-source"
      />
      <Handle type="source" position={Position.Left} id="left-handle-source" />
      {children}
    </>
  );
};

export default BaseNode;
