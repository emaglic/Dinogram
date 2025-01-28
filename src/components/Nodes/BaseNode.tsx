import React, { useEffect } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  minWidth: number;
  minHeight: number;
  selected?: boolean;
}

const BaseNode = ({
  children,
  minWidth = 100,
  minHeight = 100,
  selected,
}: Props) => {
  return (
    <Box sx={{ border: selected ? "5px solid blue" : "1px solid black" }}>
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
    </Box>
  );
};

export default BaseNode;
