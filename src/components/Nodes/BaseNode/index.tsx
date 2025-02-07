import React, { useEffect, useState } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { Box } from "@mui/material";
import NodeHeader from "./NodeHeader";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";
import classes from "./index.module.css";

interface Props {
  children: React.ReactNode;
  minWidth: number;
  minHeight: number;
  selected?: boolean;
  label: string;
  data: { visible: boolean; label: string; id: string; locked: boolean };
  type: string;
}

const BaseNode = ({
  children,
  minWidth = 100,
  minHeight = 100,
  selected,
  label,
  type,
  data,
}: Props) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={styles.container(selected, data.visible)}
      className={data?.locked || !data?.visible ? "nodrag" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {type !== "shape" ? <NodeHeader label={label} /> : null}

      {selected && <NodeResizer minWidth={minWidth} minHeight={minHeight} />}

      <Handle
        className={hovered ? classes.handle : classes.handleHidden}
        type="target"
        position={Position.Top}
        id="top-handle-target"
      />
      <Handle
        className={hovered ? classes.handle : classes.handleHidden}
        type="target"
        position={Position.Right}
        id="right-handle-target"
      />
      <Handle
        className={hovered ? classes.handle : classes.handleHidden}
        type="target"
        position={Position.Bottom}
        id="bottom-handle-target"
      />
      <Handle
        className={hovered ? classes.handle : classes.handleHidden}
        type="target"
        position={Position.Left}
        id="left-handle-target"
      />

      <Handle
        className={hovered ? classes.handle : classes.handleHidden}
        type="source"
        position={Position.Top}
        id="top-handle-source"
      />
      <Handle
        className={hovered ? classes.handle : classes.handleHidden}
        type="source"
        position={Position.Right}
        id="right-handle-source"
      />
      <Handle
        className={hovered ? classes.handle : classes.handleHidden}
        type="source"
        position={Position.Bottom}
        id="bottom-handle-source"
      />
      <Handle
        className={hovered ? classes.handle : classes.handleHidden}
        type="source"
        position={Position.Left}
        id="left-handle-source"
      />
      {children}
    </Box>
  );
};

export default BaseNode;
