import React, { useEffect } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { Box } from "@mui/material";
import NodeHeader from "./NodeHeader";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";

interface Props {
  children: React.ReactNode;
  minWidth: number;
  minHeight: number;
  selected?: boolean;
  label: string;
  data: { visible: boolean; label: string; id: string; locked: boolean };
}

const BaseNode = ({
  children,
  minWidth = 100,
  minHeight = 100,
  selected,
  label,
  data,
}: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  return (
    <Box
      sx={styles.container(selected, data.visible)}
      className={data?.locked || !data?.visible ? "nodrag" : undefined}
    >
      <NodeHeader label={label} />

      {selected && <NodeResizer minWidth={minWidth} minHeight={minHeight} />}

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
